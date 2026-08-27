import { useState } from 'react'
import FormularioCita from './FormularioCita'

function TarjetaPaciente({ mascota, onEliminar, onEditar, onAgregarCita, onRecordar }) {
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false)

  const citas = [...mascota.citas].sort((a, b) => a.fecha.localeCompare(b.fecha))

  function manejarAlta() {
    if (window.confirm(`¿Dar de alta a ${mascota.nombre}? Se eliminará del registro.`)) {
      onEliminar(mascota.id)
    }
  }

  return (
    <li className="tarjeta tarjeta-paciente">
      <div className="tarjeta-cabecera">
        <h3 className="tarjeta-nombre">{mascota.nombre}</h3>
        <span className="tarjeta-especie">{mascota.especie}</span>
      </div>

      <dl className="tarjeta-datos">
        <div>
          <dt>Dueño</dt>
          <dd>{mascota.propietario}</dd>
        </div>
        <div>
          <dt>Teléfono</dt>
          <dd>{mascota.telefono}</dd>
        </div>
      </dl>

      <ul className="citas-lista">
        {citas.map((cita) => (
          <li key={cita.id} className="cita">
            <div className="cita-cabecera">
              <span className="cita-fecha">{cita.fecha}</span>
              <button
                className="boton boton-recordar"
                type="button"
                onClick={() => onRecordar(mascota, cita)}
              >
                Recordar cita
              </button>
            </div>
            <p className="cita-sintomas">{cita.sintomas}</p>
            {cita.notas && <p className="cita-notas">Nota: {cita.notas}</p>}
          </li>
        ))}
      </ul>

      {mostrandoFormulario ? (
        <FormularioCita
          mascota={mascota}
          onAgregarCita={(cita) => {
            onAgregarCita(mascota.id, cita)
            setMostrandoFormulario(false)
          }}
          onCancelar={() => setMostrandoFormulario(false)}
        />
      ) : (
        <button
          className="boton boton-secundario"
          type="button"
          onClick={() => setMostrandoFormulario(true)}
        >
          Agregar cita
        </button>
      )}

      <div className="tarjeta-botones">
        <button className="boton boton-secundario" type="button" onClick={() => onEditar(mascota)}>
          Editar
        </button>
        <button className="boton boton-peligro" type="button" onClick={manejarAlta}>
          Dar de alta
        </button>
      </div>
    </li>
  )
}

export default TarjetaPaciente