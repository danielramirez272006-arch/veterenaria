# Tienda de mascotas

`pages/TiendaPage.jsx` es la vista "Tienda". Permite hacer compras normales de productos y
ganar Vital Points como recompensa por cada compra.

## Catálogo (`src/js/tienda.js` + `db-tienda.json`)

Los productos vienen del archivo `db-tienda.json` y tienen:

```
{ id, nombre, categoria, precio, descripcion, imagen }
```

- `categoria` se guarda en español (Comida, Juguetes, Accesorios, Higiene, Snacks).
- `precio` es el precio en dinero (se muestra con `formatearDinero()`).
- `nombre` y `descripcion` se muestran según el idioma activo.

## Filtros por categoría

La barra de **chips** filtra el catálogo. La opción "Todas" muestra todo; al elegir una
categoría se filtran los productos con `producto.categoria === categoria`.

## Comprar (`src/components/TarjetaProducto.jsx` + `pages/TiendaPage.jsx`)

- Cada tarjeta muestra la categoría, nombre, descripción y precio en dinero.
- Al agregar al carrito y confirmar, `App` llama a `comprarCarrito(items)` (en `js/auth.js`):

  1. Valida la sesión y que el carrito no esté vacío.
  2. Calcula el total de la compra y los puntos de recompensa ganados
     (`puntosPorCompra(total)`, 1 punto por cada $10).
  3. Agrega la compra a `usuario.compras` y **suma** los puntos ganados.
  4. Registra un movimiento positivo "Compra en tienda: {cantidad} producto(s)".
  5. Muestra una notificación de éxito con los puntos ganados.

## Mis compras

Una segunda sección lista las compras del usuario con fecha ("Comprado el {fecha}").
