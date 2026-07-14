import { useState, useMemo, useEffect } from 'react'
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom'
import Icon from '../components/ui/Icon.jsx'
import Avatar from '../components/ui/Avatar.jsx'
import Button from '../components/ui/Button.jsx'
import Modal from '../components/ui/Modal.jsx'
import FollowButton from '../components/ui/FollowButton.jsx'
import VerifiedBadge from '../components/ui/VerifiedBadge.jsx'
import PostDetailView from '../components/feed/PostDetailView.jsx'
import { useApp } from '../context/AppContext.jsx'
import {
  getUserByUsername, users, allPosts, myPosts, reels, highlights, getPost,
} from '../data/mockData.js'
import { formatCount } from '../utils/format.js'

function FollowListModal({ open, onClose, title, list }) {
  const [search, setSearch] = useState('')
  const filtered = list.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.fullName.toLowerCase().includes(search.toLowerCase()),
  )
  useEffect(() => {
    if (open) setSearch('')
  }, [open])

  return (
    <Modal open={open} onClose={onClose} label={title}>
      <div className="bg-card sm:rounded-xl w-full h-full sm:h-auto sm:w-[400px] flex flex-col sm:max-h-[70vh]">
        <header className="flex items-center justify-between px-4 py-3 border-b border-line">
          <h2 className="font-bold text-base">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1 text-ink-soft hover:text-ink">
            <Icon name="close" size={20} />
          </button>
        </header>
        <div className="p-3 border-b border-line">
          <div className="relative">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              aria-label={`Search ${title.toLowerCase()}`}
              className="w-full bg-stone-100 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
            <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto p-2 min-h-[200px]">
          {filtered.length === 0 && (
            <li className="text-center text-sm text-ink-faint py-8">No people found.</li>
          )}
          {filtered.map((u) => (
            <li key={u.id} className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-stone-50">
              <Link to={`/profile/${u.username}`} onClick={onClose}>
                <Avatar src={u.avatar} alt="" size="md" />
              </Link>
              <Link to={`/profile/${u.username}`} onClick={onClose} className="min-w-0 flex-1">
                <span className="flex items-center gap-1 text-sm font-semibold truncate">
                  {u.username} {u.verified && <VerifiedBadge size={12} />}
                </span>
                <span className="block text-xs text-ink-faint truncate">{u.fullName}</span>
              </Link>
              <FollowButton userId={u.id} />
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  )
}

function PostGrid({ posts, emptyLabel, onOpen }) {
  if (posts.length === 0) {
    return (
      <div className="py-16 text-center">
        <span className="inline-flex size-16 rounded-full border-2 border-ink items-center justify-center mb-3">
          <Icon name="camera" size={30} />
        </span>
        <p className="font-semibold">{emptyLabel}</p>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-3 gap-1 animate-fade-in">
      {posts.map((post) => (
        <button
          key={post.id}
          type="button"
          onClick={() => onOpen(post)}
          aria-label={`Open post: ${post.caption?.slice(0, 50) || 'post'}`}
          className="group relative aspect-square overflow-hidden bg-stone-100"
        >
          <img
            src={post.media[0].type === 'video' ? post.media[0].poster : post.media[0].src}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
          />
          {post.media.length > 1 && (
            <span className="absolute top-2 right-2 text-white drop-shadow">
              <Icon name="carousel" size={16} />
            </span>
          )}
          {post.media[0].type === 'video' && (
            <span className="absolute top-2 right-2 text-white drop-shadow">
              <Icon name="play" size={18} />
            </span>
          )}
          <span className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center gap-4 text-white text-sm font-semibold opacity-0 group-hover:opacity-100">
            <span className="flex items-center gap-1"><Icon name="heart" size={16} filled /> {formatCount(post.likes)}</span>
            <span className="flex items-center gap-1"><Icon name="comment" size={16} filled /> {formatCount(post.totalComments)}</span>
          </span>
        </button>
      ))}
    </div>
  )
}

export default function ProfilePage() {
  const { username } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { profile, savedPosts, followed, createdPosts } = useApp()

  const isOwn = username === profile.username
  const user = isOwn ? profile : getUserByUsername(username)
  const [tab, setTab] = useState(searchParams.get('tab') || 'posts')
  const [activePost, setActivePost] = useState(null)
  const [followModal, setFollowModal] = useState(null)

  useEffect(() => {
    setTab(searchParams.get('tab') || 'posts')
  }, [username, searchParams])

  const userPosts = useMemo(() => {
    if (!user) return []
    if (isOwn) return [...createdPosts, ...myPosts]
    return allPosts.filter((p) => p.userId === user.id)
  }, [user, isOwn, createdPosts])

  const userClips = useMemo(() => (user ? reels.filter((r) => r.userId === user.id) : []), [user])
  const saved = useMemo(
    () => savedPosts.map((id) => getPost(id)).filter(Boolean),
    [savedPosts],
  )

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <h1 className="text-xl font-bold">This account doesn’t exist</h1>
        <p className="text-sm text-ink-faint mt-2 mb-6">The link may be broken or the profile may have been removed.</p>
        <Link to="/"><Button>Back to home</Button></Link>
      </div>
    )
  }

  const isFollowing = followed.includes(user.id)
  const followerCount = user.followers + (!isOwn && isFollowing ? 1 : 0)
  const tabs = [
    { id: 'posts', label: 'Posts', icon: 'grid' },
    { id: 'clips', label: 'Clips', icon: 'clips' },
    { id: 'tagged', label: 'Tagged', icon: 'tag' },
    ...(isOwn ? [{ id: 'saved', label: 'Saved', icon: 'bookmark' }] : []),
  ]

  return (
    <div className="mx-auto max-w-[935px] px-3 sm:px-5 pt-5 md:pt-10 pb-8 animate-fade-in">
      <header className="flex gap-5 sm:gap-12 md:gap-20 items-start sm:items-center sm:px-8">
        <Avatar src={user.avatar} alt={`${user.username}'s profile photo`} size="2xl" className="shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <h1 className="flex items-center gap-1.5 text-xl font-normal truncate">
              {user.username}
              {user.verified && <VerifiedBadge size={16} />}
            </h1>
            {isOwn ? (
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => navigate('/settings/edit-profile')}>
                  Edit profile
                </Button>
                <Button variant="secondary" size="sm" onClick={() => navigate('/settings')} aria-label="Settings">
                  <Icon name="settings" size={17} />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <FollowButton userId={user.id} size="md" />
                <Button variant="secondary" size="md" onClick={() => navigate('/messages')}>
                  Message
                </Button>
              </div>
            )}
          </div>

          <ul className="hidden sm:flex gap-8 mt-4 text-[15px]">
            <li><span className="font-bold">{userPosts.length}</span> posts</li>
            <li>
              <button type="button" onClick={() => setFollowModal('followers')} className="hover:opacity-70">
                <span className="font-bold">{formatCount(followerCount)}</span> followers
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setFollowModal('following')} className="hover:opacity-70">
                <span className="font-bold">{formatCount(user.following)}</span> following
              </button>
            </li>
          </ul>

          <div className="hidden sm:block mt-4 text-sm leading-relaxed">
            <p className="font-semibold">{user.fullName}</p>
            {user.bio && <p className="whitespace-pre-line">{user.bio}</p>}
            {user.website && (
              <a href={`https://${user.website}`} target="_blank" rel="noreferrer" className="font-semibold text-accent hover:text-accent-deep">
                {user.website}
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="sm:hidden mt-4 text-sm leading-relaxed">
        <p className="font-semibold">{user.fullName}</p>
        {user.bio && <p className="whitespace-pre-line">{user.bio}</p>}
        {user.website && (
          <a href={`https://${user.website}`} target="_blank" rel="noreferrer" className="font-semibold text-accent">
            {user.website}
          </a>
        )}
      </div>

      <ul className="sm:hidden flex justify-around mt-5 py-3 border-y border-line text-center text-sm">
        <li><span className="block font-bold">{userPosts.length}</span><span className="text-ink-faint">posts</span></li>
        <li>
          <button type="button" onClick={() => setFollowModal('followers')}>
            <span className="block font-bold">{formatCount(followerCount)}</span>
            <span className="text-ink-faint">followers</span>
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setFollowModal('following')}>
            <span className="block font-bold">{formatCount(user.following)}</span>
            <span className="text-ink-faint">following</span>
          </button>
        </li>
      </ul>

      {isOwn && (
        <ul className="flex gap-6 sm:gap-9 mt-7 overflow-x-auto scrollbar-none sm:px-8" aria-label="Story highlights">
          {highlights.map((h) => (
            <li key={h.id} className="shrink-0">
              <button type="button" className="flex flex-col items-center gap-1.5 group" aria-label={`Highlight: ${h.label}`}>
                <span className="rounded-full p-[3px] border border-line-strong group-hover:scale-105 transition-transform">
                  <img src={h.cover} alt="" loading="lazy" className="size-14 sm:size-16 rounded-full object-cover" />
                </span>
                <span className="text-xs">{h.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div role="tablist" aria-label="Profile content" className="flex justify-center gap-2 sm:gap-12 border-t border-line mt-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-3 py-3.5 text-xs font-semibold uppercase tracking-wide border-t -mt-px transition-colors ${
              tab === t.id ? 'border-ink text-ink' : 'border-transparent text-ink-faint hover:text-ink-soft'
            }`}
          >
            <Icon name={t.icon} size={14} />
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-1">
        {tab === 'posts' && <PostGrid posts={userPosts} emptyLabel="No posts yet" onOpen={setActivePost} />}
        {tab === 'clips' &&
          (userClips.length === 0 ? (
            <PostGrid posts={[]} emptyLabel="No clips yet" onOpen={() => {}} />
          ) : (
            <div className="grid grid-cols-3 gap-1 animate-fade-in">
              {userClips.map((r) => (
                <Link key={r.id} to="/reels" aria-label="Open clip" className="group relative aspect-[3/4] overflow-hidden bg-stone-100">
                  <img src={r.poster} alt="" loading="lazy" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs font-semibold drop-shadow">
                    <Icon name="play" size={14} /> {formatCount(r.likes)}
                  </span>
                </Link>
              ))}
            </div>
          ))}
        {tab === 'tagged' && <PostGrid posts={[]} emptyLabel="No tagged posts" onOpen={setActivePost} />}
        {tab === 'saved' && isOwn && <PostGrid posts={saved} emptyLabel="Nothing saved yet" onOpen={setActivePost} />}
      </div>

      <Modal open={!!activePost} onClose={() => setActivePost(null)} label="Post detail">
        {activePost && <PostDetailView post={activePost} />}
      </Modal>

      <FollowListModal
        open={followModal === 'followers'}
        onClose={() => setFollowModal(null)}
        title="Followers"
        list={users.slice(0, 8)}
      />
      <FollowListModal
        open={followModal === 'following'}
        onClose={() => setFollowModal(null)}
        title="Following"
        list={users.slice(3, 12)}
      />
    </div>
  )
}
