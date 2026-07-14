import { Link, useParams } from 'react-router-dom'
import PostDetailView from '../components/feed/PostDetailView.jsx'
import Button from '../components/ui/Button.jsx'
import { getPost } from '../data/mockData.js'
import { useApp } from '../context/AppContext.jsx'

export default function PostPage() {
  const { postId } = useParams()
  const { createdPosts } = useApp()
  const post = getPost(postId) || createdPosts.find((p) => p.id === postId)

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <h1 className="text-xl font-bold">Post not found</h1>
        <p className="text-sm text-ink-faint mt-2 mb-6">This post may have been removed or the link is incorrect.</p>
        <Link to="/"><Button>Back to home</Button></Link>
      </div>
    )
  }

  return (
    <div className="px-0 sm:px-4 pt-0 md:pt-8 pb-8 flex justify-center animate-fade-in">
      <div className="border border-line sm:rounded-xl overflow-hidden">
        <PostDetailView post={post} />
      </div>
    </div>
  )
}
