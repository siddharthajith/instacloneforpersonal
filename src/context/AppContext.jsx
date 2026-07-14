import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import {
  currentUser as baseUser,
  notifications as baseNotifications,
  conversations as baseConversations,
  stories as baseStories,
} from '../data/mockData.js'

const AppContext = createContext(null)

function usePersistedState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // storage may be unavailable; interactions simply won't persist
    }
  }, [key, value])
  return [value, setValue]
}

export function AppProvider({ children }) {
  const [isAuthed, setIsAuthed] = usePersistedState('gl.authed', false)
  const [profile, setProfile] = usePersistedState('gl.profile', baseUser)
  const [likedPosts, setLikedPosts] = usePersistedState('gl.likes', [])
  const [savedPosts, setSavedPosts] = usePersistedState('gl.saves', [])
  const [followed, setFollowed] = usePersistedState('gl.follows', ['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u8', 'u9'])
  const [userComments, setUserComments] = usePersistedState('gl.comments', {})
  const [viewedStories, setViewedStories] = usePersistedState('gl.storiesViewed', [])
  const [readNotifications, setReadNotifications] = usePersistedState('gl.notifsRead', [])
  const [sentMessages, setSentMessages] = usePersistedState('gl.messages', {})
  const [recentSearches, setRecentSearches] = usePersistedState('gl.searches', ['maya.lenz', 'sourdough', 'tomas.eats'])
  const [likedReels, setLikedReels] = usePersistedState('gl.reelLikes', [])
  const [savedReels, setSavedReels] = usePersistedState('gl.reelSaves', [])
  // Not persisted: uploaded media uses blob object URLs which don't survive a refresh
  const [createdPosts, setCreatedPosts] = useState([])

  const toggleIn = (setter, id) =>
    setter((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const toggleLike = useCallback((id) => toggleIn(setLikedPosts, id), [setLikedPosts])
  const toggleSave = useCallback((id) => toggleIn(setSavedPosts, id), [setSavedPosts])
  const toggleFollow = useCallback((id) => toggleIn(setFollowed, id), [setFollowed])
  const toggleReelLike = useCallback((id) => toggleIn(setLikedReels, id), [setLikedReels])
  const toggleReelSave = useCallback((id) => toggleIn(setSavedReels, id), [setSavedReels])

  const likePost = useCallback(
    (id) => setLikedPosts((prev) => (prev.includes(id) ? prev : [...prev, id])),
    [setLikedPosts],
  )

  const addComment = useCallback(
    (postId, text) => {
      const comment = { id: `uc-${Date.now()}`, userId: 'u0', text, timestamp: Date.now(), likes: 0 }
      setUserComments((prev) => ({ ...prev, [postId]: [...(prev[postId] || []), comment] }))
    },
    [setUserComments],
  )

  const deleteComment = useCallback(
    (postId, commentId) =>
      setUserComments((prev) => ({
        ...prev,
        [postId]: (prev[postId] || []).filter((c) => c.id !== commentId),
      })),
    [setUserComments],
  )

  const markStoryViewed = useCallback(
    (id) => setViewedStories((prev) => (prev.includes(id) ? prev : [...prev, id])),
    [setViewedStories],
  )

  const markNotificationRead = useCallback(
    (id) => setReadNotifications((prev) => (prev.includes(id) ? prev : [...prev, id])),
    [setReadNotifications],
  )

  const markAllNotificationsRead = useCallback(
    () => setReadNotifications(baseNotifications.map((n) => n.id)),
    [setReadNotifications],
  )

  const sendMessage = useCallback(
    (conversationId, message) =>
      setSentMessages((prev) => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), message],
      })),
    [setSentMessages],
  )

  const addRecentSearch = useCallback(
    (term) =>
      setRecentSearches((prev) => [term, ...prev.filter((t) => t !== term)].slice(0, 8)),
    [setRecentSearches],
  )

  const addCreatedPost = useCallback(
    (post) => setCreatedPosts((prev) => [post, ...prev]),
    [setCreatedPosts],
  )

  const value = useMemo(
    () => ({
      isAuthed,
      login: () => setIsAuthed(true),
      logout: () => setIsAuthed(false),
      profile,
      setProfile,
      likedPosts,
      toggleLike,
      likePost,
      savedPosts,
      toggleSave,
      followed,
      toggleFollow,
      userComments,
      addComment,
      deleteComment,
      viewedStories,
      markStoryViewed,
      readNotifications,
      markNotificationRead,
      markAllNotificationsRead,
      sentMessages,
      sendMessage,
      recentSearches,
      addRecentSearch,
      clearRecentSearches: () => setRecentSearches([]),
      likedReels,
      toggleReelLike,
      savedReels,
      toggleReelSave,
      createdPosts,
      addCreatedPost,
      notifications: baseNotifications,
      conversations: baseConversations,
      stories: baseStories,
    }),
    [
      isAuthed, profile, likedPosts, savedPosts, followed, userComments, viewedStories,
      readNotifications, sentMessages, recentSearches, likedReels, savedReels, createdPosts,
      setIsAuthed, setProfile, toggleLike, likePost, toggleSave, toggleFollow, addComment,
      deleteComment, markStoryViewed, markNotificationRead, markAllNotificationsRead,
      sendMessage, addRecentSearch, setRecentSearches, toggleReelLike, toggleReelSave, addCreatedPost,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
