# Clientazo Admin Web

Panel administrativo web para el sistema Clientazo.

## 🚀 Instalación

```bash
npm install
```

## ⚙️ Configuración

1. Copiar el archivo de ejemplo:
```bash
cp .env.example .env.local
```

2. Editar `.env.local` con la URL del backend (por defecto: `http://localhost:3000`)

## 🏃 Ejecutar

**Modo desarrollo:**
```bash
npm run dev
```

El panel estará disponible en `http://localhost:5173`

**Build para producción:**
```bash
npm run build
```

**Preview del build:**
```bash
npm run preview
```

## 🔑 Credenciales Iniciales

Por defecto:
- **Usuario:** admin
- **Contraseña:** admin123

## 📚 Funcionalidades

### Dashboard
- Vista general con estadísticas
- Ofertas activas
- Clientes registrados
- Ofertas destacadas

### Gestión de Ofertas
- Listar todas las ofertas
- Activar/desactivar ofertas
- Marcar ofertas como destacadas
- Buscar ofertas
- Importar ofertas desde archivo TXT

### Importación de Ofertas
- Subir archivo items_web.TXT
- Ver historial de importaciones
- Logs detallados de cada importación

### Gestión de Clientes
- Listar clientes registrados
- Ver información de cada cliente
- Estado de activación
- Último acceso

### Movimientos
- Consultar movimientos por cliente
- Filtrar por fecha
- Ver detalles de transacciones

### Reportes
- Generación de reportes (próximamente)

## 🎨 Tecnologías

- **React 18** - Biblioteca UI
- **Vite** - Build tool
- **Material-UI** - Componentes UI
- **React Router** - Navegación
- **TanStack Query** - Gestión de estado del servidor
- **Axios** - Cliente HTTP
- **date-fns** - Manejo de fechas

## 📁 Estructura del Proyecto

```
admin-web/
├── src/
│   ├── pages/           # Páginas de la aplicación
│   ├── components/      # Componentes reutilizables
│   ├── services/        # Servicios API
│   ├── context/         # Contextos de React
│   ├── utils/           # Utilidades
│   ├── App.jsx          # Componente principal
│   └── main.jsx         # Punto de entrada
├── index.html
├── package.json
└── vite.config.js
```

## 🔒 Autenticación

El sistema usa JWT para autenticación. El token se guarda en localStorage y se envía automáticamente en cada petición al backend.

## 🌐 Proxy

En desarrollo, todas las peticiones a `/api` se proxean automáticamente al backend (puerto 3000) gracias a la configuración de Vite.
