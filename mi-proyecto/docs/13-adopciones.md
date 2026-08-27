# Centro de adopción

`pages/AdopcionPage.jsx` es la vista "Adopción". Muestra el catálogo de mascotas y permite
adoptarlas.

## Secciones

- **Disponibles para adopción**: mascotas que aún no fueron adoptadas. Si no hay, muestra un
  estado vacío.
- **Mis adopciones**: las mascotas que el usuario adoptó (marcadas con `adoptada` y
  `adoptante === usuario.id`).

## Tarjeta de adopción (`src/components/TarjetaAdopcion.jsx`)

Muestra por cada mascota:

- Nombre y especie (traducida).
- Edad y descripción (traducidas con los campos `edadEn` / `descripcionEn`).
- Botón **"Adoptar"** con confirmación previa (`window.confirm`).
- Si ya fue adoptada: la etiqueta "Adoptada el {fecha}".

## Registro de la adopción (`src/js/adopciones.js`)

`registrarAdopcion(catalogo, id, usuario, idioma)`:

- Valida que la mascota exista y no esté ya adoptada (errores traducidos).
- Marca la mascota como `adoptada`, guarda el `adoptante`, el `adoptanteNombre` y la `fecha`.
- Devuelve el catálogo actualizado.

## Puntos

En `src/App.jsx`, al adoptar se otorgan **+50 puntos** (`PUNTOS_POR_ADOPCION`) con el motivo
"Adopción de {nombre}", y se muestra una notificación de éxito.

## Persistencia

El catálogo se guarda en `localStorage` bajo `veterinaria:catalogoAdopciones`. Los datos
iniciales vienen de `db-adopciones.json` (con traducciones al inglés en cada entrada).