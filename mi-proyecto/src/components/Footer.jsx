import { useLang } from '../context/LanguageContext'

function Footer({ onNavegar }) {
  const { t } = useLang()

  const ENLACES_PIE = [
    { etiqueta: t('footer.politicaPrivacidad'), vista: 'services' },
    { etiqueta: t('footer.terminosServicio'), vista: 'services' },
    { etiqueta: t('footer.contactar'), vista: 'services' },
    { etiqueta: t('footer.emergencia'), vista: 'services' },
  ]

  return (
    <footer className="pie">
      <div className="pie-interior">
        <div>
          <div className="pie-marca-nombre">VitalPet</div>
          <div className="pie-marca-sub">Health &amp; Care</div>
        </div>

        <ul className="pie-enlaces">
          {ENLACES_PIE.map((enlace, index) => (
            <li key={index}>
              <button
                className="pie-enlace"
                type="button"
                onClick={() => onNavegar(enlace.vista)}
              >
                {enlace.etiqueta}
              </button>
            </li>
          ))}
        </ul>

        <p className="pie-copy">{t('footer.copyright')}</p>
      </div>
    </footer>
  )
}

export default Footer