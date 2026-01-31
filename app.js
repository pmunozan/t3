// Debug logs
console.log('🚀 app.js is loading...');

// Wait for DOM and Supabase to be ready
document.addEventListener('DOMContentLoaded', function () {
    console.log('✅ DOM loaded');

    // Check if Supabase is available
    if (typeof window.supabase === 'undefined') {
        console.error('❌ Supabase library not loaded!');
        document.getElementById('numbersList').innerHTML = `
            <div class="empty-state">
                <p>⚠️ Error: Librería Supabase no cargada</p>
            </div>
        `;
        return;
    }

    console.log('✅ Supabase available:', typeof window.supabase);

    // Supabase configuration
    const SUPABASE_URL = 'https://eyyhluemstudqskyycqj.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5eWhsdWVtc3R1ZHFza3l5Y3FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgxNDg1MTMsImV4cCI6MjA4MzcyNDUxM30.xWjtZWr39JVQ1pSfmc0zp4-nGy54f7VzYNAqws-0HFg';

    // Initialize Supabase client
    console.log('🔧 Initializing Supabase client...');
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase client created:', supabase);

    // DOM elements
    const numberForm = document.getElementById('numberForm');
    const numberInput = document.getElementById('numberInput');
    const numbersList = document.getElementById('numbersList');
    const toast = document.getElementById('toast');

    // Show toast notification
    function showToast(message, type = 'success') {
        toast.textContent = message;
        toast.className = `toast ${type} show`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) {
            return 'Hace un momento';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `Hace ${minutes} min${minutes > 1 ? 's' : ''}`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
        } else {
            return date.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });
        }
    }

    // Fetch and display last 5 numbers
    async function fetchNumbers() {
        console.log('📊 fetchNumbers() called');
        try {
            const { data, error } = await supabase
                .from('numbers')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            if (error) throw error;

            displayNumbers(data);
        } catch (error) {
            console.error('Error fetching numbers:', error);
            numbersList.innerHTML = `
            <div class="empty-state">
                <p>⚠️ Error al cargar los números</p>
                <p style="font-size: 0.85rem; margin-top: 8px;">${error.message}</p>
            </div>
        `;
        }
    }

    // Display numbers in the list
    function displayNumbers(numbers) {
        if (!numbers || numbers.length === 0) {
            numbersList.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke-width="2"/>
                    <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <p>No hay números guardados aún</p>
                <p style="font-size: 0.85rem; margin-top: 8px;">¡Agrega tu primer número!</p>
            </div>
        `;
            return;
        }

        numbersList.innerHTML = numbers
            .map(item => `
            <div class="number-item">
                <div class="number-value">${parseFloat(item.value).toLocaleString('es-ES')}</div>
                <div class="number-date">${formatDate(item.created_at)}</div>
            </div>
        `)
            .join('');
    }

    // Handle form submission
    numberForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const value = numberInput.value.trim();

        if (!value) {
            showToast('Por favor introduce un número', 'error');
            return;
        }

        try {
            // Disable submit button
            const submitBtn = numberForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.6';

            const { data, error } = await supabase
                .from('numbers')
                .insert([{ value: parseFloat(value) }])
                .select();

            if (error) throw error;

            // Clear input
            numberInput.value = '';

            // Refresh the list
            await fetchNumbers();

            // Show success message
            showToast('✓ Número guardado correctamente', 'success');

            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';

        } catch (error) {
            console.error('Error saving number:', error);
            showToast('Error al guardar el número', 'error');

            // Re-enable submit button
            const submitBtn = numberForm.querySelector('.submit-btn');
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });

    // Initial load
    console.log('🔄 Calling fetchNumbers() on initial load...');
    fetchNumbers();

}); // End of DOMContentLoaded
