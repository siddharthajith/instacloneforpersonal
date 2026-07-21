import { Link } from 'react-router-dom'
import { formatDuration } from '../../utils/format.js'
import { getChannel, getPlaylistVideos } from '../../data/videoMockData.js'
import Icon from '../ui/Icon.jsx'
import Button from '../ui/Button.jsx'
import { useVideo } from '../../context/VideoContext.jsx'

export default function PlaylistCard({ playlist, compact = false }) {
  const channel = getChannel(playlist.channelId)
  const videos = getPlaylistVideos(playlist.id)
  const totalDuration = videos.reduce((s, v) => s + (v?.duration ?? 0), 0)

  if (compact) {
    return (
      <Link to={`/video/playlist/${playlist.id}`} className="shrink-0 w-56 group">
        <div className="aspect-video rounded-xl overflow-hidden bg-stone-100 mb-2 relative">
          <img src={playlist.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-white text-[10px] font-medium flex items-center gap-1">
            <Icon name="list" size={12} /> {videos.length}
          </span>
        </div>
        <h3 className="text-sm font-semibold line-clamp-2">{playlist.title}</h3>
        <p className="text-xs text-ink-faint mt-0.5">View full playlist</p>
      </Link>
    )
  }

  return (
    <Link to={`/video/playlist/${playlist.id}`} className="flex gap-4 p-3 rounded-xl hover:bg-stone-50 transition-colors group">
      <div className="relative shrink-0 w-48 aspect-video rounded-xl overflow-hidden bg-stone-100">
        <img src={playlist.thumbnail} alt="" className="w-full h-full object-cover" />
        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-white text-[10px] font-medium">
          {formatDuration(totalDuration)}
        </span>
      </div>
      <div className="min-w-0">
        <h3 className="font-semibold group-hover:text-accent transition-colors">{playlist.title}</h3>
        <p className="text-sm text-ink-soft mt-1">{channel?.name}</p>
        <p className="text-xs text-ink-faint mt-1">{videos.length} videos · {playlist.description.slice(0, 60)}…</p>
      </div>
    </Link>
  )
}

export function PlaylistHeader({ playlist }) {
  const channel = getChannel(playlist.channelId)
  const videos = getPlaylistVideos(playlist.id)
  const totalDuration = videos.reduce((s, v) => s + (v?.duration ?? 0), 0)
  const { savedPlaylists, toggleSavedPlaylist } = useVideo()
  const saved = savedPlaylists.includes(playlist.id)

  return (
    <header className="flex flex-col sm:flex-row gap-6 p-4 sm:p-6">
      <div className="shrink-0 w-full sm:w-80 aspect-video rounded-xl overflow-hidden bg-stone-100">
        <img src={playlist.thumbnail} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">Playlist</p>
        <h1 className="text-2xl font-bold mt-1">{playlist.title}</h1>
        <Link to={`/video/channel/${channel?.id}`} className="text-sm text-ink-soft hover:text-accent mt-2 inline-block">{channel?.name}</Link>
        <p className="text-sm text-ink-faint mt-1">{videos.length} videos · {formatDuration(totalDuration)} total</p>
        <p className="text-sm text-ink-soft mt-3 max-w-xl">{playlist.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Button variant="primary"><Icon name="play" size={18} filled /> Play all</Button>
          <Button variant="secondary"><Icon name="shuffle" size={18} /> Shuffle</Button>
          <Button variant="secondary" onClick={() => toggleSavedPlaylist(playlist.id)}>
            <Icon name="bookmark" size={18} filled={saved} /> {saved ? 'Saved' : 'Save playlist'}
          </Button>
        </div>
      </div>
    </header>
  )
}
