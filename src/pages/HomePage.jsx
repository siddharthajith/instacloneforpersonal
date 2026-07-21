import { useState, useEffect } from 'react'
import StoriesBar from '../components/feed/StoriesBar.jsx'
import PostCard from '../components/feed/PostCard.jsx'
import RightSidebar from '../components/layout/RightSidebar.jsx'
import { PostSkeleton } from '../components/ui/Skeleton.jsx'
import { useApp } from '../context/AppContext.jsx'
import { posts, myPosts } from '../data/mockData.js'

const tabs = [
  { id: 'foryou', label: 'For you' },
  { id: 'following', label: 'Following' },
]

export default function HomePage() {
  const { followed, createdPosts } = useApp()
  const [tab, setTab] = useState('foryou')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  const feedPosts =
    tab === 'following' ? posts.filter((p) => followed.includes(p.userId)) : posts
  // Place account posts (IdrisVideo1) as the 5th item in the For you feed
  const combined =
    tab === 'foryou'
      ? [...createdPosts, ...feedPosts.slice(0, 4), ...myPosts, ...feedPosts.slice(4)]
      : feedPosts

  return (
    <div className="mx-auto flex max-w-[1000px] justify-center gap-10 px-0 sm:px-4">
      <div className="w-full max-w-[520px] pt-4 md:pt-8 pb-8">
        <StoriesBar />

        <div role="tablist" aria-label="Feed" className="flex gap-1 mb-4 bg-stone-100 rounded-lg p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 rounded-md py-1.5 text-sm font-semibold transition-colors duration-150 ${
                tab === t.id ? 'bg-card text-ink shadow-sm' : 'text-ink-soft hover:text-ink'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-5">
            <PostSkeleton />
            <PostSkeleton />
          </div>
        ) : combined.length === 0 ? (
          <div className="bg-card border border-line rounded-xl py-16 text-center">
            <p className="font-semibold">Nothing here yet</p>
            <p className="text-sm text-ink-faint mt-1">Follow more people to fill your feed.</p>
          </div>
        ) : (
          combined.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
      <RightSidebar />
    </div>
  )
}
