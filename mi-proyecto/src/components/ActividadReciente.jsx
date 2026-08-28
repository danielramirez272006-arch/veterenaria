import { useLang } from '../context/LanguageContext'

function ActividadReciente({ movimientos, onVerHistorial }) {
  const { t } = useLang()
  const registros = (movimientos || []).slice(0, 4)

  return (
    <section className="tarjeta-actividad">
      <h2>{t('actividad.titulo')}</h2>
      {registros.length === 0 ? (
        <p className="actividad-vacia">{t('actividad.vacia')}</p>
      ) : (
        <ul className="actividad-lista">
          {registros.map((movimiento) => (
            <li key={movimiento.id} className="actividad-item">
              <div className="actividad-info">
                <span className="actividad-motivo">{movimiento.motivo}</span>
                <span className="actividad-fecha">{movimiento.fecha}</span>
              </div>
              <span
                className={`actividad-monto ${
                  movimiento.puntos >= 0 ? 'actividad-monto-mas' : 'actividad-monto-menos'
                }`}
              >
                {movimiento.puntos > 0 ? '+' : ''}
                {movimiento.puntos} pts
              </span>
            </li>
          ))}
        </ul>
      )}
      {movimientos && movimientos.length > 4 && (
        <button className="actividad-ver-todas" type="button" onClick={onVerHistorial}>
          {t('actividad.verHistorial')}
        </button>
      )}
    </section>
  )
}

export default ActividadReciente