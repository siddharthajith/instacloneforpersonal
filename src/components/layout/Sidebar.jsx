import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import { LogoMark, WordMark } from '../ui/Logo.jsx'
import Avatar from '../ui/Avatar.jsx'
import { PlatformSwitcherButton, PlatformSwitcherMenu } from '../ui/PlatformSwitcher.jsx'
import { useApp } from '../../context/AppContext.jsx'

const navItems = [
  { to: '/glimpse', icon: 'home', label: 'Home', end: true },
  { key: 'search', icon: 'search', label: 'Search' },
  { to: '/explore', icon: 'compass', label: 'Explore' },
  { to: '/reels', icon: 'clips', label: 'Clips' },
  { to: '/messages', icon: 'message', label: 'Messages', badgeKey: 'messages' },
  { to: '/notifications', icon: 'heart', label: 'Notifications', badgeKey: 'notifications' },
  { key: 'create', icon: 'plusSquare', label: 'Create' },
]

export default function Sidebar({ onOpenSearch, onOpenCreate, searchOpen }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { profile, logout, readNotifications, notifications, conversations } = useApp()
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef(null)

  const unreadNotifs = notifications.filter((n) => !n.read && !readNotifications.includes(n.id)).length
  const unreadMsgs = conversations.reduce((acc, c) => acc + c.unread, 0)

  useEffect(() => {
    const onClick = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  useEffect(() => setMoreOpen(false), [location.pathname])

  const itemClass = (active) =>
    `group flex items-center gap-4 w-full rounded-xl px-3 py-2.5 text-[15px] transition-colors duration-150 ${
      active ? 'font-bold text-ink bg-stone-100' : 'font-medium text-ink hover:bg-stone-50'
    }`

  const badge = (count) =>
    count > 0 && (
      <span className="ml-auto min-w-5 h-5 px-1.5 rounded-full bg-danger text-white text-[11px] font-bold flex items-center justify-center xl:static absolute top-1 right-1 xl:top-auto xl:right-auto">
        {count}
      </span>
    )

  return (
    <nav
      aria-label="Primary"
      className="hidden md:flex fixed inset-y-0 left-0 z-30 w-[72px] xl:w-60 flex-col border-r border-line bg-card px-3 py-5"
    >
      <NavLink to="/glimpse" className="flex items-center gap-2.5 px-2 mb-5" aria-label="Glimpse home">
        <LogoMark size={34} />
        <span className="hidden xl:block">
          <WordMark className="text-[24px]" />
        </span>
      </NavLink>

      <div className="px-2 mb-4 flex justify-center xl:justify-start">
        <PlatformSwitcherButton platform="glimpse" className="w-full xl:w-full justify-center text-xs px-2" />
      </div>

      <ul className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const count = item.badgeKey === 'notifications' ? unreadNotifs : item.badgeKey === 'messages' ? unreadMsgs : 0
          if (item.key) {
            const isSearch = item.key === 'search' && searchOpen
            return (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={item.key === 'search' ? onOpenSearch : onOpenCreate}
                  className={`${itemClass(isSearch)} relative justify-center xl:justify-start`}
                  aria-label={item.label}
                >
                  <Icon name={item.icon} size={25} strokeWidth={isSearch ? 2.4 : 1.7} className="group-hover:scale-105 transition-transform" />
                  <span className="hidden xl:block">{item.label}</span>
                </button>
              </li>
            )
          }
          return (
            <li key={item.to}>
              <NavLink to={item.to} end={item.end} aria-label={item.label} className="block">
                {({ isActive }) => (
                  <span className={`${itemClass(isActive)} relative justify-center xl:justify-start`}>
                    <Icon
                      name={item.icon}
                      size={25}
                      filled={isActive && (item.icon === 'heart' || item.icon === 'home')}
                      strokeWidth={isActive ? 2.4 : 1.7}
                      className="group-hover:scale-105 transition-transform"
                    />
                    <span className="hidden xl:block">{item.label}</span>
                    {badge(count)}
                  </span>
                )}
              </NavLink>
            </li>
          )
        })}
        <li>
          <NavLink to={`/profile/${profile.username}`} aria-label="Profile" className="block">
            {({ isActive }) => (
              <span className={`${itemClass(isActive)} justify-center xl:justify-start`}>
                <Avatar src={profile.avatar} alt="" size="xs" className={isActive ? 'ring-2 ring-ink' : ''} />
                <span className="hidden xl:block">Profile</span>
              </span>
            )}
          </NavLink>
        </li>
      </ul>

      <div className="relative flex flex-col gap-1" ref={moreRef}>
        {moreOpen && (
          <div className="absolute bottom-full mb-2 left-0 w-56 bg-card border border-line rounded-xl shadow-lg animate-scale-in z-10">
            <PlatformSwitcherMenu current="glimpse" onClose={() => setMoreOpen(false)} />
          </div>
        )}
        <NavLink to="/settings" aria-label="Settings" className="block">
          {({ isActive }) => (
            <span className={`${itemClass(isActive)} justify-center xl:justify-start`}>
              <Icon name="settings" size={24} />
              <span className="hidden xl:block">Settings</span>
            </span>
          )}
        </NavLink>
        <button
          type="button"
          onClick={() => setMoreOpen((v) => !v)}
          className={`${itemClass(moreOpen)} justify-center xl:justify-start`}
          aria-expanded={moreOpen}
          aria-haspopup="menu"
        >
          <Icon name="menu" size={24} />
          <span className="hidden xl:block">More</span>
        </button>
        <button
          type="button"
          onClick={() => { logout(); navigate('/login') }}
          className={`${itemClass(false)} justify-center xl:justify-start`}
          aria-label="Log out"
        >
          <Icon name="logout" size={24} />
          <span className="hidden xl:block">Log out</span>
        </button>
      </div>
    </nav>
  )
}
