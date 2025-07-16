# TaxiDay Mobile 🚖

Una aplicación móvil desarrollada con React Native y Expo para la gestión de carreras de taxi y control de jornadas laborales.

## 📱 Características

- **Gestión de Jornadas**: Crear y administrar jornadas de trabajo
- **Registro de Carreras**: Añadir carreras con detalles como origen, destino, kilómetros y precio
- **Estadísticas**: Visualizar total de kilómetros recorridos y ganancias
- **Perfil de Usuario**: Gestión de información personal del taxista
- **Modo Oscuro/Claro**: Interfaz adaptable según preferencias del usuario
- **Geolocalización**: Integración con mapas para ubicaciones
- **Base de Datos Local**: Almacenamiento offline con SQLite

## 🛠️ Tecnologías Utilizadas

- **React Native**: Framework principal para desarrollo móvil
- **Expo**: Plataforma para desarrollo y despliegue
- **React Navigation**: Navegación entre pantallas
- **SQLite**: Base de datos local
- **React Context**: Manejo de estado global
- **Expo Location**: Servicios de geolocalización
- **React Native Maps**: Integración con mapas

## 📦 Dependencias Principales

```json
{
  "expo": "~52.0.31",
  "react": "18.3.1",
  "react-native": "0.76.7",
  "@react-navigation/native": "^7.0.14",
  "@react-navigation/stack": "^7.1.1",
  "@react-navigation/drawer": "^7.1.1",
  "expo-sqlite": "~15.1.2",
  "expo-location": "~18.0.6",
  "react-native-maps": "1.18.0"
}
```

## 🚀 Instalación

### Prerrequisitos
- Node.js (v14 o superior)
- npm o yarn
- Expo CLI
- Android Studio (para Android) o Xcode (para iOS)

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone git@github.com:josca16/TaxiDay_Mobile.git
cd TaxiDay_Mobile
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar la aplicación**
```bash
# Para desarrollo
npm start

# Para Android
npm run android

# Para iOS
npm run ios

# Para web
npm run web
```

## 📱 Pantallas Principales

### 🏠 Pantalla Principal (HomeScreen)
- Resumen de estadísticas generales
- Acceso rápido a funciones principales
- Visualización de kilómetros totales y ganancias

### 📊 Gestión de Jornadas
- **NuevaJornadaScreen**: Crear nuevas jornadas de trabajo
- **ContinuarJornadaScreen**: Continuar jornadas existentes
- **JornadaDetailScreen**: Ver detalles de jornadas específicas

### 🚗 Gestión de Carreras
- **NuevaCarreraScreen**: Registrar nuevas carreras
- **EditCarreraScreen**: Editar carreras existentes
- **RegistrosScreen**: Historial de todas las carreras

### 👤 Usuario
- **ProfileScreen**: Perfil del usuario
- **LoginScreen**: Inicio de sesión
- **RegisterScreen**: Registro de nuevos usuarios
- **SettingsScreen**: Configuraciones de la aplicación

### ℹ️ Información
- **HelpScreen**: Ayuda y soporte

## 🏗️ Estructura del Proyecto

```
ProyectoFinal/
├── App.js                 # Componente principal
├── app.json              # Configuración de Expo
├── package.json          # Dependencias y scripts
├── app/
│   ├── assets/           # Recursos gráficos
│   ├── context/          # Contextos de React
│   │   ├── AppContext.js
│   │   └── CarrerasContext.js
│   ├── navigation/       # Configuración de navegación
│   │   ├── AppNavigator.js
│   │   └── DrawerNavigator.js
│   └── screens/          # Pantallas de la aplicación
│       ├── HomeScreen.js
│       ├── NuevaJornadaScreen.js
│       ├── ContinuarJornadaScreen.js
│       ├── JornadaDetailScreen.js
│       ├── NuevaCarreraScreen.js
│       ├── EditCarreraScreen.js
│       ├── RegistrosScreen.js
│       ├── ProfileScreen.js
│       ├── LoginScreen.js
│       ├── RegisterScreen.js
│       ├── SettingsScreen.js
│       └── HelpScreen.js
```

## 🎨 Características de la Interfaz

- **Diseño Moderno**: Interfaz intuitiva y profesional
- **Tema Adaptable**: Soporte para modo oscuro y claro
- **Navegación Fluida**: Drawer navigation y stack navigation
- **Iconografía**: Uso de Material Icons
- **Responsive**: Adaptado para diferentes tamaños de pantalla

## 💾 Almacenamiento de Datos

La aplicación utiliza SQLite para almacenamiento local, permitiendo:
- Persistencia de datos offline
- Gestión de jornadas y carreras
- Configuraciones de usuario
- Historial de actividades

## 📧 Contacto y Soporte

Para soporte técnico o consultas:
- **Email**: soporte@taxiday.com

## 👨‍💻 Desarrollador

Desarrollado por **TaxiDay Team**

## 📄 Licencia

Este proyecto es privado y está protegido por derechos de autor.

---

⭐ **TaxiDay Mobile** - Gestión profesional para taxistas modernos
