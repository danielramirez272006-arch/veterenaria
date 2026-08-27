function ActividadReciente({ movimientos, onVerHistorial }) {
  const registros = (movimientos || []).slice(0, 4)

  return (
    <section className="tarjeta-actividad">
      <h2>Recent Activity</h2>
      {registros.length === 0 ? (
        <p className="actividad-vacia">Tu actividad aparecerá aquí cuando registres citas.</p>
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
          View All History
        </button>
      )}
    </section>
  )
}

export default ActividadReciente