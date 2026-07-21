import { useParams, Navigate } from 'react-router-dom'
import { PlaylistHeader } from '../../components/video/PlaylistCard.jsx'
import VideoCard from '../../components/video/VideoCard.jsx'
import { getPlaylist, getPlaylistVideos } from '../../data/videoMockData.js'

export default function VideoPlaylistPage() {
  const { playlistId } = useParams()
  const playlist = getPlaylist(playlistId)
  const videos = getPlaylistVideos(playlistId)

  if (!playlist) return <Navigate to="/video" replace />

  return (
    <div className="animate-fade-in">
      <PlaylistHeader playlist={playlist} />
      <div className="px-4 sm:px-6 py-4 space-y-1 max-w-4xl">
        {videos.map((v, i) => (
          <div key={v.id} className="flex gap-3 items-start">
            <span className="text-sm text-ink-faint w-6 pt-4 text-right shrink-0">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <VideoCard video={v} layout="list" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
