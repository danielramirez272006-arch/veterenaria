import { useState } from 'react'
import TarjetaProducto from '../src/components/TarjetaProducto'
import { obtenerCategorias, obtenerProductos } from '../src/js/tienda'

function TiendaPage({ usuario, onComprar }) {
  const [categoria, setCategoria] = useState('Todas')
  const productos = obtenerProductos()
  const categorias = ['Todas', ...obtenerCategorias()]
  const filtrados =
    categoria === 'Todas'
      ? productos
      : productos.filter((producto) => producto.categoria === categoria)
  const compras = usuario.compras || []

  return (
    <main className="contenedor">
      <header className="encabezado">
        <h1>Tienda mascotas</h1>
        <p className="encabezado-subtitulo">
          Compra comida, juguetes y accesorios con tus puntos acumulados.
        </p>
      </header>

      <div className="tienda-categorias">
        {categorias.map((item) => (
          <button
            key={item}
            className={categoria === item ? 'chip chip-activa' : 'chip'}
            type="button"
            onClick={() => setCategoria(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="seccion-adopciones">
        <h2>Catálogo</h2>
        {filtrados.length === 0 ? (
          <div className="sin-pacientes">
            <p>No hay productos en esta categoría.</p>
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
        <h2>Mis compras</h2>
        {compras.length === 0 ? (
          <div className="sin-pacientes">
            <p>Aún no has hecho ninguna compra.</p>
            <p>Registra citas y adopta mascotas para ganar puntos y usarlos aquí.</p>
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
                <p className="adopcion-estado">Comprado el {compra.fecha}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default TiendaPage