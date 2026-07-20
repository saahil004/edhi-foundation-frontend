import { Outlet } from 'react-router-dom'
import TopBar from './TopBar.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import ScrollToHash from '../utils/ScrollToHash.jsx'

function Layout() {
  return (
    <>
    <main className='overflow-hidden'>
      <ScrollToHash />
      <TopBar />
      <Navbar />
      <main className="pt-18 md:pt-31">
        <Outlet />
      </main>
      <Footer />
      </main>
    </>
  )
}

export default Layout