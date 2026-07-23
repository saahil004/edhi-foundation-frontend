import { motion } from 'framer-motion'
import { useServices } from '../../hooks/useServices.js'
import MobileServiceInfoCard from '../ui/MobileServiceInfoCard.jsx'

const CARDS_PER_ROW = 3

const chunk = (arr, size) => {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

const rowVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const MobileServicesGrid = () => {
  const { services, loading } = useServices()
  const rows = chunk(services, CARDS_PER_ROW)

  if (loading) return null

  return (
    <section className="px-6 py-20 md:px-12 lg:px-20 space-y-10 lg:hidden">
      {rows.map((row, rowIndex) => (
        <motion.div
  key={rowIndex}
  className="grid grid-cols-1 gap-6 lg:grid-cols-3"
  variants={rowVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
          {row.map((service) => (
            <motion.div key={service.id} variants={cardVariants}>
              <MobileServiceInfoCard
                slug={service.slug}
                title={service.title}
                desc={service.desc}
                image={service.image}
                icon={service.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      ))}
    </section>
  )
}

export default MobileServicesGrid