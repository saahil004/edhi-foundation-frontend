import { motion } from 'framer-motion'
import { appeals } from '../../data/appealsData'
import MobileAppealInfoCard from '../ui/MobileAppealInfoCard'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const MobileAppealsGrid = () => {
  return (
    <motion.section
      className="grid grid-cols-1 gap-6 px-6 py-20 md:px-12 lg:hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {appeals.map((appeal) => (
        <motion.div key={appeal.id} variants={cardVariants}>
          <MobileAppealInfoCard
            slug={appeal.slug}
            title={appeal.title}
            desc={appeal.desc}
            image={appeal.image}
          />
        </motion.div>
      ))}
    </motion.section>
  )
}

export default MobileAppealsGrid