import { Link } from 'react-router-dom'
import { formatCount, formatDuration, timeAgo } from '../../utils/format.js'
import { getChannel } from '../../data/videoMockData.js'
import Icon from '../ui/Icon.jsx'

export default function RecommendedVideo({ video }) {
  const channel = getChannel(video.channelId)
  const watchPath = video.type === 'short' ? `/video/shorts?v=${video.id}` : `/video/watch/${video.id}`

  return (
    <article className="flex gap-2 group">
      <Link to={watchPath} className="relative shrink-0 w-40 aspect-video rounded-lg overflow-hidden bg-stone-100">
        <img src={video.thumbnail} alt="" className="w-full h-full object-cover" loading="lazy" />
        <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/80 text-white text-[10px] font-medium">
          {formatDuration(video.duration)}
        </span>
      </Link>
      <div className="min-w-0 flex-1">
        <Link to={watchPath}>
          <h4 className="text-sm font-semibold line-clamp-2 leading-snug group-hover:text-accent transition-colors">{video.title}</h4>
        </Link>
        <Link to={`/video/channel/${video.channelId}`} className="text-xs text-ink-soft mt-1 block hover:text-ink truncate">
          {channel?.name}
        </Link>
        <p className="text-xs text-ink-faint mt-0.5">{formatCount(video.views)} views · {timeAgo(video.timestamp)}</p>
      </div>
      <button type="button" className="shrink-0 p-1 h-fit opacity-0 group-hover:opacity-100 hover:bg-stone-100 rounded-full" aria-label="More actions">
        <Icon name="dots" size={16} />
      </button>
    </article>
  )
}
