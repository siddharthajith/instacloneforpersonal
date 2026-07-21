import { Link } from 'react-router-dom'
import { formatCount, formatDuration, timeAgo } from '../../utils/format.js'
import { getChannel } from '../../data/videoMockData.js'
import Avatar from '../ui/Avatar.jsx'
import Icon from '../ui/Icon.jsx'
import VerifiedBadge from '../ui/VerifiedBadge.jsx'
import { useVideo } from '../../context/VideoContext.jsx'

export default function VideoCard({ video, layout = 'grid', showMenu = true }) {
  const channel = getChannel(video.channelId)
  const { toggleWatchLater, watchLater } = useVideo()
  const inLater = watchLater.includes(video.id)
  const watchPath = video.type === 'short' ? `/video/shorts?v=${video.id}` : `/video/watch/${video.id}`

  if (layout === 'list') {
    return (
      <Link to={watchPath} className="flex gap-3 p-2 rounded-xl hover:bg-stone-50 transition-colors group">
        <div className="relative shrink-0 w-40 sm:w-48 aspect-video rounded-xl overflow-hidden bg-stone-100">
          <img src={video.thumbnail} alt="" className="w-full h-full object-cover" loading="lazy" />
          <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-white text-[11px] font-medium">
            {formatDuration(video.duration)}
          </span>
        </div>
        <div className="min-w-0 flex-1 py-0.5">
          <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-accent transition-colors">{video.title}</h3>
          <p className="text-xs text-ink-soft mt-1 flex items-center gap-1">
            {channel?.name}
            {channel?.verified && <VerifiedBadge size={12} />}
          </p>
          <p className="text-xs text-ink-faint mt-0.5">{formatCount(video.views)} views · {timeAgo(video.timestamp)}</p>
        </div>
      </Link>
    )
  }

  return (
    <article className="group">
      <Link to={watchPath} className="block">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-stone-100 mb-3">
          <img
            src={video.thumbnail}
            alt=""
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-white text-[11px] font-medium">
            {formatDuration(video.duration)}
          </span>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); toggleWatchLater(video.id) }}
              className="px-2.5 py-1.5 rounded-lg bg-black/70 text-white text-xs font-medium hover:bg-black/85"
              aria-label={inLater ? 'Remove from Watch Later' : 'Save to Watch Later'}
            >
              {inLater ? 'Saved' : 'Watch later'}
            </button>
            <span className="px-2.5 py-1.5 rounded-lg bg-black/70 text-white text-xs font-medium">Add to queue</span>
          </div>
        </div>
      </Link>
      <div className="flex gap-3">
        <Link to={`/video/channel/${video.channelId}`} className="shrink-0">
          <Avatar src={channel?.avatar} alt="" size="sm" />
        </Link>
        <div className="min-w-0 flex-1">
          <Link to={watchPath}>
            <h3 className="text-sm font-semibold line-clamp-2 leading-snug group-hover:text-accent transition-colors">
              {video.title}
            </h3>
          </Link>
          <Link to={`/video/channel/${video.channelId}`} className="text-xs text-ink-soft mt-1 flex items-center gap-1 hover:text-ink">
            {channel?.name}
            {channel?.verified && <VerifiedBadge size={12} />}
          </Link>
          <p className="text-xs text-ink-faint mt-0.5">
            {formatCount(video.views)} views · {timeAgo(video.timestamp)}
          </p>
        </div>
        {showMenu && (
          <button type="button" className="shrink-0 p-1.5 h-fit rounded-full hover:bg-stone-100 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="More actions">
            <Icon name="dots" size={18} />
          </button>
        )}
      </div>
    </article>
  )
}
