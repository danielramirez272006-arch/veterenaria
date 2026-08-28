# VitalPet Health & Care

Aplicación de veterinaria construida con **React + Vite**: registro de pacientes y citas,
recompensas por puntos (Vital Points), centro de adopción, tienda, tema claro/oscuro y soporte
español/inglés.

## Comandos

```bash
npm install     # instalar dependencias
npm run dev     # servidor de desarrollo
npm run build   # compilar para producción
npm run lint    # revisar el código con Oxlint
npm run preview # previsualizar el build de producción
```

## Estructura

- `pages/` — vistas principales (Perfil, Pacientes, Adopción, Tienda).
- `src/components/` — componentes de UI reutilizables.
- `src/context/` — proveedores de idioma (`LanguageContext`) y tema (`ThemeContext`).
- `src/js/` — lógica de negocio (auth, storage, adopciones, tienda, recompensas).
- `src/css/style.css` — sistema de diseño con variables CSS para tema claro y oscuro.
- `db-*.json` — datos iniciales de ejemplo.

Los datos del usuario (cuenta, pacientes, puntos, compras y adopciones) se guardan en
`localStorage`.