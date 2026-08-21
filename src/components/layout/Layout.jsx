import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from './TopBar.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import ScrollToHash from '../utils/ScrollToHash.jsx'
import ChatWidget from '../chat/ChatWidget.jsx'
import PageLoader from '../ui/PageLoader.jsx'

function Layout() {
  return (
    <>
    <main>
      <ScrollToHash />
      <TopBar />
      <Navbar />
      <main className="pt-18 md:pt-31">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      </main>
      <ChatWidget />
    </>
  )
}

export default Layout