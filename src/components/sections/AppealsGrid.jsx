import { motion } from 'framer-motion'
import { appeals } from '../../data/appealsData'
import AppealInfoCard from '../ui/AppealInfoCard'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const AppealsGrid = () => {
  return (
    <section className="hidden px-6 py-20 md:px-12 lg:block lg:px-20">
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {appeals.map((appeal) => (
          <motion.div key={appeal.id} variants={cardVariants}>
            <AppealInfoCard
              slug={appeal.slug}
              title={appeal.title}
              desc={appeal.desc}
              image={appeal.image}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default AppealsGrid