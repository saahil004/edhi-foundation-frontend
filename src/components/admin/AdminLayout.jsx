import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const navItems = [
  { to: '/admin/services', label: 'Services' },
  { to: '/admin/appeals', label: 'Appeals' },
  { to: '/admin/programs', label: 'Programs' },
  { to: '/admin/price-options', label: 'Price Options' },
  { to: '/admin/donations', label: 'Donations' },
  { to: '/admin/settings', label: 'Settings' },
]

const AdminLayout = () => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <p className="font-bold text-gray-900">Edhi Foundation</p>
          <p className="text-xs text-gray-500">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  isActive ? 'bg-green-800 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2 truncate">{user?.email}</p>
          <button
            onClick={logout}
            className="w-full text-sm font-semibold text-red-600 hover:text-red-700 text-left"
          >
            Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
