import Icon from './Icon.jsx'

export default function VerifiedBadge({ size = 14 }) {
  return (
    <span className="text-accent inline-flex" title="Verified" aria-label="Verified account">
      <Icon name="verified" size={size} />
    </span>
  )
}
