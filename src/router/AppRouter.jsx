import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home.jsx'
import AboutUs from '../pages/AboutUs'
import Services from '../pages/Services'
import ContactUs from '../pages/ContactUs'
import Donation from '../pages/Donation.jsx'
import Media from '../pages/Media.jsx'
import ServiceDetail from '../pages/ServiceDetail.jsx'
import Appeals from '../pages/Appeals.jsx'
import AppealDetail from '../pages/AppealDetail.jsx'
import ComingSoon from '../pages/ComingSoon.jsx'
import AdminLogin from '../pages/admin/AdminLogin.jsx'
import AdminRoute from '../components/admin/AdminRoute.jsx'
import AdminLayout from '../components/admin/AdminLayout.jsx'
import AdminServices from '../pages/admin/AdminServices.jsx'
import AdminAppeals from '../pages/admin/AdminAppeals.jsx'
import AdminPrograms from '../pages/admin/AdminPrograms.jsx'
import AdminPriceOptions from '../pages/admin/AdminPriceOptions.jsx'
import AdminDonations from '../pages/admin/AdminDonations.jsx'
import AdminSettings from '../pages/admin/AdminSettings.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <AboutUs /> },
      { path: 'services', element: <Services /> },
      { path: 'contact', element: <ContactUs /> },
      { path: 'donation', element: <Donation /> },
      { path: 'media', element: <Media /> },
      { path: 'services/:slug', element: <ServiceDetail /> },
      { path: 'appeals', element: <Appeals /> },
      { path: 'appeals/:slug', element: <AppealDetail /> },
      { path: 'blog', element: <ComingSoon title="Blog" /> },
      { path: 'help-center', element: <ComingSoon title="Help Center" /> },
      { path: 'terms', element: <ComingSoon title="Terms & Conditions" /> },
      { path: 'privacy', element: <ComingSoon title="Privacy Policy" /> },
      { path: 'donation-policy', element: <ComingSoon title="Donation Policy" /> },
      { path: 'disclaimer', element: <ComingSoon title="Disclaimer" /> },
    ],
  },
  { path: 'admin/login', element: <AdminLogin /> },
  {
    path: 'admin',
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="services" replace /> },
          { path: 'services', element: <AdminServices /> },
          { path: 'appeals', element: <AdminAppeals /> },
          { path: 'programs', element: <AdminPrograms /> },
          { path: 'price-options', element: <AdminPriceOptions /> },
          { path: 'donations', element: <AdminDonations /> },
          { path: 'settings', element: <AdminSettings /> },
        ],
      },
    ],
  },
])

export default router