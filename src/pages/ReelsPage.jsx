import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/ui/Icon.jsx'
import Avatar from '../components/ui/Avatar.jsx'
import VerifiedBadge from '../components/ui/VerifiedBadge.jsx'
import { useApp } from '../context/AppContext.jsx'
import { reels, getUser } from '../data/mockData.js'
import { formatCount } from '../utils/format.js'

function ReelItem({ reel, muted, onToggleMute }) {
  const { likedReels, toggleReelLike, savedReels, toggleReelSave, followed, toggleFollow } = useApp()
  const user = getUser(reel.userId)
  if (!user) return null
  const liked = likedReels.includes(reel.id)
  const saved = savedReels.includes(reel.id)
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          video.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
        } else {
          video.pause()
          setPlaying(false)
        }
      },
      { threshold: [0, 0.6, 1] },
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  const onTimeUpdate = () => {
    const v = videoRef.current
    if (v?.duration) setProgress((v.currentTime / v.duration) * 100)
  }

  const actionBtn = 'flex flex-col items-center gap-1 text-white'

  return (
    <section
      ref={containerRef}
      aria-label={`Clip by ${user.username}`}
      className="relative h-dvh md:h-[calc(100dvh-32px)] snap-start flex items-center justify-center md:py-2"
    >
      <div className="relative h-full w-full md:w-auto md:aspect-[9/16] md:rounded-2xl overflow-hidden bg-stone-900">
        <video
          ref={videoRef}
          src={reel.video}
          poster={reel.poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onTimeUpdate={onTimeUpdate}
          onClick={togglePlay}
          className="h-full w-full object-cover cursor-pointer"
        />

        {!playing && (
          <button type="button" onClick={togglePlay} aria-label="Play video" className="absolute inset-0 flex items-center justify-center">
            <span className="size-16 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-sm">
              <Icon name="play" size={30} />
            </span>
          </button>
        )}

        <div className="absolute bottom-14 md:bottom-0 inset-x-0 h-0.5 bg-white/25" aria-hidden="true">
          <div className="h-full bg-white transition-[width] duration-200 ease-linear" style={{ width: `${progress}%` }} />
        </div>

        <button
          type="button"
          onClick={onToggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
          className="absolute top-4 right-4 size-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
        >
          <Icon name={muted ? 'volumeOff' : 'volumeOn'} size={17} />
        </button>

        <div className="absolute bottom-[72px] md:bottom-4 left-4 right-16 text-white">
          <div className="flex items-center gap-2.5 mb-2.5">
            <Link to={`/profile/${user.username}`}>
              <Avatar src={user.avatar} alt="" size="sm" />
            </Link>
            <Link to={`/profile/${user.username}`} className="flex items-center gap-1 text-sm font-semibold drop-shadow">
              {user.username}
              {user.verified && <VerifiedBadge size={13} />}
            </Link>
            <button
              type="button"
              onClick={() => toggleFollow(user.id)}
              className="text-xs font-semibold border border-white/80 rounded-md px-2.5 py-1 hover:bg-white/15 transition"
            >
              {followed.includes(user.id) ? 'Following' : 'Follow'}
            </button>
          </div>
          <p className="text-sm leading-snug line-clamp-2 drop-shadow">{reel.caption}</p>
          <p className="flex items-center gap-1.5 text-xs mt-2 text-white/85">
            <Icon name="music" size={13} />
            <span className="truncate">{reel.audio}</span>
          </p>
        </div>

        <div className="absolute bottom-[76px] md:bottom-5 right-3 flex flex-col gap-5">
          <button
            type="button"
            onClick={() => toggleReelLike(reel.id)}
            aria-label={liked ? 'Unlike' : 'Like'}
            aria-pressed={liked}
            className={actionBtn}
          >
            <Icon name="heart" size={28} filled={liked} className={liked ? 'text-danger animate-like-pop' : 'drop-shadow'} />
            <span className="text-xs font-semibold drop-shadow">{formatCount(reel.likes + (liked ? 1 : 0))}</span>
          </button>
          <button type="button" aria-label="Comments" className={actionBtn}>
            <Icon name="comment" size={28} className="drop-shadow" />
            <span className="text-xs font-semibold drop-shadow">{formatCount(reel.comments)}</span>
          </button>
          <button type="button" aria-label="Share" className={actionBtn}>
            <Icon name="share" size={28} className="drop-shadow" />
            <span className="text-xs font-semibold drop-shadow">{formatCount(reel.shares)}</span>
          </button>
          <button
            type="button"
            onClick={() => toggleReelSave(reel.id)}
            aria-label={saved ? 'Unsave' : 'Save'}
            aria-pressed={saved}
            className={actionBtn}
          >
            <Icon name="bookmark" size={26} filled={saved} className="drop-shadow" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default function ReelsPage() {
  const [muted, setMuted] = useState(true)
  const toggleMute = useCallback(() => setMuted((m) => !m), [])

  return (
    <div className="h-dvh overflow-y-auto snap-y snap-mandatory scrollbar-none bg-stone-950 md:bg-canvas md:py-4">
      <h1 className="sr-only">Clips</h1>
      {reels.map((reel) => (
        <ReelItem key={reel.id} reel={reel} muted={muted} onToggleMute={toggleMute} />
      ))}
    </div>
  )
}
