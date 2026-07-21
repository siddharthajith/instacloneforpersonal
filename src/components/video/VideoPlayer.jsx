import { useRef, useState, useEffect, useCallback } from 'react'
import Icon from '../ui/Icon.jsx'
import { formatDuration } from '../../utils/format.js'

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2]
const QUALITIES = ['Auto', '1080p', '720p', '480p', '360p']

export default function VideoPlayer({ src, poster, title, onProgress, autoPlay = true }) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [quality, setQuality] = useState('Auto')
  const [theatre, setTheatre] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [menu, setMenu] = useState(null)
  const hideTimer = useRef(null)

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else { v.pause(); setPlaying(false) }
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v || !autoPlay) return
    const tryPlay = () => {
      const p = v.play()
      if (p && typeof p.then === 'function') {
        p.then(() => setPlaying(true)).catch(() => {
          v.muted = true
          setMuted(true)
          v.play().then(() => setPlaying(true)).catch(() => {})
        })
      }
    }
    if (v.readyState >= 2) tryPlay()
    else v.addEventListener('loadeddata', tryPlay, { once: true })
    return () => v.removeEventListener('loadeddata', tryPlay)
  }, [src, autoPlay])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTime = () => {
      setCurrent(v.currentTime)
      onProgress?.(v.currentTime)
    }
    const onMeta = () => setDuration(v.duration || 0)
    const onEnd = () => setPlaying(false)
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('ended', onEnd)
    return () => {
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('ended', onEnd)
    }
  }, [onProgress, src])

  const seek = (e) => {
    const v = videoRef.current
    if (!v || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    v.currentTime = pct * duration
  }

  const toggleFullscreen = () => {
    const el = containerRef.current
    if (!el) return
    if (document.fullscreenElement) document.exitFullscreen()
    else el.requestFullscreen?.()
  }

  const bumpControls = () => {
    setShowControls(true)
    clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setShowControls(false), 3000)
  }

  return (
    <div
      ref={containerRef}
      className={`relative bg-black group ${theatre ? 'max-w-none' : ''}`}
      onMouseMove={bumpControls}
      onTouchStart={bumpControls}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={`w-full bg-black ${theatre ? 'max-h-[85vh]' : 'aspect-video'}`}
        onClick={togglePlay}
        playsInline
        aria-label={title}
      />

      <div
        className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="px-3 pb-3 pt-8">
          <div
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={duration}
            aria-valuenow={current}
            className="h-1.5 rounded-full bg-white/30 cursor-pointer mb-3 group/progress"
            onClick={seek}
          >
            <div
              className="h-full rounded-full bg-accent relative"
              style={{ width: `${duration ? (current / duration) * 100 : 0}%` }}
            >
              <span className="absolute right-0 top-1/2 -translate-y-1/2 size-3 rounded-full bg-accent opacity-0 group-hover/progress:opacity-100" />
            </div>
          </div>

          <div className="flex items-center gap-2 text-white">
            <button type="button" onClick={togglePlay} className="p-2 rounded-full hover:bg-white/15" aria-label={playing ? 'Pause' : 'Play'}>
              <Icon name={playing ? 'pause' : 'play'} size={22} filled={!playing} />
            </button>
            <button type="button" onClick={() => { setMuted((m) => !m); if (videoRef.current) videoRef.current.muted = !muted }} className="p-2 rounded-full hover:bg-white/15" aria-label={muted ? 'Unmute' : 'Mute'}>
              <Icon name={muted ? 'volumeOff' : 'volumeOn'} size={20} />
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(e) => {
                const val = Number(e.target.value)
                setVolume(val)
                if (videoRef.current) { videoRef.current.volume = val; videoRef.current.muted = val === 0; setMuted(val === 0) }
              }}
              className="w-16 hidden sm:block accent-white"
              aria-label="Volume"
            />
            <span className="text-xs font-medium tabular-nums ml-1">
              {formatDuration(current)} / {formatDuration(duration)}
            </span>
            <div className="flex-1" />
            <div className="relative">
              <button type="button" onClick={() => setMenu(menu === 'speed' ? null : 'speed')} className="px-2 py-1 text-xs font-medium rounded hover:bg-white/15">{speed}x</button>
              {menu === 'speed' && (
                <div className="absolute bottom-full right-0 mb-2 bg-stone-900 rounded-lg py-1 min-w-24 shadow-lg">
                  {SPEEDS.map((s) => (
                    <button key={s} type="button" onClick={() => { setSpeed(s); if (videoRef.current) videoRef.current.playbackRate = s; setMenu(null) }} className={`block w-full px-3 py-1.5 text-xs text-left hover:bg-white/10 ${speed === s ? 'text-accent' : ''}`}>{s}x</button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative hidden sm:block">
              <button type="button" onClick={() => setMenu(menu === 'quality' ? null : 'quality')} className="px-2 py-1 text-xs font-medium rounded hover:bg-white/15">{quality}</button>
              {menu === 'quality' && (
                <div className="absolute bottom-full right-0 mb-2 bg-stone-900 rounded-lg py-1 min-w-24 shadow-lg">
                  {QUALITIES.map((q) => (
                    <button key={q} type="button" onClick={() => { setQuality(q); setMenu(null) }} className={`block w-full px-3 py-1.5 text-xs text-left hover:bg-white/10 ${quality === q ? 'text-accent' : ''}`}>{q}</button>
                  ))}
                </div>
              )}
            </div>
            <button type="button" className="p-2 rounded-full hover:bg-white/15 hidden sm:block" aria-label="Captions (placeholder)">
              <Icon name="captions" size={20} />
            </button>
            <button type="button" className="p-2 rounded-full hover:bg-white/15 hidden md:block" aria-label="Picture in picture (placeholder)">
              <Icon name="pip" size={20} />
            </button>
            <button type="button" onClick={() => setTheatre((t) => !t)} className="p-2 rounded-full hover:bg-white/15 hidden md:block" aria-label="Theatre mode">
              <Icon name="theater" size={20} />
            </button>
            <button type="button" onClick={toggleFullscreen} className="p-2 rounded-full hover:bg-white/15" aria-label="Fullscreen">
              <Icon name="fullscreen" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
