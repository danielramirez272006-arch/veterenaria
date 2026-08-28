# VitalPet Health & Care

Aplicación web para gestión de una veterinaria: registro de pacientes y citas, sistema de
recompensas por puntos, centro de adopción y tienda. Incluye **tema claro/oscuro** y soporte
**español/inglés**.

## Tecnologías

- **React 19** + **Vite 8**
- Almacenamiento local (`localStorage`) para usuarios, pacientes y catálogo
- Linting con **Oxlint**

## Estructura del proyecto

```
mi-proyecto/
├── pages/            # Vistas principales (Perfil, Pacientes, Adopción, Tienda)
├── src/
│   ├── components/   # Componentes de UI (navbar, login, tarjetas, formularios...)
│   ├── context/      # Proveedores de idioma (i18n) y tema (claro/oscuro)
│   ├── css/          # Sistema de diseño y estilos
│   └── js/           # Lógica: auth, storage, adopciones, tienda, recompensas
└── db-*.json         # Datos de ejemplo (pacientes, adopción y tienda)
```

## Funcionalidades

- **Autenticación**: registro e inicio de sesión de usuarios con contraseña cifrada (hash).
- **Perfil**: datos del usuario, Vital Points, barra de fidelidad (Plata/Oro) y actividad reciente.
- **Pacientes**: alta, edición y baja de mascotas, agendado de citas, buscador por nombre/dueño
  y filtro por especie.
- **Calendario**: vista semanal de todas las citas.
- **Adopción**: catálogo de mascotas disponibles y registro de adopciones (+50 puntos).
- **Tienda**: compras normales de productos en la que cada compra regala Vital Points.
- **Recompensas**: canje de puntos por servicios (corte de uñas, vacunas, baños...).
- **Tema**: alternar entre modo claro y oscuro (persistente y con detección del sistema).
- **Idioma**: alternar entre español e inglés (persistente).

## Cómo ejecutarlo

```bash
cd mi-proyecto
npm install
npm run dev
```

## Puntos de recompensa

| Acción              | Puntos          |
| ------------------- | --------------- |
| Registrar una cita  | +20             |
| Adoptar una mascota | +50             |
| Comprar en la tienda | 1 pt por cada $10 |

Los puntos se canjean en la sección de recompensas por servicios para tu mascota.