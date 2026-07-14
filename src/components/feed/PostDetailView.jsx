import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import Avatar from '../ui/Avatar.jsx'
import VerifiedBadge from '../ui/VerifiedBadge.jsx'
import PostMedia from './PostMedia.jsx'
import FollowButton from '../ui/FollowButton.jsx'
import { useApp } from '../../context/AppContext.jsx'
import { getUser } from '../../data/mockData.js'
import { formatCount, timeAgo } from '../../utils/format.js'

export default function PostDetailView({ post }) {
  const {
    likedPosts, toggleLike, likePost, savedPosts, toggleSave,
    userComments, addComment, deleteComment, profile,
  } = useApp()
  const user = getUser(post.userId)
  const liked = likedPosts.includes(post.id)
  const saved = savedPosts.includes(post.id)
  const [comment, setComment] = useState('')
  const [showHeart, setShowHeart] = useState(false)
  const inputRef = useRef(null)
  const myComments = userComments[post.id] || []

  const handleDoubleClick = () => {
    likePost(post.id)
    setShowHeart(true)
    setTimeout(() => setShowHeart(false), 900)
  }

  const submit = (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    addComment(post.id, comment.trim())
    setComment('')
  }

  return (
    <div className="bg-card sm:rounded-xl overflow-hidden flex flex-col md:flex-row w-full h-full sm:w-[90vw] sm:max-w-[1000px] sm:max-h-[88vh] md:h-[min(88vh,760px)]">
      <div className="relative bg-stone-950 md:flex-1 md:min-w-0 flex items-center justify-center">
        <div className="w-full md:h-full flex items-center">
          <PostMedia post={post} onDoubleClick={handleDoubleClick} desktopFill />
        </div>
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Icon name="heart" size={96} filled className="text-white drop-shadow-lg animate-big-heart" />
          </div>
        )}
      </div>

      <div className="flex flex-col w-full md:w-[380px] md:shrink-0 min-h-0 flex-1 md:flex-none">
        <header className="flex items-center gap-3 px-4 py-3.5 border-b border-line">
          <Link to={`/profile/${user.username}`}>
            <Avatar src={user.avatar} alt="" size="sm" />
          </Link>
          <div className="min-w-0 flex-1">
            <Link to={`/profile/${user.username}`} className="flex items-center gap-1 text-sm font-semibold hover:opacity-70">
              {user.username}
              {user.verified && <VerifiedBadge />}
            </Link>
            {post.location && <p className="text-xs text-ink-soft truncate">{post.location}</p>}
          </div>
          {user.id !== 'u0' && <FollowButton userId={user.id} />}
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 min-h-[120px]">
          {post.caption && (
            <div className="flex gap-3">
              <Avatar src={user.avatar} alt="" size="sm" />
              <div className="text-sm leading-relaxed">
                <Link to={`/profile/${user.username}`} className="font-semibold hover:opacity-70">{user.username}</Link>{' '}
                {post.caption}
                {post.hashtags?.length > 0 && (
                  <span className="text-accent"> {post.hashtags.join(' ')}</span>
                )}
                <p className="text-xs text-ink-faint mt-1">{timeAgo(post.timestamp, true)}</p>
              </div>
            </div>
          )}
          {post.comments.map((c) => {
            const cu = getUser(c.userId)
            return (
              <div key={c.id} className="flex gap-3">
                <Link to={`/profile/${cu.username}`}>
                  <Avatar src={cu.avatar} alt="" size="sm" />
                </Link>
                <div className="text-sm leading-relaxed min-w-0">
                  <Link to={`/profile/${cu.username}`} className="font-semibold hover:opacity-70">{cu.username}</Link>{' '}
                  {c.text}
                  <p className="text-xs text-ink-faint mt-1">
                    {timeAgo(c.timestamp, true)}{c.likes > 0 && ` · ${c.likes} likes`}
                  </p>
                </div>
              </div>
            )
          })}
          {myComments.map((c) => (
            <div key={c.id} className="flex gap-3 group">
              <Avatar src={profile.avatar} alt="" size="sm" />
              <div className="text-sm leading-relaxed min-w-0 flex-1">
                <span className="font-semibold">{profile.username}</span> {c.text}
                <p className="text-xs text-ink-faint mt-1">{timeAgo(c.timestamp, true)}</p>
              </div>
              <button
                type="button"
                onClick={() => deleteComment(post.id, c.id)}
                aria-label="Delete your comment"
                className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 self-start text-ink-faint hover:text-danger"
              >
                <Icon name="trash" size={15} />
              </button>
            </div>
          ))}
          {post.comments.length === 0 && myComments.length === 0 && (
            <p className="text-sm text-ink-faint text-center py-6">No comments yet. Start the conversation.</p>
          )}
        </div>

        <div className="border-t border-line px-4 pt-3">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => toggleLike(post.id)}
              aria-label={liked ? 'Unlike post' : 'Like post'}
              aria-pressed={liked}
              className={liked ? 'text-danger' : 'text-ink hover:text-ink-soft'}
            >
              <Icon name="heart" size={25} filled={liked} className={liked ? 'animate-like-pop' : ''} />
            </button>
            <button type="button" onClick={() => inputRef.current?.focus()} aria-label="Comment" className="text-ink hover:text-ink-soft">
              <Icon name="comment" size={25} />
            </button>
            <button type="button" aria-label="Share post" className="text-ink hover:text-ink-soft">
              <Icon name="share" size={25} />
            </button>
            <button
              type="button"
              onClick={() => toggleSave(post.id)}
              aria-label={saved ? 'Unsave post' : 'Save post'}
              aria-pressed={saved}
              className="ml-auto text-ink hover:text-ink-soft"
            >
              <Icon name="bookmark" size={25} filled={saved} />
            </button>
          </div>
          <p className="text-sm font-semibold mt-2">{formatCount(post.likes + (liked ? 1 : 0))} likes</p>
          <p className="text-[11px] uppercase tracking-wide text-ink-faint mt-0.5 mb-2">{timeAgo(post.timestamp)}</p>
        </div>

        <form onSubmit={submit} className="flex items-center gap-2 px-4 py-3 border-t border-line">
          <button type="button" aria-label="Add emoji" className="text-ink-soft hover:text-ink" onClick={() => setComment((c) => c + '😊')}>
            <Icon name="smile" size={22} />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment…"
            aria-label="Add a comment"
            className="flex-1 text-sm bg-transparent focus:outline-none placeholder:text-ink-faint"
          />
          <button type="submit" disabled={!comment.trim()} className="text-sm font-semibold text-accent disabled:opacity-30">
            Post
          </button>
        </form>
      </div>
    </div>
  )
}
