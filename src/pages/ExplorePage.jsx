import { useState, useEffect } from 'react'
import Icon from '../components/ui/Icon.jsx'
import Modal from '../components/ui/Modal.jsx'
import Skeleton from '../components/ui/Skeleton.jsx'
import PostDetailView from '../components/feed/PostDetailView.jsx'
import { explorePosts } from '../data/mockData.js'
import { formatCount } from '../utils/format.js'

function ExploreTile({ post, tall, onOpen }) {
  const media = post.media[0]
  const src = media.type === 'video' ? media.poster : media.src

  return (
    <button
      type="button"
      onClick={() => onOpen(post)}
      aria-label={`Open post: ${post.caption.slice(0, 60)}`}
      className={`group relative overflow-hidden bg-stone-100 ${tall ? 'row-span-2' : ''}`}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      {media.type === 'video' && (
        <span className="absolute top-2.5 right-2.5 text-white drop-shadow" aria-label="Video post">
          <Icon name="play" size={20} />
        </span>
      )}
      {post.media.length > 1 && (
        <span className="absolute top-2.5 right-2.5 text-white drop-shadow" aria-label="Carousel post">
          <Icon name="carousel" size={18} />
        </span>
      )}
      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-200 flex items-center justify-center gap-5 text-white font-semibold opacity-0 group-hover:opacity-100">
        <span className="flex items-center gap-1.5">
          <Icon name="heart" size={19} filled /> {formatCount(post.likes)}
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="comment" size={19} filled /> {formatCount(post.totalComments)}
        </span>
      </span>
    </button>
  )
}

export default function ExplorePage() {
  const [active, setActive] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="mx-auto max-w-[1000px] px-1 sm:px-4 pt-2 md:pt-8 pb-8">
      <h1 className="sr-only">Explore</h1>
      {loading ? (
        <div className="grid grid-cols-3 gap-1 auto-rows-[minmax(110px,32vw)] sm:auto-rows-[220px]">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className={`rounded-none ${i % 5 === 1 ? 'row-span-2' : ''}`} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1 auto-rows-[minmax(110px,32vw)] sm:auto-rows-[220px] animate-fade-in">
          {explorePosts.map((post, i) => (
            <ExploreTile key={post.id} post={post} tall={i % 5 === 1} onOpen={setActive} />
          ))}
        </div>
      )}

      <Modal open={!!active} onClose={() => setActive(null)} label="Post detail">
        {active && <PostDetailView post={active} />}
      </Modal>
    </div>
  )
}
