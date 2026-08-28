const CLAVE_BASE = 'veterinaria:pacientes'

function obtenerClave(usuarioId) {
  return `${CLAVE_BASE}:${usuarioId}`
}

function normalizarPacientes(mascotas) {
  return mascotas.map((mascota) => {
    if (Array.isArray(mascota.citas)) return mascota
    return {
      id: mascota.id,
      nombre: mascota.nombre,
      especie: mascota.especie,
      propietario: mascota.propietario,
      telefono: mascota.telefono,
      fechaNacimiento: mascota.fechaNacimiento || '',
      peso: mascota.peso || '',
      alergias: mascota.alergias || '',
      vacunas: mascota.vacunas || [],
      desparasitaciones: mascota.desparasitaciones || [],
      citas: [
        {
          id: generarId(),
          fecha: mascota.fecha || '',
          sintomas: mascota.sintomas || '',
          notas: '',
        },
      ],
    }
  })
}

export function cargarPacientes(usuarioId) {
  try {
    const guardados = localStorage.getItem(obtenerClave(usuarioId))
    if (guardados) return normalizarPacientes(JSON.parse(guardados))
  } catch (error) {
    console.error('Error al leer el almacenamiento:', error)
  }
  return []
}

export function guardarPacientes(usuarioId, pacientes) {
  try {
    localStorage.setItem(obtenerClave(usuarioId), JSON.stringify(pacientes))
  } catch (error) {
    console.error('Error al guardar en el almacenamiento:', error)
  }
}

export function generarId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `paciente-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function crearMascota(previos, datos) {
  return [
    ...previos,
    {
      id: generarId(),
      nombre: datos.nombre,
      especie: datos.especie,
      propietario: datos.propietario,
      telefono: datos.telefono,
      fechaNacimiento: datos.fechaNacimiento || '',
      peso: datos.peso || '',
      alergias: datos.alergias || '',
      vacunas: datos.vacunas || [],
      desparasitaciones: datos.desparasitaciones || [],
      citas: [
        {
          id: generarId(),
          fecha: datos.fecha,
          sintomas: datos.sintomas,
          notas: '',
        },
      ],
    },
  ]
}

export function actualizarMascota(previos, actualizada) {
  return previos.map((mascota) =>
    mascota.id === actualizada.id ? actualizada : mascota,
  )
}

export function agregarCita(mascota, datos) {
  return {
    ...mascota,
    citas: [
      ...mascota.citas,
      {
        id: generarId(),
        ...datos,
      },
    ],
  }
}

export function todasLasCitas(pacientes) {
  return pacientes.flatMap((mascota) =>
    mascota.citas.map((cita) => ({
      ...cita,
      mascotaId: mascota.id,
      nombre: mascota.nombre,
      especie: mascota.especie,
      propietario: mascota.propietario,
    })),
  )
}

function proximaCita(mascota) {
  return mascota.citas.reduce((minima, cita) => {
    if (!minima) return cita.fecha
    return cita.fecha < minima ? cita.fecha : minima
  }, '')
}

export function ordenarPorFecha(pacientes) {
  return [...pacientes].sort((a, b) => proximaCita(a).localeCompare(proximaCita(b)))
}