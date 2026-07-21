import { useState, useMemo } from 'react'
import CategoryFilter from '../../components/video/CategoryFilter.jsx'
import VideoGrid from '../../components/video/VideoGrid.jsx'
import { VIDEO_CATEGORIES } from '../../data/videoMockData.js'
import { useVideo } from '../../context/VideoContext.jsx'

export default function VideoHomePage() {
  const [category, setCategory] = useState('All')
  const { allVideos } = useVideo()

  const filtered = useMemo(() => {
    let list = allVideos.filter((v) => v.type === 'video')
    if (category === 'Recently Uploaded') {
      list = [...list].sort((a, b) => b.timestamp - a.timestamp).slice(0, 12)
    } else if (category !== 'All') {
      list = list.filter((v) => v.category === category)
    }
    return list
  }, [allVideos, category])

  return (
    <div className="px-4 sm:px-6 py-4 animate-fade-in">
      <CategoryFilter categories={VIDEO_CATEGORIES} active={category} onChange={setCategory} />
      <div className="mt-4">
        <VideoGrid videos={filtered} />
      </div>
    </div>
  )
}
