import { RECOMPENSAS } from '../js/recompensas'

function Recompensas({ usuario, onCanjear }) {
  return (
    <section className="seccion-recompensas">
      <div className="recompensas-cabecera">
        <h2>Recompensas por fidelidad</h2>
        <p className="recompensas-saldo">
          Saldo disponible: <strong>{usuario.puntos} pts</strong>
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
                {disponible ? 'Canjear' : 'Sin puntos'}
              </button>
            </li>
          )
        })}
      </ul>

      {usuario.recompensasCanjeadas.length > 0 && (
        <p className="recompensas-historial">
          Has canjeado {usuario.recompensasCanjeadas.length}{' '}
          {usuario.recompensasCanjeadas.length === 1 ? 'recompensa' : 'recompensas'} hasta ahora.
        </p>
      )}
    </section>
  )
}

export default Recompensas