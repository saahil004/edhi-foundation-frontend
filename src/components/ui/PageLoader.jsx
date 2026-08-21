import { motion } from 'framer-motion'
import logo from '../../assets/icons/ef_logo.png'

const PageLoader = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
    <div className="relative flex h-20 w-20 items-center justify-center">
      <motion.span
        className="absolute inset-0 rounded-full border-4 border-gray-200 border-t-green-800"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <motion.img
        src={logo}
        alt=""
        className="h-11 w-11 object-contain"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
    <p className="text-sm font-medium text-gray-400">Loading...</p>
  </div>
)

export default PageLoader
