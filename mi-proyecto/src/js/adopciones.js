import catalogoInicial from '../../db-adopciones.json'

const CLAVE_CATALOGO = 'veterinaria:catalogoAdopciones'

function catalogoBase() {
  return catalogoInicial.map((mascota) => ({
    ...mascota,
    adoptada: false,
    adoptante: null,
    fecha: null,
  }))
}

export function cargarCatalogo() {
  const base = catalogoBase()
  try {
    const guardados = localStorage.getItem(CLAVE_CATALOGO)
    if (guardados) {
      const listaGuardada = JSON.parse(guardados)
      const mapaGuardados = new Map(listaGuardada.map(m => [m.id, m]))
      
      return base.map(mascotaBase => {
        const guardada = mapaGuardados.get(mascotaBase.id)
        if (guardada) {
          return {
            ...mascotaBase, // Prevalecen datos frescos del JSON (incluyendo imagen)
            adoptada: guardada.adoptada || false,
            adoptante: guardada.adoptante || null,
            adoptanteNombre: guardada.adoptanteNombre || null,
            fecha: guardada.fecha || null
          }
        }
        return mascotaBase
      })
    }
  } catch (error) {
    console.error('Error al leer el catálogo de adopción:', error)
  }
  return base
}

export function guardarCatalogo(catalogo) {
  try {
    localStorage.setItem(CLAVE_CATALOGO, JSON.stringify(catalogo))
  } catch (error) {
    console.error('Error al guardar el catálogo de adopción:', error)
  }
}

export function registrarAdopcion(catalogo, id, usuario) {
  const mascota = catalogo.find((item) => item.id === id)
  if (!mascota) {
    return { ok: false, error: 'Esta mascota ya no está disponible.' }
  }
  if (mascota.adoptada) {
    return { ok: false, error: 'Esta mascota ya fue adoptada.' }
  }
  const actualizado = catalogo.map((item) =>
    item.id === id
      ? {
          ...item,
          adoptada: true,
          adoptante: usuario.id,
          adoptanteNombre: usuario.nombre,
          fecha: new Date().toISOString().slice(0, 10),
        }
      : item,
  )
  return { ok: true, catalogo: actualizado }
}