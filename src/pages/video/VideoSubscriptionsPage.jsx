import { useState } from 'react'
import VideoGrid from '../../components/video/VideoGrid.jsx'
import { getChannel, getChannelVideos, PROJECT_ASCEND_ID } from '../../data/videoMockData.js'
import { useVideo } from '../../context/VideoContext.jsx'
import { timeAgo } from '../../utils/format.js'

export default function VideoSubscriptionsPage() {
  const { subscriptions } = useVideo()
  const [view, setView] = useState('grid')
  const [channelFilter, setChannelFilter] = useState('all')

  const subVideos = subscriptions
    .filter((id) => channelFilter === 'all' || id === channelFilter)
    .flatMap((id) => getChannelVideos(id, 'video'))
    .sort((a, b) => b.timestamp - a.timestamp)

  const pa = getChannel(PROJECT_ASCEND_ID)
  const paShorts = getChannelVideos(PROJECT_ASCEND_ID, 'short').slice(0, 6)

  const groups = subVideos.reduce((acc, v) => {
    const day = new Date(v.timestamp).toDateString()
    if (!acc[day]) acc[day] = []
    acc[day].push(v)
    return acc
  }, {})

  return (
    <div className="px-4 sm:px-6 py-4 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Subscriptions</h1>
        <div className="flex items-center gap-2">
          <select
            value={channelFilter}
            onChange={(e) => setChannelFilter(e.target.value)}
            className="px-3 py-1.5 border border-line rounded-lg text-sm bg-card"
            aria-label="Filter by channel"
          >
            <option value="all">All channels</option>
            {subscriptions.map((id) => {
              const ch = getChannel(id)
              return ch ? <option key={id} value={id}>{ch.name}</option> : null
            })}
          </select>
          <button
            type="button"
            onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
            className="px-3 py-1.5 border border-line rounded-lg text-sm hover:bg-stone-50"
          >
            {view === 'grid' ? 'List view' : 'Grid view'}
          </button>
        </div>
      </div>

      {pa && subscriptions.includes(PROJECT_ASCEND_ID) && (
        <section className="mb-8 p-4 rounded-xl border border-line bg-accent-soft/30">
          <h2 className="font-bold text-accent">Latest from Project Ascend</h2>
          <p className="text-sm text-ink-soft mt-1">{pa.description.slice(0, 120)}…</p>
        </section>
      )}

      <section className="mb-8">
        <h2 className="font-bold mb-3">Short videos</h2>
        <VideoGrid videos={paShorts} layout={view} />
      </section>

      <section className="mb-6 p-4 rounded-xl border border-dashed border-line text-center text-sm text-ink-faint">
        Live content placeholder — Project Ascend Studio Q&A starting soon
      </section>

      {Object.entries(groups).map(([day, vids]) => (
        <section key={day} className="mb-8">
          <h2 className="text-sm font-semibold text-ink-faint mb-3">{day === new Date().toDateString() ? 'Today' : day} · {timeAgo(vids[0].timestamp)}</h2>
          <VideoGrid videos={vids} layout={view} />
        </section>
      ))}

      {!subVideos.length && (
        <p className="text-center text-ink-faint py-16 text-sm">Subscribe to channels to see their latest uploads here.</p>
      )}
    </div>
  )
}
