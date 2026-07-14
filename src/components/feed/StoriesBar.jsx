import { useState } from 'react'
import Avatar from '../ui/Avatar.jsx'
import StoryViewer from './StoryViewer.jsx'
import { useApp } from '../../context/AppContext.jsx'
import { getUser } from '../../data/mockData.js'

export default function StoriesBar() {
  const { stories, viewedStories, profile } = useApp()
  const [viewerIndex, setViewerIndex] = useState(null)

  return (
    <>
      <section aria-label="Stories" className="bg-card border border-line rounded-xl px-4 py-4 mb-5 overflow-hidden">
        <ul className="flex gap-4 overflow-x-auto scrollbar-none">
          <li className="shrink-0">
            <button type="button" className="flex flex-col items-center gap-1.5 w-[68px] group" aria-label="Your story">
              <span className="relative">
                <Avatar src={profile.avatar} alt="" size="lg" ring="viewed" />
                <span className="absolute bottom-0 right-0 size-5 rounded-full bg-accent text-white text-sm leading-none font-bold flex items-center justify-center border-2 border-card">
                  +
                </span>
              </span>
              <span className="text-xs text-ink-faint truncate w-full text-center">Your story</span>
            </button>
          </li>
          {stories.map((story, i) => {
            const user = getUser(story.userId)
            const viewed = story.viewed || viewedStories.includes(story.id)
            return (
              <li key={story.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setViewerIndex(i)}
                  className="flex flex-col items-center gap-1.5 w-[68px]"
                  aria-label={`View ${user.username}'s story${viewed ? ' (viewed)' : ''}`}
                >
                  <Avatar src={user.avatar} alt="" size="lg" ring={viewed ? 'viewed' : 'unviewed'} />
                  <span className={`text-xs truncate w-full text-center ${viewed ? 'text-ink-faint' : 'text-ink'}`}>
                    {user.username}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      {viewerIndex !== null && (
        <StoryViewer startIndex={viewerIndex} onClose={() => setViewerIndex(null)} />
      )}
    </>
  )
}
