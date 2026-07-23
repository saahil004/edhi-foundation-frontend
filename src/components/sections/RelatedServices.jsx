import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const RelatedServices = ({ services, basePath = '/services', title = 'Other Ways We Help' }) => {
  if (services.length === 0) return null

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-800" />
          Explore More
        </span>
        <h3 className="mt-4 text-3xl font-bold text-green-950">{title}</h3>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((s) => (
          <motion.div key={s.id} variants={cardVariants}>
            <Link
              to={`${basePath}/${s.slug}`}
              className="group block overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-950/70 via-green-950/0 to-transparent" />
              </div>

              <div className="flex items-center justify-between p-5">
                <p className="font-semibold text-green-950">{s.title}</p>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 transition-colors duration-300 group-hover:bg-green-800">
                  <ArrowUpRight
                    size={16}
                    className="text-gray-500 transition-colors duration-300 group-hover:text-white"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default RelatedServices