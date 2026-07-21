import { NavLink, useLocation } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import Avatar from '../ui/Avatar.jsx'
import { getChannel, PROJECT_ASCEND_ID } from '../../data/videoMockData.js'
import { useVideo } from '../../context/VideoContext.jsx'

const mainNav = [
  { to: '/video', icon: 'home', label: 'Home', end: true },
  { to: '/video/shorts', icon: 'shorts', label: 'Short Videos' },
  { to: '/video/subscriptions', icon: 'video', label: 'Subscriptions' },
  { to: '/video/library', icon: 'library', label: 'Library' },
  { to: '/video/history', icon: 'history', label: 'History' },
]

const libraryNav = [
  { key: 'later', icon: 'clock', label: 'Watch Later', to: '/video/library?tab=later' },
  { key: 'liked', icon: 'thumbsUp', label: 'Liked Videos', to: '/video/library?tab=liked' },
  { key: 'yours', icon: 'film', label: 'Your Videos', to: '/video/library?tab=yours' },
  { key: 'downloads', icon: 'download', label: 'Downloads', to: '/video/library?tab=downloads' },
]

const bottomNav = [
  { to: '/settings', icon: 'settings', label: 'Settings' },
  { key: 'help', icon: 'help', label: 'Help' },
  { key: 'feedback', icon: 'feedback', label: 'Feedback' },
]

function NavItem({ to, icon, label, end, collapsed, onClick }) {
  const cls = ({ isActive }) =>
    `flex items-center gap-5 rounded-xl px-3 py-2.5 text-sm transition-colors ${
      collapsed ? 'justify-center' : ''
    } ${isActive ? 'bg-stone-100 font-semibold text-ink' : 'text-ink-soft hover:bg-stone-50 hover:text-ink'}`

  return (
    <NavLink to={to} end={end} onClick={onClick} className={cls} aria-label={label}>
      <Icon name={icon} size={22} strokeWidth={1.7} className="shrink-0" />
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  )
}

export default function VideoSidebar({ collapsed, mobile, onNavigate }) {
  const location = useLocation()
  const { subscriptions, channelNotifs } = useVideo()
  const subChannels = subscriptions.map(getChannel).filter(Boolean)

  const close = () => onNavigate?.()

  return (
    <aside
      className={`flex flex-col h-full overflow-y-auto scrollbar-none bg-card ${
        mobile ? 'w-72 p-3' : collapsed ? 'w-[72px] p-2' : 'w-60 p-3'
      }`}
      aria-label="Video navigation"
    >
      <nav className="flex flex-col gap-0.5">
        {mainNav.map((item) => (
          <NavItem key={item.to} {...item} collapsed={collapsed && !mobile} onClick={close} />
        ))}
      </nav>

      {!collapsed || mobile ? (
        <p className="text-xs font-semibold text-ink-faint uppercase tracking-wide px-3 mt-5 mb-2">Subscriptions</p>
      ) : (
        <div className="h-px bg-line my-3 mx-2" />
      )}

      <nav className="flex flex-col gap-0.5">
        {subChannels.map((ch) => {
          const active = location.pathname === `/video/channel/${ch.id}`
          const hasNotif = channelNotifs.includes(ch.id)
          return (
            <NavLink
              key={ch.id}
              to={`/video/channel/${ch.id}`}
              onClick={close}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                collapsed && !mobile ? 'justify-center' : ''
              } ${active ? 'bg-stone-100 font-semibold' : 'hover:bg-stone-50'}`}
              aria-label={ch.name}
            >
              <span className="relative shrink-0">
                <Avatar src={ch.avatar} alt="" size="xs" />
                {hasNotif && ch.id === PROJECT_ASCEND_ID && (
                  <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-accent border-2 border-card" />
                )}
              </span>
              {(!collapsed || mobile) && (
                <span className="truncate flex-1">{ch.name}</span>
              )}
            </NavLink>
          )
        })}
        {subscriptions.length === 0 && (!collapsed || mobile) && (
          <p className="px-3 text-xs text-ink-faint">Subscribe to channels to see them here.</p>
        )}
      </nav>

      {(!collapsed || mobile) && (
        <>
          <p className="text-xs font-semibold text-ink-faint uppercase tracking-wide px-3 mt-5 mb-2">You</p>
          <nav className="flex flex-col gap-0.5">
            {libraryNav.map((item) => (
              <NavItem key={item.key} to={item.to} icon={item.icon} label={item.label} collapsed={false} onClick={close} />
            ))}
          </nav>
        </>
      )}

      <div className="mt-auto pt-4 flex flex-col gap-0.5 border-t border-line">
        {bottomNav.map((item) =>
          item.to ? (
            <NavItem key={item.to} to={item.to} icon={item.icon} label={item.label} collapsed={collapsed && !mobile} onClick={close} />
          ) : (
            <button
              key={item.key}
              type="button"
              className={`flex items-center gap-5 rounded-xl px-3 py-2.5 text-sm text-ink-soft hover:bg-stone-50 ${
                collapsed && !mobile ? 'justify-center' : ''
              }`}
            >
              <Icon name={item.icon} size={22} />
              {(!collapsed || mobile) && item.label}
            </button>
          ),
        )}
      </div>
    </aside>
  )
}
