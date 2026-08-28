import { useState } from 'react'
import { iniciales } from '../js/formatos'
import { useLang } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'

const ENLACES = [
  { id: 'home', etiqueta: 'nav.home' },
  { id: 'services', etiqueta: 'nav.services' },
  { id: 'adopcion', etiqueta: 'nav.adopcion' },
  { id: 'shop', etiqueta: 'nav.shop' },
  { id: 'rewards', etiqueta: 'nav.rewards' },
]

function Navbar({ vista, onCambiarVista, usuario, onSalir, onReservar }) {
  const { t, toggleLang, lang } = useLang()
  const { theme, toggleTheme } = useTheme()
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
      {t(enlace.etiqueta)}
    </button>
  ))

  const toggles = (
    <>
      <button
        className="navbar-toggle"
        type="button"
        aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        onClick={toggleTheme}
      >
        {theme === 'dark' ? '☀' : '☾'}
      </button>
      <button
        className="navbar-toggle"
        type="button"
        aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a español'}
        title={lang === 'es' ? 'English' : 'Español'}
        onClick={toggleLang}
      >
        {lang === 'es' ? 'EN' : 'ES'}
      </button>
    </>
  )

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
          {toggles}
          <button className="navbar-login" type="button" onClick={onSalir}>
            {t('nav.logout')}
          </button>
          <button className="boton boton-primario" type="button" onClick={onReservar}>
            {t('nav.bookAppointment')}
          </button>
        </div>

        <button
          className="navbar-hamburguesa"
          type="button"
          aria-label={t('nav.home')}
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
              {t(enlace.etiqueta)}
            </button>
          ))}
          <div className="navbar-movil-acciones">
            {toggles}
            <button className="navbar-enlace" type="button" onClick={() => { onReservar(); setAbierto(false) }}>
              {t('nav.bookAppointment')}
            </button>
            <button className="navbar-login" type="button" onClick={onSalir}>
              {t('nav.logout')}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar