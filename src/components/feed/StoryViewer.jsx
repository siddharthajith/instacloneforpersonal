import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Icon from '../ui/Icon.jsx'
import Avatar from '../ui/Avatar.jsx'
import { useApp } from '../../context/AppContext.jsx'
import { getUser } from '../../data/mockData.js'
import { timeAgo } from '../../utils/format.js'

const DURATION = 5000

export default function StoryViewer({ startIndex, onClose }) {
  const { stories, markStoryViewed } = useApp()
  const [index, setIndex] = useState(startIndex)
  const [paused, setPaused] = useState(false)
  const [reply, setReply] = useState('')

  const story = stories[index]
  const user = getUser(story.userId)

  const goNext = useCallback(() => {
    setIndex((i) => {
      if (i + 1 >= stories.length) {
        onClose()
        return i
      }
      return i + 1
    })
  }, [stories.length, onClose])

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), [])

  useEffect(() => {
    markStoryViewed(story.id)
  }, [story.id, markStoryViewed])

  useEffect(() => {
    if (paused) return
    const t = setTimeout(goNext, DURATION)
    return () => clearTimeout(t)
  }, [index, paused, goNext])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, goNext, goPrev])

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={`Story by ${user.username}`} className="fixed inset-0 z-50 bg-stone-950 flex items-center justify-center animate-fade-in">
      <button type="button" onClick={onClose} aria-label="Close stories" className="absolute top-4 right-4 z-20 text-white/90 hover:text-white p-2">
        <Icon name="close" size={26} />
      </button>

      <button
        type="button"
        onClick={goPrev}
        disabled={index === 0}
        aria-label="Previous story"
        className="hidden sm:flex absolute left-4 md:left-[10%] z-20 size-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 disabled:opacity-30 transition"
      >
        <Icon name="chevronLeft" size={22} />
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next story"
        className="hidden sm:flex absolute right-4 md:right-[10%] z-20 size-10 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 transition"
      >
        <Icon name="chevronRight" size={22} />
      </button>

      <div
        className="relative h-full sm:h-[92vh] w-full sm:w-auto sm:aspect-[9/16] sm:rounded-2xl overflow-hidden bg-stone-900"
        onMouseDown={() => setPaused(true)}
        onMouseUp={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div className="absolute top-0 inset-x-0 z-10 flex gap-1 p-3">
          {stories.map((s, i) => (
            <div key={s.id} className="h-[3px] flex-1 rounded-full bg-white/30 overflow-hidden">
              {i < index && <div className="h-full w-full bg-white" />}
              {i === index && (
                <div
                  key={`${index}-${paused}`}
                  className="h-full bg-white"
                  style={{
                    animation: `story-bar ${DURATION}ms linear forwards`,
                    animationPlayState: paused ? 'paused' : 'running',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="absolute top-6 inset-x-0 z-10 flex items-center gap-2.5 px-3.5">
          <Avatar src={user.avatar} alt="" size="sm" />
          <span className="text-white text-sm font-semibold drop-shadow">{user.username}</span>
          <span className="text-white/70 text-xs">{timeAgo(story.timestamp, true)}</span>
        </div>

        <img src={story.media} alt={`Story by ${user.username}`} className="h-full w-full object-cover" draggable={false} />

        {/* tap zones for mobile */}
        <button type="button" className="absolute inset-y-0 left-0 w-1/3 sm:hidden" aria-label="Previous story" onClick={goPrev} />
        <button type="button" className="absolute inset-y-0 right-0 w-1/3 sm:hidden" aria-label="Next story" onClick={goNext} />

        <form
          className="absolute bottom-0 inset-x-0 z-10 flex items-center gap-2.5 p-3.5 bg-gradient-to-t from-black/50 to-transparent"
          onSubmit={(e) => { e.preventDefault(); setReply('') }}
        >
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder={`Reply to ${user.username}…`}
            aria-label={`Reply to ${user.username}`}
            className="flex-1 bg-transparent border border-white/50 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/70 focus:outline-none focus:border-white"
          />
          <button type="submit" aria-label="Send reply" className="text-white p-1.5 disabled:opacity-40" disabled={!reply.trim()}>
            <Icon name="send" size={22} />
          </button>
        </form>
      </div>
    </div>,
    document.body,
  )
}
