export function LogoMark({ size = 32 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} fill="none" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#1c1917" />
      <circle cx="24" cy="24" r="11" stroke="#fafaf9" strokeWidth="3.5" />
      <circle cx="24" cy="24" r="3.5" fill="#f59e0b" />
    </svg>
  )
}

export function WordMark({ className = 'text-[26px]' }) {
  return (
    <span className={`font-extrabold tracking-tight text-ink select-none ${className}`}>
      glimpse<span className="text-gold">.</span>
    </span>
  )
}
