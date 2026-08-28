import { hoyLocalISO } from './fechas'

export const NIVEL_ORO = 500
export const NIVEL_PLATA = 200
export const PUNTOS_CUMPLEANOS = 30

export function nivelFidelidad(puntos) {
  if (puntos >= NIVEL_ORO) return 'oro'
  if (puntos >= NIVEL_PLATA) return 'plata'
  return 'bronce'
}

export function progresoNivel(puntos) {
  if (puntos >= NIVEL_ORO) return 100
  const nivel = nivelFidelidad(puntos)
  const base = nivel === 'plata' ? NIVEL_PLATA : 0
  const tope = nivel === 'plata' ? NIVEL_ORO : NIVEL_PLATA
  return Math.min(100, Math.round(((puntos - base) / (tope - base)) * 100))
}

export function puntosParaSubir(puntos) {
  const nivel = nivelFidelidad(puntos)
  if (nivel === 'oro') return 0
  const tope = nivel === 'bronce' ? NIVEL_PLATA : NIVEL_ORO
  return Math.max(0, tope - puntos)
}

export function limpiarTelefonoWhatsApp(telefono) {
  const limpiado = (telefono || '').replace(/[^0-9]/g, '')
  return limpiado.startsWith('52') || limpiado.startsWith('34') ? limpiado : `52${limpiado}`
}

export function enlaceWhatsApp(telefono, mensaje) {
  const numero = limpiarTelefonoWhatsApp(telefono)
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
}

export function recordatorioCita(mascota, cita, idioma) {
  const es = idioma !== 'en'
  const mensaje = es
    ? `Hola ${mascota.propietario}, te recordamos la cita de ${mascota.nombre} el ${cita.fecha}. Motivo: ${cita.sintomas}. Equipo VitalPet.`
    : `Hi ${mascota.propietario}, a reminder about ${mascota.nombre}'s appointment on ${cita.fecha}. Reason: ${cita.sintomas}. VitalPet Team.`
  return enlaceWhatsApp(mascota.telefono, mensaje)
}

export function estadoVacuna(vacuna) {
  if (!vacuna || !vacuna.proxima) return 'sin-fecha'
  const hoy = hoyLocalISO()
  if (vacuna.proxima < hoy) return 'vencida'
  const diff = (new Date(vacuna.proxima) - new Date(hoy)) / 86400000
  if (diff <= 30) return 'proxima'
  return 'al-dia'
}

export function cumpleEsHoy(fecha) {
  if (!fecha) return false
  const hoy = hoyLocalISO()
  return `${hoy.slice(5)}` === `${fecha.slice(5)}`
}

export function edadMascota(fecha) {
  if (!fecha) return ''
  const hoy = new Date(hoyLocalISO())
  const nacimiento = new Date(fecha)
  let anios = hoy.getFullYear() - nacimiento.getFullYear()
  const mesActual = hoy.getMonth() - nacimiento.getMonth()
  if (mesActual < 0 || (mesActual === 0 && hoy.getDate() < nacimiento.getDate())) {
    anios -= 1
  }
  return anios
}
