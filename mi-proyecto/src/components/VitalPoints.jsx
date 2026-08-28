import { useLang } from '../context/LanguageContext'

const NIVEL_ORO = 500

function VitalPoints({ puntos, onCanjear }) {
  const { t } = useLang()
  const progreso = Math.min(100, Math.round((puntos / NIVEL_ORO) * 100))
  const faltan = Math.max(0, NIVEL_ORO - puntos)

  return (
    <section className="tarjeta-puntos">
      <h2>{t('puntos.vitalPoints')}</h2>
      <p className="puntos-saldo">
        {puntos}
        <span>{t('puntos.disponibles')}</span>
      </p>

      <div className="lealtad">
        <div className="lealtad-cabecera">
          <span>{t('puntos.plata')}</span>
          <span>{t('puntos.oro')}</span>
        </div>
        <div className="lealtad-barra">
          <div className="lealtad-progreso" style={{ width: `${progreso}%` }} />
        </div>
        <p className="lealtad-texto">
          {faltan > 0 ? t('puntos.faltanGold', { n: faltan }) : t('puntos.llegoGold')}
        </p>
      </div>

      <button className="boton boton-canje" type="button" onClick={onCanjear}>
        {t('puntos.canjear')}
      </button>
    </section>
  )
}

export default VitalPoints