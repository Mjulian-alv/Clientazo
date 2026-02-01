# Clientazo Backend

Backend API REST para el sistema Clientazo.

## 🚀 Instalación

```bash
npm install
```

## ⚙️ Configuración

1. Copiar el archivo de ejemplo:
```bash
cp .env.example .env
```

2. Editar `.env` con tus credenciales de base de datos

## 🗄️ Inicializar Base de Datos

```bash
npm run init-db
```

Esto creará:
- Base de datos `clientazo_db` (si no existe)
- Tablas: `clientes_auth`, `ofertas`, `admins`, `ofertas_importacion_log`
- Usuario admin por defecto (username: `admin`, password: `admin123`)

## 🏃 Ejecutar

**Modo desarrollo (con auto-reload):**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`

## 📚 API Endpoints

### Mobile API (`/api/mobile/`)

#### Autenticación
- `POST /api/mobile/auth/login` - Login de cliente
- `POST /api/mobile/auth/register` - Registro de cliente
- `POST /api/mobile/auth/refresh` - Refrescar token

#### Ofertas
- `GET /api/mobile/ofertas` - Listar ofertas CLIENTAZO
- `GET /api/mobile/ofertas/:id` - Detalle de oferta

#### Puntos
- `GET /api/mobile/puntos` - Obtener puntos del cliente (requiere auth)
- `GET /api/mobile/puntos/historial` - Historial de puntos (requiere auth)

#### Cuenta Corriente
- `GET /api/mobile/cuenta-corriente` - Obtener saldo (requiere auth)
- `GET /api/mobile/cuenta-corriente/movimientos` - Movimientos (requiere auth)

#### Compras
- `GET /api/mobile/compras` - Historial de compras (requiere auth)
- `GET /api/mobile/compras/:id` - Detalle de compra (requiere auth)

#### Perfil
- `GET /api/mobile/perfil` - Obtener perfil (requiere auth)
- `PUT /api/mobile/perfil` - Actualizar perfil (requiere auth)
- `GET /api/mobile/tarjeta` - Datos para código de barras (requiere auth)

### Admin API (`/api/admin/`)

#### Autenticación
- `POST /api/admin/auth/login` - Login de administrador

#### Dashboard
- `GET /api/admin/dashboard/stats` - Estadísticas generales (requiere auth admin)

#### Clientes
- `GET /api/admin/clientes` - Listar clientes (requiere auth admin)
- `GET /api/admin/clientes/:id` - Detalle de cliente (requiere auth admin)

#### Ofertas
- `GET /api/admin/ofertas` - Listar ofertas (requiere auth admin)
- `GET /api/admin/ofertas/:id` - Detalle de oferta (requiere auth admin)
- `PUT /api/admin/ofertas/:id` - Actualizar oferta (requiere auth admin)
- `DELETE /api/admin/ofertas/:id` - Desactivar oferta (requiere auth admin)

#### Importación
- `POST /api/admin/import/ofertas` - Importar archivo TXT (requiere auth admin)
- `GET /api/admin/import/log` - Ver log de importaciones (requiere auth admin)

#### Movimientos
- `GET /api/admin/movimientos` - Listar movimientos (requiere auth admin)

## 🔐 Autenticación

Las rutas protegidas requieren un token JWT en el header:
```
Authorization: Bearer <token>
```

## 📁 Estructura del Proyecto

```
backend/
├── src/
│   ├── config/          # Configuración (DB, env)
│   ├── controllers/     # Controladores de rutas
│   ├── middleware/      # Middlewares (auth, error handling)
│   ├── models/          # Modelos de datos
│   ├── routes/          # Definición de rutas
│   ├── services/        # Lógica de negocio
│   ├── utils/           # Utilidades (JWT, validators, formatters)
│   └── server.js        # Punto de entrada
├── scripts/             # Scripts de inicialización
├── uploads/             # Archivos subidos temporalmente
└── package.json
```

## 🔒 Seguridad

- Passwords hasheados con bcrypt
- Autenticación JWT
- Validación de datos con express-validator
- CORS configurado
- Helmet para headers de seguridad
- Conexión a BD remota en modo solo lectura

## 📝 Notas

- La BD remota es **SOLO LECTURA** - no se hacen INSERT/UPDATE/DELETE
- La BD local es para autenticación y ofertas
- El archivo TXT debe tener 31 campos separados por punto y coma (;)
- Solo se importan registros con HABILITADO = 'S'
