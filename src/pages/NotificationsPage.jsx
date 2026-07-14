import { Link } from 'react-router-dom'
import Avatar from '../components/ui/Avatar.jsx'
import Button from '../components/ui/Button.jsx'
import FollowButton from '../components/ui/FollowButton.jsx'
import { useApp } from '../context/AppContext.jsx'
import { getUser, getPost } from '../data/mockData.js'
import { timeAgo } from '../utils/format.js'

const DAY = 86400000
const WEEK = 7 * DAY

function notificationText(n) {
  switch (n.type) {
    case 'like': return 'liked your post.'
    case 'comment': return `commented: “${n.text}”`
    case 'follow': return 'started following you.'
    case 'mention': return n.text
    case 'tag': return n.text + '.'
    case 'request': return 'wants to send you a message.'
    default: return ''
  }
}

function NotificationRow({ n }) {
  const { readNotifications, markNotificationRead } = useApp()
  const user = getUser(n.userId)
  const post = n.postId ? getPost(n.postId) : null
  const isRead = n.read || readNotifications.includes(n.id)

  return (
    <li>
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
          isRead ? 'hover:bg-stone-50' : 'bg-accent-soft/60 hover:bg-accent-soft'
        }`}
      >
        <Link to={`/profile/${user.username}`} onClick={() => markNotificationRead(n.id)} className="shrink-0">
          <Avatar src={user.avatar} alt="" size="md" />
        </Link>
        <p className="text-sm leading-snug min-w-0 flex-1">
          <Link
            to={`/profile/${user.username}`}
            onClick={() => markNotificationRead(n.id)}
            className="font-semibold hover:opacity-70"
          >
            {user.username}
          </Link>{' '}
          {notificationText(n)}{' '}
          <span className="text-ink-faint whitespace-nowrap">{timeAgo(n.timestamp, true)}</span>
        </p>
        {n.type === 'follow' && (
          <span onClick={() => markNotificationRead(n.id)}>
            <FollowButton userId={n.userId} />
          </span>
        )}
        {n.type === 'request' && (
          <Link to="/messages" onClick={() => markNotificationRead(n.id)}>
            <Button size="sm" variant="secondary">View</Button>
          </Link>
        )}
        {post && (
          <Link
            to={`/post/${post.id}`}
            onClick={() => markNotificationRead(n.id)}
            aria-label="View post"
            className="shrink-0"
          >
            <img
              src={post.media[0].type === 'video' ? post.media[0].poster : post.media[0].src}
              alt=""
              loading="lazy"
              className="size-11 rounded-md object-cover border border-line"
            />
          </Link>
        )}
        {!isRead && <span className="size-2 rounded-full bg-accent shrink-0" aria-label="Unread" />}
      </div>
    </li>
  )
}

export default function NotificationsPage() {
  const { notifications, readNotifications, markAllNotificationsRead } = useApp()
  const now = Date.now()

  const groups = [
    { label: 'Today', items: notifications.filter((n) => now - n.timestamp < DAY) },
    { label: 'This week', items: notifications.filter((n) => now - n.timestamp >= DAY && now - n.timestamp < WEEK) },
    { label: 'Earlier', items: notifications.filter((n) => now - n.timestamp >= WEEK) },
  ].filter((g) => g.items.length > 0)

  const hasUnread = notifications.some((n) => !n.read && !readNotifications.includes(n.id))

  return (
    <div className="mx-auto max-w-[600px] px-3 sm:px-4 pt-4 md:pt-8 pb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Notifications</h1>
        {hasUnread && (
          <button
            type="button"
            onClick={markAllNotificationsRead}
            className="text-sm font-semibold text-accent hover:text-accent-deep"
          >
            Mark all as read
          </button>
        )}
      </div>

      {groups.map((group) => (
        <section key={group.label} aria-label={group.label} className="mb-5">
          <h2 className="text-sm font-bold px-1 mb-1.5">{group.label}</h2>
          <ul className="space-y-0.5">
            {group.items.map((n) => (
              <NotificationRow key={n.id} n={n} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
