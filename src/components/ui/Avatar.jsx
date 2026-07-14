const sizes = {
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-11',
  lg: 'size-14',
  xl: 'size-20',
  '2xl': 'size-24 md:size-36',
}

export default function Avatar({ src, alt, size = 'md', ring = null, className = '' }) {
  const image = (
    <img
      src={src}
      alt={alt || 'Profile photo'}
      loading="lazy"
      className={`${sizes[size]} rounded-full object-cover bg-line ${ring ? '' : className}`}
    />
  )
  if (!ring) return image
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full p-[2.5px] transition-transform duration-200 hover:scale-105 ${
        ring === 'unviewed' ? 'story-ring' : 'bg-line-strong'
      } ${className}`}
    >
      <span className="rounded-full bg-card p-[2.5px] flex">{image}</span>
    </span>
  )
}
