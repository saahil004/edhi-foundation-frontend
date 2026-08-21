import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Mail } from 'lucide-react'
import logo from '../assets/icons/ef_logo.png'
import Seo from '../components/ui/Seo.jsx'

const NotFound = () => (
  <main className="min-h-[70vh] flex items-center justify-center px-6 py-24 text-center">
    <Seo
      title="Page Not Found"
      description="The page you're looking for doesn't exist or may have been moved."
      noindex
    />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-md"
    >
      <img src={logo} alt="Edhi Foundation" className="h-14 mx-auto mb-6 opacity-90" />

      <p className="text-7xl sm:text-8xl font-bold text-green-950/10 leading-none select-none">404</p>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 -mt-6 sm:-mt-8">Page not found</h1>
      <p className="text-gray-500 mt-3 mb-8">
        The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          <Home size={18} />
          Back to Home
        </Link>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-800 font-semibold px-6 py-3 rounded-full transition-colors"
        >
          <Mail size={18} />
          Contact Us
        </Link>
      </div>
    </motion.div>
  </main>
)

export default NotFound
