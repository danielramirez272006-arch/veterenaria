import { useState } from 'react'
import { iniciales } from '../js/formatos'
import FormularioCita from './FormularioCita'
import { useLang } from '../context/LanguageContext'

function TarjetaMascota({ mascota, onAgregarCita, onRecordar }) {
  const { t } = useLang()
  const [seccion, setSeccion] = useState(null)
  const citas = mascota.citas || []
  const citasOrdenadas = [...citas].sort((a, b) => b.fecha.localeCompare(a.fecha))

  function alternar(nuevaSeccion) {
    setSeccion((previa) => (previa === nuevaSeccion ? null : nuevaSeccion))
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

      <div className="mascota-botones">
        <button className="boton boton-primario" type="button" onClick={() => alternar('citas')}>
          {t('mascotas.records')}
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
                    onClick={() => onRecordar(mascota, cita)}
                  >
                    {t('mascotas.recordar')}
                  </button>
                </li>
              ))}
            </ul>
          )}
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