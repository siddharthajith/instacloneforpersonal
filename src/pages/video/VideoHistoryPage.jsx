import { getVideo } from '../../data/videoMockData.js'
import { timeAgo } from '../../utils/format.js'
import VideoCard from '../../components/video/VideoCard.jsx'
import Button from '../../components/ui/Button.jsx'
import { useVideo } from '../../context/VideoContext.jsx'

export default function VideoHistoryPage() {
  const {
    watchHistory, historyPaused, setHistoryPaused,
    clearHistory, removeFromHistory,
  } = useVideo()

  const items = watchHistory.map((h) => ({ ...h, video: getVideo(h.videoId) })).filter((h) => h.video)

  return (
    <div className="px-4 sm:px-6 py-4 animate-fade-in max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Watch history</h1>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setHistoryPaused(!historyPaused)}
          >
            {historyPaused ? 'Resume history' : 'Pause history'}
          </Button>
          <Button variant="secondary" size="sm" onClick={clearHistory} disabled={!items.length}>
            Clear all
          </Button>
        </div>
      </div>

      {historyPaused && (
        <p className="text-sm text-ink-soft bg-stone-100 border border-line rounded-xl px-4 py-3 mb-4">
          Watch history is paused. Videos you watch will not be saved.
        </p>
      )}

      {!items.length ? (
        <p className="text-center text-ink-faint py-16 text-sm">No watch history yet.</p>
      ) : (
        <div className="space-y-1">
          {items.map(({ videoId, watchedAt, video }) => (
            <div key={`${videoId}-${watchedAt}`} className="flex items-start gap-2 group">
              <div className="flex-1 min-w-0">
                <VideoCard video={video} layout="list" />
                <p className="text-xs text-ink-faint px-2 -mt-1">Watched {timeAgo(watchedAt)}</p>
              </div>
              <button
                type="button"
                onClick={() => removeFromHistory(videoId)}
                className="shrink-0 p-2 text-ink-faint hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove from history"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
