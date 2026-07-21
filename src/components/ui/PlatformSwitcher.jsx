import { Link, useNavigate } from 'react-router-dom'
import Icon from './Icon.jsx'
import Avatar from './Avatar.jsx'
import { useApp } from '../../context/AppContext.jsx'

export function PlatformSwitcherButton({ platform = 'glimpse', className = '' }) {
  const target = platform === 'glimpse' ? '/video' : '/glimpse'
  const label = platform === 'glimpse' ? 'Open Glimpse Video' : 'Back to Glimpse'

  return (
    <Link
      to={target}
      className={`inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-2 text-sm font-semibold text-ink hover:bg-stone-50 transition-colors ${className}`}
    >
      <Icon name={platform === 'glimpse' ? 'video' : 'home'} size={18} />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  )
}

export function PlatformSwitcherMenu({ current = 'glimpse', onClose }) {
  const navigate = useNavigate()
  const { profile, logout } = useApp()

  const go = (path) => {
    onClose?.()
    navigate(path)
  }

  const item = (platform, label, path) => (
    <button
      type="button"
      onClick={() => go(path)}
      className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-stone-50 ${
        current === platform ? 'font-semibold text-accent bg-accent-soft/50' : ''
      }`}
    >
      <Icon name={platform === 'glimpse' ? 'home' : 'video'} size={18} />
      {label}
      {current === platform && <Icon name="check" size={16} className="ml-auto text-accent" />}
    </button>
  )

  return (
  <div className="py-1.5" role="menu">
    <div className="px-4 py-2 border-b border-line mb-1">
      <p className="text-sm font-semibold truncate">{profile.fullName}</p>
      <p className="text-xs text-ink-faint truncate">@{profile.username}</p>
    </div>
    {item('glimpse', 'Glimpse', '/glimpse')}
    {item('video', 'Glimpse Video', '/video')}
    <div className="h-px bg-line my-1.5" />
    <button type="button" onClick={() => go('/settings')} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-stone-50">
      <Icon name="settings" size={18} /> Account settings
    </button>
    <button
      type="button"
      onClick={() => { onClose?.(); logout(); navigate('/login') }}
      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-danger hover:bg-red-50"
    >
      <Icon name="logout" size={18} /> Sign out
    </button>
  </div>
  )
}

export function ProfileMenuButton() {
  const { profile } = useApp()
  return (
    <button type="button" className="rounded-full focus-visible:outline-none" aria-label="Account menu">
      <Avatar src={profile.avatar} alt={profile.fullName} size="sm" />
    </button>
  )
}
