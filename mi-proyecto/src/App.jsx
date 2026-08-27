import { useEffect, useState } from 'react'
import AdopcionPage from '../pages/AdopcionPage'
import PacientesPage from '../pages/PacientesPage'
import PerfilPage from '../pages/PerfilPage'
import TiendaPage from '../pages/TiendaPage'
import Aviso from './components/Aviso'
import Footer from './components/Footer'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Recompensas from './components/Recompensas'
import { cargarCatalogo, guardarCatalogo, registrarAdopcion } from './js/adopciones'
import {
  canjearRecompensa,
  cerrarSesion,
  comprarProducto,
  obtenerSesion,
  PUNTOS_POR_ADOPCION,
  PUNTOS_POR_CITA,
  sumarPuntos,
} from './js/auth'
import {
  actualizarMascota,
  agregarCita,
  cargarPacientes,
  crearMascota,
  guardarPacientes,
  ordenarPorFecha,
} from './js/storage'
import './css/style.css'

function App() {
  const [usuario, setUsuario] = useState(() => obtenerSesion())
  const [pacientes, setPacientes] = useState(() => {
    const sesion = obtenerSesion()
    return sesion ? ordenarPorFecha(cargarPacientes(sesion.id)) : []
  })
  const [catalogo, setCatalogo] = useState(() => cargarCatalogo())
  const [vista, setVista] = useState('home')
  const [aviso, setAviso] = useState(null)

  useEffect(() => {
    if (usuario) guardarPacientes(usuario.id, pacientes)
  }, [usuario, pacientes])

  useEffect(() => {
    guardarCatalogo(catalogo)
  }, [catalogo])

  function mostrarAviso(texto, tipo = 'exito') {
    setAviso({ texto, tipo })
  }

  function manejarAutenticacion(nuevoUsuario) {
    setUsuario(nuevoUsuario)
    setPacientes(ordenarPorFecha(cargarPacientes(nuevoUsuario.id)))
    setVista('home')
  }

  function manejarSalida() {
    cerrarSesion()
    setUsuario(null)
    setPacientes([])
  }

  function agregarPaciente(datos) {
    setPacientes((previos) => ordenarPorFecha(crearMascota(previos, datos)))
    const actualizado = sumarPuntos(PUNTOS_POR_CITA, `Registro de ${datos.nombre}`)
    if (actualizado) setUsuario(actualizado)
    mostrarAviso(
      `${datos.nombre} registrado con su primera cita. ¡Ganaste ${PUNTOS_POR_CITA} puntos de recompensa!`,
    )
  }

  function actualizarPaciente(mascota) {
    setPacientes((previos) => ordenarPorFecha(actualizarMascota(previos, mascota)))
    mostrarAviso(`Los datos de ${mascota.nombre} fueron actualizados.`)
  }

  function agregarCitaPaciente(mascotaId, datos) {
    const mascota = pacientes.find((item) => item.id === mascotaId)
    setPacientes((previos) =>
      ordenarPorFecha(
        previos.map((item) => (item.id === mascotaId ? agregarCita(item, datos) : item)),
      ),
    )
    const actualizado = sumarPuntos(
      PUNTOS_POR_CITA,
      `Cita del ${datos.fecha}${mascota ? ` de ${mascota.nombre}` : ''}`,
    )
    if (actualizado) setUsuario(actualizado)
    mostrarAviso(
      `Cita del ${datos.fecha} agregada. ¡Ganaste ${PUNTOS_POR_CITA} puntos de recompensa!`,
    )
  }

  function eliminarPaciente(id) {
    setPacientes((previos) => previos.filter((mascota) => mascota.id !== id))
  }

  function recordarCita(mascota, cita) {
    mostrarAviso(
      `Recordatorio de la cita del ${cita.fecha} enviado por WhatsApp a ${mascota.propietario} (${mascota.telefono}).`,
    )
  }

  function manejarCanje(recompensa) {
    const resultado = canjearRecompensa(recompensa)
    if (resultado.ok) {
      setUsuario(resultado.usuario)
      mostrarAviso(`Recompensa "${resultado.nombre}" canjeada correctamente.`)
    } else {
      mostrarAviso(resultado.error, 'error')
    }
  }

  function manejarAdopcion(mascota) {
    const resultado = registrarAdopcion(catalogo, mascota.id, usuario)
    if (!resultado.ok) {
      mostrarAviso(resultado.error, 'error')
      return
    }
    setCatalogo(resultado.catalogo)
    const actualizado = sumarPuntos(PUNTOS_POR_ADOPCION, `Adopción de ${mascota.nombre}`)
    if (actualizado) setUsuario(actualizado)
    mostrarAviso(
      `¡Adoptaste a ${mascota.nombre}! Ganaste ${PUNTOS_POR_ADOPCION} puntos de recompensa.`,
    )
  }

  function manejarCompra(producto) {
    const resultado = comprarProducto(producto)
    if (resultado.ok) {
      setUsuario(resultado.usuario)
      mostrarAviso(`Compraste "${resultado.nombre}" correctamente.`)
    } else {
      mostrarAviso(resultado.error, 'error')
    }
  }

  if (!usuario) {
    return <Login onAutenticado={manejarAutenticacion} />
  }

  return (
    <>
      <Navbar
        vista={vista}
        onCambiarVista={setVista}
        usuario={usuario}
        onSalir={manejarSalida}
        onReservar={() => setVista('services')}
      />
      {vista === 'home' ? (
        <PerfilPage
          usuario={usuario}
          pacientes={pacientes}
          onAgregar={agregarPaciente}
          onAgregarCita={agregarCitaPaciente}
          onRecordar={recordarCita}
          onCanjear={() => setVista('rewards')}
        />
      ) : vista === 'services' ? (
        <PacientesPage
          pacientes={pacientes}
          onAgregar={agregarPaciente}
          onActualizar={actualizarPaciente}
          onEliminar={eliminarPaciente}
          onAgregarCita={agregarCitaPaciente}
          onRecordar={recordarCita}
        />
      ) : vista === 'adopcion' ? (
        <AdopcionPage usuario={usuario} catalogo={catalogo} onAdoptar={manejarAdopcion} />
      ) : vista === 'shop' ? (
        <TiendaPage usuario={usuario} onComprar={manejarCompra} />
      ) : (
        <main className="contenedor">
          <header className="encabezado">
            <h1>Rewards</h1>
            <p className="encabezado-subtitulo">Canjea tus Vital Points por premios exclusivos.</p>
          </header>
          <Recompensas usuario={usuario} onCanjear={manejarCanje} />
        </main>
      )}
      <Footer onNavegar={setVista} />
      {aviso && <Aviso aviso={aviso} onCerrar={() => setAviso(null)} />}
    </>
  )
}

export default App