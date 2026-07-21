import VideoCard from './VideoCard.jsx'

export default function VideoGrid({ videos, layout = 'grid', className = '' }) {
  if (!videos.length) {
    return (
      <div className={`text-center py-16 text-ink-faint ${className}`}>
        <p className="text-sm">No videos found.</p>
      </div>
    )
  }

  if (layout === 'list') {
    return (
      <div className={`flex flex-col gap-1 ${className}`}>
        {videos.map((v) => <VideoCard key={v.id} video={v} layout="list" />)}
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 ${className}`}>
      {videos.map((v) => <VideoCard key={v.id} video={v} />)}
    </div>
  )
}
