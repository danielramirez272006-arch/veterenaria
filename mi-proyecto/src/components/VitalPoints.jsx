import { useLang } from '../context/LanguageContext'
import { nivelFidelidad, progresoNivel, puntosParaSubir } from '../js/salud'

const BENEFICIOS = {
  bronce: 'beneficios.bronce',
  plata: 'beneficios.plata',
  oro: 'beneficios.oro',
}

function VitalPoints({ puntos, onCanjear }) {
  const { t } = useLang()
  const nivel = nivelFidelidad(puntos)
  const progreso = progresoNivel(puntos)
  const faltan = puntosParaSubir(puntos)
  const siguiente = nivel === 'oro' ? null : nivel === 'plata' ? 'oro' : 'plata'

  return (
    <section className="tarjeta-puntos">
      <div className="puntos-nivel">
        <span className={`badge-nivel nivel-${nivel}`}>{t(`puntos.${nivel}`)}</span>
        {siguiente && <span className="puntos-faltan">{t('puntos.faltanNivel', { n: faltan })}</span>}
      </div>
      <h2>{t('puntos.vitalPoints')}</h2>
      <p className="puntos-saldo">
        {puntos}
        <span>{t('puntos.disponibles')}</span>
      </p>

      <div className="lealtad">
        <div className="lealtad-cabecera">
          <span>{t('puntos.bronce')}</span>
          <span>{t('puntos.plata')}</span>
          <span>{t('puntos.oro')}</span>
        </div>
        <div className="lealtad-barra">
          <div className="lealtad-progreso" style={{ width: `${progreso}%` }} />
        </div>
        <p className="lealtad-texto">
          {faltan > 0
            ? t('puntos.faltanGold', { n: faltan })
            : t('puntos.llegoGold')}
        </p>
      </div>

      <div className="puntos-beneficios">
        <h3>{t('beneficios.titulo')}</h3>
        <ul className="beneficios-lista">
          <li>{t(BENEFICIOS[nivel])}</li>
          <li>{t('beneficios.todos')}</li>
        </ul>
      </div>

      <button className="boton boton-canje" type="button" onClick={onCanjear}>
        {t('puntos.canjear')}
      </button>
    </section>
  )
}

export default VitalPoints
