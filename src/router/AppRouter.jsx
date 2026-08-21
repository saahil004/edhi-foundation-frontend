// This file exports a router config, not a component, so react-refresh's
// Fast Refresh heuristic doesn't apply to the lazy() declarations below.
/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home.jsx'
import AdminRoute from '../components/admin/AdminRoute.jsx'
import AdminLayout from '../components/admin/AdminLayout.jsx'
import PageLoader from '../components/ui/PageLoader.jsx'

// Everything below is only ever needed after the initial route resolves —
// splitting it out keeps the homepage's first-load bundle from also
// shipping Stripe checkout, jsPDF/html2canvas, and the entire admin panel.
const AboutUs = lazy(() => import('../pages/AboutUs'))
const Services = lazy(() => import('../pages/Services'))
const ContactUs = lazy(() => import('../pages/ContactUs'))
const Donation = lazy(() => import('../pages/Donation.jsx'))
const Media = lazy(() => import('../pages/Media.jsx'))
const ServiceDetail = lazy(() => import('../pages/ServiceDetail.jsx'))
const Appeals = lazy(() => import('../pages/Appeals.jsx'))
const AppealDetail = lazy(() => import('../pages/AppealDetail.jsx'))
const ComingSoon = lazy(() => import('../pages/ComingSoon.jsx'))
const Login = lazy(() => import('../pages/Login.jsx'))
const ForgotPassword = lazy(() => import('../pages/ForgotPassword.jsx'))
const ResetPassword = lazy(() => import('../pages/ResetPassword.jsx'))
const PaymentHistory = lazy(() => import('../pages/PaymentHistory.jsx'))
const Support = lazy(() => import('../pages/Support.jsx'))
const NotFound = lazy(() => import('../pages/NotFound.jsx'))

const AdminLogin = lazy(() => import('../pages/admin/AdminLogin.jsx'))
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard.jsx'))
const AdminServices = lazy(() => import('../pages/admin/AdminServices.jsx'))
const AdminAppeals = lazy(() => import('../pages/admin/AdminAppeals.jsx'))
const AdminPrograms = lazy(() => import('../pages/admin/AdminPrograms.jsx'))
const AdminPriceOptions = lazy(() => import('../pages/admin/AdminPriceOptions.jsx'))
const AdminDonations = lazy(() => import('../pages/admin/AdminDonations.jsx'))
const AdminContactMessages = lazy(() => import('../pages/admin/AdminContactMessages.jsx'))
const AdminNewsletterSubscribers = lazy(() => import('../pages/admin/AdminNewsletterSubscribers.jsx'))
const AdminUsers = lazy(() => import('../pages/admin/AdminUsers.jsx'))
const AdminSettings = lazy(() => import('../pages/admin/AdminSettings.jsx'))

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
      { path: 'login', element: <Login /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password', element: <ResetPassword /> },
      { path: 'payment-history', element: <PaymentHistory /> },
      { path: 'media', element: <Media /> },
      { path: 'services/:slug', element: <ServiceDetail /> },
      { path: 'appeals', element: <Appeals /> },
      { path: 'appeals/:slug', element: <AppealDetail /> },
      { path: 'blog', element: <ComingSoon title="Blog" /> },
      { path: 'support', element: <Support /> },
      { path: 'edhi-network', element: <ComingSoon title="Edhi Network" /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: 'admin/login',
    element: (
      <Suspense fallback={<PageLoader />}>
        <AdminLogin />
      </Suspense>
    ),
  },
  {
    path: 'admin',
    element: <AdminRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'services', element: <AdminServices /> },
          { path: 'appeals', element: <AdminAppeals /> },
          { path: 'programs', element: <AdminPrograms /> },
          { path: 'price-options', element: <AdminPriceOptions /> },
          { path: 'donations', element: <AdminDonations /> },
          { path: 'contact-messages', element: <AdminContactMessages /> },
          { path: 'newsletter-subscribers', element: <AdminNewsletterSubscribers /> },
          { path: 'users', element: <AdminUsers /> },
          { path: 'settings', element: <AdminSettings /> },
        ],
      },
    ],
  },
])

export default router
