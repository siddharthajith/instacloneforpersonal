const variants = {
  primary: 'bg-accent text-white hover:bg-accent-deep disabled:bg-accent/40',
  secondary: 'bg-stone-100 text-ink hover:bg-stone-200',
  ghost: 'text-accent hover:text-accent-deep hover:bg-accent-soft',
  danger: 'text-danger hover:bg-red-50',
  outline: 'border border-line-strong text-ink hover:bg-stone-50',
}

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const sizeCls = size === 'sm' ? 'text-[13px] px-3 py-1.5' : size === 'lg' ? 'text-sm px-5 py-2.5' : 'text-sm px-4 py-2'
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold transition-colors duration-150 disabled:cursor-not-allowed ${sizeCls} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
