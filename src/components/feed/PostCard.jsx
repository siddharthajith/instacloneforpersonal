import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import Avatar from '../ui/Avatar.jsx'
import VerifiedBadge from '../ui/VerifiedBadge.jsx'
import PostMedia from './PostMedia.jsx'
import { useApp } from '../../context/AppContext.jsx'
import { getUser } from '../../data/mockData.js'
import { formatCount, timeAgo } from '../../utils/format.js'

export default function PostCard({ post }) {
  const {
    likedPosts, toggleLike, likePost, savedPosts, toggleSave,
    userComments, addComment, deleteComment, followed, toggleFollow, profile,
  } = useApp()
  const user = getUser(post.userId)
  const liked = likedPosts.includes(post.id)
  const saved = savedPosts.includes(post.id)
  const [showHeart, setShowHeart] = useState(false)
  const [comment, setComment] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const commentInputRef = useRef(null)

  const myComments = userComments[post.id] || []
  const likeCount = post.likes + (liked ? 1 : 0)

  useEffect(() => {
    if (!menuOpen) return
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [menuOpen])

  const handleDoubleClick = () => {
    likePost(post.id)
    setShowHeart(true)
    setTimeout(() => setShowHeart(false), 900)
  }

  const submitComment = (e) => {
    e.preventDefault()
    if (!comment.trim()) return
    addComment(post.id, comment.trim())
    setComment('')
  }

  return (
    <article className="bg-card border border-line rounded-xl mb-5 overflow-hidden animate-fade-in">
      <header className="flex items-center gap-3 px-3.5 py-3">
        <Link to={`/profile/${user.username}`} aria-label={`${user.username}'s profile`}>
          <Avatar src={user.avatar} alt="" size="sm" />
        </Link>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="flex items-center gap-1.5">
            <Link to={`/profile/${user.username}`} className="text-sm font-semibold hover:opacity-70 truncate">
              {user.username}
            </Link>
            {user.verified && <VerifiedBadge />}
            {!followed.includes(user.id) && user.id !== 'u0' && (
              <>
                <span className="text-ink-faint text-sm" aria-hidden="true">·</span>
                <button type="button" onClick={() => toggleFollow(user.id)} className="text-sm font-semibold text-accent hover:text-accent-deep">
                  Follow
                </button>
              </>
            )}
          </div>
          {post.location && <p className="text-xs text-ink-soft truncate">{post.location}</p>}
        </div>
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Post options"
            aria-expanded={menuOpen}
            className="p-1.5 text-ink hover:text-ink-soft"
          >
            <Icon name="dots" size={20} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-line rounded-xl shadow-lg py-1 z-20 animate-scale-in">
              <button type="button" onClick={() => { toggleSave(post.id); setMenuOpen(false) }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-stone-50">
                {saved ? 'Remove from saved' : 'Save post'}
              </button>
              <button type="button" onClick={() => { navigator.clipboard?.writeText(`${location.origin}/post/${post.id}`); setMenuOpen(false) }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-stone-50">
                Copy link
              </button>
              <button type="button" onClick={() => setMenuOpen(false)} className="w-full text-left px-4 py-2.5 text-sm text-danger hover:bg-red-50">
                Report
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="relative">
        <PostMedia post={post} onDoubleClick={handleDoubleClick} />
        {showHeart && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Icon name="heart" size={96} filled className="text-white drop-shadow-lg animate-big-heart" />
          </div>
        )}
      </div>

      <div className="px-3.5 pt-3">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => toggleLike(post.id)}
            aria-label={liked ? 'Unlike post' : 'Like post'}
            aria-pressed={liked}
            className={`transition-colors ${liked ? 'text-danger' : 'text-ink hover:text-ink-soft'}`}
          >
            <Icon name="heart" size={26} filled={liked} className={liked ? 'animate-like-pop' : ''} />
          </button>
          <button
            type="button"
            onClick={() => commentInputRef.current?.focus()}
            aria-label="Comment on post"
            className="text-ink hover:text-ink-soft transition-colors"
          >
            <Icon name="comment" size={26} />
          </button>
          <button type="button" aria-label="Share post" className="text-ink hover:text-ink-soft transition-colors">
            <Icon name="share" size={26} />
          </button>
          <button
            type="button"
            onClick={() => toggleSave(post.id)}
            aria-label={saved ? 'Unsave post' : 'Save post'}
            aria-pressed={saved}
            className="ml-auto text-ink hover:text-ink-soft transition-colors"
          >
            <Icon name="bookmark" size={26} filled={saved} />
          </button>
        </div>

        <p className="text-sm font-semibold mt-2.5">{formatCount(likeCount)} likes</p>

        <p className="text-sm mt-1.5 leading-relaxed">
          <Link to={`/profile/${user.username}`} className="font-semibold hover:opacity-70">
            {user.username}
          </Link>{' '}
          {post.caption}
          {post.hashtags?.length > 0 && (
            <>
              {' '}
              {post.hashtags.map((tag) => (
                <Link key={tag} to="/explore" className="text-accent hover:text-accent-deep">
                  {tag}{' '}
                </Link>
              ))}
            </>
          )}
        </p>

        {post.totalComments > post.comments.length && (
          <Link to={`/post/${post.id}`} className="block text-sm text-ink-faint mt-1.5 hover:text-ink-soft">
            View all {formatCount(post.totalComments)} comments
          </Link>
        )}

        <ul className="mt-1 space-y-1">
          {post.comments.slice(0, 2).map((c) => {
            const cu = getUser(c.userId)
            return (
              <li key={c.id} className="text-sm leading-relaxed">
                <Link to={`/profile/${cu.username}`} className="font-semibold hover:opacity-70">
                  {cu.username}
                </Link>{' '}
                {c.text}
              </li>
            )
          })}
          {myComments.map((c) => (
            <li key={c.id} className="text-sm leading-relaxed group flex items-start gap-2">
              <span>
                <Link to={`/profile/${profile.username}`} className="font-semibold hover:opacity-70">
                  {profile.username}
                </Link>{' '}
                {c.text}
              </span>
              <button
                type="button"
                onClick={() => deleteComment(post.id, c.id)}
                aria-label="Delete your comment"
                className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 text-ink-faint hover:text-danger transition mt-0.5"
              >
                <Icon name="trash" size={14} />
              </button>
            </li>
          ))}
        </ul>

        <p className="text-[11px] uppercase tracking-wide text-ink-faint mt-2">{timeAgo(post.timestamp)}</p>
      </div>

      <form onSubmit={submitComment} className="flex items-center gap-2 px-3.5 py-3 mt-1 border-t border-line">
        <button type="button" aria-label="Add emoji" className="text-ink-soft hover:text-ink" onClick={() => setComment((c) => c + '😊')}>
          <Icon name="smile" size={22} />
        </button>
        <input
          ref={commentInputRef}
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment…"
          aria-label="Add a comment"
          className="flex-1 text-sm bg-transparent focus:outline-none placeholder:text-ink-faint"
        />
        <button
          type="submit"
          disabled={!comment.trim()}
          className="text-sm font-semibold text-accent hover:text-accent-deep disabled:opacity-0 transition-opacity"
        >
          Post
        </button>
      </form>
    </article>
  )
}
