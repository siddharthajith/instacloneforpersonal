import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Icon from './Icon.jsx'

export default function Modal({ open, onClose, children, label = 'Dialog', full = false, showClose = true }) {
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in"
      onMouseDown={(e) => e.target === overlayRef.current && onClose()}
    >
      {showClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 text-white/90 hover:text-white p-2"
        >
          <Icon name="close" size={26} />
        </button>
      )}
      <div
        className={`animate-scale-in ${
          full
            ? 'w-full h-full sm:h-auto sm:w-auto sm:max-h-[92vh] sm:max-w-[90vw]'
            : 'w-full h-full sm:h-auto sm:w-auto sm:max-w-[90vw] sm:max-h-[92vh]'
        }`}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
