import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react'
import { navLinks } from '../../data/navLinks.js'
import DropdownMenu from './DropdownMenu.jsx'
import logo from '../../assets/icons/ef_logo.png'

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileScreen, setMobileScreen] = useState('main')
  const location = useLocation()
  const activeMobileLink = navLinks.find((l) => l.label === mobileScreen)

  const closeMobileMenu = () => {
    setMobileOpen(false)
    setMobileScreen('main')
  }

  return (
    <nav
      className="fixed top-0 lg:top-[52px] left-0 w-full z-40 bg-white border-b border-gray-100"
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
          <img src={logo} alt="Abdul Sattar Edhi Foundation" className="h-14" />
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path

            return (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
              >
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
                  <Link
                    to={link.path}
                    className={`flex items-center gap-1 font-medium pb-1 border-b-2 transition-colors ${
                      isActive ? 'text-red-600 border-red-600' : 'text-gray-800 border-transparent hover:text-red-600'
                    }`}
                  >
                    {link.label}
                    {link.dropdown && <ChevronDown size={16} />}
                  </Link>
                </motion.div>

                <AnimatePresence>
                  {openDropdown === link.label && link.dropdown && (
                    <div className="hidden lg:block">
                      <DropdownMenu
                        columns={link.columns}
                        image={link.image}
                        label={link.label}
                        path={link.path}
                        basePath={link.basePath}
                      />
                    </div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>

        <button
          className="lg:hidden text-gray-800 mx-2 ml-auto"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden fixed inset-0 bg-white z-50 overflow-y-auto"
          >
            {mobileScreen === 'main' ? (
              <div className="flex flex-col min-h-full">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <img src={logo} alt="Abdul Sattar Edhi Foundation" className="h-10" />
                  <button onClick={closeMobileMenu} aria-label="Close menu">
                    <X size={24} />
                  </button>
                </div>

                <ul className="flex flex-col px-6 py-4">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path

                    return (
                      <li key={link.label} className="border-b border-gray-100 last:border-0">
                        {link.dropdown ? (
                          <button
                            onClick={() => setMobileScreen(link.label)}
                            className="w-full flex items-center justify-between py-3 font-medium text-gray-800"
                          >
                            {link.label}
                            <ChevronRight size={18} className="text-gray-400" />
                          </button>
                        ) : (
                          <Link
                            to={link.path}
                            onClick={closeMobileMenu}
                            className={`block py-3 font-medium ${isActive ? 'text-red-600' : 'text-gray-800'}`}
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    )
                  })}

                  <li className="flex flex-col gap-3 pt-4">
                    <Link
                      to="/donation"
                      onClick={closeMobileMenu}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition-colors flex justify-center"
                    >
                      DONATE NOW
                    </Link>
                    <button className="bg-green-800 hover:bg-green-900 text-white font-semibold px-4 py-2 rounded-md transition-colors">
                      INTERNATIONAL PARTNERS
                    </button>
                  </li>
                </ul>

                <div className="px-6 py-6 mt-auto border-t border-gray-100">
                  <p className="text-center text-sm font-medium text-gray-500 mb-3">Follow Us</p>
                  <div className="flex justify-center gap-4 text-gray-600">
                    {/* Add your social icons here, e.g. FaFacebookF, FaXTwitter, etc. */}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col min-h-full">
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                  <button onClick={() => setMobileScreen('main')} aria-label="Back to main menu">
                    <ChevronLeft size={22} />
                  </button>
                  <h3 className="text-green-700 font-bold text-lg">{activeMobileLink.label}</h3>
                </div>

                <ul className="px-6 py-4">
                  {activeMobileLink.columns.flat().map((item) => {
                    const label = typeof item === 'string' ? item : item.label
                    const slug = typeof item === 'string' ? null : item.slug
                    const path = typeof item === 'string' ? null : item.path
                    const linkTo = slug ? `${activeMobileLink.basePath || '/services'}/${slug}` : path

                    return (
                      <li key={label} className="border-b border-gray-100">
                        {linkTo ? (
                          <Link
                            to={linkTo}
                            onClick={closeMobileMenu}
                            className="flex items-center justify-between py-3 text-gray-700"
                          >
                            {label}
                            <ChevronRight size={16} className="text-gray-400" />
                          </Link>
                        ) : (
                          <a
                            href="#"
                            onClick={closeMobileMenu}
                            className="flex items-center justify-between py-3 text-gray-700"
                          >
                            {label}
                            <ChevronRight size={16} className="text-gray-400" />
                          </a>
                        )}
                      </li>
                    )
                  })}
                </ul>

                {activeMobileLink.image && (
                  <div className="px-6 pb-6">
                    <img
                      src={activeMobileLink.image}
                      alt=""
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                    <Link
                      to={activeMobileLink.path}
                      onClick={closeMobileMenu}
                      className="block text-center bg-green-800 hover:bg-green-900 text-white font-semibold py-3 rounded-md transition-colors"
                    >
                      See All {activeMobileLink.label}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar