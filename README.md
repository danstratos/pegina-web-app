# NEXO GAMES - SPA Full Stack (React + Vite + Node.js + MongoDB)

Aplicación web SPA para gestionar inventario de tienda con autenticación JWT y roles.

## Estructura
- `backend/`: API REST con Node.js, Express, MongoDB (Mongoose), JWT.
- `frontend/`: SPA React con Vite.

## Funcionalidades implementadas
- Registro y login con JWT.
- Roles: `admin` y `user`.
- CRUD de productos (solo admin crea/edita/elimina).
- Listado con búsqueda por nombre/descripción/categoría.
- Filtro select dinámico de categorías desde backend.
- Paginación.
- Productos sin existencia (`cantidad = 0`) no visibles para usuarios normales.
- Favoritos por usuario con página dedicada y mensaje dinámico cuando no hay favoritos.
- Edición de perfil de usuario (incluye dirección y teléfono).
- Panel admin para listar y editar usuarios registrados.
- Seed con más de 20 productos y un administrador.

## Backend
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

Variables (`backend/.env`):
```env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/nexo_games
JWT_SECRET=super_secret
```

## Frontend
```bash
cd frontend
npm install
npm run dev
```

Variables (`frontend/.env` opcional):
```env
VITE_API_URL=http://localhost:4000/api
```

## Credenciales iniciales (seed)
- correo: `admin@nexogames.com`
- contraseña: `Admin123*`
