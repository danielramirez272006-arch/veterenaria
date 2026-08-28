import { useLang } from '../context/LanguageContext'

function TarjetaProducto({ producto, puntos, onComprar }) {
  const { t } = useLang()
  const disponible = puntos >= producto.precio

  function manejarCompra() {
    if (window.confirm(t('avisos.confirmarCompra', { nombre: producto.nombre, precio: producto.precio }))) {
      onComprar(producto)
    }
  }

  return (
    <li className="producto">
      <div className="producto-cabecera">
        <span className="tarjeta-especie">{producto.categoria}</span>
      </div>
      <h3 className="producto-nombre">{producto.nombre}</h3>
      <p className="producto-descripcion">{producto.descripcion}</p>
      <span className="producto-precio">{producto.precio} pts</span>
      <button
        className="boton boton-secundario"
        type="button"
        disabled={!disponible}
        onClick={manejarCompra}
      >
        {disponible ? t('tienda.comprar') : t('tienda.sinSaldo')}
      </button>
    </li>
  )
}

export default TarjetaProducto