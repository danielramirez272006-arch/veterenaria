# Tienda de mascotas

`pages/TiendaPage.jsx` es la vista "Tienda". Permite comprar productos con los Vital Points
acumulados.

## Catálogo (`src/js/tienda.js` + `db-tienda.json`)

Los productos vienen del archivo `db-tienda.json` y tienen:

```
{ id, nombre, nombreEn, categoria, precio, descripcion, descripcionEn }
```

- `categoria` se guarda en español (Comida, Juguetes, Accesorios, Higiene, Snacks) y se muestra
  traducida (`mostrarCategoria()`).
- `nombre` y `descripcion` se muestran en español o inglés según el idioma (`localizar()`).

## Filtros por categoría

La barra de **chips** filtra el catálogo. La opción "Todas" muestra todo; al elegir una
categoría se filtran los productos con `producto.categoria === categoria`.

## Comprar (`src/components/TarjetaProducto.jsx`)

- Cada tarjeta muestra la categoría, nombre, descripción y precio en puntos.
- El botón **"Comprar"** está deshabilitado si el usuario no tiene saldo suficiente (muestra
  "Sin saldo").
- Pide confirmación con `window.confirm` ("¿Comprar \"{producto}\" por {precio} pts?").
- Al confirmar, `App` llama a `comprarProducto(producto, idioma)` (en `js/auth.js`):

  1. Valida la sesión y el saldo.
  2. Descuenta el precio y agrega la compra a `usuario.compras`.
  3. Registra un movimiento negativo "Compra: {nombre}".
  4. Muestra una notificación de éxito.

## Mis compras

Una segunda sección lista las compras del usuario con fecha ("Comprado el {fecha}"), usando los
campos `nombreEn` / `descripcionEn` para traducir si el idioma es inglés.