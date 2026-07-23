import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: 'easeOut' } },
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
          <motion.div
            key={s.id}
            variants={cardVariants}
            whileHover={{ y: -8, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
          >
            <Link
              to={`${basePath}/${s.slug}`}
              className="group relative block h-80 overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 hover:shadow-2xl"
            >
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-950/30 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h4 className="text-xl font-bold mb-1.5 transition-transform duration-300 group-hover:-translate-y-1">
                  {s.title}
                </h4>
                {s.desc && (
                  <p className="text-sm text-gray-200 mb-4 line-clamp-2 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-300 ease-out">
                    {s.desc}
                  </p>
                )}
                <span
                  className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-green-950
                    bg-[image:linear-gradient(to_right,white_50%,#dc2626_50%)] bg-[length:200%_100%] bg-[position:0%_0%]
                    transition-[background-position,color] duration-500 ease-out
                    group-hover:bg-[position:100%_0%] group-hover:text-white"
                >
                  Learn More
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default RelatedServices
