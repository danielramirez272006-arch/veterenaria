import TarjetaAdopcion from '../src/components/TarjetaAdopcion'
import { useLang } from '../src/context/LanguageContext'

function AdopcionPage({ usuario, catalogo, onAdoptar }) {
  const { t } = useLang()
  const disponibles = catalogo.filter((mascota) => !mascota.adoptada)
  const misAdopciones = catalogo.filter(
    (mascota) => mascota.adoptada && mascota.adoptante === usuario.id,
  )

  return (
    <main className="contenedor">
      <header className="encabezado">
        <h1>{t('adopcion.titulo')}</h1>
        <p className="encabezado-subtitulo">
          {t('adopcion.subtitulo')}
        </p>
      </header>

      <section className="seccion-adopciones">
        <h2>{t('adopcion.disponibles')}</h2>
        {disponibles.length === 0 ? (
          <div className="sin-pacientes">
            <p>{t('adopcion.sinDisponibles')}</p>
            <p>{t('adopcion.sinDisponiblesDetalle')}</p>
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
        <h2>{t('adopcion.misAdopciones')}</h2>
        {misAdopciones.length === 0 ? (
          <div className="sin-pacientes">
            <p>{t('adopcion.sinAdopciones')}</p>
            <p>{t('adopcion.sinAdopcionesDetalle')}</p>
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