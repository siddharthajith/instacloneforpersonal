import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import Avatar from '../ui/Avatar.jsx'
import VerifiedBadge from '../ui/VerifiedBadge.jsx'
import { getChannel } from '../../data/videoMockData.js'
import { formatCount } from '../../utils/format.js'
import { useVideo } from '../../context/VideoContext.jsx'

export default function ShortVideoPlayer({ shorts, initialIndex = 0 }) {
  const [index, setIndex] = useState(initialIndex)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const { toggleVideoLike, likedVideos, toggleSubscription, subscriptions } = useVideo()

  const short = shorts[index]
  const channel = short ? getChannel(short.channelId) : null
  const liked = short && likedVideos.includes(short.id)
  const subscribed = channel && subscriptions.includes(channel.id)

  useEffect(() => {
    setIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    const v = videoRef.current
    if (!v || !short) return
    v.muted = muted
    if (playing) v.play().catch(() => {})
    else v.pause()
  }, [index, playing, muted, short])

  const scrollTo = (dir) => {
    setIndex((i) => Math.max(0, Math.min(shorts.length - 1, i + dir)))
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 30) return
      e.preventDefault()
      scrollTo(e.deltaY > 0 ? 1 : -1)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [shorts.length])

  if (!short) return null

  return (
    <div ref={containerRef} className="h-dvh flex items-center justify-center bg-black snap-y snap-mandatory overflow-hidden">
      <div className="relative h-full max-h-dvh aspect-[9/16] max-w-full bg-stone-900 snap-center">
        <video
          ref={videoRef}
          key={short.id}
          src={short.src}
          poster={short.poster}
          className="w-full h-full object-cover"
          loop
          playsInline
          onClick={() => setPlaying((p) => !p)}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        <div className="absolute bottom-0 left-0 right-16 p-4 text-white pointer-events-none">
          <Link to={`/video/channel/${channel?.id}`} className="flex items-center gap-2 pointer-events-auto mb-2">
            <Avatar src={channel?.avatar} alt="" size="sm" />
            <span className="font-semibold text-sm flex items-center gap-1">
              {channel?.name}
              {channel?.verified && <VerifiedBadge size={12} />}
            </span>
          </Link>
          <p className="text-sm font-medium line-clamp-2">{short.caption}</p>
          <p className="text-xs text-white/70 mt-1 flex items-center gap-1">
            <Icon name="music" size={14} /> {short.audio}
          </p>
        </div>

        <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5">
          <button type="button" onClick={() => toggleVideoLike(short.id)} className="flex flex-col items-center gap-1 text-white" aria-label="Like">
            <span className={`p-2.5 rounded-full ${liked ? 'bg-danger/20 text-danger' : 'bg-black/30'}`}>
              <Icon name="heart" size={24} filled={liked} />
            </span>
            <span className="text-xs">{formatCount(short.likes)}</span>
          </button>
          <button type="button" className="flex flex-col items-center gap-1 text-white" aria-label="Comment">
            <span className="p-2.5 rounded-full bg-black/30"><Icon name="comment" size={24} /></span>
            <span className="text-xs">Comment</span>
          </button>
          <button type="button" className="flex flex-col items-center gap-1 text-white" aria-label="Share">
            <span className="p-2.5 rounded-full bg-black/30"><Icon name="share" size={24} /></span>
            <span className="text-xs">Share</span>
          </button>
          <button type="button" className="flex flex-col items-center gap-1 text-white" aria-label="Save">
            <span className="p-2.5 rounded-full bg-black/30"><Icon name="bookmark" size={24} /></span>
            <span className="text-xs">Save</span>
          </button>
          {channel && (
            <button
              type="button"
              onClick={() => toggleSubscription(channel.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${subscribed ? 'bg-white/20' : 'bg-white text-black'}`}
            >
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white"
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          <Icon name={muted ? 'volumeOff' : 'volumeOn'} size={20} />
        </button>

        {!playing && (
          <button type="button" onClick={() => setPlaying(true)} className="absolute inset-0 flex items-center justify-center" aria-label="Play">
            <span className="p-4 rounded-full bg-black/50 text-white"><Icon name="play" size={40} filled /></span>
          </button>
        )}
      </div>
    </div>
  )
}
