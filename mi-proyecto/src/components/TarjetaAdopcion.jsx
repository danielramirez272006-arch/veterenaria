import { useLang } from '../context/LanguageContext'

function TarjetaAdopcion({ mascota, onAdoptar }) {
  const { t } = useLang()

  function manejarAdopcion() {
    if (window.confirm(t('avisos.confirmarAdopcion', { nombre: mascota.nombre }))) {
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
          <dt>{t('adopcion.edad')}</dt>
          <dd>{mascota.edad}</dd>
        </div>
        <div>
          <dt>{t('adopcion.descripcion')}</dt>
          <dd>{mascota.descripcion}</dd>
        </div>
      </dl>

      {mascota.adoptada ? (
        <p className="adopcion-estado">{t('adopcion.adoptada')} {mascota.fecha}</p>
      ) : (
        <button className="boton boton-primario" type="button" onClick={manejarAdopcion}>
          {t('adopcion.adoptar')}
        </button>
      )}
    </li>
  )
}

export default TarjetaAdopcion