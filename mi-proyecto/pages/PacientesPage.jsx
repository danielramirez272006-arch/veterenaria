import { useMemo, useState } from 'react'
import CalendarioCitas from '../src/components/CalendarioCitas'
import FormularioMascota from '../src/components/FormularioMascota'
import ListaPacientes from '../src/components/ListaPacientes'
import { todasLasCitas } from '../src/js/storage'

function PacientesPage({ pacientes, onAgregar, onActualizar, onEliminar, onAgregarCita, onRecordar }) {
  const [busqueda, setBusqueda] = useState('')
  const [especieFiltro, setEspecieFiltro] = useState('Todas')
  const [mascotaEnEdicion, setMascotaEnEdicion] = useState(null)

  const especies = useMemo(
    () => ['Todas', ...new Set(pacientes.map((mascota) => mascota.especie))],
    [pacientes],
  )

  const filtradas = pacientes.filter((mascota) => {
    const texto = busqueda.trim().toLowerCase()
    const coincideTexto =
      !texto ||
      mascota.nombre.toLowerCase().includes(texto) ||
      mascota.propietario.toLowerCase().includes(texto)
    const coincideEspecie = especieFiltro === 'Todas' || mascota.especie === especieFiltro
    return coincideTexto && coincideEspecie
  })

  const citas = useMemo(() => todasLasCitas(pacientes), [pacientes])
  const totalCitas = citas.length

  function textoContador() {
    const mascotaTexto = pacientes.length === 1 ? 'mascota' : 'mascotas'
    const citaTexto = totalCitas === 1 ? 'cita' : 'citas'
    return `${pacientes.length} ${mascotaTexto} y ${totalCitas} ${citaTexto} en seguimiento`
  }

  return (
    <main className="contenedor">
      <header className="encabezado">
        <h1>Panel de pacientes</h1>
        <p className="encabezado-subtitulo">
          Registra, edita y da seguimiento a las citas de tus mascotas.
        </p>
      </header>

      <section className="panel">
        <section className="panel-panel">
          <h2>{mascotaEnEdicion ? `Editar a ${mascotaEnEdicion.nombre}` : 'Agendar nueva cita'}</h2>
          {mascotaEnEdicion ? (
            <FormularioMascota
              pacientes={pacientes}
              mascotaInicial={mascotaEnEdicion}
              onActualizar={(actualizada) => {
                onActualizar(actualizada)
                setMascotaEnEdicion(null)
              }}
              onCancelar={() => setMascotaEnEdicion(null)}
            />
          ) : (
            <FormularioMascota pacientes={pacientes} onAgregar={onAgregar} />
          )}
        </section>

        <section className="panel-panel">
          <h2>Pacientes registrados</h2>
          <p className="contador">{textoContador()}</p>

          <div className="filtros">
            <input
              className="buscador"
              type="search"
              placeholder="Buscar por nombre o dueño"
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
            />
            <select
              className="filtro-especie"
              value={especieFiltro}
              onChange={(evento) => setEspecieFiltro(evento.target.value)}
            >
              {especies.map((especie) => (
                <option key={especie} value={especie}>
                  {especie}
                </option>
              ))}
            </select>
          </div>

          <ListaPacientes
            pacientes={filtradas}
            onEliminar={onEliminar}
            onEditar={setMascotaEnEdicion}
            onAgregarCita={onAgregarCita}
            onRecordar={onRecordar}
          />
        </section>
      </section>

      <CalendarioCitas citas={citas} />
    </main>
  )
}

export default PacientesPage