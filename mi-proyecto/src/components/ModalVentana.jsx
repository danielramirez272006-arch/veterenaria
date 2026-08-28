import { useLang } from '../context/LanguageContext'

function ModalVentana({ titulo, onCerrar, children }) {
  const { t } = useLang()

  return (
    <div className="modal-fondo" onClick={onCerrar}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={titulo}
        onClick={(evento) => evento.stopPropagation()}
      >
        <div className="modal-cabecera">
          <h2>{titulo}</h2>
          <button className="modal-cerrar" type="button" aria-label={t('common.cerrar')} onClick={onCerrar}>
            ×
          </button>
        </div>
        <div className="modal-cuerpo">{children}</div>
      </div>
    </div>
  )
}

export default ModalVentana