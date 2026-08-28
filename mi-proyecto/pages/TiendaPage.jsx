import { useState } from 'react'
import TarjetaProducto from '../src/components/TarjetaProducto'
import { obtenerCategorias, obtenerProductos } from '../src/js/tienda'
import { useLang } from '../src/context/LanguageContext'

function TiendaPage({ usuario, onComprar }) {
  const { t } = useLang()
  const [categoria, setCategoria] = useState('')
  const productos = obtenerProductos()
  const todas = t('tienda.todas')
  const categorias = [todas, ...obtenerCategorias()]
  const categoriaSeleccionada = categoria || todas
  const filtrados =
    categoriaSeleccionada === todas
      ? productos
      : productos.filter((producto) => producto.categoria === categoriaSeleccionada)
  const compras = usuario.compras || []

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
                puntos={usuario.puntos}
                onComprar={onComprar}
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
                <div className="producto-cabecera">
                  <span className="tarjeta-especie">{compra.categoria}</span>
                </div>
                <h3 className="producto-nombre">{compra.nombre}</h3>
                <p className="producto-descripcion">{compra.descripcion}</p>
                <p className="adopcion-estado">{t('tienda.compradoEl')} {compra.fecha}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default TiendaPage