import { useState } from 'react'
import { fechaLocalISO, hoyLocalISO } from '../js/fechas'
import { useLang } from '../context/LanguageContext'

const DIAS_ES = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
const DIAS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function inicioDeSemana(fecha) {
  const dia = fecha.getDay()
  const diffs = (dia === 0 ? -6 : 1) - dia
  const inicio = new Date(fecha)
  inicio.setDate(inicio.getDate() + diffs)
  inicio.setHours(0, 0, 0, 0)
  return inicio
}

function diasDeSemana(inicio) {
  return Array.from({ length: 7 }, (_, index) => {
    const dia = new Date(inicio)
    dia.setDate(inicio.getDate() + index)
    return dia
  })
}

function CalendarioCitas({ citas }) {
  const { t, lang } = useLang()
  const [offset, setOffset] = useState(0)
  const hoy = hoyLocalISO()
  const inicio = inicioDeSemana(new Date())
  inicio.setDate(inicio.getDate() + offset * 7)
  const dias = diasDeSemana(inicio)
  const DIAS = lang === 'es' ? DIAS_ES : DIAS_EN

  function moverSemana(nuevaOffset) {
    setOffset(nuevaOffset)
  }

  return (
    <section className="calendario">
      <div className="calendario-cabecera">
        <h2>{t('calendario.titulo')}</h2>
        <div className="calendario-controles">
          <button className="boton boton-secundario" type="button" onClick={() => moverSemana(0)}>
            {t('calendario.hoy')}
          </button>
          <button className="boton boton-secundario" type="button" onClick={() => moverSemana(offset - 1)}>
            {t('calendario.semanaAnterior')}
          </button>
          <button className="boton boton-secundario" type="button" onClick={() => moverSemana(offset + 1)}>
            {t('calendario.semanaSiguiente')}
          </button>
        </div>
      </div>

      <div className="calendario-semana">
        {dias.map((dia) => {
          const iso = fechaLocalISO(dia)
          const citasDelDia = citas.filter((cita) => cita.fecha === iso)
          return (
            <div
              key={iso}
              className={`calendario-dia ${iso === hoy ? 'calendario-dia-hoy' : ''}`}
            >
              <div className="calendario-dia-cabecera">
                <span className="calendario-dia-nombre">{DIAS[dia.getDay() === 0 ? 6 : dia.getDay() - 1]}</span>
                <span className="calendario-dia-fecha">{iso}</span>
              </div>
              {citasDelDia.length === 0 ? (
                <p className="calendario-vacio">{t('calendario.sinCitas')}</p>
              ) : (
                <ul className="calendario-citas">
                  {citasDelDia.map((cita) => (
                    <li key={`${cita.mascotaId}-${cita.id}`} className="calendario-cita">
                      <span className="calendario-cita-nombre">{cita.nombre}</span>
                      <span className="calendario-cita-especie">{cita.especie}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default CalendarioCitas