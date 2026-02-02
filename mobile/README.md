# Clientazo Mobile

Aplicación móvil para clientes del supermercado Clientazo.

## 🚀 Instalación

```bash
npm install
```

## ⚙️ Configuración

Editar `src/utils/constants.js` y configurar la URL de tu backend:

```javascript
export const API_URL = 'http://TU_IP:3000';  // Reemplaza TU_IP con la IP de tu computadora
```

Para desarrollo local con Expo, **NO uses** `localhost` o `127.0.0.1`. Usa la IP de tu computadora en la red local (por ejemplo: `192.168.1.100`).

## 🏃 Ejecutar

```bash
# Iniciar Expo
npm start

# O con opciones específicas
npm run android  # Para Android
npm run ios      # Para iOS
npm run web      # Para Web
```

Luego escanea el código QR con la app Expo Go en tu teléfono.

## 📱 Funcionalidades

### Autenticación
- Login de clientes
- Registro de nuevos clientes
- Validación contra base de datos

### Dashboard
- Vista general con puntos y saldo
- Acceso rápido a ofertas destacadas
- Acciones rápidas

### Ofertas
- Lista de ofertas CLIENTAZO
- Búsqueda de ofertas
- Detalles de cada oferta

### Tarjeta Digital
- Visualización del número de cliente
- Código de barras para uso en caja

### Puntos
- Consulta de puntos acumulados
- Información sobre el programa de puntos

### Cuenta Corriente
- Consulta de saldo disponible
- Información de cuenta

### Compras
- Historial de movimientos
- Detalles de cada compra

### Perfil
- Datos del cliente
- Estadísticas personales
- Cerrar sesión

## 🎨 Tecnologías

- **React Native** - Framework mobile
- **Expo** - Plataforma de desarrollo
- **React Navigation** - Navegación
- **React Native Paper** - Componentes UI
- **Axios** - Cliente HTTP
- **AsyncStorage** - Almacenamiento local

## 📁 Estructura del Proyecto

```
mobile/
├── App.js                    # Punto de entrada
├── app.json                  # Configuración de Expo
├── src/
│   ├── screens/              # Pantallas de la app
│   │   ├── Auth/            # Login y registro
│   │   ├── Home/            # Pantalla principal
│   │   ├── Ofertas/         # Ofertas
│   │   ├── Tarjeta/         # Tarjeta digital
│   │   ├── Puntos/          # Puntos
│   │   ├── CuentaCorriente/ # Cuenta corriente
│   │   ├── Compras/         # Historial de compras
│   │   └── Perfil/          # Perfil del usuario
│   ├── navigation/           # Navegación
│   ├── components/           # Componentes reutilizables
│   ├── services/             # Servicios API
│   ├── context/              # Contextos de React
│   └── utils/                # Utilidades
└── package.json
```

## 🔐 Autenticación

La app usa JWT para autenticación. Los tokens se guardan en AsyncStorage y se envían automáticamente en cada petición.

## 📝 Notas

- Asegúrate de que el backend esté corriendo antes de usar la app
- Para desarrollo, el backend y el dispositivo deben estar en la misma red
- La app requiere permisos de internet

## 🐛 Troubleshooting

### No se conecta al backend
- Verifica que la URL en `constants.js` sea correcta
- Asegúrate de usar la IP de tu computadora, no `localhost`
- Verifica que el backend esté corriendo
- Verifica que estés en la misma red WiFi

### Errores de dependencias
```bash
# Limpiar caché
expo start -c

# Reinstalar dependencias
rm -rf node_modules
npm install
```
