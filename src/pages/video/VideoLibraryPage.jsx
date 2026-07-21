import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import VideoGrid from '../../components/video/VideoGrid.jsx'
import PlaylistCard from '../../components/video/PlaylistCard.jsx'
import { getVideo, playlists } from '../../data/videoMockData.js'
import { useVideo } from '../../context/VideoContext.jsx'

const TABS = [
  { id: 'history', label: 'History', to: '/video/history' },
  { id: 'later', label: 'Watch Later' },
  { id: 'liked', label: 'Liked Videos' },
  { id: 'playlists', label: 'Saved playlists' },
  { id: 'yours', label: 'Your videos' },
  { id: 'downloads', label: 'Downloads' },
]

export default function VideoLibraryPage() {
  const [params] = useSearchParams()
  const tab = params.get('tab') || 'later'
  const { watchLater, likedVideos, savedPlaylists, uploadedVideos, allVideos } = useVideo()

  const laterVideos = watchLater.map(getVideo).filter(Boolean)
  const liked = likedVideos.map(getVideo).filter(Boolean)
  const savedPls = playlists.filter((p) => savedPlaylists.includes(p.id))
  const yours = uploadedVideos.length ? uploadedVideos : allVideos.filter((v) => v.uploadedBy)

  const content = () => {
    switch (tab) {
      case 'liked': return <VideoGrid videos={liked} />
      case 'playlists': return savedPls.length ? savedPls.map((pl) => <PlaylistCard key={pl.id} playlist={pl} />) : <Empty text="No saved playlists yet." />
      case 'yours': return yours.length ? <VideoGrid videos={yours} /> : <Empty text="Upload a video to see it here." />
      case 'downloads': return <Empty text="Downloads will appear here when available." />
      default: return laterVideos.length ? <VideoGrid videos={laterVideos} /> : <Empty text="Save videos to watch later." />
    }
  }

  return (
    <div className="px-4 sm:px-6 py-4 animate-fade-in">
      <h1 className="text-2xl font-bold mb-4">Library</h1>
      <nav className="flex gap-2 overflow-x-auto scrollbar-none mb-6">
        {TABS.map((t) => (
          <Link
            key={t.id}
            to={t.to || `/video/library?tab=${t.id}`}
            className={`shrink-0 px-3.5 py-1.5 rounded-lg text-sm font-medium ${
              tab === t.id ? 'bg-ink text-white' : 'bg-stone-100 text-ink-soft hover:bg-stone-200'
            }`}
          >
            {t.label}
          </Link>
        ))}
      </nav>
      <div className="space-y-2">{content()}</div>
    </div>
  )
}

function Empty({ text }) {
  return <p className="text-center text-ink-faint py-16 text-sm">{text}</p>
}
