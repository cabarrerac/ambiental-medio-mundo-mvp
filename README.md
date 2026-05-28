# Ambiental Medio Mundo MVP

MVP React integrado a partir de las cinco pantallas HTML originales:

- Landing comercial.
- Login con selección de rol.
- Centro de comando administrativo.
- Portal de cliente.
- App móvil de transportista en modo ruta.

## Cómo abrirlo

En este entorno ya está servido en:

```txt
http://localhost:4173/
```

El MVP se ejecuta como React estático en navegador usando CDN para React/Babel, porque el runtime local disponible no incluye `npm`.

## Supabase

El frontend está conectado al proyecto Supabase `gnrxaxpwkscfwbuskekb`:

- Auth por email y contraseña.
- Tablas para perfiles, clientes, vehículos, rutas, paradas y manifiestos.
- Row Level Security habilitado en todas las tablas públicas.
- Escritura real de manifiestos desde la vista de transportista.

Usuarios demo:

- `admin@ambiental.demo`
- `cliente@ambiental.demo`
- `conductor@ambiental.demo`

Contraseña demo para los tres roles: `Ambiental2026!`

## Archivos principales

- `index.html`: punto de entrada y carga de React.
- `src/main.jsx`: aplicación React, estado, navegación y vistas.
- `src/styles.css`: sistema visual y estilos responsivos.

Las carpetas originales con `code.html` y `screen.png` se conservaron como referencia.
