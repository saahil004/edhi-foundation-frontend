import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { missionData } from '../../data/missionData.js'
import MissionCard from '../ui/MissionCard.jsx'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const MissionSection = () => {
  return (
    <section className="px-6 py-16 md:px-12 lg:px-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={headerVariants}
        className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between"
      >
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-600">
            <span className="h-1.5 w-1.5 rounded-full bg-green-800" />
            Our Approach
          </span>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-green-950 md:text-5xl">
            From Understanding to Meaningful Action
          </h2>
        </div>

        <div className="max-w-sm align-baseline mt-10">
          <p className="text-gray-600">
            Through careful planning, collaboration, and transparent execution,
            we turn insights into practical initiatives that create lasting,
            positive impact where it matters most.
          </p>
          
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {missionData.map((item) => (
  <MissionCard
    key={item.id}
    id={item.id}
    icon={item.icon}
    title={item.title}
    description={item.description}
    point={item.point}
    image={item.image}
  />
))}
      </motion.div>
    </section>
  )
}

export default MissionSection