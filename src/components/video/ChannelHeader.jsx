import { Link } from 'react-router-dom'
import { formatCount } from '../../utils/format.js'
import Avatar from '../ui/Avatar.jsx'
import Icon from '../ui/Icon.jsx'
import VerifiedBadge from '../ui/VerifiedBadge.jsx'
import Button from '../ui/Button.jsx'
import { useVideo } from '../../context/VideoContext.jsx'

const TABS = ['Home', 'Videos', 'Short Videos', 'Live', 'Playlists', 'Community', 'About']

export default function ChannelHeader({ channel, activeTab = 'Home', onTabChange, videoCount }) {
  const { subscriptions, channelNotifs, toggleSubscription, toggleChannelNotif } = useVideo()
  const subscribed = subscriptions.includes(channel.id)
  const notifOn = channelNotifs.includes(channel.id)

  return (
    <header className="animate-fade-in">
      <div className="h-28 sm:h-40 md:h-52 lg:h-56 w-full overflow-hidden bg-stone-200">
        <img src={channel.banner} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 relative">
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
          <Avatar src={channel.avatar} alt="" size="2xl" className="ring-4 ring-card shrink-0" />
          <div className="min-w-0 flex-1 pb-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold">{channel.name}</h1>
              {channel.verified && <VerifiedBadge />}
            </div>
            <p className="text-sm text-ink-soft mt-1">
              {channel.handle} · {formatCount(channel.subscribers)} subscribers · {videoCount} videos
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 pb-2">
            <Button
              variant={subscribed ? 'secondary' : 'primary'}
              onClick={() => toggleSubscription(channel.id)}
            >
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
            {subscribed && (
              <button
                type="button"
                onClick={() => toggleChannelNotif(channel.id)}
                className={`p-2.5 rounded-xl border ${notifOn ? 'border-accent bg-accent-soft text-accent' : 'border-line hover:bg-stone-50'}`}
                aria-label={notifOn ? 'Notifications on' : 'Turn on notifications'}
              >
                <Icon name="bell" size={20} />
              </button>
            )}
            <button type="button" className="p-2.5 rounded-xl border border-line hover:bg-stone-50" aria-label="Share channel">
              <Icon name="share" size={20} />
            </button>
            <button type="button" className="p-2.5 rounded-xl border border-line hover:bg-stone-50" aria-label="More options">
              <Icon name="dots" size={20} />
            </button>
          </div>
        </div>
      </div>

      <nav className="flex gap-1 overflow-x-auto scrollbar-none border-b border-line px-4 sm:px-6 lg:px-8 mt-4" aria-label="Channel sections">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange?.(tab)}
            className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-ink text-ink'
                : 'border-transparent text-ink-soft hover:text-ink'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </header>
  )
}

export function ChannelCard({ channel, videoCount }) {
  return (
    <Link to={`/video/channel/${channel.id}`} className="flex gap-4 p-4 rounded-xl border border-line hover:bg-stone-50 transition-colors">
      <Avatar src={channel.avatar} alt="" size="xl" className="shrink-0" />
      <div className="min-w-0">
        <h3 className="font-bold flex items-center gap-1.5">
          {channel.name}
          {channel.verified && <VerifiedBadge size={14} />}
        </h3>
        <p className="text-sm text-ink-soft mt-0.5">{channel.handle}</p>
        <p className="text-xs text-ink-faint mt-1">{formatCount(channel.subscribers)} subscribers · {videoCount} videos</p>
        <p className="text-sm text-ink-soft mt-2 line-clamp-2">{channel.description}</p>
      </div>
    </Link>
  )
}
