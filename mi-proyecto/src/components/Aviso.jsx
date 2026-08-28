import { useEffect } from 'react'
import { useLang } from '../context/LanguageContext'

function Aviso({ aviso, onCerrar }) {
  const { t } = useLang()

  useEffect(() => {
    const temporizador = setTimeout(onCerrar, 4000)
    return () => clearTimeout(temporizador)
  }, [aviso, onCerrar])

  return (
    <div
      className={`aviso ${aviso.tipo === 'error' ? 'aviso-error' : 'aviso-exito'}`}
      role={aviso.tipo === 'error' ? 'alert' : 'status'}
    >
      <span>{aviso.texto}</span>
      <button className="aviso-cerrar" type="button" onClick={onCerrar} aria-label={t('common.cerrar')}>
        ×
      </button>
    </div>
  )
}

export default Aviso