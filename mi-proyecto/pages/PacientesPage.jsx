import { useMemo, useState } from 'react'
import CalendarioCitas from '../src/components/CalendarioCitas'
import FormularioMascota from '../src/components/FormularioMascota'
import ListaPacientes from '../src/components/ListaPacientes'
import { todasLasCitas } from '../src/js/storage'
import { useLang } from '../src/context/LanguageContext'

function PacientesPage({ pacientes, onAgregar, onActualizar, onEliminar, onAgregarCita, onRecordar }) {
  const { t } = useLang()
  const [busqueda, setBusqueda] = useState('')
  const [especieFiltro, setEspecieFiltro] = useState('')
  const [mascotaEnEdicion, setMascotaEnEdicion] = useState(null)

  const todas = t('pacientes.todas')
  const especies = useMemo(
    () => [todas, ...new Set(pacientes.map((mascota) => mascota.especie))],
    [pacientes, todas],
  )
  const especieSeleccionada = especieFiltro || todas

  const filtradas = pacientes.filter((mascota) => {
    const texto = busqueda.trim().toLowerCase()
    const coincideTexto =
      !texto ||
      mascota.nombre.toLowerCase().includes(texto) ||
      mascota.propietario.toLowerCase().includes(texto)
    const coincideEspecie = especieSeleccionada === todas || mascota.especie === especieSeleccionada
    return coincideTexto && coincideEspecie
  })

  const citas = useMemo(() => todasLasCitas(pacientes), [pacientes])
  const totalCitas = citas.length

  function textoContador() {
    const mascotaTexto = pacientes.length === 1 ? t('pacientes.mascota') : t('pacientes.mascotas')
    const citaTexto = totalCitas === 1 ? t('pacientes.cita') : t('pacientes.citas')
    return `${pacientes.length} ${mascotaTexto} y ${totalCitas} ${citaTexto} ${t('pacientes.enSeguimiento')}`
  }

  return (
    <main className="contenedor">
      <header className="encabezado">
        <h1>{t('pacientes.titulo')}</h1>
        <p className="encabezado-subtitulo">
          {t('pacientes.subtitulo')}
        </p>
      </header>

      <section className="panel">
        <section className="panel-panel">
          <h2>
            {mascotaEnEdicion
              ? `${t('pacientes.editar')} ${mascotaEnEdicion.nombre}`
              : t('pacientes.agendarCita')}
          </h2>
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
          <h2>{t('pacientes.registrados')}</h2>
          <p className="contador">{textoContador()}</p>

          <div className="filtros">
            <input
              className="buscador"
              type="search"
              placeholder={t('pacientes.buscarPlaceholder')}
              value={busqueda}
              onChange={(evento) => setBusqueda(evento.target.value)}
            />
            <select
              className="filtro-especie"
              value={especieSeleccionada}
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
            onActualizarMascota={onActualizar}
          />
        </section>
      </section>

      <CalendarioCitas citas={citas} />
    </main>
  )
}

export default PacientesPage