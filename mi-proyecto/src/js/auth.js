import { generarId } from './storage'

const USUARIOS_KEY = 'veterinaria:usuarios'
const SESION_KEY = 'veterinaria:sesion'

export const PUNTOS_POR_CITA = 20
export const PUNTOS_POR_ADOPCION = 50

function leerUsuarios() {
  try {
    const guardados = localStorage.getItem(USUARIOS_KEY)
    if (guardados) return JSON.parse(guardados)
  } catch (error) {
    console.error('Error al leer usuarios:', error)
  }
  return []
}

function guardarUsuarios(usuarios) {
  try {
    localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios))
  } catch (error) {
    console.error('Error al guardar usuarios:', error)
  }
}

function guardarSesion(usuario) {
  try {
    localStorage.setItem(SESION_KEY, JSON.stringify(usuario))
  } catch (error) {
    console.error('Error al guardar la sesión:', error)
  }
}

function generarHash(texto) {
  let h1 = 0xdeadbeef
  let h2 = 0x41c6ce57
  for (let i = 0; i < texto.length; i++) {
    const codigo = texto.charCodeAt(i)
    h1 = Math.imul(h1 ^ codigo, 2654435761)
    h2 = Math.imul(h2 ^ codigo, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  return `${(h2 >>> 0).toString(16)}${(h1 >>> 0).toString(16)}`
}

function reemplazarUsuario(actualizado) {
  const usuarios = leerUsuarios().map((usuario) =>
    usuario.usuario.toLowerCase() === actualizado.usuario.toLowerCase() ? actualizado : usuario,
  )
  guardarUsuarios(usuarios)
}

export function obtenerSesion() {
  try {
    const sesion = localStorage.getItem(SESION_KEY)
    if (sesion) return JSON.parse(sesion)
  } catch (error) {
    console.error('Error al leer la sesión:', error)
  }
  return null
}

export function cerrarSesion() {
  try {
    localStorage.removeItem(SESION_KEY)
  } catch (error) {
    console.error('Error al cerrar sesión:', error)
  }
}

export function iniciarSesion(usuario, password) {
  const encontrado = leerUsuarios().find(
    (item) =>
      item.usuario.toLowerCase() === usuario.trim().toLowerCase() &&
      item.password === generarHash(password),
  )
  if (!encontrado) {
    return { ok: false, error: 'El usuario o la contraseña son incorrectos.' }
  }
  guardarSesion(encontrado)
  return { ok: true, usuario: encontrado }
}

export function registrarUsuario({ usuario, nombre, password }) {
  const usuarios = leerUsuarios()
  const usuarioLimpio = usuario.trim()

  if (usuarios.some((item) => item.usuario.toLowerCase() === usuarioLimpio.toLowerCase())) {
    return { ok: false, error: 'Ese nombre de usuario ya está registrado.' }
  }
  if (password.length < 6) {
    return { ok: false, error: 'La contraseña debe tener al menos 6 caracteres.' }
  }

  const nuevo = {
    id: generarId(),
    usuario: usuarioLimpio,
    nombre: nombre.trim(),
    password: generarHash(password),
    puntos: 0,
    desde: new Date().getFullYear(),
    movimientos: [],
    recompensasCanjeadas: [],
    compras: [],
  }
  guardarUsuarios([...usuarios, nuevo])
  guardarSesion(nuevo)
  return { ok: true, usuario: nuevo }
}

function crearMovimiento(cantidad, motivo) {
  return {
    id: generarId(),
    fecha: new Date().toISOString().slice(0, 10),
    motivo,
    puntos: cantidad,
  }
}

export function sumarPuntos(cantidad, motivo) {
  const sesion = obtenerSesion()
  if (!sesion) return null
  const actualizado = {
    ...sesion,
    puntos: sesion.puntos + cantidad,
    movimientos: [crearMovimiento(cantidad, motivo), ...(sesion.movimientos || [])],
  }
  reemplazarUsuario(actualizado)
  guardarSesion(actualizado)
  return actualizado
}

export function canjearRecompensa(recompensa) {
  const sesion = obtenerSesion()
  if (!sesion) {
    return { ok: false, error: 'Tu sesión no es válida.' }
  }
  if (sesion.puntos < recompensa.costo) {
    return { ok: false, error: 'No tienes puntos suficientes para esta recompensa.' }
  }

  const canje = {
    ...recompensa,
    fecha: new Date().toISOString().slice(0, 10),
  }
  const actualizado = {
    ...sesion,
    puntos: sesion.puntos - recompensa.costo,
    recompensasCanjeadas: [...sesion.recompensasCanjeadas, canje],
    movimientos: [
      crearMovimiento(-recompensa.costo, `Canje: ${canje.nombre}`),
      ...(sesion.movimientos || []),
    ],
  }
  reemplazarUsuario(actualizado)
  guardarSesion(actualizado)
  return { ok: true, usuario: actualizado, nombre: canje.nombre }
}

export function comprarProducto(producto) {
  const sesion = obtenerSesion()
  if (!sesion) {
    return { ok: false, error: 'Tu sesión no es válida.' }
  }
  if (sesion.puntos < producto.precio) {
    return { ok: false, error: 'No tienes puntos suficientes para esta compra.' }
  }

  const compra = {
    ...producto,
    fecha: new Date().toISOString().slice(0, 10),
  }
  const actualizado = {
    ...sesion,
    puntos: sesion.puntos - producto.precio,
    compras: [...(sesion.compras || []), compra],
    movimientos: [
      crearMovimiento(-producto.precio, `Compra: ${compra.nombre}`),
      ...(sesion.movimientos || []),
    ],
  }
  reemplazarUsuario(actualizado)
  guardarSesion(actualizado)
  return { ok: true, usuario: actualizado, nombre: compra.nombre }
}