import { motion } from 'framer-motion'
import missionValues from '../../data/missionValuesData.js'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const MissionValues = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-red-600 text-sm font-semibold flex items-center justify-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-600" /> WHAT WE STAND FOR
          </span>
          <h2 className="text-3xl font-bold text-gray-900">Our Mission & Values</h2>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {missionValues.map((value) => {
            const Icon = value.icon

            return (
              <motion.div
                key={value.id}
                variants={itemVariants}
                className="group relative text-center p-6 rounded-2xl border border-gray-100 shadow-sm cursor-default overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
              >
                {/* Fill layer — scales in from the left on hover */}
                <div
                  className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out -z-10"
                  style={{ backgroundImage: 'linear-gradient(90deg, #15803d, #22c55e)' }}
                />

                <div className="w-14 h-14 rounded-full bg-green-100 group-hover:bg-white flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <Icon className="text-green-700" size={26} />
                </div>

                <h3 className="font-bold text-gray-900 group-hover:text-white mb-2 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-green-50 leading-relaxed transition-colors duration-300">
                  {value.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default MissionValues