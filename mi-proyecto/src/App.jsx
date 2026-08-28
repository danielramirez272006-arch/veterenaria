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
  comprarCarrito,
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
import { cargarCarrito, guardarCarrito } from './js/tienda'
import { useLang } from './context/LanguageContext'
import './css/style.css'

const ERROR_AUTH = {
  'Tu sesión no es válida.': 'avisos.sesionInvalida',
  'No tienes puntos suficientes para esta recompensa.': 'avisos.sinPuntosRecompensa',
  'No tienes puntos suficientes para esta compra.': 'avisos.sinPuntosCompra',
  'Tu carrito está vacío.': 'avisos.carritoVacio',
  'Esta mascota ya no está disponible.': 'avisos.mascotaNoDisponible',
  'Esta mascota ya fue adoptada.': 'avisos.mascotaYaAdoptada',
}

function App() {
  const { t } = useLang()
  const sesionInicial = obtenerSesion()
  const [usuario, setUsuario] = useState(sesionInicial)
  const [pacientes, setPacientes] = useState(() => {
    return sesionInicial ? ordenarPorFecha(cargarPacientes(sesionInicial.id)) : []
  })
  const [catalogo, setCatalogo] = useState(() => cargarCatalogo())
  const [vista, setVista] = useState('home')
  const [aviso, setAviso] = useState(null)
  const [carrito, setCarrito] = useState(() =>
    cargarCarrito(sesionInicial ? sesionInicial.usuario : null),
  )

  useEffect(() => {
    if (usuario) guardarPacientes(usuario.id, pacientes)
  }, [usuario, pacientes])

  useEffect(() => {
    guardarCatalogo(catalogo)
  }, [catalogo])

  useEffect(() => {
    if (usuario) guardarCarrito(usuario.usuario, carrito)
  }, [usuario, carrito])

  function traducirError(mensaje) {
    if (typeof mensaje !== 'string') return mensaje
    const clave = ERROR_AUTH[mensaje]
    return clave ? t(clave) : mensaje
  }

  function mostrarAviso(texto, tipo = 'exito') {
    setAviso({ texto, tipo })
  }

  function manejarAutenticacion(nuevoUsuario) {
    setUsuario(nuevoUsuario)
    setPacientes(ordenarPorFecha(cargarPacientes(nuevoUsuario.id)))
    setCarrito(cargarCarrito(nuevoUsuario.usuario))
    setVista('home')
  }

  function manejarSalida() {
    cerrarSesion()
    setUsuario(null)
    setPacientes([])
    setCarrito([])
  }

  function agregarPaciente(datos) {
    setPacientes((previos) => ordenarPorFecha(crearMascota(previos, datos)))
    const actualizado = sumarPuntos(PUNTOS_POR_CITA, `Registro de ${datos.nombre}`)
    if (actualizado) setUsuario(actualizado)
    mostrarAviso(t('avisos.registroExitoso', { nombre: datos.nombre, puntos: PUNTOS_POR_CITA }))
  }

  function actualizarPaciente(mascota) {
    setPacientes((previos) => ordenarPorFecha(actualizarMascota(previos, mascota)))
    mostrarAviso(t('avisos.datosActualizados', { nombre: mascota.nombre }))
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
    mostrarAviso(t('avisos.citaAgregada', { fecha: datos.fecha, puntos: PUNTOS_POR_CITA }))
  }

  function eliminarPaciente(id) {
    setPacientes((previos) => previos.filter((mascota) => mascota.id !== id))
  }

  function recordarCita(mascota, cita) {
    mostrarAviso(
      t('avisos.recordatorio', {
        fecha: cita.fecha,
        dueno: mascota.propietario,
        telefono: mascota.telefono,
      }),
    )
  }

  function manejarCanje(recompensa) {
    const resultado = canjearRecompensa(recompensa)
    if (resultado.ok) {
      setUsuario(resultado.usuario)
      mostrarAviso(t('avisos.canjeExitoso', { nombre: resultado.nombre }))
    } else {
      mostrarAviso(traducirError(resultado.error), 'error')
    }
  }

  function manejarAdopcion(mascota) {
    const resultado = registrarAdopcion(catalogo, mascota.id, usuario)
    if (!resultado.ok) {
      mostrarAviso(traducirError(resultado.error), 'error')
      return
    }
    setCatalogo(resultado.catalogo)
    const actualizado = sumarPuntos(PUNTOS_POR_ADOPCION, `Adopción de ${mascota.nombre}`)
    if (actualizado) setUsuario(actualizado)
    mostrarAviso(
      t('avisos.adopcionExitosa', { nombre: mascota.nombre, puntos: PUNTOS_POR_ADOPCION }),
    )
  }

  function agregarAlCarrito(producto) {
    setCarrito((previos) => {
      const existente = previos.find((item) => item.producto.id === producto.id)
      if (existente) {
        return previos.map((item) =>
          item.producto.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        )
      }
      return [...previos, { producto, cantidad: 1 }]
    })
  }

  function quitarDelCarrito(productoId) {
    setCarrito((previos) =>
      previos
        .map((item) =>
          item.producto.id === productoId ? { ...item, cantidad: item.cantidad - 1 } : item,
        )
        .filter((item) => item.cantidad > 0),
    )
  }

  function vaciarCarrito() {
    setCarrito([])
  }

  function manejarCompraCarrito(items) {
    const resultado = comprarCarrito(items)
    if (resultado.ok) {
      setUsuario(resultado.usuario)
      setCarrito([])
      mostrarAviso(
        t('avisos.compraCarritoExitosa', { cantidad: resultado.cantidad, total: resultado.total }),
      )
    } else {
      mostrarAviso(traducirError(resultado.error), 'error')
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
        <TiendaPage
          usuario={usuario}
          carrito={carrito}
          onAgregarCarrito={agregarAlCarrito}
          onQuitarCarrito={quitarDelCarrito}
          onVaciarCarrito={vaciarCarrito}
          onComprarCarrito={manejarCompraCarrito}
        />
      ) : (
        <main className="contenedor">
          <header className="encabezado">
            <h1>Rewards</h1>
            <p className="encabezado-subtitulo">
              {t('recompensas.titulo')}
            </p>
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