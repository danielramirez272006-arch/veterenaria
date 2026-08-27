export function fechaLocalISO(fecha) {
  const local = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

export function hoyLocalISO() {
  return fechaLocalISO(new Date())
}