import { NavLink, Link } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import { WordMark } from '../ui/Logo.jsx'
import Avatar from '../ui/Avatar.jsx'
import { PlatformSwitcherButton } from '../ui/PlatformSwitcher.jsx'
import { useApp } from '../../context/AppContext.jsx'

export function MobileTopBar() {
  const { notifications, readNotifications, conversations } = useApp()
  const unreadNotifs = notifications.filter((n) => !n.read && !readNotifications.includes(n.id)).length
  const unreadMsgs = conversations.reduce((acc, c) => acc + c.unread, 0)

  return (
    <header className="md:hidden fixed top-0 inset-x-0 z-30 h-14 bg-card/95 backdrop-blur border-b border-line flex items-center justify-between px-4">
      <Link to="/glimpse" aria-label="Glimpse home">
        <WordMark className="text-[22px]" />
      </Link>
      <div className="flex items-center gap-1">
        <PlatformSwitcherButton platform="glimpse" className="!px-2 !py-1.5 text-xs" />
        <NavLink to="/notifications" aria-label="Notifications" className="relative p-2 text-ink">
          {({ isActive }) => (
            <>
              <Icon name="heart" size={24} filled={isActive} />
              {unreadNotifs > 0 && (
                <span className="absolute top-1 right-1 size-2 rounded-full bg-danger" aria-hidden="true" />
              )}
            </>
          )}
        </NavLink>
        <NavLink to="/messages" aria-label="Messages" className="relative p-2 text-ink">
          <Icon name="message" size={24} />
          {unreadMsgs > 0 && (
            <span className="absolute top-0.5 right-0.5 min-w-4 h-4 px-1 rounded-full bg-danger text-white text-[10px] font-bold flex items-center justify-center">
              {unreadMsgs}
            </span>
          )}
        </NavLink>
      </div>
    </header>
  )
}

export function MobileBottomNav({ onOpenCreate }) {
  const { profile } = useApp()
  const cls = ({ isActive }) =>
    `flex items-center justify-center flex-1 py-2.5 ${isActive ? 'text-ink' : 'text-ink-soft'}`

  return (
    <nav
      aria-label="Primary"
      className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-card border-t border-line flex pb-[env(safe-area-inset-bottom)]"
    >
      <NavLink to="/glimpse" end className={cls} aria-label="Home">
        {({ isActive }) => <Icon name="home" size={26} filled={isActive} strokeWidth={isActive ? 2.2 : 1.7} />}
      </NavLink>
      <NavLink to="/explore" className={cls} aria-label="Explore">
        {({ isActive }) => <Icon name="compass" size={26} strokeWidth={isActive ? 2.2 : 1.7} />}
      </NavLink>
      <button
        type="button"
        onClick={onOpenCreate}
        aria-label="Create post"
        className="flex items-center justify-center flex-1 py-2.5 text-ink-soft"
      >
        <Icon name="plusSquare" size={26} />
      </button>
      <NavLink to="/reels" className={cls} aria-label="Clips">
        {({ isActive }) => <Icon name="clips" size={26} strokeWidth={isActive ? 2.2 : 1.7} />}
      </NavLink>
      <NavLink to={`/profile/${profile.username}`} className={cls} aria-label="Profile">
        {({ isActive }) => (
          <Avatar src={profile.avatar} alt="" size="xs" className={isActive ? 'ring-2 ring-ink' : ''} />
        )}
      </NavLink>
    </nav>
  )
}
