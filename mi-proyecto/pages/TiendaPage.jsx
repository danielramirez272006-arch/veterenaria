import { useState } from 'react'
import TarjetaProducto from '../src/components/TarjetaProducto'
import ModalVentana from '../src/components/ModalVentana'
import { obtenerCategorias, obtenerProductos, totalCarrito } from '../src/js/tienda'
import { useLang } from '../src/context/LanguageContext'

function TiendaPage({
  usuario,
  carrito,
  onAgregarCarrito,
  onQuitarCarrito,
  onVaciarCarrito,
  onComprarCarrito,
}) {
  const { t } = useLang()
  const [categoria, setCategoria] = useState('')
  const [carritoAbierto, setCarritoAbierto] = useState(false)
  const productos = obtenerProductos()
  const todas = t('tienda.todas')
  const categorias = [todas, ...obtenerCategorias()]
  const categoriaSeleccionada = categoria || todas
  const filtrados =
    categoriaSeleccionada === todas
      ? productos
      : productos.filter((producto) => producto.categoria === categoriaSeleccionada)
  const compras = usuario.compras || []
  const total = totalCarrito(carrito)
  const cantidadTotal = carrito.reduce((suma, item) => suma + item.cantidad, 0)
  const sinSaldo = total > usuario.puntos

  return (
    <main className="contenedor">
      <header className="encabezado">
        <h1>{t('tienda.titulo')}</h1>
        <p className="encabezado-subtitulo">
          {t('tienda.subtitulo')}
        </p>
      </header>

      <div className="tienda-categorias">
        {categorias.map((item) => (
          <button
            key={item}
            className={categoriaSeleccionada === item ? 'chip chip-activa' : 'chip'}
            type="button"
            onClick={() => setCategoria(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="seccion-adopciones">
        <h2>{t('tienda.catalogo')}</h2>
        {filtrados.length === 0 ? (
          <div className="sin-pacientes">
            <p>{t('tienda.sinProductos')}</p>
          </div>
        ) : (
          <ul className="tienda-lista">
            {filtrados.map((producto) => (
              <TarjetaProducto
                key={producto.id}
                producto={producto}
                onAgregarCarrito={onAgregarCarrito}
              />
            ))}
          </ul>
        )}
      </section>

      <section className="seccion-adopciones">
        <h2>{t('tienda.misCompras')}</h2>
        {compras.length === 0 ? (
          <div className="sin-pacientes">
            <p>{t('tienda.sinCompras')}</p>
            <p>{t('tienda.sinComprasDetalle')}</p>
          </div>
        ) : (
          <ul className="tienda-lista">
            {compras.map((compra) => (
              <li key={`${compra.id}-${compra.fecha}`} className="producto producto-comprado">
                {compra.imagen && (
                  <img src={compra.imagen} alt={compra.nombre} className="tarjeta-imagen" />
                )}
                <div className="producto-contenido">
                  <div className="producto-cabecera">
                    <span className="tarjeta-especie">{compra.categoria}</span>
                  </div>
                  <h3 className="producto-nombre">{compra.nombre}</h3>
                  <p className="producto-descripcion">{compra.descripcion}</p>
                  <p className="adopcion-estado">{t('tienda.compradoEl')} {compra.fecha}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <button
        className="carrito-flotante"
        type="button"
        onClick={() => setCarritoAbierto(true)}
        aria-label={`${t('tienda.carrito')}: ${cantidadTotal} ${t('tienda.articulos')}`}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <span className="carrito-flotante-texto">{t('tienda.carrito')}</span>
        {cantidadTotal > 0 && <span className="carrito-contador">{cantidadTotal}</span>}
      </button>

      {carritoAbierto && (
        <ModalVentana titulo={t('tienda.carrito')} onCerrar={() => setCarritoAbierto(false)}>
          {carrito.length === 0 ? (
            <div className="carrito-vacio">
              <p>{t('tienda.carritoVacio')}</p>
              <p>{t('tienda.carritoDetalle')}</p>
            </div>
          ) : (
            <>
              <ul className="carrito-lista">
                {carrito.map(({ producto, cantidad }) => (
                  <li key={producto.id} className="carrito-item">
                    {producto.imagen && (
                      <img src={producto.imagen} alt={producto.nombre} className="carrito-imagen" />
                    )}
                    <div className="carrito-info">
                      <h3 className="carrito-nombre">{producto.nombre}</h3>
                      <p className="carrito-precio">
                        {producto.precio} {t('common.pts')}
                      </p>
                      <div className="carrito-controles">
                        <button
                          className="carrito-cantidad-boton"
                          type="button"
                          aria-label={t('tienda.cantidad')}
                          onClick={() => onQuitarCarrito(producto.id)}
                        >
                          −
                        </button>
                        <span className="carrito-cantidad">{cantidad}</span>
                        <button
                          className="carrito-cantidad-boton"
                          type="button"
                          aria-label={t('tienda.agregarAlCarrito')}
                          onClick={() => onAgregarCarrito(producto)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <span className="carrito-subtotal">
                      {producto.precio * cantidad} {t('common.pts')}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="carrito-pie">
                <p className="carrito-total">
                  {t('tienda.total')}: <strong>{total} {t('common.pts')}</strong>
                </p>
                {sinSaldo && <p className="carrito-error">{t('tienda.saldoInsuficiente')}</p>}
                <div className="carrito-botones">
                  <button className="boton boton-peligro" type="button" onClick={onVaciarCarrito}>
                    {t('tienda.vaciar')}
                  </button>
                  <button
                    className="boton boton-primario"
                    type="button"
                    disabled={sinSaldo}
                    onClick={() => onComprarCarrito(carrito, total)}
                  >
                    {t('tienda.comprar')}
                  </button>
                </div>
              </div>
            </>
          )}
        </ModalVentana>
      )}
    </main>
  )
}

export default TiendaPage