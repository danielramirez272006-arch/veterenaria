export function iniciales(nombre) {
  return nombre
    .split(' ')
    .filter((parte) => parte.length > 0)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase()
}