import { Outlet, NavLink } from 'react-router-dom'
import VideoTopBar from './VideoTopBar.jsx'
import VideoSidebar from './VideoSidebar.jsx'
import UploadModal from './UploadModal.jsx'
import Icon from '../ui/Icon.jsx'
import { PlatformSwitcherButton } from '../ui/PlatformSwitcher.jsx'
import { useVideo } from '../../context/VideoContext.jsx'

const mobileNav = [
  { to: '/video', icon: 'home', label: 'Home', end: true },
  { to: '/video/shorts', icon: 'shorts', label: 'Shorts' },
  { key: 'create', icon: 'upload', label: 'Create' },
  { to: '/video/subscriptions', icon: 'video', label: 'Subscriptions' },
  { to: '/video/library', icon: 'library', label: 'Library' },
]

export default function VideoLayout() {
  const {
    sidebarCollapsed, setSidebarCollapsed,
    mobileSidebarOpen, setMobileSidebarOpen,
    uploadOpen, setUploadOpen,
  } = useVideo()

  const toggleMenu = () => {
    if (window.innerWidth < 1024) setMobileSidebarOpen((v) => !v)
    else setSidebarCollapsed((v) => !v)
  }

  return (
    <div className="min-h-dvh bg-canvas">
      <VideoTopBar onMenuClick={toggleMenu} />

      {mobileSidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close menu"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <div className="fixed top-14 bottom-0 left-0 z-40 hidden lg:block border-r border-line">
        <VideoSidebar collapsed={sidebarCollapsed} />
      </div>

      <div
        className={`fixed top-14 bottom-0 left-0 z-50 lg:hidden transition-transform duration-200 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <VideoSidebar mobile onNavigate={() => setMobileSidebarOpen(false)} />
      </div>

      <main
        className={`pt-14 pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-6 transition-[margin] duration-200 ${
          sidebarCollapsed ? 'lg:ml-[72px]' : 'lg:ml-60'
        }`}
      >
        <Outlet />
      </main>

      <nav
        aria-label="Video mobile navigation"
        className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-card border-t border-line flex pb-[env(safe-area-inset-bottom)]"
      >
        {mobileNav.map((item) => {
          if (item.key === 'create') {
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setUploadOpen(true)}
                className="flex flex-col items-center justify-center flex-1 py-2 text-ink-soft"
                aria-label="Create"
              >
                <Icon name="upload" size={22} />
                <span className="text-[10px] mt-0.5 font-medium">Create</span>
              </button>
            )
          }
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center flex-1 py-2 ${isActive ? 'text-accent font-semibold' : 'text-ink-soft'}`
              }
              aria-label={item.label}
            >
              <Icon name={item.icon} size={22} />
              <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      <div className="lg:hidden fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] right-3 z-30">
        <PlatformSwitcherButton platform="video" />
      </div>

      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </div>
  )
}
