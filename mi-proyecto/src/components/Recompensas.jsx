import { RECOMPENSAS } from '../js/recompensas'
import { useLang } from '../context/LanguageContext'

function Recompensas({ usuario, onCanjear }) {
  const { t } = useLang()

  return (
    <section className="seccion-recompensas">
      <div className="recompensas-cabecera">
        <h2>{t('recompensas.titulo')}</h2>
        <p className="recompensas-saldo">
          {t('recompensas.saldo')} <strong>{usuario.puntos} pts</strong>
        </p>
      </div>

      <ul className="recompensas-lista">
        {RECOMPENSAS.map((recompensa) => {
          const disponible = usuario.puntos >= recompensa.costo
          return (
            <li key={recompensa.id} className="recompensa">
              <div className="recompensa-info">
                <h3>{recompensa.nombre}</h3>
                <p>{recompensa.descripcion}</p>
              </div>
              <span className="recompensa-costo">{recompensa.costo} pts</span>
              <button
                className="boton boton-secundario"
                type="button"
                disabled={!disponible}
                onClick={() => onCanjear(recompensa)}
              >
                {disponible ? t('recompensas.canjear') : t('recompensas.sinPuntos')}
              </button>
            </li>
          )
        })}
      </ul>

      {usuario.recompensasCanjeadas.length > 0 && (
        <p className="recompensas-historial">
          {t('recompensas.historial', {
            n: usuario.recompensasCanjeadas.length,
            recompensa:
              usuario.recompensasCanjeadas.length === 1
                ? t('recompensas.recompensa')
                : t('recompensas.recompensas'),
          })}
        </p>
      )}
    </section>
  )
}

export default Recompensas