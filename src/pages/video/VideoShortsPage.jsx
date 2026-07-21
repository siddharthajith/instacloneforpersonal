import { useSearchParams } from 'react-router-dom'
import ShortVideoPlayer from '../../components/video/ShortVideoPlayer.jsx'
import { shorts } from '../../data/videoMockData.js'

export default function VideoShortsPage() {
  const [params] = useSearchParams()
  const startId = params.get('v')
  const initialIndex = Math.max(0, shorts.findIndex((s) => s.id === startId))

  return <ShortVideoPlayer shorts={shorts} initialIndex={initialIndex >= 0 ? initialIndex : 0} />
}
