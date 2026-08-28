import { useLang } from '../context/LanguageContext'
import { formatearDinero } from '../js/formatos'
import { puntosPorCompra } from '../js/auth'

function TarjetaProducto({ producto, onAgregarCarrito, esFavorito, onToggleFavorito }) {
  const { t } = useLang()
  const recompensa = puntosPorCompra(producto.precio)

  return (
    <li className="producto">
      <button
        className={`producto-favorito ${esFavorito ? 'producto-favorito-activo' : ''}`}
        type="button"
        aria-label={
          esFavorito
            ? t('tienda.quitarFavorito')
            : t('tienda.agregarFavorito')
        }
        onClick={() => onToggleFavorito && onToggleFavorito(producto.id)}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={esFavorito ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
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
        <span className="producto-precio">{formatearDinero(producto.precio)}</span>
        <p className="producto-recompensa">{t('tienda.ganasPuntos', { puntos: recompensa })}</p>
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
