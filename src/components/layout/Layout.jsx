import { Outlet } from 'react-router-dom'
import TopBar from './TopBar'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  return (
    <>
      <TopBar />
      <Navbar />
      <main className="pt-18 md:pt-31">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout