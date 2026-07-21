import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../ui/Icon.jsx'
import Avatar from '../ui/Avatar.jsx'
import { PlatformSwitcherButton, PlatformSwitcherMenu } from '../ui/PlatformSwitcher.jsx'
import { useApp } from '../../context/AppContext.jsx'
import { useVideo } from '../../context/VideoContext.jsx'

export default function VideoTopBar({ onMenuClick }) {
  const navigate = useNavigate()
  const { profile } = useApp()
  const { unreadVideoNotifs, setUploadOpen } = useVideo()
  const [query, setQuery] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  useEffect(() => {
    const onClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const search = (e) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    navigate(`/video/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="fixed top-0 inset-x-0 z-40 h-14 bg-card border-b border-line flex items-center gap-2 sm:gap-4 px-3 sm:px-4">
      <button
        type="button"
        onClick={onMenuClick}
        className="p-2 rounded-full hover:bg-stone-100 shrink-0"
        aria-label="Toggle menu"
      >
        <Icon name="menu" size={22} />
      </button>

      <Link to="/video" className="flex items-center gap-2 shrink-0 min-w-0" aria-label="Glimpse Video home">
        <span className="flex items-center justify-center size-8 rounded-lg bg-accent text-white">
          <Icon name="play" size={16} filled />
        </span>
        <span className="hidden sm:block text-lg font-bold tracking-tight truncate">
          Glimpse <span className="text-accent font-extrabold">Video</span>
        </span>
      </Link>

      <form onSubmit={search} className="hidden md:flex flex-1 max-w-2xl mx-auto items-center">
        <div className="flex flex-1 items-center border border-line-strong rounded-full overflow-hidden bg-stone-50 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos, channels, playlists"
            className="flex-1 px-4 py-2 bg-transparent text-sm outline-none min-w-0"
            aria-label="Search"
          />
          <button type="submit" className="px-5 py-2 border-l border-line-strong hover:bg-stone-100" aria-label="Search">
            <Icon name="search" size={20} />
          </button>
        </div>
        <button type="button" className="ml-3 p-2.5 rounded-full bg-stone-100 hover:bg-stone-200" aria-label="Voice search (placeholder)">
          <Icon name="mic" size={20} />
        </button>
      </form>

      <div className="flex items-center gap-0.5 sm:gap-1 ml-auto shrink-0">
        <Link to="/video/search" className="md:hidden p-2 rounded-full hover:bg-stone-100" aria-label="Search">
          <Icon name="search" size={22} />
        </Link>
        <button
          type="button"
          onClick={() => setUploadOpen(true)}
          className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full hover:bg-stone-100 text-sm font-medium"
        >
          <Icon name="upload" size={20} />
          <span className="hidden lg:inline">Create</span>
        </button>
        <button type="button" onClick={() => setUploadOpen(true)} className="sm:hidden p-2 rounded-full hover:bg-stone-100" aria-label="Upload">
          <Icon name="upload" size={22} />
        </button>
        <Link to="/notifications" className="relative p-2 rounded-full hover:bg-stone-100" aria-label="Notifications">
          <Icon name="bell" size={22} />
          {unreadVideoNotifs > 0 && (
            <span className="absolute top-1 right-1 size-2 rounded-full bg-danger" />
          )}
        </Link>
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen((v) => !v)}
            className="p-1 rounded-full hover:ring-2 hover:ring-line"
            aria-expanded={profileOpen}
            aria-haspopup="menu"
            aria-label="Account menu"
          >
            <Avatar src={profile.avatar} alt="" size="sm" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-line rounded-xl shadow-lg animate-scale-in z-50">
              <PlatformSwitcherMenu current="video" onClose={() => setProfileOpen(false)} />
            </div>
          )}
        </div>
        <PlatformSwitcherButton platform="video" className="hidden lg:inline-flex" />
      </div>
    </header>
  )
}
