import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

const AdminRoute = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  if (!user.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700">
        You don't have admin access.
      </div>
    )
  }

  return <Outlet />
}

export default AdminRoute
