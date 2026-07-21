import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import VideoGrid from '../../components/video/VideoGrid.jsx'
import { ChannelCard } from '../../components/video/ChannelHeader.jsx'
import PlaylistCard from '../../components/video/PlaylistCard.jsx'
import { searchVideoContent } from '../../data/videoMockData.js'
import { useVideo } from '../../context/VideoContext.jsx'

export default function VideoSearchPage() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const [type, setType] = useState('all')
  const [sort, setSort] = useState('relevance')
  const [duration, setDuration] = useState('any')
  const { addRecentVideoSearch } = useVideo()

  const results = useMemo(() => {
    if (!q.trim()) return { channels: [], videos: [], shorts: [], playlists: [] }
    return searchVideoContent(q)
  }, [q])

  useEffect(() => {
    if (q.trim()) addRecentVideoSearch(q.trim())
  }, [q, addRecentVideoSearch])

  const filterVideos = (list) => {
    let out = [...list]
    if (duration === 'short') out = out.filter((v) => v.duration < 240)
    if (duration === 'medium') out = out.filter((v) => v.duration >= 240 && v.duration <= 1200)
    if (duration === 'long') out = out.filter((v) => v.duration > 1200)
    if (sort === 'date') out.sort((a, b) => b.timestamp - a.timestamp)
    if (sort === 'views') out.sort((a, b) => b.views - a.views)
    return out
  }

  const show = (section) => type === 'all' || type === section

  return (
    <div className="px-4 sm:px-6 py-4 animate-fade-in max-w-6xl mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const fd = new FormData(e.target)
          setParams({ q: fd.get('q') })
        }}
        className="flex gap-2 mb-6"
      >
        <input
          name="q"
          defaultValue={q}
          placeholder="Search"
          className="flex-1 px-4 py-2.5 border border-line rounded-full text-sm bg-card"
          aria-label="Search query"
        />
        <button type="submit" className="px-5 py-2.5 rounded-full bg-ink text-white text-sm font-semibold">Search</button>
      </form>

      {q && (
        <div className="flex flex-wrap gap-3 mb-6 text-sm">
          <select value={type} onChange={(e) => setType(e.target.value)} className="px-3 py-1.5 border border-line rounded-lg bg-card">
            <option value="all">All types</option>
            <option value="videos">Videos</option>
            <option value="channels">Channels</option>
            <option value="playlists">Playlists</option>
            <option value="shorts">Short videos</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-1.5 border border-line rounded-lg bg-card">
            <option value="relevance">Relevance</option>
            <option value="date">Upload date</option>
            <option value="views">View count</option>
          </select>
          <select value={duration} onChange={(e) => setDuration(e.target.value)} className="px-3 py-1.5 border border-line rounded-lg bg-card">
            <option value="any">Any duration</option>
            <option value="short">Under 4 min</option>
            <option value="medium">4–20 min</option>
            <option value="long">Over 20 min</option>
          </select>
        </div>
      )}

      {!q && <p className="text-ink-faint text-sm">Search for videos, channels, and playlists.</p>}

      {show('channels') && results.channels.length > 0 && (
        <section className="mb-8">
          <h2 className="font-bold mb-3">Channels</h2>
          {results.channels.map((ch) => (
            <ChannelCard key={ch.id} channel={ch} videoCount={filterVideos(results.videos).length} />
          ))}
        </section>
      )}

      {show('videos') && (
        <section className="mb-8">
          <h2 className="font-bold mb-3">Videos</h2>
          <VideoGrid videos={filterVideos(results.videos)} />
        </section>
      )}

      {show('shorts') && results.shorts.length > 0 && (
        <section className="mb-8">
          <h2 className="font-bold mb-3">Short videos</h2>
          <VideoGrid videos={filterVideos(results.shorts)} />
        </section>
      )}

      {show('playlists') && results.playlists.length > 0 && (
        <section className="mb-8">
          <h2 className="font-bold mb-3">Playlists</h2>
          <div className="space-y-2">
            {results.playlists.map((pl) => <PlaylistCard key={pl.id} playlist={pl} />)}
          </div>
        </section>
      )}

      {q && !results.channels.length && !results.videos.length && !results.shorts.length && !results.playlists.length && (
        <p className="text-center text-ink-faint py-16">No results for &ldquo;{q}&rdquo;</p>
      )}
    </div>
  )
}
