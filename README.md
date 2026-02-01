# 🛒 Clientazo - Sistema Integral para Supermercado

Sistema completo para gestión de ofertas, puntos y cuenta corriente de clientes.

## 🏗️ Arquitectura

- **Mobile**: React Native + Expo (iOS/Android)
- **Admin Web**: React + Vite + Material-UI
- **Backend**: Node.js + Express + MySQL

## 📦 Estructura del Proyecto

```
Clientazo/
├── mobile/          # App móvil (React Native + Expo)
├── admin-web/       # Panel administrativo web (React + Vite)
└── backend/         # API REST (Node.js + Express)
```

## 🚀 Instalación

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus credenciales de BD
npm run init-db
npm run dev
```

### 2. Admin Web
```bash
cd admin-web
npm install
cp .env.example .env.local
# Configurar VITE_API_URL=http://localhost:3000
npm run dev
```

### 3. Mobile
```bash
cd mobile
npm install
# Editar src/utils/constants.js con la URL de tu API
npx expo start
```

## 🔑 Credenciales Iniciales

**Panel Admin:**
- Usuario: `admin`
- Contraseña: `admin123`

## 📊 Base de Datos

### BD Remota (Solo Lectura)
Contiene los datos del sistema existente del supermercado:
- Tabla `movimientos`: Transacciones, puntos, saldos
- Otras tablas de productos y clientes

### BD Nueva (Clientazo)
Gestiona la autenticación y ofertas:
- `clientes_auth`: Credenciales de acceso
- `ofertas`: Productos en oferta
- `admins`: Usuarios administrativos
- `ofertas_importacion_log`: Auditoría de importaciones

## 📱 Funcionalidades

### App Móvil
- ✅ Login/Registro de clientes
- ✅ Ver ofertas "CLIENTAZO"
- ✅ Consultar puntos acumulados
- ✅ Ver saldo de cuenta corriente
- �� Historial de compras
- ✅ Tarjeta digital (código de barras)
- ✅ Perfil y configuración

### Panel Admin
- ✅ Dashboard con métricas
- ✅ Importar ofertas desde archivo TXT
- ✅ Gestionar ofertas (activar/desactivar)
- ✅ Consultar datos de clientes
- ✅ Ver movimientos y reportes

## 🔐 Seguridad

- Autenticación JWT
- Passwords hasheados con bcrypt
- Validación de datos con express-validator
- CORS configurado
- Helmet para headers de seguridad

## 📄 Licencia

Propietario - Todos los derechos reservados