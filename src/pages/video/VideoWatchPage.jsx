import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import VideoPlayer from '../../components/video/VideoPlayer.jsx'
import CommentSection from '../../components/video/CommentSection.jsx'
import RecommendedVideo from '../../components/video/RecommendedVideo.jsx'
import Avatar from '../../components/ui/Avatar.jsx'
import Icon from '../../components/ui/Icon.jsx'
import VerifiedBadge from '../../components/ui/VerifiedBadge.jsx'
import Button from '../../components/ui/Button.jsx'
import { getVideo, getChannel, getRecommendedVideos, seedComments } from '../../data/videoMockData.js'
import { formatCount, timeAgo } from '../../utils/format.js'
import { useVideo } from '../../context/VideoContext.jsx'

export default function VideoWatchPage() {
  const { videoId } = useParams()
  const [descOpen, setDescOpen] = useState(false)
  const video = getVideo(videoId)
  const {
    addToHistory, toggleVideoLike, toggleVideoDislike, likedVideos, dislikedVideos,
    toggleWatchLater, watchLater, toggleSubscription, subscriptions, channelNotifs, toggleChannelNotif,
  } = useVideo()

  useEffect(() => {
    if (video) addToHistory(video.id)
  }, [video, addToHistory])

  if (!video || video.type === 'short') return <Navigate to="/video" replace />

  const channel = getChannel(video.channelId)
  const recommended = getRecommendedVideos(video.id)
  const liked = likedVideos.includes(video.id)
  const disliked = dislikedVideos.includes(video.id)
  const inLater = watchLater.includes(video.id)
  const subscribed = subscriptions.includes(channel?.id)
  const notifOn = channelNotifs.includes(channel?.id)

  return (
    <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-4 animate-fade-in">
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <VideoPlayer src={video.src} poster={video.poster} title={video.title} />
          <h1 className="text-lg sm:text-xl font-bold mt-4 leading-snug">{video.title}</h1>
          <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
            <p className="text-sm text-ink-soft">{formatCount(video.views)} views · {timeAgo(video.timestamp)}</p>
            <div className="flex flex-wrap items-center gap-1">
              <button type="button" onClick={() => toggleVideoLike(video.id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium ${liked ? 'bg-accent-soft text-accent' : 'hover:bg-stone-100'}`}>
                <Icon name="thumbsUp" size={18} filled={liked} /> {formatCount(video.likes + (liked ? 1 : 0))}
              </button>
              <button type="button" onClick={() => toggleVideoDislike(video.id)} className={`p-2 rounded-full ${disliked ? 'bg-stone-200' : 'hover:bg-stone-100'}`} aria-label="Dislike">
                <Icon name="thumbsDown" size={18} />
              </button>
              <button type="button" className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium hover:bg-stone-100">
                <Icon name="share" size={18} /> Share
              </button>
              <button type="button" className="flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium hover:bg-stone-100 hidden sm:flex">
                <Icon name="download" size={18} /> Download
              </button>
              <button type="button" onClick={() => toggleWatchLater(video.id)} className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium ${inLater ? 'bg-accent-soft text-accent' : 'hover:bg-stone-100'}`}>
                <Icon name="bookmark" size={18} filled={inLater} /> Save
              </button>
              <button type="button" className="p-2 rounded-full hover:bg-stone-100" aria-label="More options">
                <Icon name="dots" size={18} />
              </button>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-stone-50 border border-line">
            <div className="flex items-start justify-between gap-4">
              <Link to={`/video/channel/${channel?.id}`} className="flex items-center gap-3 min-w-0">
                <Avatar src={channel?.avatar} alt="" size="md" />
                <div>
                  <p className="font-semibold flex items-center gap-1">{channel?.name} {channel?.verified && <VerifiedBadge size={12} />}</p>
                  <p className="text-xs text-ink-faint">{formatCount(channel?.subscribers)} subscribers</p>
                </div>
              </Link>
              <div className="flex gap-2 shrink-0">
                <Button variant={subscribed ? 'secondary' : 'primary'} size="sm" onClick={() => toggleSubscription(channel?.id)}>
                  {subscribed ? 'Subscribed' : 'Subscribe'}
                </Button>
                {subscribed && (
                  <button type="button" onClick={() => toggleChannelNotif(channel?.id)} className={`p-2 rounded-xl border ${notifOn ? 'border-accent bg-accent-soft' : 'border-line'}`} aria-label="Notifications">
                    <Icon name="bell" size={18} />
                  </button>
                )}
              </div>
            </div>
            <div className="mt-3">
              <p className={`text-sm whitespace-pre-line ${descOpen ? '' : 'line-clamp-2'}`}>{video.description}</p>
              {video.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {video.tags.map((t) => <span key={t} className="text-xs text-accent font-medium">#{t}</span>)}
                </div>
              )}
              <button type="button" onClick={() => setDescOpen((v) => !v)} className="text-sm font-semibold mt-2 hover:text-accent">
                {descOpen ? 'Show less' : 'Show more'}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <CommentSection videoId={video.id} initialComments={seedComments[video.id] || []} />
          </div>
        </div>

        <aside className="xl:w-[400px] shrink-0 space-y-3">
          <h2 className="text-sm font-semibold text-ink-soft hidden xl:block">Recommended</h2>
          {recommended.map((v) => <RecommendedVideo key={v.id} video={v} />)}
        </aside>
      </div>
    </div>
  )
}
