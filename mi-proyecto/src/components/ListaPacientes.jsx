import TarjetaPaciente from './TarjetaPaciente'
import { useLang } from '../context/LanguageContext'

function ListaPacientes({ pacientes, onEliminar, onEditar, onAgregarCita, onRecordar, onActualizarMascota }) {
  const { t } = useLang()

  if (pacientes.length === 0) {
    return (
      <div className="sin-pacientes">
        <p>{t('pacientes.sinPacientes')}</p>
        <p>{t('pacientes.formularioAyuda')}</p>
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
          onActualizar={onActualizarMascota}
        />
      ))}
    </ul>
  )
}

export default ListaPacientes