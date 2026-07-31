import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  LayoutDashboard, LayoutGrid, Megaphone, ListTree, Tags, Receipt, MessageSquare, Mail, Users, Settings as SettingsIcon, LogOut,
  ExternalLink, Menu, X,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import ConfirmDialog from '../ui/ConfirmDialog.jsx'
import logo from '../../assets/icons/ef_logo.png'

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/services', label: 'Services', icon: LayoutGrid },
  { to: '/admin/appeals', label: 'Appeals', icon: Megaphone },
  { to: '/admin/programs', label: 'Programs', icon: ListTree },
  { to: '/admin/price-options', label: 'Price Options', icon: Tags },
  { to: '/admin/donations', label: 'Donations', icon: Receipt },
  { to: '/admin/contact-messages', label: 'Contact Queries', icon: MessageSquare },
  { to: '/admin/newsletter-subscribers', label: 'Newsletter', icon: Mail },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/settings', label: 'Settings', icon: SettingsIcon },
]

const AdminLayout = () => {
  const { user, logout } = useAuth()
  const location = useLocation()
  const [confirmingLogout, setConfirmingLogout] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const currentLabel = navItems.find((item) => location.pathname.startsWith(item.to))?.label ?? 'Admin'

  const closeMobileMenu = () => setMobileOpen(false)

  // Shared between the always-visible desktop sidebar and the mobile
  // slide-in drawer so the two never drift out of sync with each other.
  const sidebarContent = (
    <>
      <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
        <img src={logo} alt="Edhi Foundation" className="h-10 w-auto bg-white rounded-md p-1" />
        <button
          onClick={closeMobileMenu}
          aria-label="Close menu"
          className="lg:hidden text-green-100/80 hover:text-white"
        >
          <X size={22} />
        </button>
      </div>
      <p className="text-xs text-green-300 px-6 pt-3">Admin Panel</p>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  isActive
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-green-100/80 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-green-100/80 hover:text-white transition-colors"
        >
          <ExternalLink size={16} />
          View live site
        </a>

        <div className="flex items-center gap-3 pt-3 border-t border-white/10">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {user?.email?.[0]?.toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-white truncate">{user?.email}</p>
            <button
              onClick={() => setConfirmingLogout(true)}
              className="flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
            >
              <LogOut size={12} />
              Log out
            </button>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 bg-green-950">
        {sidebarContent}
      </aside>

      {/* Mobile/tablet top bar */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-30 bg-green-950 flex items-center justify-between px-4 py-3">
        <img src={logo} alt="Edhi Foundation" className="h-8 w-auto bg-white rounded-md p-1" />
        <button onClick={() => setMobileOpen(true)} aria-label="Open menu" className="text-white">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile/tablet slide-in drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              onClick={closeMobileMenu}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden fixed top-0 left-0 h-full w-72 max-w-[80vw] bg-green-950 z-50 flex flex-col"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="hidden lg:block bg-white border-b border-gray-200 px-8 py-5">
          <h1 className="text-xl font-bold text-gray-900">{currentLabel}</h1>
        </header>

        <header className="lg:hidden bg-white border-b border-gray-200 px-6 py-4 mt-14">
          <h1 className="text-lg font-bold text-gray-900">{currentLabel}</h1>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <ConfirmDialog
        open={confirmingLogout}
        title="Log out?"
        message="Are you sure you want to log out of the admin panel?"
        confirmLabel="Log out"
        onConfirm={() => {
          setConfirmingLogout(false)
          logout()
        }}
        onCancel={() => setConfirmingLogout(false)}
      />
    </div>
  )
}

export default AdminLayout
