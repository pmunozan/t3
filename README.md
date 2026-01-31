# ✨ Almacén de Números

Una aplicación web moderna para guardar y visualizar tus números favoritos usando Supabase como backend.

![Demo](https://img.shields.io/badge/demo-live-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🎯 Características

- ✅ Guarda números favoritos en la nube
- ✅ Visualiza los últimos 5 números guardados
- ✅ Timestamps en español con formato relativo
- ✅ Interfaz moderna con animaciones suaves
- ✅ Diseño glassmorphism con gradientes vibrantes
- ✅ Mensajes toast de confirmación

## 🚀 Tecnologías

- **Frontend**: HTML, CSS, JavaScript vanilla
- **Backend**: Supabase (PostgreSQL + API)
- **Hosting**: Cualquier servidor estático (ej: GitHub Pages, Vercel, Netlify)

## 📋 Requisitos Previos

- Cuenta de Supabase (gratuita)
- Navegador web moderno
- Servidor web local para desarrollo (ej: `python -m http.server`)

## ⚙️ Configuración

### 1. Crear el proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Ve a SQL Editor y ejecuta este script:

```sql
-- Crear tabla
CREATE TABLE IF NOT EXISTS public.favorite_numbers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    number INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.favorite_numbers ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso público
CREATE POLICY "Allow public read access"
ON public.favorite_numbers FOR SELECT TO public USING (true);

CREATE POLICY "Allow public insert access"
ON public.favorite_numbers FOR INSERT TO public WITH CHECK (true);

-- Índice para mejor rendimiento
CREATE INDEX idx_favorite_numbers_created_at 
ON public.favorite_numbers(created_at DESC);
```

### 2. Configurar las credenciales

1. En tu proyecto de Supabase, ve a **Settings** → **API**
2. Copia tu `URL` y `anon/public key`
3. Abre `script.js` y actualiza las constantes:

```javascript
const SUPABASE_URL = 'TU_URL_AQUI';
const SUPABASE_KEY = 'TU_KEY_AQUI';
```

### 3. Ejecutar localmente

```bash
# Opción 1: Python
python3 -m http.server 8000

# Opción 2: Node.js
npx serve

# Luego abre: http://localhost:8000
```

## 📁 Estructura del Proyecto

```
almacen-numeros/
├── index.html      # Estructura HTML principal
├── styles.css      # Estilos con glassmorphism
├── script.js       # Lógica de la aplicación
└── README.md       # Este archivo
```

## 🎨 Diseño

La aplicación utiliza:
- Gradientes vibrantes de azul a púrpura
- Efecto glassmorphism para las tarjetas
- Animaciones suaves y transiciones
- Tipografía moderna (Inter desde Google Fonts)
- Iconos personalizados con SVG

## 🔒 Seguridad

- Row Level Security (RLS) habilitado en Supabase
- Políticas públicas solo para lectura e inserción
- No se requiere autenticación (ideal para demos)

## 📝 Licencia

MIT License - siéntete libre de usar este proyecto como quieras.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -m 'Añadir mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

## 📧 Contacto

Creado por [@pmunozan](https://github.com/pmunozan)

---

⭐ Si te gusta este proyecto, ¡dale una estrella!
