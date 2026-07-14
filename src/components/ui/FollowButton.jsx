import { useApp } from '../../context/AppContext.jsx'
import Button from './Button.jsx'

export default function FollowButton({ userId, size = 'sm', className = '' }) {
  const { followed, toggleFollow } = useApp()
  const isFollowing = followed.includes(userId)
  return (
    <Button
      variant={isFollowing ? 'secondary' : 'primary'}
      size={size}
      className={className}
      aria-pressed={isFollowing}
      onClick={() => toggleFollow(userId)}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </Button>
  )
}
