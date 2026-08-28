import { useState } from 'react'
import { hoyLocalISO } from '../js/fechas'
import { useLang } from '../context/LanguageContext'

const FORMULARIO_INICIAL = {
  fecha: '',
  sintomas: '',
  notas: '',
}

function FormularioCita({ mascota, onAgregarCita, onCancelar }) {
  const { t } = useLang()
  const [formulario, setFormulario] = useState(FORMULARIO_INICIAL)
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

    if (!formulario.fecha) {
      nuevosErrores.fecha = t('errores.fechaObligatoria')
    } else if (formulario.fecha < hoyLocalISO()) {
      nuevosErrores.fecha = t('errores.fechaPasada')
    } else if (mascota.citas.some((cita) => cita.fecha === formulario.fecha)) {
      nuevosErrores.fecha = t('errores.citaExistente')
    }

    if (!formulario.sintomas.trim()) {
      nuevosErrores.sintomas = t('errores.sintomasCita')
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
    onAgregarCita({
      fecha: formulario.fecha,
      sintomas: formulario.sintomas.trim(),
      notas: formulario.notas.trim(),
    })
    setFormulario(FORMULARIO_INICIAL)
    setErrores({})
  }

  return (
    <form className="formulario formulario-cita" onSubmit={manejarEnvio} noValidate>
      <h4 className="formulario-cita-titulo">{t('formularioCita.nuevaCita')}</h4>

      <div className="campo">
        <label htmlFor="fecha-cita">{t('formularioCita.fecha')}</label>
        <input
          id="fecha-cita"
          name="fecha"
          type="date"
          min={hoyLocalISO()}
          value={formulario.fecha}
          onChange={manejarCambio}
          aria-invalid={Boolean(errores.fecha)}
        />
        {errores.fecha && <span className="error" role="alert">{errores.fecha}</span>}
      </div>

      <div className="campo">
        <label htmlFor="sintomas-cita">{t('formularioCita.sintomas')}</label>
        <textarea
          id="sintomas-cita"
          name="sintomas"
          rows={2}
          value={formulario.sintomas}
          onChange={manejarCambio}
          aria-invalid={Boolean(errores.sintomas)}
        />
        {errores.sintomas && <span className="error" role="alert">{errores.sintomas}</span>}
      </div>

      <div className="campo">
        <label htmlFor="notas-cita">{t('formularioCita.notas')}</label>
        <textarea
          id="notas-cita"
          name="notas"
          rows={2}
          placeholder={t('formularioCita.notasPlaceholder')}
          value={formulario.notas}
          onChange={manejarCambio}
        />
      </div>

      <div className="formulario-botones">
        <button className="boton boton-primario" type="submit">
          {t('formularioCita.guardar')}
        </button>
        <button className="boton boton-secundario" type="button" onClick={onCancelar}>
          {t('formularioCita.cancelar')}
        </button>
      </div>
    </form>
  )
}

export default FormularioCita