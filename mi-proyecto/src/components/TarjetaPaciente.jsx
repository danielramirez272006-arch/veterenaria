import { useState } from 'react'
import FormularioCita from './FormularioCita'
import { useLang } from '../context/LanguageContext'

function TarjetaPaciente({ mascota, onEliminar, onEditar, onAgregarCita, onRecordar }) {
  const { t } = useLang()
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false)

  const citas = [...mascota.citas].sort((a, b) => a.fecha.localeCompare(b.fecha))

  function manejarAlta() {
    if (window.confirm(t('avisos.confirmarAlta', { nombre: mascota.nombre }))) {
      onEliminar(mascota.id)
    }
  }

  return (
    <li className="tarjeta tarjeta-paciente">
      <div className="tarjeta-cabecera">
        <h3 className="tarjeta-nombre">{mascota.nombre}</h3>
        <span className="tarjeta-especie">{mascota.especie}</span>
      </div>

      <dl className="tarjeta-datos">
        <div>
          <dt>{t('pacientes.dueno')}</dt>
          <dd>{mascota.propietario}</dd>
        </div>
        <div>
          <dt>{t('pacientes.telefono')}</dt>
          <dd>{mascota.telefono}</dd>
        </div>
      </dl>

      <ul className="citas-lista">
        {citas.map((cita) => (
          <li key={cita.id} className="cita">
            <div className="cita-cabecera">
              <span className="cita-fecha">{cita.fecha}</span>
              <button
                className="boton boton-recordar"
                type="button"
                onClick={() => onRecordar(mascota, cita)}
              >
                {t('mascotas.recordar')}
              </button>
            </div>
            <p className="cita-sintomas">{cita.sintomas}</p>
            {cita.notas && <p className="cita-notas">{t('pacientes.nota')} {cita.notas}</p>}
          </li>
        ))}
      </ul>

      {mostrandoFormulario ? (
        <FormularioCita
          mascota={mascota}
          onAgregarCita={(cita) => {
            onAgregarCita(mascota.id, cita)
            setMostrandoFormulario(false)
          }}
          onCancelar={() => setMostrandoFormulario(false)}
        />
      ) : (
        <button
          className="boton boton-secundario"
          type="button"
          onClick={() => setMostrandoFormulario(true)}
        >
          {t('pacientes.agregarCita')}
        </button>
      )}

      <div className="tarjeta-botones">
        <button className="boton boton-secundario" type="button" onClick={() => onEditar(mascota)}>
          {t('pacientes.editarBoton')}
        </button>
        <button className="boton boton-peligro" type="button" onClick={manejarAlta}>
          {t('pacientes.alta')}
        </button>
      </div>
    </li>
  )
}

export default TarjetaPaciente