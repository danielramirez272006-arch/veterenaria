import { useState } from 'react'
import ActividadReciente from '../src/components/ActividadReciente'
import FormularioMascota from '../src/components/FormularioMascota'
import ModalVentana from '../src/components/ModalVentana'
import PerfilHeader from '../src/components/PerfilHeader'
import TarjetaMascota from '../src/components/TarjetaMascota'
import VitalPoints from '../src/components/VitalPoints'

function PerfilPage({
  usuario,
  pacientes,
  onAgregar,
  onAgregarCita,
  onRecordar,
  onCanjear,
}) {
  const [modal, setModal] = useState(null)

  function abrirNueva() {
    setModal({ tipo: 'nueva' })
  }

  function abrirHistorial() {
    setModal({ tipo: 'historial' })
  }

  function abrirCanje() {
    setModal({ tipo: 'canje' })
  }

  return (
    <main className="pagina-perfil">
      <PerfilHeader usuario={usuario} onConfigurar={() => setModal({ tipo: 'cuenta' })} />

      <div className="perfil-columnas">
        <div className="perfil-columna-izquierda">
          <VitalPoints puntos={usuario.puntos} onCanjear={abrirCanje} />
          <ActividadReciente
            movimientos={usuario.movimientos || []}
            onVerTodas={abrirHistorial}
          />
        </div>

        <section className="perfil-columna-derecha">
          <h2 className="mascotas-titulo">My Mascotas</h2>
          <ul className="mascotas-grid">
            {pacientes.map((mascota) => (
              <TarjetaMascota
                key={mascota.id}
                mascota={mascota}
                onAgregarCita={onAgregarCita}
                onRecordar={onRecordar}
              />
            ))}
            <li className="mascota-tarjeta mascota-nueva">
              <button type="button" onClick={abrirNueva}>
                <span className="mascota-nueva-icono">+</span>
                Add New Pet
              </button>
            </li>
          </ul>
        </section>
      </div>

      {modal && (
        <ModalVentana
          titulo={
            modal.tipo === 'nueva'
              ? 'Registrar nueva mascota'
              : modal.tipo === 'historial'
                ? 'Historial de actividad'
                : modal.tipo === 'canje'
                  ? 'Canjear puntos'
                  : 'Configuración de cuenta'
          }
          onCerrar={() => setModal(null)}
        >
          {modal.tipo === 'nueva' && (
            <FormularioMascota
              pacientes={pacientes}
              onAgregar={(datos) => {
                onAgregar(datos)
                setModal(null)
              }}
              onCancelar={() => setModal(null)}
            />
          )}

          {modal.tipo === 'historial' && (
            <div className="tarjeta">
              {(usuario.movimientos || []).length === 0 ? (
                <p className="sin-pacientes">Aún no hay movimientos registrados.</p>
              ) : (
                <ul className="actividad-lista">
                  {(usuario.movimientos || []).map((movimiento) => (
                    <li key={movimiento.id} className="actividad-item">
                      <div className="actividad-info">
                        <span className="actividad-motivo">{movimiento.motivo}</span>
                        <span className="actividad-fecha">{movimiento.fecha}</span>
                      </div>
                      <span
                        className={`actividad-monto ${
                          movimiento.puntos >= 0
                            ? 'actividad-monto-mas'
                            : 'actividad-monto-menos'
                        }`}
                      >
                        {movimiento.puntos > 0 ? '+' : ''}
                        {movimiento.puntos} pts
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {modal.tipo === 'canje' && (
            <div className="tarjeta">
              <p>
                Saldo actual de Vital Points:{' '}
                <strong style={{ color: 'var(--verde-em-oscuro)' }}>{usuario.puntos} pts</strong>
              </p>
              <div className="mascota-botones">
                <button
                  className="boton boton-canje"
                  type="button"
                  onClick={() => {
                    onCanjear()
                    setModal(null)
                  }}
                >
                  Ver recompensas
                </button>
              </div>
            </div>
          )}

          {modal.tipo === 'cuenta' && (
            <div className="tarjeta">
              <p className="perfil-nombre">
                <strong>{usuario.nombre}</strong> (@{usuario.usuario})
              </p>
              <p className="tarjeta-detalle">
                Miembro Premium desde {usuario.desde || new Date().getFullYear()}.
              </p>
            </div>
          )}
        </ModalVentana>
      )}
    </main>
  )
}

export default PerfilPage