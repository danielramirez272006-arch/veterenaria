import catalogoTienda from '../../db-tienda.json'

export function obtenerProductos() {
  return catalogoTienda.map((producto) => ({ ...producto }))
}

export function obtenerCategorias() {
  return [...new Set(catalogoTienda.map((producto) => producto.categoria))]
}