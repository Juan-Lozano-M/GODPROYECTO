# Game of Dreams (GOD)

Plataforma web de orientación vocacional para estudiantes de bachillerato y universidad en Colombia. Este repositorio contiene **únicamente el frontend** (SPA en React), que se conecta a una API backend (Flask/Python) desplegada por separado.

## Tecnologías principales

- **React 19** + **Vite 6**
- **React Router 7** — enrutamiento (`src/main.jsx`)
- **Tailwind CSS 4** (`@tailwindcss/vite`)
- **Firebase Authentication** — login con correo/contraseña y Google
- **Axios** — cliente HTTP hacia la API
- **Framer Motion** — animaciones
- **Lexical** — editor de texto enriquecido (creación de noticias)
- **Recharts** — gráficas del panel de administración
- **MUI / Heroicons / Lucide** — componentes e iconografía

## Requisitos

- Node.js 20+
- npm

## Instalación

```bash
npm install
```

## Scripts disponibles

```bash
npm run dev       # Servidor de desarrollo (http://localhost:5173)
npm run build     # Build de producción en dist/
npm run preview   # Previsualiza el build de producción
npm run lint      # Ejecuta ESLint sobre todo el proyecto
```

No hay un test runner configurado (no existe script `test`).

## Conexión con el backend

El frontend consume una API REST en:

```
https://godbackend.onrender.com
```

Configurada como `baseURL` en [`src/config/axiosConfig.js`](src/config/axiosConfig.js), que además:

- Adjunta automáticamente `Authorization: Bearer <authToken>` (token guardado en `localStorage`).
- Si una petición responde `401`, limpia `localStorage` y redirige a `/login`.

Si necesitas apuntar a un backend local, cambia el `baseURL` por `http://127.0.0.1:5000`.

## Estructura del proyecto

```
src/
├── main.jsx              # Definición de todas las rutas (createBrowserRouter)
├── App.jsx               # Landing page pública ("/")
├── LoginMain.jsx         # Layout de /login (rutas anidadas)
├── firebaseConfig.js     # Configuración de Firebase Auth
├── config/axiosConfig.js # Instancia de axios + interceptores
├── guards/                # AdminRoute, ProtectedResetRoute
├── services/              # Llamadas a la API (proyectos, contacto, visitas)
├── pages/                 # Vistas (Login, Register, Dashboard, Admin/*, Noticias/*, ...)
└── components/
    ├── index/             # Secciones de la landing (Navbar, Footer, Testimonios...)
    ├── admin/              # Panel de administración (Sidebar, estadísticas, modales)
    ├── inputs/             # Formularios + editor Lexical de noticias
    ├── chatbot/            # Asistente flotante (ChatBot)
    └── ...                 # alertas, buttons, cards, modals, noticia, profile
```

## Rutas principales

| Ruta | Descripción |
|---|---|
| `/` | Landing pública |
| `/login`, `/register` | Autenticación |
| `/login/recoverpassword`, `/login/resetpassword` | Recuperación de contraseña (Firebase) |
| `/dashboard` | Panel del usuario autenticado |
| `/noticiasv`, `/noticiasv/:slug` | Listado y detalle de noticias |
| `/proyectosview` | Listado de proyectos |
| `/contacto` | Formulario de contacto |
| `/home`, `/home/newscreate`, `/notices`, `/statics`, `/projects`, `/projects/create` | Panel de administración (`/home` protegido por `AdminRoute`) |

## Autenticación

1. El usuario inicia sesión con Firebase (correo/contraseña o Google).
2. El frontend envía el ID token de Firebase a `/auth/login` en el backend.
3. El backend responde con el usuario y su rol; el frontend guarda en `localStorage`: `firebaseUID`, `authToken`, `userName`, `userEmail`, `userRole`, `profileImage`, `userPhoto`.
4. Si `userRole === "Admin"`, se redirige a `/home`; en caso contrario a `/`.

## Despliegue

El sitio se despliega en **Netlify** ([`netlify.toml`](netlify.toml)), con redirección SPA (`/* → /index.html`).
