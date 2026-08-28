import { useState } from 'react'
import FormularioCita from './FormularioCita'
import HistorialMedico from './HistorialMedico'
import { useLang } from '../context/LanguageContext'
import { recordatorioCita, estadoVacuna } from '../js/salud'

function TarjetaPaciente({ mascota, onEliminar, onEditar, onAgregarCita, onRecordar, onActualizar }) {
  const { t, lang } = useLang()
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false)
  const [mostrandoHistorial, setMostrandoHistorial] = useState(false)

  const citas = [...mascota.citas].sort((a, b) => a.fecha.localeCompare(b.fecha))
  const vacunasVencidas = (mascota.vacunas || []).filter(
    (v) => estadoVacuna(v) === 'vencida' || estadoVacuna(v) === 'proxima',
  )
  const desparasitacionesPendientes = (mascota.desparasitaciones || []).filter(
    (d) => estadoVacuna(d) === 'vencida' || estadoVacuna(d) === 'proxima',
  )

  function manejarAlta() {
    if (window.confirm(t('avisos.confirmarAlta', { nombre: mascota.nombre }))) {
      onEliminar(mascota.id)
    }
  }

  function abrirWhatsApp(masc, cita) {
    window.open(recordatorioCita(masc, cita, lang), '_blank')
    onRecordar(masc, cita)
  }

  return (
    <li className="tarjeta tarjeta-paciente">
      <div className="tarjeta-cabecera">
        <h3 className="tarjeta-nombre">{mascota.nombre}</h3>
        <span className="tarjeta-especie">{mascota.especie}</span>
      </div>

      {(vacunasVencidas.length > 0 || desparasitacionesPendientes.length > 0) && (
        <div className="alerta-vacunas" role="status">
          <strong>{t('historial.recordatorios')}</strong>{' '}
          {vacunasVencidas.length > 0 && `${t('historial.vacunas')}: ${vacunasVencidas.length}`}
          {vacunasVencidas.length > 0 && desparasitacionesPendientes.length > 0 && ' · '}
          {desparasitacionesPendientes.length > 0 &&
            `${t('historial.desparasitaciones')}: ${desparasitacionesPendientes.length}`}
        </div>
      )}

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
                onClick={() => abrirWhatsApp(mascota, cita)}
              >
                {t('mascotas.recordar')}
              </button>
            </div>
            <p className="cita-sintomas">{cita.sintomas}</p>
            {cita.notas && <p className="cita-notas">{t('pacientes.nota')} {cita.notas}</p>}
          </li>
        ))}
      </ul>

      <div className="tarjeta-botones">
        <button
          className="boton boton-secundario"
          type="button"
          onClick={() => setMostrandoHistorial((previo) => !previo)}
        >
          {mostrandoHistorial ? t('historial.ocultar') : t('historial.titulo')}
        </button>
        {!mostrandoFormulario && (
          <button
            className="boton boton-secundario"
            type="button"
            onClick={() => setMostrandoFormulario(true)}
          >
            {t('pacientes.agregarCita')}
          </button>
        )}
      </div>

      {mostrandoHistorial && (
        <HistorialMedico mascota={mascota} onActualizar={onActualizar} />
      )}

      {mostrandoFormulario && (
        <FormularioCita
          mascota={mascota}
          onAgregarCita={(cita) => {
            onAgregarCita(mascota.id, cita)
            setMostrandoFormulario(false)
          }}
          onCancelar={() => setMostrandoFormulario(false)}
        />
      )}

      <div className="tarjeta-botones tarjeta-botones-secundarios">
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
