const ENLACES_PIE = [
  { etiqueta: 'Privacy Policy', vista: 'services' },
  { etiqueta: 'Terms of Service', vista: 'services' },
  { etiqueta: 'Contact Us', vista: 'services' },
  { etiqueta: 'Emergency Care', vista: 'services' },
]

function Footer({ onNavegar }) {
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

        <p className="pie-copy">© 2026 VitalPet Health &amp; Care. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer