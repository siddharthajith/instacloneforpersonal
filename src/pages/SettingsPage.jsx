import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../components/ui/Icon.jsx'
import Avatar from '../components/ui/Avatar.jsx'
import { useApp } from '../context/AppContext.jsx'

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${
        checked ? 'bg-accent' : 'bg-stone-300'
      }`}
    >
      <span
        className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? 'translate-x-[22px]' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

export default function SettingsPage() {
  const { profile, logout } = useApp()
  const navigate = useNavigate()
  const [prefs, setPrefs] = useState({
    privateAccount: false,
    pauseAll: false,
    likesNotifs: true,
    commentsNotifs: true,
    followsNotifs: true,
    messagesNotifs: true,
  })

  const set = (key) => (v) => setPrefs((p) => ({ ...p, [key]: v }))

  const row = 'flex items-center justify-between gap-4 px-5 py-4'

  return (
    <div className="mx-auto max-w-[640px] px-4 pt-5 md:pt-10 pb-10 animate-fade-in">
      <h1 className="text-xl font-bold mb-6">Settings</h1>

      <section aria-label="Account" className="bg-card border border-line rounded-xl overflow-hidden mb-5">
        <h2 className="px-5 pt-4 pb-1 text-sm font-bold text-ink-soft">Account</h2>
        <Link to="/settings/edit-profile" className={`${row} hover:bg-stone-50`}>
          <span className="flex items-center gap-3.5 min-w-0">
            <Avatar src={profile.avatar} alt="" size="md" />
            <span className="min-w-0">
              <span className="block text-sm font-semibold truncate">{profile.username}</span>
              <span className="block text-xs text-ink-faint">Edit profile, avatar, bio, links</span>
            </span>
          </span>
          <Icon name="chevronRight" size={18} className="text-ink-faint" />
        </Link>
        <div className={`${row} border-t border-line`}>
          <span>
            <span className="block text-sm font-medium">Private account</span>
            <span className="block text-xs text-ink-faint mt-0.5">Only approved followers can see your posts</span>
          </span>
          <Toggle checked={prefs.privateAccount} onChange={set('privateAccount')} label="Private account" />
        </div>
      </section>

      <section aria-label="Notifications" className="bg-card border border-line rounded-xl overflow-hidden mb-5">
        <h2 className="px-5 pt-4 pb-1 text-sm font-bold text-ink-soft">Notifications</h2>
        {[
          ['pauseAll', 'Pause all', 'Temporarily silence all push notifications'],
          ['likesNotifs', 'Likes', 'When someone likes your post'],
          ['commentsNotifs', 'Comments', 'When someone comments on your post'],
          ['followsNotifs', 'New followers', 'When someone follows you'],
          ['messagesNotifs', 'Messages', 'When you receive a direct message'],
        ].map(([key, label, desc], i) => (
          <div key={key} className={`${row} ${i > 0 ? 'border-t border-line' : ''}`}>
            <span>
              <span className="block text-sm font-medium">{label}</span>
              <span className="block text-xs text-ink-faint mt-0.5">{desc}</span>
            </span>
            <Toggle checked={prefs[key]} onChange={set(key)} label={label} />
          </div>
        ))}
      </section>

      <section aria-label="More" className="bg-card border border-line rounded-xl overflow-hidden">
        <Link to="/settings/edit-profile" className={`${row} hover:bg-stone-50 text-sm font-medium`}>
          Password and security
          <Icon name="chevronRight" size={18} className="text-ink-faint" />
        </Link>
        <button type="button" className={`${row} w-full border-t border-line hover:bg-stone-50 text-sm font-medium`}>
          Help centre
          <Icon name="chevronRight" size={18} className="text-ink-faint" />
        </button>
        <button
          type="button"
          onClick={() => { logout(); navigate('/login') }}
          className={`${row} w-full border-t border-line text-danger hover:bg-red-50 text-sm font-semibold`}
        >
          Log out
          <Icon name="logout" size={18} />
        </button>
      </section>
    </div>
  )
}
