import { useState, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import { MobileTopBar, MobileBottomNav } from './MobileNav.jsx'
import SearchPanel from './SearchPanel.jsx'
import CreateModal from '../create/CreateModal.jsx'

export default function AppLayout() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const isReels = location.pathname.startsWith('/reels')
  const isMessages = location.pathname.startsWith('/messages')
  const isChatDetail = /^\/messages\/.+/.test(location.pathname)

  useEffect(() => {
    if (location.pathname === '/create') {
      setCreateOpen(true)
      navigate('/glimpse', { replace: true })
    }
  }, [location.pathname, navigate])

  useEffect(() => setSearchOpen(false), [location.pathname])

  return (
    <div className="min-h-dvh">
      <Sidebar
        searchOpen={searchOpen}
        onOpenSearch={() => setSearchOpen((v) => !v)}
        onOpenCreate={() => setCreateOpen(true)}
      />
      {!isReels && !isChatDetail && <MobileTopBar />}
      {!isChatDetail && <MobileBottomNav onOpenCreate={() => setCreateOpen(true)} />}
      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main
        className={`md:ml-[72px] xl:ml-60 ${
          isReels || isChatDetail ? '' : isMessages ? 'pt-14 md:pt-0' : 'pt-14 md:pt-0 pb-16 md:pb-0'
        }`}
      >
        <Outlet />
      </main>

      <CreateModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  )
}
