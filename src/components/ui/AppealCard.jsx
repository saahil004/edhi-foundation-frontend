import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const AppealCard = ({ slug, title, desc, image, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    className={`relative rounded-xl overflow-hidden group ${className}`}
  >
    <img
      src={image}
      alt={title}
      loading="lazy"
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
    <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-sm text-gray-200 mb-4 line-clamp-2">{desc}</p>
      <Link
        to={`/appeals/${slug}`}
        className="self-start flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-gray-900
          bg-[image:linear-gradient(to_right,white_50%,#dc2626_50%)] bg-[length:200%_100%] bg-[position:0%_0%]
          transition-[background-position,color] duration-500 ease-out
          group-hover:bg-[position:100%_0%] group-hover:text-white"
      >
        Learn More <ArrowRight size={14} />
      </Link>
    </div>
  </motion.div>
)

export default AppealCard
