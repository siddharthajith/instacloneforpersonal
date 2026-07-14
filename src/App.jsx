import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useApp } from './context/AppContext.jsx'
import AppLayout from './components/layout/AppLayout.jsx'
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
        <Route path="/login" element={isAuthed ? <Navigate to="/" replace /> : <LoginPage />} />
        <Route path="/signup" element={isAuthed ? <Navigate to="/" replace /> : <SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {isAuthed ? (
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </>
  )
}
