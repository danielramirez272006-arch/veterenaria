import { useState } from 'react'
import { iniciales } from '../js/formatos'

const ENLACES = [
  { id: 'home', etiqueta: 'Home' },
  { id: 'services', etiqueta: 'Services' },
  { id: 'adopcion', etiqueta: 'Adoption' },
  { id: 'shop', etiqueta: 'Shop' },
  { id: 'rewards', etiqueta: 'Rewards' },
]

function Navbar({ vista, onCambiarVista, usuario, onSalir, onReservar }) {
  const [abierto, setAbierto] = useState(false)

  function navegar(id) {
    onCambiarVista(id)
    setAbierto(false)
  }

  function enlaceClase(id) {
    return `navbar-enlace ${vista === id ? 'navbar-enlace-activo' : ''}`
  }

  const enlaces = ENLACES.map((enlace) => (
    <button
      key={enlace.id}
      className={enlaceClase(enlace.id)}
      type="button"
      onClick={() => navegar(enlace.id)}
    >
      {enlace.etiqueta}
    </button>
  ))

  return (
    <nav className="navbar">
      <div className="navbar-interior">
        <button className="navbar-marca" type="button" onClick={() => navegar('home')}>
          <span className="navbar-marca-nombre">VitalPet</span>
          <span className="navbar-marca-sub">Health &amp; Care</span>
        </button>

        <ul className="navbar-enlaces">
          {enlaces.map((enlace, index) => (
            <li key={index}>{enlace}</li>
          ))}
        </ul>

        <div className="navbar-acciones">
          <span className="navbar-avatar">{iniciales(usuario.nombre)}</span>
          <button className="navbar-login" type="button" onClick={onSalir}>
            Log out
          </button>
          <button className="boton boton-primario" type="button" onClick={onReservar}>
            Book Appointment
          </button>
        </div>

        <button
          className="navbar-hamburguesa"
          type="button"
          aria-label="Abrir menú"
          onClick={() => setAbierto((previo) => !previo)}
        >
          {abierto ? '×' : '☰'}
        </button>
      </div>

      {abierto && (
        <div className="navbar-movil navbar-movil-abierto">
          {ENLACES.map((enlace) => (
            <button
              key={enlace.id}
              className={enlaceClase(enlace.id)}
              type="button"
              onClick={() => navegar(enlace.id)}
            >
              {enlace.etiqueta}
            </button>
          ))}
          <button className="navbar-enlace" type="button" onClick={() => { onReservar(); setAbierto(false) }}>
            Book Appointment
          </button>
          <button className="navbar-login" type="button" onClick={onSalir}>
            Log out
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar