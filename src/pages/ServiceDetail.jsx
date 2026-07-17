import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react'
import { services, iconMap } from '../data/servicesData.js'
import ProgressBar from '../components/ui/ProgressBar.jsx'

const ServiceDetail = () => {
  const { slug } = useParams()
  const service = services.find((s) => s.slug === slug)

  if (!service) {
    return <Navigate to="/services" replace />
  }

  const { title, desc, image, icon, raised, goal } = service
  const Icon = iconMap[icon]
  const percent = Math.round((raised / goal) * 100)

  // Suggest 3 other services, excluding the current one
  const relatedServices = services
    .filter((s) => s.slug !== slug)
    .slice(0, 3)

  return (
    <>
      {/* Hero */}
      {/* Hero */}
<section className="relative w-full h-[26rem] md:h-[32rem] overflow-hidden">
  <motion.div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `url(${image})`,
      backgroundAttachment: 'fixed',
    }}
    initial={{ scale: 1.15, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.2, ease: 'easeOut' }}
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

  <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 pb-12 max-w-7xl mx-auto left-0 right-0">
    <Link
      to="/services"
      className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-6 w-fit"
    >
      <ArrowLeft size={16} /> Back to Services
    </Link>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      className="flex items-center gap-4 mb-3"
    >
      {Icon && (
        <div className="w-14 h-14 rounded-full bg-green-800 flex items-center justify-center shrink-0">
          <Icon className="text-white" size={26} />
        </div>
      )}
      <h1 className="text-3xl md:text-5xl font-bold text-white">{title}</h1>
    </motion.div>

    <motion.p
      className="text-gray-200 max-w-2xl text-sm md:text-base"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
    >
      {desc}
    </motion.p>
  </div>
</section>

      {/* Content */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="text-red-600 text-sm font-semibold flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-red-600" /> ABOUT THIS SERVICE
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Help</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {desc}
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every donation to this program goes directly toward sustaining and expanding this service —
              helping the Edhi Foundation continue its work of serving humanity without discrimination, exactly
              as Abdul Sattar Edhi envisioned.
            </p>
          </motion.div>

          {/* Sidebar: donation progress card */}
          <motion.div
            className="bg-gray-50 rounded-2xl p-6 md:p-8 h-fit sticky top-24"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          >
            <h3 className="font-bold text-gray-900 mb-4">Program Progress</h3>

            <ProgressBar percent={percent} color="bg-green-600" />
            <div className="flex items-center justify-between text-sm text-gray-500 mt-2 mb-6">
              <span>{percent}% funded</span>
              <span>Goal: ${goal.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-2xl font-bold text-gray-900">${raised.toLocaleString()}</p>
                <p className="text-xs text-gray-500">raised so far</p>
              </div>
            </div>

            <Link
              to="/donation"
              className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-full transition-colors"
            >
              Donate to This Program <Heart size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Related services */}
{relatedServices.length > 0 && (
  <div className="max-w-7xl mx-auto px-6 pb-16">
    <h3 className="text-xl font-bold text-gray-900 mb-6">Other Ways We Help</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {relatedServices.map((s) => (
        <Link
          key={s.id}
          to={`/services/${s.slug}`}
          className="group flex items-center gap-4 p-5 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-colors"
        >
          <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">{s.title}</p>
          </div>
          <ArrowRight size={16} className="text-gray-400 group-hover:text-green-700 group-hover:translate-x-1 transition-all" />
        </Link>
      ))}
    </div>
  </div>
)}
      </section>
    </>
  )
}

export default ServiceDetail