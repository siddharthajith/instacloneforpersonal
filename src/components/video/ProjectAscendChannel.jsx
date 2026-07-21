import VideoCard from './VideoCard.jsx'
import PlaylistCard from './PlaylistCard.jsx'

/** Project Ascend–specific channel home sections */
export function ProjectAscendFeaturedRows({ channelVideos, channelPlaylists }) {
  const documentaries = channelVideos.filter((v) => v.category === 'Documentaries')
  const tutorials = channelVideos.filter((v) =>
    ['Technology', 'Coding', 'Artificial Intelligence', 'Education'].includes(v.category),
  )
  const bts = channelVideos.filter((v) => v.title.toLowerCase().includes('behind'))

  return (
    <>
      {documentaries.length > 0 && (
        <ScrollRow title="Project documentaries">
          {documentaries.map((v) => (
            <div key={v.id} className="shrink-0 w-72"><VideoCard video={v} /></div>
          ))}
        </ScrollRow>
      )}
      {tutorials.length > 0 && (
        <ScrollRow title="Technology tutorials">
          {tutorials.map((v) => (
            <div key={v.id} className="shrink-0 w-72"><VideoCard video={v} /></div>
          ))}
        </ScrollRow>
      )}
      {bts.length > 0 && (
        <ScrollRow title="Behind the scenes">
          {bts.map((v) => (
            <div key={v.id} className="shrink-0 w-72"><VideoCard video={v} /></div>
          ))}
        </ScrollRow>
      )}
      <ScrollRow title="Playlists">
        {channelPlaylists.map((pl) => <PlaylistCard key={pl.id} playlist={pl} compact />)}
      </ScrollRow>
    </>
  )
}

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
