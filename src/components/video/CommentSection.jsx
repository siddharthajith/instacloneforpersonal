import { useState } from 'react'
import { formatCount, timeAgo } from '../../utils/format.js'
import Avatar from '../ui/Avatar.jsx'
import Icon from '../ui/Icon.jsx'
import { useApp } from '../../context/AppContext.jsx'
import { useVideo } from '../../context/VideoContext.jsx'

export default function CommentSection({ videoId, initialComments = [] }) {
  const { profile } = useApp()
  const { videoComments, addVideoComment, deleteVideoComment, addVideoReply } = useVideo()
  const comments = videoComments[videoId] ?? initialComments
  const [text, setText] = useState('')
  const [sort, setSort] = useState('top')
  const [replyTo, setReplyTo] = useState(null)
  const [expandedReplies, setExpandedReplies] = useState({})

  const sorted = [...comments].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    if (sort === 'newest') return b.timestamp - a.timestamp
    return (b.likes ?? 0) - (a.likes ?? 0)
  })

  const submit = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    if (replyTo) {
      addVideoReply(videoId, replyTo, trimmed, profile)
      setReplyTo(null)
    } else {
      addVideoComment(videoId, trimmed, profile)
    }
    setText('')
  }

  const Comment = ({ c, isReply = false }) => {
    const mine = c.userId === 'u0'
    return (
      <div className={`flex gap-3 ${isReply ? 'ml-12 mt-4' : 'py-4 border-b border-line last:border-0'}`}>
        <Avatar src={c.avatar} alt="" size="sm" className="shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold">{c.author}</span>
            <span className="text-xs text-ink-faint">{timeAgo(c.timestamp)}</span>
            {c.pinned && <span className="text-xs font-medium text-ink-soft flex items-center gap-1"><Icon name="bookmark" size={12} /> Pinned</span>}
            {c.hearted && <span className="text-xs text-danger flex items-center gap-1"><Icon name="heart" size={12} filled /> Creator heart</span>}
          </div>
          <p className="text-sm mt-1 leading-relaxed">{c.text}</p>
          <div className="flex items-center gap-3 mt-2">
            <button type="button" className="flex items-center gap-1 text-xs text-ink-faint hover:text-ink" aria-label="Like comment">
              <Icon name="thumbsUp" size={16} /> {c.likes > 0 && formatCount(c.likes)}
            </button>
            <button type="button" className="flex items-center gap-1 text-xs text-ink-faint hover:text-ink" aria-label="Dislike comment">
              <Icon name="thumbsDown" size={16} />
            </button>
            {!isReply && (
              <button type="button" onClick={() => setReplyTo(c.id)} className="text-xs font-semibold text-ink-faint hover:text-ink">Reply</button>
            )}
            {mine && (
              <button type="button" onClick={() => deleteVideoComment(videoId, c.id)} className="text-xs text-danger hover:underline">Delete</button>
            )}
          </div>
          {!isReply && c.replies?.length > 0 && (
            <>
              <button
                type="button"
                onClick={() => setExpandedReplies((p) => ({ ...p, [c.id]: !p[c.id] }))}
                className="text-xs font-semibold text-accent mt-2 flex items-center gap-1"
              >
                <Icon name={expandedReplies[c.id] ? 'chevronDown' : 'chevronRight'} size={16} />
                {expandedReplies[c.id] ? 'Hide' : 'View'} {c.replies.length} {c.replies.length === 1 ? 'reply' : 'replies'}
              </button>
              {expandedReplies[c.id] && c.replies.map((r) => <Comment key={r.id} c={r} isReply />)}
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <section aria-label="Comments">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-lg font-bold">{formatCount(comments.length)} Comments</h2>
        <button
          type="button"
          onClick={() => setSort(sort === 'top' ? 'newest' : 'top')}
          className="flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink"
        >
          <Icon name="list" size={18} />
          Sort by {sort === 'top' ? 'Top' : 'Newest'}
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        <Avatar src={profile.avatar} alt="" size="sm" className="shrink-0" />
        <div className="flex-1">
          <label htmlFor="comment-input" className="sr-only">Add a comment</label>
          <input
            id="comment-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={replyTo ? 'Add a reply…' : 'Add a comment…'}
            className="w-full border-b border-line-strong pb-2 text-sm outline-none focus:border-ink bg-transparent"
          />
          {replyTo && (
            <button type="button" onClick={() => setReplyTo(null)} className="text-xs text-ink-faint mt-1">Cancel reply</button>
          )}
          <div className="flex justify-end gap-2 mt-3">
            <button type="button" onClick={() => { setText(''); setReplyTo(null) }} className="px-4 py-2 text-sm font-semibold rounded-full hover:bg-stone-100">Cancel</button>
            <button type="button" onClick={submit} disabled={!text.trim()} className="px-4 py-2 text-sm font-semibold rounded-full bg-accent text-white hover:bg-accent-deep disabled:opacity-40">Comment</button>
          </div>
        </div>
      </div>

      <div>{sorted.map((c) => <Comment key={c.id} c={c} />)}</div>
    </section>
  )
}
