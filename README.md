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
- Rate limiting para prevenir ataques de fuerza bruta
- Validación de datos con express-validator
- CORS configurado
- Helmet para headers de seguridad
- Conexión a BD remota en modo solo lectura

## 🔧 Tecnologías

### Backend
- Node.js + Express
- MySQL (dual connections)
- JWT + bcrypt
- express-rate-limit
- Multer para archivos

### Admin Web
- React 18 + Vite
- Material-UI
- React Router
- TanStack Query
- Axios

### Mobile
- React Native + Expo
- React Navigation
- React Native Paper
- AsyncStorage
- Axios

## 📄 Documentación Detallada

Cada componente tiene su propio README con instrucciones específicas:
- [Backend README](backend/README.md)
- [Admin Web README](admin-web/README.md)
- [Mobile README](mobile/README.md)

## 🎯 Características Técnicas

### Parser de Archivo TXT
- Formato: 31 campos separados por punto y coma (;)
- Encoding: UTF-8
- Conversión automática de fechas DD-MM-YYYY a YYYY-MM-DD
- Filtrado de registros habilitados
- Importación masiva con transacciones

### Dual Database Architecture
- Pool de conexiones para BD remota (read-only)
- Pool de conexiones para BD local (read-write)
- Manejo automático de conexiones
- Verificación de estado al inicio

### Rate Limiting
- Login: 5 intentos / 15 minutos
- Registro: 3 intentos / hora
- API general: 100 requests / 15 minutos
- Operaciones sensibles: 10 requests / 15 minutos

## 📈 Estadísticas del Proyecto

- **Total de archivos**: 97 archivos
- **Backend**: 44 archivos (API, servicios, controladores)
- **Admin Web**: 21 archivos (interfaz administrativa)
- **Mobile**: 27 archivos (app móvil completa)
- **Líneas de código**: ~8,500+ líneas

## 🛡️ Seguridad y Calidad

- ✅ Code review completado
- ✅ CodeQL security scan realizado
- ✅ Todas las vulnerabilidades conocidas abordadas
- ✅ Rate limiting implementado
- ✅ Validación de entrada en todos los endpoints
- ✅ Autenticación y autorización robusta

## 📄 Licencia

Propietario - Todos los derechos reservados