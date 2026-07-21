import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useApp } from './context/AppContext.jsx'
import AppLayout from './components/layout/AppLayout.jsx'
import VideoLayout from './components/video/VideoLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import ExplorePage from './pages/ExplorePage.jsx'
import ReelsPage from './pages/ReelsPage.jsx'
import MessagesPage from './pages/MessagesPage.jsx'
import NotificationsPage from './pages/NotificationsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import EditProfilePage from './pages/EditProfilePage.jsx'
import PostPage from './pages/PostPage.jsx'
import LoginPage from './pages/auth/LoginPage.jsx'
import SignupPage from './pages/auth/SignupPage.jsx'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage.jsx'
import VerifyPage from './pages/auth/VerifyPage.jsx'
import ResetPasswordPage from './pages/auth/ResetPasswordPage.jsx'
import VideoHomePage from './pages/video/VideoHomePage.jsx'
import VideoWatchPage from './pages/video/VideoWatchPage.jsx'
import VideoChannelPage from './pages/video/VideoChannelPage.jsx'
import VideoSearchPage from './pages/video/VideoSearchPage.jsx'
import VideoLibraryPage from './pages/video/VideoLibraryPage.jsx'
import VideoHistoryPage from './pages/video/VideoHistoryPage.jsx'
import VideoSubscriptionsPage from './pages/video/VideoSubscriptionsPage.jsx'
import VideoShortsPage from './pages/video/VideoShortsPage.jsx'
import VideoPlaylistPage from './pages/video/VideoPlaylistPage.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const { isAuthed } = useApp()

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={isAuthed ? <Navigate to="/glimpse" replace /> : <LoginPage />} />
        <Route path="/signup" element={isAuthed ? <Navigate to="/glimpse" replace /> : <SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {isAuthed ? (
          <>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Navigate to="/glimpse" replace />} />
              <Route path="/glimpse" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/reels" element={<ReelsPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/messages/:conversationId" element={<MessagesPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/create" element={<HomePage />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/settings/edit-profile" element={<EditProfilePage />} />
              <Route path="/post/:postId" element={<PostPage />} />
            </Route>

            <Route path="/video" element={<VideoLayout />}>
              <Route index element={<VideoHomePage />} />
              <Route path="watch/:videoId" element={<VideoWatchPage />} />
              <Route path="channel/:channelId" element={<VideoChannelPage />} />
              <Route path="search" element={<VideoSearchPage />} />
              <Route path="library" element={<VideoLibraryPage />} />
              <Route path="history" element={<VideoHistoryPage />} />
              <Route path="subscriptions" element={<VideoSubscriptionsPage />} />
              <Route path="shorts" element={<VideoShortsPage />} />
              <Route path="playlist/:playlistId" element={<VideoPlaylistPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/glimpse" replace />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </>
  )
}
