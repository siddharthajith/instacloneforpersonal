import { Link } from 'react-router-dom'
import Avatar from '../ui/Avatar.jsx'
import FollowButton from '../ui/FollowButton.jsx'
import VerifiedBadge from '../ui/VerifiedBadge.jsx'
import { useApp } from '../../context/AppContext.jsx'
import { suggestions, getUser } from '../../data/mockData.js'

const footerLinks = ['About', 'Help', 'Privacy', 'Terms', 'Locations', 'Language']

export default function RightSidebar() {
  const { profile } = useApp()

  return (
    <aside className="hidden lg:block w-80 shrink-0 pt-8 pr-4" aria-label="Suggestions">
      <div className="flex items-center gap-3">
        <Link to={`/profile/${profile.username}`}>
          <Avatar src={profile.avatar} alt={profile.username} size="lg" />
        </Link>
        <div className="min-w-0 flex-1">
          <Link to={`/profile/${profile.username}`} className="block font-semibold text-sm truncate hover:opacity-70">
            {profile.username}
          </Link>
          <p className="text-sm text-ink-faint truncate">{profile.fullName}</p>
        </div>
        <Link to="/login" className="text-xs font-semibold text-accent hover:text-accent-deep shrink-0">
          Switch
        </Link>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-ink-soft">Suggested for you</h2>
          <Link to="/explore" className="text-xs font-semibold text-ink hover:opacity-70">
            See all
          </Link>
        </div>
        <ul className="space-y-3.5">
          {suggestions.map(({ userId, reason }) => {
            const user = getUser(userId)
            return (
              <li key={userId} className="flex items-center gap-3">
                <Link to={`/profile/${user.username}`}>
                  <Avatar src={user.avatar} alt={user.username} size="md" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link to={`/profile/${user.username}`} className="flex items-center gap-1 font-semibold text-[13px] truncate hover:opacity-70">
                    {user.username}
                    {user.verified && <VerifiedBadge size={12} />}
                  </Link>
                  <p className="text-xs text-ink-faint truncate">{reason}</p>
                </div>
                <FollowButton userId={userId} />
              </li>
            )
          })}
        </ul>
      </div>

      <footer className="mt-8 text-[11px] text-ink-faint leading-relaxed">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-2 gap-y-1">
            {footerLinks.map((label) => (
              <li key={label}>
                <a href="#" onClick={(e) => e.preventDefault()} className="hover:underline">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-3 uppercase tracking-wide">© 2026 Glimpse Labs</p>
      </footer>
    </aside>
  )
}
