import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import { navLinks } from '../../data/navLinks.jsx'
import DropdownMenu from './DropdownMenu.jsx'
import logo from '../../assets/images/logo.jpg'

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSubOpen, setMobileSubOpen] = useState(null)
  const location = useLocation()
  const activeLink = navLinks.find((l) => l.label === openDropdown)

  return (
    <nav
      className="relative border-b border-gray-100"
      onMouseLeave={() => setOpenDropdown(null)}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <img src={logo} alt="Abdul Sattar Edhi Foundation" className="h-12" />
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path

            return (
              <li
                key={link.label}
                onMouseEnter={() => link.dropdown && setOpenDropdown(link.label)}
              >
                <Link
                  to={link.path}
                  className={`flex items-center gap-1 font-medium pb-1 border-b-2 transition-colors ${
                    isActive ? 'text-red-600 border-red-600' : 'text-gray-800 border-transparent hover:text-red-600'
                  }`}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={16} />}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Buttons before the Hamburger menu - mobile/tablet only*/}
        <div className="flex items-center gap-3">
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md transition-colors">
          DONATE NOW
        </button>
        <button className="bg-green-800 hover:bg-green-900 text-white font-semibold rounded-md transition-colors">
          INTERNATIONAL PARTNERS
        </button>
      </div>  

        {/* Hamburger button — mobile/tablet only */}
        <button
          className="lg:hidden text-gray-800"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop dropdown */}
      {activeLink?.dropdown && (
        <DropdownMenu columns={activeLink.columns} image={activeLink.image} />
      )}

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 z-40 max-h-[80vh] overflow-y-auto">
          <ul className="flex flex-col px-6 py-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path
              const isSubOpen = mobileSubOpen === link.label

              return (
                <li key={link.label} className="border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-between py-3">
                    <Link
                      to={link.path}
                      onClick={() => !link.dropdown && setMobileOpen(false)}
                      className={`font-medium ${isActive ? 'text-red-600' : 'text-gray-800'}`}
                    >
                      {link.label}
                    </Link>

                    {link.dropdown && (
                      <button
                        onClick={() => setMobileSubOpen(isSubOpen ? null : link.label)}
                        aria-label={`Toggle ${link.label} submenu`}
                      >
                        <ChevronDown
                          size={18}
                          className={`transition-transform ${isSubOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile submenu */}
                  {link.dropdown && isSubOpen && (
                    <div className="pb-4 pl-4">
                      {link.columns.flat().map((item) => (
                        <a
                          key={item}
                          href="#"
                          className="block py-2 text-sm text-gray-600 hover:text-red-600"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              )
            })}

            {/* CTA buttons inside mobile menu */}
            <li className="flex flex-col gap-3 pt-4">
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition-colors">
                DONATE NOW
              </button>
              <button className="bg-green-800 hover:bg-green-900 text-white font-semibold px-4 py-2 rounded-md transition-colors">
                INTERNATIONAL PARTNERS
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar