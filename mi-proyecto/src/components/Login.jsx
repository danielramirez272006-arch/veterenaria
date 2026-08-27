import { useState } from 'react'
import { iniciarSesion, registrarUsuario } from '../js/auth'

function Login({ onAutenticado }) {
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
      setError('Completa todos los campos.')
      return
    }

    if (modo === 'registro') {
      if (!formulario.nombre.trim()) {
        setError('Ingresa tu nombre.')
        return
      }
      const resultado = registrarUsuario({
        usuario,
        nombre: formulario.nombre,
        password: formulario.password,
      })
      if (!resultado.ok) {
        setError(resultado.error)
        return
      }
      onAutenticado(resultado.usuario)
    } else {
      const resultado = iniciarSesion(usuario, formulario.password)
      if (!resultado.ok) {
        setError(resultado.error)
        return
      }
      onAutenticado(resultado.usuario)
    }
  }

  return (
    <main className="login">
      <div className="login-tarjeta">
        <h1 className="login-titulo">
          VitalPet
          <span className="login-titulo-brand">Health &amp; Care</span>
        </h1>
        <p className="login-subtitulo">
          Inicia sesión o crea tu cuenta para registrar citas, adoptar y acumular Vital
          Points.
        </p>

        <div className="login-pestanas">
          <button
            className={modo === 'ingreso' ? 'pestana pestana-activa' : 'pestana'}
            type="button"
            onClick={() => manejarModo('ingreso')}
          >
            Iniciar sesión
          </button>
          <button
            className={modo === 'registro' ? 'pestana pestana-activa' : 'pestana'}
            type="button"
            onClick={() => manejarModo('registro')}
          >
            Crear cuenta
          </button>
        </div>

        <form className="login-formulario" onSubmit={manejarEnvio} noValidate>
          {modo === 'registro' && (
            <div className="campo">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Ej. María Gómez"
                value={formulario.nombre}
                onChange={manejarCambio}
              />
            </div>
          )}

          <div className="campo">
            <label htmlFor="usuario">Nombre de usuario</label>
            <input
              id="usuario"
              name="usuario"
              type="text"
              placeholder="Ej. maria_gomez"
              value={formulario.usuario}
              onChange={manejarCambio}
            />
          </div>

          <div className="campo">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={formulario.password}
              onChange={manejarCambio}
            />
          </div>

          {error && <span className="error" role="alert">{error}</span>}

          <button className="boton boton-primario" type="submit">
            {modo === 'ingreso' ? 'Entrar' : 'Registrarme'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default Login