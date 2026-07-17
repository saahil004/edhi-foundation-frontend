import { motion } from 'framer-motion'
import { teamMembers } from '../../data/founderData.js'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const TeamSection = () => {
  return (
    <section className="px-6 py-20 md:px-12 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-600">
          <span className="h-1.5 w-1.5 rounded-full bg-green-800" />
          Our Expert Team
        </span>

        <h2 className="mt-4 text-4xl font-bold leading-tight text-green-950 md:text-5xl">
          People Behind our Mission
        </h2>

        <p className="mt-5 text-gray-600">
          Our team brings together passionate professionals, volunteers, and
          leaders who work tirelessly to drive positive social change &
          create lasting impact in communities.
        </p>
      </motion.div>

      <motion.div
        className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {teamMembers.map((member) => (
          <motion.div
  key={member.id}
  variants={cardVariants}
  whileHover={{ y: -6 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
  className="group relative h-[420px] overflow-hidden rounded-2xl"
>
  <motion.img
    initial={{ scale: 1.15, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
    src={member.image}
    alt={member.name}
    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-950/10 to-transparent" />

  <div className="absolute bottom-0 left-0 p-5">
    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-yellow-400">
      <span className="h-1.5 w-1.5 rounded-full bg-green-800" />
      {member.title}
    </span>
    <h3 className="mt-1 text-xl font-bold text-white">
      {member.name}
    </h3>
  </div>
</motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default TeamSection