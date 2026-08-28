import { useState } from 'react'
import { iniciarSesion, registrarUsuario } from '../js/auth'
import { useLang } from '../context/LanguageContext'

const ERROR_AUTH = {
  'El usuario o la contraseña son incorrectos.': 'errores.usuarioIncorrecto',
  'Ese nombre de usuario ya está registrado.': 'errores.usuarioRegistrado',
  'La contraseña debe tener al menos 6 caracteres.': 'errores.passwordCorta',
}

function Login({ onAutenticado }) {
  const { t } = useLang()
  const [modo, setModo] = useState('ingreso')
  const [formulario, setFormulario] = useState({ usuario: '', nombre: '', password: '' })
  const [error, setError] = useState('')

  function manejarCambio(evento) {
    const { name, value } = evento.target
    setFormulario((previo) => ({ ...previo, [name]: value }))
    if (error) setError('')
  }

  function manejarModo(nuevoModo) {
    setModo(nuevoModo)
    setError('')
  }

  function manejarEnvio(evento) {
    evento.preventDefault()
    const usuario = formulario.usuario.trim()

    if (!usuario || !formulario.password) {
      setError(t('errores.camposObligatorios'))
      return
    }

    if (modo === 'registro') {
      if (!formulario.nombre.trim()) {
        setError(t('errores.nombreObligatorio'))
        return
      }
      const resultado = registrarUsuario({
        usuario,
        nombre: formulario.nombre,
        password: formulario.password,
      })
      if (!resultado.ok) {
        setError(traducirError(resultado.error))
        return
      }
      onAutenticado(resultado.usuario)
    } else {
      const resultado = iniciarSesion(usuario, formulario.password)
      if (!resultado.ok) {
        setError(traducirError(resultado.error))
        return
      }
      onAutenticado(resultado.usuario)
    }
  }

  function traducirError(mensaje) {
    if (typeof mensaje !== 'string') return mensaje
    const clave = ERROR_AUTH[mensaje]
    return clave ? t(clave) : mensaje
  }

  return (
    <main className="login">
      <div className="login-tarjeta">
        <h1 className="login-titulo">
          {t('login.titulo')}
          <span className="login-titulo-brand">{t('login.subtitulo')}</span>
        </h1>
        <p className="login-subtitulo">{t('login.descripcion')}</p>

        <div className="login-pestanas">
          <button
            className={modo === 'ingreso' ? 'pestana pestana-activa' : 'pestana'}
            type="button"
            onClick={() => manejarModo('ingreso')}
          >
            {t('login.iniciarSesion')}
          </button>
          <button
            className={modo === 'registro' ? 'pestana pestana-activa' : 'pestana'}
            type="button"
            onClick={() => manejarModo('registro')}
          >
            {t('login.crearCuenta')}
          </button>
        </div>

        <form className="login-formulario" onSubmit={manejarEnvio} noValidate>
          {modo === 'registro' && (
            <div className="campo">
              <label htmlFor="nombre">{t('login.nombre')}</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder={t('login.nombrePlaceholder')}
                value={formulario.nombre}
                onChange={manejarCambio}
              />
            </div>
          )}

          <div className="campo">
            <label htmlFor="usuario">{t('login.usuario')}</label>
            <input
              id="usuario"
              name="usuario"
              type="text"
              placeholder={t('login.usuarioPlaceholder')}
              value={formulario.usuario}
              onChange={manejarCambio}
            />
          </div>

          <div className="campo">
            <label htmlFor="password">{t('login.password')}</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder={t('login.passwordPlaceholder')}
              value={formulario.password}
              onChange={manejarCambio}
            />
          </div>

          {error && <span className="error" role="alert">{error}</span>}

          <button className="boton boton-primario" type="submit">
            {modo === 'ingreso' ? t('login.entrar') : t('login.registrarme')}
          </button>
        </form>
      </div>
    </main>
  )
}

export default Login