import { useState } from 'react'
import { hoyLocalISO } from '../js/fechas'

const ESPECIES = ['Perro', 'Gato', 'Ave', 'Conejo', 'Roedor', 'Reptil', 'Otro']

const TELEFONO_REGEX = /^[0-9()+\-\s]{7,20}$/

const FORMULARIO_INICIAL = {
  nombre: '',
  especie: 'Perro',
  propietario: '',
  telefono: '',
  sintomas: '',
  fecha: '',
}

function FormularioMascota({
  pacientes,
  mascotaInicial,
  onAgregar,
  onActualizar,
  onCancelar,
}) {
  const modoEdicion = Boolean(mascotaInicial)
  const [formulario, setFormulario] = useState(
    modoEdicion
      ? {
          nombre: mascotaInicial.nombre,
          especie: mascotaInicial.especie,
          propietario: mascotaInicial.propietario,
          telefono: mascotaInicial.telefono,
          sintomas: '',
          fecha: '',
        }
      : FORMULARIO_INICIAL,
  )
  const [errores, setErrores] = useState({})

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setFormulario((previo) => ({ ...previo, [name]: value }))
    setErrores((previo) => {
      if (!(name in previo)) return previo
      const copia = { ...previo }
      delete copia[name]
      return copia
    })
  }

  function validar() {
    const nuevosErrores = {}

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre de la mascota es obligatorio.'
    }
    if (!formulario.propietario.trim()) {
      nuevosErrores.propietario = 'El nombre del dueño es obligatorio.'
    }
    if (!formulario.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono de contacto es obligatorio.'
    } else if (!TELEFONO_REGEX.test(formulario.telefono.trim())) {
      nuevosErrores.telefono =
        'El teléfono debe tener entre 7 y 20 dígitos, con espacios u otros caracteres válidos.'
    }

    if (!modoEdicion) {
      if (!formulario.sintomas.trim()) {
        nuevosErrores.sintomas = 'Los síntomas son obligatorios.'
      }
      if (!formulario.fecha) {
        nuevosErrores.fecha = 'La fecha de la cita es obligatoria.'
      } else if (formulario.fecha < hoyLocalISO()) {
        nuevosErrores.fecha = 'La fecha de la cita no puede ser anterior a hoy.'
      }
    }

    if (!nuevosErrores.nombre) {
      const duplicado = pacientes.some(
        (paciente) =>
          paciente.id !== (mascotaInicial && mascotaInicial.id) &&
          paciente.nombre.trim().toLowerCase() === formulario.nombre.trim().toLowerCase() &&
          paciente.propietario.trim().toLowerCase() === formulario.propietario.trim().toLowerCase(),
      )
      if (duplicado) {
        nuevosErrores.nombre = 'Este paciente ya está registrado.'
      }
    }

    return nuevosErrores
  }

  function manejarEnvio(evento) {
    evento.preventDefault()
    const nuevosErrores = validar()
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    const datosBase = {
      nombre: formulario.nombre.trim(),
      especie: formulario.especie,
      propietario: formulario.propietario.trim(),
      telefono: formulario.telefono.trim(),
    }

    if (modoEdicion) {
      onActualizar({ ...mascotaInicial, ...datosBase })
    } else {
      onAgregar({
        ...datosBase,
        sintomas: formulario.sintomas.trim(),
        fecha: formulario.fecha,
      })
    }

    setFormulario(FORMULARIO_INICIAL)
    setErrores({})
  }

  return (
    <form className="formulario" onSubmit={manejarEnvio} noValidate>
      <div className="campo">
        <label htmlFor="nombre">Nombre de la mascota</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Ej. Luna"
          value={formulario.nombre}
          onChange={manejarCambio}
          aria-invalid={Boolean(errores.nombre)}
        />
        {errores.nombre && <span className="error" role="alert">{errores.nombre}</span>}
      </div>

      <div className="campo">
        <label htmlFor="especie">Especie</label>
        <select id="especie" name="especie" value={formulario.especie} onChange={manejarCambio}>
          {ESPECIES.map((especie) => (
            <option key={especie} value={especie}>
              {especie}
            </option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label htmlFor="propietario">Nombre del dueño</label>
        <input
          id="propietario"
          name="propietario"
          type="text"
          placeholder="Ej. María Gómez"
          value={formulario.propietario}
          onChange={manejarCambio}
          aria-invalid={Boolean(errores.propietario)}
        />
        {errores.propietario && <span className="error" role="alert">{errores.propietario}</span>}
      </div>

      <div className="campo">
        <label htmlFor="telefono">Teléfono de contacto</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          inputMode="tel"
          placeholder="Ej. 612 345 678"
          value={formulario.telefono}
          onChange={manejarCambio}
          aria-invalid={Boolean(errores.telefono)}
        />
        {errores.telefono && <span className="error" role="alert">{errores.telefono}</span>}
      </div>

      {!modoEdicion && (
        <>
          <div className="campo">
            <label htmlFor="sintomas">Síntomas de la primera cita</label>
            <textarea
              id="sintomas"
              name="sintomas"
              rows={3}
              placeholder="Describe los síntomas o motivo de consulta"
              value={formulario.sintomas}
              onChange={manejarCambio}
              aria-invalid={Boolean(errores.sintomas)}
            />
            {errores.sintomas && <span className="error" role="alert">{errores.sintomas}</span>}
          </div>

          <div className="campo">
            <label htmlFor="fecha">Fecha de la cita</label>
            <input
              id="fecha"
              name="fecha"
              type="date"
              min={hoyLocalISO()}
              value={formulario.fecha}
              onChange={manejarCambio}
              aria-invalid={Boolean(errores.fecha)}
            />
            {errores.fecha && <span className="error" role="alert">{errores.fecha}</span>}
          </div>
        </>
      )}

      <button className="boton boton-primario" type="submit">
        {modoEdicion ? 'Guardar cambios' : 'Registrar paciente'}
      </button>

      {modoEdicion && (
        <button className="boton boton-secundario" type="button" onClick={onCancelar}>
          Cancelar
        </button>
      )}
    </form>
  )
}

export default FormularioMascota