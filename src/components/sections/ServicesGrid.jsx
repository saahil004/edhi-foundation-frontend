import { motion } from 'framer-motion'
import { services } from '../../data/servicesData'
import ServiceInfoCard from '../ui/ServiceInfoCard'

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

const ServicesGrid = () => {
  return (
    <section className="px-6 py-20 md:px-12 lg:px-20">
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {services.map((service) => (
          <motion.div key={service.id} variants={cardVariants}>
            <ServiceInfoCard
              slug={service.slug}
              title={service.title}
              desc={service.desc}
              image={service.image}
              icon={service.icon}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default ServicesGrid