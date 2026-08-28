import { useState } from 'react'
import { iniciales } from '../js/formatos'
import FormularioCita from './FormularioCita'
import HistorialMedico from './HistorialMedico'
import { useLang } from '../context/LanguageContext'
import { recordatorioCita, estadoVacuna } from '../js/salud'

function TarjetaMascota({ mascota, onAgregarCita, onRecordar, onActualizar }) {
  const { t, lang } = useLang()
  const [seccion, setSeccion] = useState(null)
  const citas = mascota.citas || []
  const citasOrdenadas = [...citas].sort((a, b) => b.fecha.localeCompare(a.fecha))
  const pendientes = (mascota.vacunas || []).filter(
    (v) => estadoVacuna(v) === 'vencida' || estadoVacuna(v) === 'proxima',
  ).length

  function alternar(nuevaSeccion) {
    setSeccion((previa) => (previa === nuevaSeccion ? null : nuevaSeccion))
  }

  function abrirWhatsApp(cita) {
    window.open(recordatorioCita(mascota, cita, lang), '_blank')
    onRecordar(mascota, cita)
  }

  return (
    <li className="mascota-tarjeta">
      <div className="mascota-foto">{iniciales(mascota.nombre)}</div>
      <h3 className="mascota-nombre">{mascota.nombre}</h3>
      <p className="mascota-detalle">
        {mascota.especie} ·{' '}
        {citas.length === 1
          ? `1 ${t('pacientes.cita')}`
          : `${citas.length} ${t('pacientes.citas')}`}
      </p>
      {pendientes > 0 && (
        <span className="mascota-alerta">{t('historial.alertas', { n: pendientes })}</span>
      )}

      <div className="mascota-botones">
        <button className="boton boton-primario" type="button" onClick={() => alternar('citas')}>
          {t('mascotas.records')}
        </button>
        <button className="boton boton-contorno" type="button" onClick={() => alternar('historial')}>
          {t('historial.titulo')}
        </button>
        <button className="boton boton-contorno" type="button" onClick={() => alternar('formulario')}>
          {t('mascotas.book')}
        </button>
      </div>

      {seccion === 'citas' && (
        <div className="mascota-expandido">
          {citasOrdenadas.length === 0 ? (
            <p className="cita-sintomas">{t('mascotas.sinCitas')}</p>
          ) : (
            <ul className="mascota-citas">
              {citasOrdenadas.map((cita) => (
                <li key={cita.id} className="mascota-cita">
                  <span>
                    <strong>{cita.fecha}</strong> · {cita.sintomas}
                  </span>
                  <button
                    className="boton boton-recordar"
                    type="button"
                    onClick={() => abrirWhatsApp(cita)}
                  >
                    {t('mascotas.recordar')}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {seccion === 'historial' && (
        <div className="mascota-expandido">
          <HistorialMedico mascota={mascota} onActualizar={onActualizar} />
        </div>
      )}

      {seccion === 'formulario' && (
        <div className="mascota-expandido">
          <FormularioCita
            mascota={mascota}
            onCancelar={() => setSeccion(null)}
            onAgregarCita={(datos) => {
              onAgregarCita(mascota.id, datos)
              setSeccion(null)
            }}
          />
        </div>
      )}
    </li>
  )
}

export default TarjetaMascota
