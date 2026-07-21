import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import ChannelHeader from '../../components/video/ChannelHeader.jsx'
import VideoGrid from '../../components/video/VideoGrid.jsx'
import VideoCard from '../../components/video/VideoCard.jsx'
import PlaylistCard from '../../components/video/PlaylistCard.jsx'
import { ProjectAscendFeaturedRows } from '../../components/video/ProjectAscendChannel.jsx'
import {
  getChannel, getChannelVideos, playlists, PROJECT_ASCEND_ID,
} from '../../data/videoMockData.js'

function ScrollRow({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold mb-3 px-4 sm:px-6 lg:px-8">{title}</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-none px-4 sm:px-6 lg:px-8 pb-2">
        {children}
      </div>
    </section>
  )
}

export default function VideoChannelPage() {
  const { channelId } = useParams()
  const channel = getChannel(channelId)
  const [tab, setTab] = useState('Home')

  if (!channel) return <Navigate to="/video" replace />

  const channelVideos = getChannelVideos(channelId, 'video')
  const channelShorts = getChannelVideos(channelId, 'short')
  const channelPlaylists = playlists.filter((p) => p.channelId === channelId)
  const featured = channelVideos.find((v) => v.featured) || channelVideos[0]
  const trailer = channelVideos.find((v) => v.trailer)
  const popular = [...channelVideos].sort((a, b) => b.views - a.views).slice(0, 6)
  const latest = [...channelVideos].sort((a, b) => b.timestamp - a.timestamp)

  const renderTab = () => {
    switch (tab) {
      case 'Videos':
        return <div className="px-4 sm:px-6 lg:px-8 py-4"><VideoGrid videos={channelVideos} /></div>
      case 'Short Videos':
        return <div className="px-4 sm:px-6 lg:px-8 py-4"><VideoGrid videos={channelShorts} /></div>
      case 'Playlists':
        return (
          <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-2">
            {channelPlaylists.map((pl) => <PlaylistCard key={pl.id} playlist={pl} />)}
          </div>
        )
      case 'About':
        return (
          <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-2xl">
            <p className="text-sm leading-relaxed whitespace-pre-line">{channel.description}</p>
          </div>
        )
      case 'Live':
      case 'Community':
        return (
          <div className="px-4 sm:px-6 lg:px-8 py-16 text-center text-ink-faint text-sm">
            {tab} content coming soon for {channel.name}.
          </div>
        )
      default:
        return (
          <div className="py-4 animate-fade-in">
            {featured && (
              <ScrollRow title="Featured">
                <div className="shrink-0 w-full max-w-2xl">
                  <VideoCard video={featured} />
                </div>
              </ScrollRow>
            )}
            {trailer && channelId === PROJECT_ASCEND_ID && (
              <ScrollRow title="Channel trailer">
                <div className="shrink-0 w-full max-w-md">
                  <VideoCard video={trailer} />
                </div>
              </ScrollRow>
            )}
            <section className="px-4 sm:px-6 lg:px-8 mb-8">
              <h2 className="text-lg font-bold mb-3">Latest uploads</h2>
              <VideoGrid videos={latest.slice(0, 4)} />
            </section>
            <ScrollRow title="Popular uploads">
              {popular.map((v) => (
                <div key={v.id} className="shrink-0 w-72"><VideoCard video={v} /></div>
              ))}
            </ScrollRow>
            {channelShorts.length > 0 && (
              <ScrollRow title="Short videos">
                {channelShorts.map((v) => (
                  <div key={v.id} className="shrink-0 w-44"><VideoCard video={v} /></div>
                ))}
              </ScrollRow>
            )}
            {channelId === PROJECT_ASCEND_ID && (
              <ProjectAscendFeaturedRows
                channelVideos={channelVideos}
                channelPlaylists={channelPlaylists}
              />
            )}
            {channelId !== PROJECT_ASCEND_ID && (
              <ScrollRow title="Playlists">
                {channelPlaylists.map((pl) => <PlaylistCard key={pl.id} playlist={pl} compact />)}
              </ScrollRow>
            )}
          </div>
        )
    }
  }

  return (
    <div>
      <ChannelHeader
        channel={channel}
        activeTab={tab}
        onTabChange={setTab}
        videoCount={channelVideos.length}
      />
      {renderTab()}
    </div>
  )
}
