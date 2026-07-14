import { useState, useEffect, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import Avatar from '../ui/Avatar.jsx'
import Skeleton from '../ui/Skeleton.jsx'
import VerifiedBadge from '../ui/VerifiedBadge.jsx'
import { useApp } from '../../context/AppContext.jsx'
import { users, explorePosts, getUser } from '../../data/mockData.js'

export default function SearchPanel({ open, onClose }) {
  const { recentSearches, addRecentSearch, clearRecentSearches } = useApp()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 60)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    const onClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) onClose()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!query) return
    setLoading(true)
    const t = setTimeout(() => setLoading(false), 350)
    return () => clearTimeout(t)
  }, [query])

  const results = useMemo(() => {
    if (!query) return { users: [], posts: [] }
    const q = query.toLowerCase()
    return {
      users: users.filter(
        (u) => u.username.toLowerCase().includes(q) || u.fullName.toLowerCase().includes(q),
      ),
      posts: explorePosts.filter(
        (p) =>
          p.caption.toLowerCase().includes(q) ||
          (p.hashtags || []).some((h) => h.toLowerCase().includes(q)),
      ).slice(0, 6),
    }
  }, [query])

  if (!open) return null

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Search"
      className="fixed z-40 bg-card border-r border-line shadow-xl animate-slide-in-left
        inset-0 md:inset-y-0 md:left-[72px] md:right-auto md:w-[380px] md:rounded-r-2xl flex flex-col"
    >
      <div className="p-5 border-b border-line">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Search</h2>
          <button type="button" onClick={onClose} aria-label="Close search" className="p-1.5 text-ink-soft hover:text-ink">
            <Icon name="close" size={22} />
          </button>
        </div>
        <div className="relative">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search people, posts, tags"
            aria-label="Search people, posts, tags"
            className="w-full bg-stone-100 rounded-lg pl-10 pr-9 py-2.5 text-sm placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
          <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
            >
              <Icon name="close" size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {!query && (
          <>
            <div className="flex items-center justify-between px-2 py-2">
              <h3 className="text-sm font-semibold">Recent</h3>
              {recentSearches.length > 0 && (
                <button type="button" onClick={clearRecentSearches} className="text-xs font-semibold text-accent hover:text-accent-deep">
                  Clear all
                </button>
              )}
            </div>
            {recentSearches.length === 0 ? (
              <p className="px-2 py-6 text-sm text-ink-faint text-center">No recent searches.</p>
            ) : (
              <ul>
                {recentSearches.map((term) => (
                  <li key={term}>
                    <button
                      type="button"
                      onClick={() => setQuery(term)}
                      className="flex items-center gap-3 w-full px-2 py-2.5 rounded-lg hover:bg-stone-50 text-left"
                    >
                      <span className="size-9 rounded-full border border-line flex items-center justify-center text-ink-faint">
                        <Icon name="clock" size={17} />
                      </span>
                      <span className="text-sm">{term}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <h3 className="text-sm font-semibold px-2 pt-4 pb-2">Suggested</h3>
            <ul>
              {users.slice(0, 5).map((u) => (
                <li key={u.id}>
                  <Link
                    to={`/profile/${u.username}`}
                    onClick={() => { addRecentSearch(u.username); onClose() }}
                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-stone-50"
                  >
                    <Avatar src={u.avatar} alt="" size="sm" />
                    <span className="min-w-0">
                      <span className="flex items-center gap-1 text-sm font-semibold truncate">
                        {u.username} {u.verified && <VerifiedBadge size={12} />}
                      </span>
                      <span className="block text-xs text-ink-faint truncate">{u.fullName}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        {query && loading && (
          <div className="space-y-3 p-2" aria-label="Loading results">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="size-9 rounded-full" />
                <div className="space-y-1.5">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-2.5 w-20" />
                </div>
              </div>
            ))}
          </div>
        )}

        {query && !loading && results.users.length === 0 && results.posts.length === 0 && (
          <div className="py-14 text-center">
            <Icon name="search" size={36} className="mx-auto text-ink-faint mb-3" />
            <p className="text-sm font-semibold">No results for “{query}”</p>
            <p className="text-xs text-ink-faint mt-1">Try a different name, tag, or keyword.</p>
          </div>
        )}

        {query && !loading && (results.users.length > 0 || results.posts.length > 0) && (
          <>
            {results.users.length > 0 && (
              <>
                <h3 className="text-sm font-semibold px-2 pb-2">Accounts</h3>
                <ul>
                  {results.users.map((u) => (
                    <li key={u.id}>
                      <Link
                        to={`/profile/${u.username}`}
                        onClick={() => { addRecentSearch(u.username); onClose() }}
                        className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-stone-50"
                      >
                        <Avatar src={u.avatar} alt="" size="sm" />
                        <span className="min-w-0">
                          <span className="flex items-center gap-1 text-sm font-semibold truncate">
                            {u.username} {u.verified && <VerifiedBadge size={12} />}
                          </span>
                          <span className="block text-xs text-ink-faint truncate">{u.fullName}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {results.posts.length > 0 && (
              <>
                <h3 className="text-sm font-semibold px-2 pt-4 pb-2">Posts</h3>
                <div className="grid grid-cols-3 gap-1 px-2">
                  {results.posts.map((p) => (
                    <Link
                      key={p.id}
                      to={`/post/${p.id}`}
                      onClick={() => { addRecentSearch(query); onClose() }}
                      aria-label={`Post by ${getUser(p.userId).username}`}
                      className="block aspect-square overflow-hidden rounded-md"
                    >
                      <img
                        src={p.media[0].type === 'video' ? p.media[0].poster : p.media[0].src}
                        alt=""
                        loading="lazy"
                        className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                      />
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
