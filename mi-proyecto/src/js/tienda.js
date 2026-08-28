import catalogoTienda from '../../db-tienda.json'

const CARRITO_KEY = 'veterinaria:carrito'
const FAVORITOS_KEY = 'veterinaria:favoritos'

export function obtenerProductos() {
  return catalogoTienda.map((producto) => ({ ...producto }))
}

export function obtenerCategorias() {
  return [...new Set(catalogoTienda.map((producto) => producto.categoria))]
}

export function cargarCarrito(usuario) {
  if (!usuario) return []
  try {
    const guardado = localStorage.getItem(CARRITO_KEY)
    if (!guardado) return []
    const carritos = JSON.parse(guardado)
    const entradas = carritos[usuario] || []
    const productos = obtenerProductos()
    return entradas
      .map((entrada) => {
        const producto = productos.find((item) => item.id === entrada.id)
        return producto ? { producto, cantidad: entrada.cantidad } : null
      })
      .filter((item) => item !== null)
  } catch (error) {
    console.error('Error al leer el carrito:', error)
    return []
  }
}

export function guardarCarrito(usuario, carrito) {
  if (!usuario) return
  try {
    const guardado = localStorage.getItem(CARRITO_KEY)
    const carritos = guardado ? JSON.parse(guardado) : {}
    carritos[usuario] = carrito.map(({ producto, cantidad }) => ({
      id: producto.id,
      cantidad,
    }))
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carritos))
  } catch (error) {
    console.error('Error al guardar el carrito:', error)
  }
}

export function totalCarrito(carrito) {
  return carrito.reduce((suma, item) => suma + item.producto.precio * item.cantidad, 0)
}

function leerIds(clave) {
  try {
    const guardado = localStorage.getItem(clave)
    return guardado ? JSON.parse(guardado) : []
  } catch (error) {
    console.error('Error al leer:', error)
    return []
  }
}

function guardarIds(clave, ids) {
  try {
    localStorage.setItem(clave, JSON.stringify(ids))
  } catch (error) {
    console.error('Error al guardar:', error)
  }
}

export function cargarFavoritos(usuario) {
  if (!usuario) return []
  return leerIds(FAVORITOS_KEY)[usuario] || []
}

export function guardarFavoritos(usuario, ids) {
  if (!usuario) return
  const favoritos = leerIds(FAVORITOS_KEY)
  favoritos[usuario] = ids
  guardarIds(FAVORITOS_KEY, favoritos)
}

export function toggleFavorito(ids, id) {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id]
}