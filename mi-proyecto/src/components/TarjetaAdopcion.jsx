function TarjetaAdopcion({ mascota, onAdoptar }) {
  function manejarAdopcion() {
    if (window.confirm(`¿Quieres adoptar a ${mascota.nombre}?`)) {
      onAdoptar(mascota)
    }
  }

  return (
    <li className="tarjeta tarjeta-adopcion">
      <div className="tarjeta-cabecera">
        <h3 className="tarjeta-nombre">{mascota.nombre}</h3>
        <span className="tarjeta-especie">{mascota.especie}</span>
      </div>

      <dl className="tarjeta-datos">
        <div>
          <dt>Edad</dt>
          <dd>{mascota.edad}</dd>
        </div>
        <div>
          <dt>Descripción</dt>
          <dd>{mascota.descripcion}</dd>
        </div>
      </dl>

      {mascota.adoptada ? (
        <p className="adopcion-estado">Adoptada el {mascota.fecha}</p>
      ) : (
        <button className="boton boton-primario" type="button" onClick={manejarAdopcion}>
          Adoptar
        </button>
      )}
    </li>
  )
}

export default TarjetaAdopcion