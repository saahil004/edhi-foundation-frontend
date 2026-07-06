// router/AppRouter.jsx
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home.jsx'
import AboutUs from '../pages/AboutUs'
import Services from '../pages/Services'
import ContactUs from '../pages/ContactUs'
import Donation from '../pages/Donation.jsx'

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
    ],
  },
])

export default router