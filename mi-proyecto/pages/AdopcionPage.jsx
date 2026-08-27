import TarjetaAdopcion from '../src/components/TarjetaAdopcion'

function AdopcionPage({ usuario, catalogo, onAdoptar }) {
  const disponibles = catalogo.filter((mascota) => !mascota.adoptada)
  const misAdopciones = catalogo.filter(
    (mascota) => mascota.adoptada && mascota.adoptante === usuario.id,
  )

  return (
    <main className="contenedor">
      <header className="encabezado">
        <h1>Centro de adopción</h1>
        <p className="encabezado-subtitulo">
          Encuentra a tu nuevo mejor amigo y dale un hogar.
        </p>
      </header>

      <section className="seccion-adopciones">
        <h2>Disponibles para adopción</h2>
        {disponibles.length === 0 ? (
          <div className="sin-pacientes">
            <p>No hay mascotas disponibles por ahora.</p>
            <p>Vuelve pronto: pronto habrá nuevos amigos esperando un hogar.</p>
          </div>
        ) : (
          <ul className="adopciones-lista">
            {disponibles.map((mascota) => (
              <TarjetaAdopcion key={mascota.id} mascota={mascota} onAdoptar={onAdoptar} />
            ))}
          </ul>
        )}
      </section>

      <section className="seccion-adopciones">
        <h2>Mis adopciones</h2>
        {misAdopciones.length === 0 ? (
          <div className="sin-pacientes">
            <p>Aún no has adoptado ninguna mascota.</p>
            <p>La fidelidad también se premia: cada adopción suma puntos.</p>
          </div>
        ) : (
          <ul className="adopciones-lista">
            {misAdopciones.map((mascota) => (
              <TarjetaAdopcion key={mascota.id} mascota={mascota} onAdoptar={onAdoptar} />
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default AdopcionPage