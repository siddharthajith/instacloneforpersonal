import { useState, useRef } from 'react'
import Icon from '../ui/Icon.jsx'

function VideoTile({ media, className = '' }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

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

  return (
    <div className={`relative w-full h-full ${className}`}>
      <video
        ref={videoRef}
        src={media.src}
        poster={media.poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        onClick={togglePlay}
      />
      {!playing && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Play video"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="size-16 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-105">
            <Icon name="play" size={30} />
          </span>
        </button>
      )}
      {playing && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Pause video"
          className="absolute inset-0"
        />
      )}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); setMuted((m) => !m) }}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="absolute bottom-3 right-3 size-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/75 transition"
      >
        <Icon name={muted ? 'volumeOff' : 'volumeOn'} size={16} />
      </button>
    </div>
  )
}

export default function PostMedia({ post, onDoubleClick, rounded = false, desktopFill = false }) {
  const [slide, setSlide] = useState(0)
  const isCarousel = post.media.length > 1
  const aspect = post.aspect === '4/5' ? 'aspect-[4/5]' : post.aspect === '16/9' ? 'aspect-video' : 'aspect-square'

  return (
    <div
      className={`relative w-full ${aspect} ${desktopFill ? 'md:aspect-auto md:h-full' : ''} bg-stone-100 overflow-hidden select-none ${rounded ? 'rounded-xl' : ''}`}
      onDoubleClick={onDoubleClick}
    >
      <div
        className="flex h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${slide * 100}%)` }}
      >
        {post.media.map((m, i) => (
          <div key={i} className="w-full h-full shrink-0">
            {m.type === 'video' ? (
              <VideoTile media={m} />
            ) : (
              <img
                src={m.src}
                alt={post.caption ? `Post: ${post.caption.slice(0, 80)}` : 'Post media'}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      {isCarousel && (
        <>
          {slide > 0 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setSlide((s) => s - 1) }}
              aria-label="Previous slide"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 size-7 rounded-full bg-white/90 text-ink shadow flex items-center justify-center hover:bg-white transition"
            >
              <Icon name="chevronLeft" size={16} />
            </button>
          )}
          {slide < post.media.length - 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setSlide((s) => s + 1) }}
              aria-label="Next slide"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 size-7 rounded-full bg-white/90 text-ink shadow flex items-center justify-center hover:bg-white transition"
            >
              <Icon name="chevronRight" size={16} />
            </button>
          )}
          <div className="absolute top-3 right-3 rounded-full bg-black/60 text-white text-[11px] font-semibold px-2 py-0.5">
            {slide + 1}/{post.media.length}
          </div>
          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5" aria-hidden="true">
            {post.media.map((_, i) => (
              <span
                key={i}
                className={`size-1.5 rounded-full transition-colors duration-200 ${i === slide ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
