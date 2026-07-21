import { createContext, useContext, useMemo, useState, useCallback } from 'react'
import {
  PROJECT_ASCEND_ID,
  videoNotifications,
  seedComments,
  allVideoContent,
} from '../data/videoMockData.js'

const VideoContext = createContext(null)

function usePersistedState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  })
  const set = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next
        try {
          localStorage.setItem(key, JSON.stringify(resolved))
        } catch {
          // storage unavailable
        }
        return resolved
      })
    },
    [key],
  )
  return [value, set]
}

export function VideoProvider({ children }) {
  const [subscriptions, setSubscriptions] = usePersistedState('gl.videoSubs', [PROJECT_ASCEND_ID])
  const [channelNotifs, setChannelNotifs] = usePersistedState('gl.videoChannelNotifs', [PROJECT_ASCEND_ID])
  const [likedVideos, setLikedVideos] = usePersistedState('gl.videoLikes', [])
  const [dislikedVideos, setDislikedVideos] = usePersistedState('gl.videoDislikes', [])
  const [watchLater, setWatchLater] = usePersistedState('gl.videoWatchLater', [])
  const [watchHistory, setWatchHistory] = usePersistedState('gl.videoHistory', [])
  const [historyPaused, setHistoryPaused] = usePersistedState('gl.videoHistoryPaused', false)
  const [savedPlaylists, setSavedPlaylists] = usePersistedState('gl.videoSavedPlaylists', [])
  const [videoComments, setVideoComments] = usePersistedState('gl.videoComments', seedComments)
  const [readVideoNotifs, setReadVideoNotifs] = usePersistedState('gl.videoNotifsRead', [])
  const [recentVideoSearches, setRecentVideoSearches] = usePersistedState('gl.videoSearches', [])
  const [uploadedVideos, setUploadedVideos] = usePersistedState('gl.videoUploaded', [])
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)

  const toggleIn = (setter, id) =>
    setter((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const toggleSubscription = useCallback((id) => toggleIn(setSubscriptions, id), [setSubscriptions])
  const toggleChannelNotif = useCallback((id) => toggleIn(setChannelNotifs, id), [setChannelNotifs])
  const toggleWatchLater = useCallback((id) => toggleIn(setWatchLater, id), [setWatchLater])
  const toggleSavedPlaylist = useCallback((id) => toggleIn(setSavedPlaylists, id), [setSavedPlaylists])

  const toggleVideoLike = useCallback(
    (id) => {
      setLikedVideos((prev) => {
        const on = prev.includes(id)
        if (on) return prev.filter((x) => x !== id)
        setDislikedVideos((d) => d.filter((x) => x !== id))
        return [...prev, id]
      })
    },
    [setLikedVideos, setDislikedVideos],
  )

  const toggleVideoDislike = useCallback(
    (id) => {
      setDislikedVideos((prev) => {
        const on = prev.includes(id)
        if (on) return prev.filter((x) => x !== id)
        setLikedVideos((l) => l.filter((x) => x !== id))
        return [...prev, id]
      })
    },
    [setLikedVideos, setDislikedVideos],
  )

  const addToHistory = useCallback(
    (videoId) => {
      if (historyPaused) return
      setWatchHistory((prev) => {
        const entry = { videoId, watchedAt: Date.now() }
        return [entry, ...prev.filter((h) => h.videoId !== videoId)].slice(0, 100)
      })
    },
    [historyPaused, setWatchHistory],
  )

  const removeFromHistory = useCallback(
    (videoId) => setWatchHistory((prev) => prev.filter((h) => h.videoId !== videoId)),
    [setWatchHistory],
  )

  const clearHistory = useCallback(() => setWatchHistory([]), [setWatchHistory])

  const addVideoComment = useCallback(
    (videoId, text, profile) => {
      const comment = {
        id: `vc-${Date.now()}`,
        userId: 'u0',
        author: profile.fullName,
        avatar: profile.avatar,
        text,
        timestamp: Date.now(),
        likes: 0,
        dislikes: 0,
        replies: [],
      }
      setVideoComments((prev) => ({
        ...prev,
        [videoId]: [...(prev[videoId] || []), comment],
      }))
      return comment
    },
    [setVideoComments],
  )

  const deleteVideoComment = useCallback(
    (videoId, commentId) =>
      setVideoComments((prev) => ({
        ...prev,
        [videoId]: (prev[videoId] || []).filter((c) => c.id !== commentId),
      })),
    [setVideoComments],
  )

  const addVideoReply = useCallback(
    (videoId, parentId, text, profile) => {
      const reply = {
        id: `vr-${Date.now()}`,
        userId: 'u0',
        author: profile.fullName,
        avatar: profile.avatar,
        text,
        timestamp: Date.now(),
        likes: 0,
        dislikes: 0,
      }
      setVideoComments((prev) => ({
        ...prev,
        [videoId]: (prev[videoId] || []).map((c) =>
          c.id === parentId ? { ...c, replies: [...(c.replies || []), reply] } : c,
        ),
      }))
    },
    [setVideoComments],
  )

  const addUploadedVideo = useCallback(
    (video) => setUploadedVideos((prev) => [video, ...prev]),
    [setUploadedVideos],
  )

  const addRecentVideoSearch = useCallback(
    (term) =>
      setRecentVideoSearches((prev) => [term, ...prev.filter((t) => t !== term)].slice(0, 10)),
    [setRecentVideoSearches],
  )

  const markVideoNotifRead = useCallback(
    (id) => setReadVideoNotifs((prev) => (prev.includes(id) ? prev : [...prev, id])),
    [setReadVideoNotifs],
  )

  const allVideos = useMemo(() => [...uploadedVideos, ...allVideoContent], [uploadedVideos])

  const value = useMemo(
    () => ({
      subscriptions,
      channelNotifs,
      likedVideos,
      dislikedVideos,
      watchLater,
      watchHistory,
      historyPaused,
      savedPlaylists,
      videoComments,
      readVideoNotifs,
      recentVideoSearches,
      uploadedVideos,
      allVideos,
      sidebarCollapsed,
      mobileSidebarOpen,
      uploadOpen,
      videoNotifications,
      toggleSubscription,
      toggleChannelNotif,
      toggleVideoLike,
      toggleVideoDislike,
      toggleWatchLater,
      toggleSavedPlaylist,
      addToHistory,
      removeFromHistory,
      clearHistory,
      setHistoryPaused,
      addVideoComment,
      deleteVideoComment,
      addVideoReply,
      addUploadedVideo,
      addRecentVideoSearch,
      markVideoNotifRead,
      setSidebarCollapsed,
      setMobileSidebarOpen,
      setUploadOpen,
      unreadVideoNotifs: videoNotifications.filter((n) => !readVideoNotifs.includes(n.id)).length,
    }),
    [
      subscriptions, channelNotifs, likedVideos, dislikedVideos, watchLater, watchHistory,
      historyPaused, savedPlaylists, videoComments, readVideoNotifs, recentVideoSearches,
      uploadedVideos, allVideos, sidebarCollapsed, mobileSidebarOpen, uploadOpen,
      toggleSubscription, toggleChannelNotif, toggleVideoLike, toggleVideoDislike,
      toggleWatchLater, toggleSavedPlaylist, addToHistory, removeFromHistory, clearHistory,
      addVideoComment, deleteVideoComment, addVideoReply, addUploadedVideo,
      addRecentVideoSearch, markVideoNotifRead,
    ],
  )

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
}

export function useVideo() {
  const ctx = useContext(VideoContext)
  if (!ctx) throw new Error('useVideo must be used within VideoProvider')
  return ctx
}
