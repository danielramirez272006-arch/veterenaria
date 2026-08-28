import { useLang } from '../context/LanguageContext'

function TarjetaProducto({ producto, onAgregarCarrito }) {
  const { t } = useLang()

  return (
    <li className="producto">
      {producto.imagen && (
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="tarjeta-imagen"
        />
      )}
      <div className="producto-contenido">
        <div className="producto-cabecera">
          <span className="tarjeta-especie">{producto.categoria}</span>
        </div>
        <h3 className="producto-nombre">{producto.nombre}</h3>
        <p className="producto-descripcion">{producto.descripcion}</p>
        <span className="producto-precio">{producto.precio} pts</span>
        <button
          className="boton boton-secundario"
          type="button"
          onClick={() => onAgregarCarrito(producto)}
        >
          {t('tienda.agregarAlCarrito')}
        </button>
      </div>
    </li>
  )
}

export default TarjetaProducto