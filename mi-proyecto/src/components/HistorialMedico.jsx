import { useState } from 'react'
import { useLang } from '../context/LanguageContext'
import { estadoVacuna, cumpleEsHoy, edadMascota } from '../js/salud'
import { hoyLocalISO } from '../js/fechas'

const VACUNAS_SUGERIDAS = ['Rabia', 'Múltiple', 'Parvovirus', 'Triple felina', 'Leucemia felina']

function HistorialMedico({ mascota, onActualizar }) {
  const { t } = useLang()
  const [vacuna, setVacuna] = useState({ nombre: '', aplicada: hoyLocalISO(), proxima: '' })
  const [desparasitacion, setDesparasitacion] = useState({
    nombre: '',
    aplicada: hoyLocalISO(),
    proxima: '',
  });

  function guardarVacuna(evento) {
    evento.preventDefault()
    if (!vacuna.nombre.trim()) return
    onActualizar({
      ...mascota,
      vacunas: [...(mascota.vacunas || []), { id: Date.now(), ...vacuna, nombre: vacuna.nombre.trim() }],
    })
    setVacuna({ nombre: '', aplicada: hoyLocalISO(), proxima: '' })
  }

  function guardarDesparasitacion(evento) {
    evento.preventDefault()
    if (!desparasitacion.nombre.trim()) return
    onActualizar({
      ...mascota,
      desparasitaciones: [
        ...(mascota.desparasitaciones || []),
        { id: Date.now(), ...desparasitacion, nombre: desparasitacion.nombre.trim() },
      ],
    })
    setDesparasitacion({ nombre: '', aplicada: hoyLocalISO(), proxima: '' })
  }

  const estadoEtiqueta = (estado) => {
    if (estado === 'vencida') return t('historial.vencida')
    if (estado === 'proxima') return t('historial.proxima')
    if (estado === 'al-dia') return t('historial.alDia')
    return ''
  }

  return (
    <div className="historial-medico">
      <p className="historial-datos">
        {mascota.fechaNacimiento &&
          `${t('historial.edad')}: ${edadMascota(mascota.fechaNacimiento)} ${t('historial.anios')}`}
        {mascota.peso && ` · ${t('historial.peso')}: ${mascota.peso} kg`}
        {cumpleEsHoy(mascota.fechaNacimiento) && ` · 🎂 ${t('historial.cumpleHoy')}`}
      </p>
      {mascota.alergias && (
        <p className="historial-alergias">
          <strong>{t('historial.alergias')}:</strong> {mascota.alergias}
        </p>
      )}

      <h4 className="historial-titulo">{t('historial.vacunas')}</h4>
      <ul className="historial-lista">
        {(mascota.vacunas || []).length === 0 && (
          <li className="historial-vacio">{t('historial.sinVacunas')}</li>
        )}
        {(mascota.vacunas || []).map((item) => {
          const estado = estadoVacuna(item)
          return (
            <li key={item.id} className={`vacuna vacuna-${estado}`}>
              <span className="vacuna-nombre">{item.nombre}</span>
              <span className="vacuna-fecha">{item.aplicada}</span>
              {item.proxima && <span className="vacuna-proxima">{item.proxima}</span>}
              {estado !== 'al-dia' && estado !== 'sin-fecha' && (
                <span className="vacuna-estado">{estadoEtiqueta(estado)}</span>
              )}
            </li>
          )
        })}
      </ul>

      <form className="historial-forma" onSubmit={guardarVacuna}>
        <input
          list="vacunas-sugeridas"
          placeholder={t('historial.nombreVacuna')}
          value={vacuna.nombre}
          onChange={(e) => setVacuna((prev) => ({ ...prev, nombre: e.target.value }))}
        />
        <input
          type="date"
          aria-label={t('historial.aplicada')}
          value={vacuna.aplicada}
          onChange={(e) => setVacuna((prev) => ({ ...prev, aplicada: e.target.value }))}
        />
        <input
          type="date"
          aria-label={t('historial.proximaDosis')}
          value={vacuna.proxima}
          onChange={(e) => setVacuna((prev) => ({ ...prev, proxima: e.target.value }))}
        />
        <button className="boton boton-secundario" type="submit">
          {t('historial.agregar')}
        </button>
        <datalist id="vacunas-sugeridas">
          {VACUNAS_SUGERIDAS.map((nombre) => (
            <option key={nombre} value={nombre} />
          ))}
        </datalist>
      </form>

      <h4 className="historial-titulo">{t('historial.desparasitaciones')}</h4>
      <ul className="historial-lista">
        {(mascota.desparasitaciones || []).length === 0 && (
          <li className="historial-vacio">{t('historial.sinDesparasitaciones')}</li>
        )}
        {(mascota.desparasitaciones || []).map((item) => {
          const estado = estadoVacuna(item)
          return (
            <li key={item.id} className={`vacuna vacuna-${estado}`}>
              <span className="vacuna-nombre">{item.nombre}</span>
              <span className="vacuna-fecha">{item.aplicada}</span>
              {item.proxima && <span className="vacuna-proxima">{item.proxima}</span>}
              {estado !== 'al-dia' && estado !== 'sin-fecha' && (
                <span className="vacuna-estado">{estadoEtiqueta(estado)}</span>
              )}
            </li>
          )
        })}
      </ul>

      <form className="historial-forma" onSubmit={guardarDesparasitacion}>
        <input
          placeholder={t('historial.nombreDesparasitacion')}
          value={desparasitacion.nombre}
          onChange={(e) => setDesparasitacion((prev) => ({ ...prev, nombre: e.target.value }))}
        />
        <input
          type="date"
          aria-label={t('historial.aplicada')}
          value={desparasitacion.aplicada}
          onChange={(e) => setDesparasitacion((prev) => ({ ...prev, aplicada: e.target.value }))}
        />
        <input
          type="date"
          aria-label={t('historial.proximaDosis')}
          value={desparasitacion.proxima}
          onChange={(e) => setDesparasitacion((prev) => ({ ...prev, proxima: e.target.value }))}
        />
        <button className="boton boton-secundario" type="submit">
          {t('historial.agregar')}
        </button>
      </form>
    </div>
  )
}

export default HistorialMedico
