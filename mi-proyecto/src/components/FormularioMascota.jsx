import { useState } from 'react'
import { hoyLocalISO } from '../js/fechas'
import { useLang } from '../context/LanguageContext'

const ESPECIES = ['Perro', 'Gato', 'Ave', 'Conejo', 'Roedor', 'Reptil', 'Otro']
const ESPECIES_EN = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Rodent', 'Reptile', 'Other']

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
  const { t, lang } = useLang()
  const modoEdicion = Boolean(mascotaInicial)
  const listaEspecies = lang === 'es' ? ESPECIES : ESPECIES_EN
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
      nuevosErrores.nombre = t('errores.nombreMascota')
    }
    if (!formulario.propietario.trim()) {
      nuevosErrores.propietario = t('errores.duenoObligatorio')
    }
    if (!formulario.telefono.trim()) {
      nuevosErrores.telefono = t('errores.telefonoObligatorio')
    } else if (!TELEFONO_REGEX.test(formulario.telefono.trim())) {
      nuevosErrores.telefono = t('errores.telefonoInvalido')
    }

    if (!modoEdicion) {
      if (!formulario.sintomas.trim()) {
        nuevosErrores.sintomas = t('errores.sintomasObligatorios')
      }
      if (!formulario.fecha) {
        nuevosErrores.fecha = t('errores.fechaObligatoria')
      } else if (formulario.fecha < hoyLocalISO()) {
        nuevosErrores.fecha = t('errores.fechaPasada')
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
        nuevosErrores.nombre = t('errores.pacienteDuplicado')
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
        <label htmlFor="nombre">{t('formularioMascota.nombreMascota')}</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          placeholder={t('formularioMascota.nombrePlaceholder')}
          value={formulario.nombre}
          onChange={manejarCambio}
          aria-invalid={Boolean(errores.nombre)}
        />
        {errores.nombre && <span className="error" role="alert">{errores.nombre}</span>}
      </div>

      <div className="campo">
        <label htmlFor="especie">{t('formularioMascota.especie')}</label>
        <select id="especie" name="especie" value={formulario.especie} onChange={manejarCambio}>
          {listaEspecies.map((especie) => (
            <option key={especie} value={especie}>
              {especie}
            </option>
          ))}
        </select>
      </div>

      <div className="campo">
        <label htmlFor="propietario">{t('formularioMascota.nombreDueno')}</label>
        <input
          id="propietario"
          name="propietario"
          type="text"
          placeholder={t('formularioMascota.duenoPlaceholder')}
          value={formulario.propietario}
          onChange={manejarCambio}
          aria-invalid={Boolean(errores.propietario)}
        />
        {errores.propietario && <span className="error" role="alert">{errores.propietario}</span>}
      </div>

      <div className="campo">
        <label htmlFor="telefono">{t('formularioMascota.telefono')}</label>
        <input
          id="telefono"
          name="telefono"
          type="tel"
          inputMode="tel"
          placeholder={t('formularioMascota.telefonoPlaceholder')}
          value={formulario.telefono}
          onChange={manejarCambio}
          aria-invalid={Boolean(errores.telefono)}
        />
        {errores.telefono && <span className="error" role="alert">{errores.telefono}</span>}
      </div>

      {!modoEdicion && (
        <>
          <div className="campo">
            <label htmlFor="sintomas">{t('formularioMascota.sintomas')}</label>
            <textarea
              id="sintomas"
              name="sintomas"
              rows={3}
              placeholder={t('formularioMascota.sintomasPlaceholder')}
              value={formulario.sintomas}
              onChange={manejarCambio}
              aria-invalid={Boolean(errores.sintomas)}
            />
            {errores.sintomas && <span className="error" role="alert">{errores.sintomas}</span>}
          </div>

          <div className="campo">
            <label htmlFor="fecha">{t('formularioMascota.fechaCita')}</label>
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
        {modoEdicion ? t('formularioMascota.guardarCambios') : t('formularioMascota.registrarPaciente')}
      </button>

      {modoEdicion && (
        <button className="boton boton-secundario" type="button" onClick={onCancelar}>
          {t('formularioMascota.cancelar')}
        </button>
      )}
    </form>
  )
}

export default FormularioMascota