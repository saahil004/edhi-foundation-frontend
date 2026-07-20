import { createBrowserRouter } from 'react-router-dom'
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
    ],
  },
])

export default router