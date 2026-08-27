const NIVEL_ORO = 500

function VitalPoints({ puntos, onCanjear }) {
  const progreso = Math.min(100, Math.round((puntos / NIVEL_ORO) * 100))
  const faltan = Math.max(0, NIVEL_ORO - puntos)

  return (
    <section className="tarjeta-puntos">
      <h2>Vital Points</h2>
      <p className="puntos-saldo">
        {puntos}
        <span>Available Points</span>
      </p>

      <div className="lealtad">
        <div className="lealtad-cabecera">
          <span>Silver</span>
          <span>Gold</span>
        </div>
        <div className="lealtad-barra">
          <div className="lealtad-progreso" style={{ width: `${progreso}%` }} />
        </div>
        <p className="lealtad-texto">
          {faltan > 0
            ? `Only ${faltan} points to Gold Tier!`
            : 'You reached Gold Tier. Keep earning points!'}
        </p>
      </div>

      <button className="boton boton-canje" type="button" onClick={onCanjear}>
        Redeem Points
      </button>
    </section>
  )
}

export default VitalPoints