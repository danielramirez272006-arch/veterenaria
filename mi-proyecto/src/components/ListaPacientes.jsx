import TarjetaPaciente from './TarjetaPaciente'

function ListaPacientes({ pacientes, onEliminar, onEditar, onAgregarCita, onRecordar }) {
  if (pacientes.length === 0) {
    return (
      <div className="sin-pacientes">
        <p>No hay pacientes registrados.</p>
        <p>Completa el formulario para agregar tu primera mascota.</p>
      </div>
    )
  }

  return (
    <ul className="lista-pacientes">
      {pacientes.map((mascota) => (
        <TarjetaPaciente
          key={mascota.id}
          mascota={mascota}
          onEliminar={onEliminar}
          onEditar={onEditar}
          onAgregarCita={onAgregarCita}
          onRecordar={onRecordar}
        />
      ))}
    </ul>
  )
}

export default ListaPacientes