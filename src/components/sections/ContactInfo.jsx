import { motion } from 'framer-motion'
import contactInfo from '../../data/contactInfoData.js'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const ContactInfo = () => {
  return (
    <section className="w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {contactInfo.map((item) => {
            const Icon = item.icon

            const cardContent = (
              <>
                {/* Decorative dot */}
                <span className="absolute top-4 left-4 w-2.5 h-2.5 rounded-full bg-white z-20" />

                {/* Hover fill layer */}
                <div className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out -z-10"
                  style={{ backgroundImage: 'linear-gradient(90deg, #15803d, #22c55e)' }}
                />

                {/* Icon circle — half above the card */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gray-400 flex items-center justify-center shadow-md z-10">
                  <Icon className="text-white" size={26} />
                </div>

                <div className="pt-12">
                  <h3 className="font-bold text-gray-900 group-hover:text-white mb-2 transition-colors duration-300 text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-green-50 leading-relaxed mb-6 transition-colors duration-300">
                    We work closely with communities to identify real needs.
                  </p>

                  <div className="border-t border-gray-100 group-hover:border-white/30 pt-4 transition-colors duration-300">
                    <p className="font-bold text-gray-900 group-hover:text-white text-sm transition-colors duration-300">
                      {item.value}
                    </p>
                  </div>
                </div>
              </>
            )

            const cardClasses = "group relative flex flex-col items-center text-center p-8 rounded-2xl shadow-sm overflow-visible bg-white hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"

            if (item.id === 1) {
              return (
                <motion.a
                  key={item.id}
                  href={`tel:${item.value.replace(/[^+\d]/g, '')}`}
                  variants={itemVariants}
                  className={cardClasses}
                >
                  {cardContent}
                </motion.a>
              )
            }

            if (item.id === 2) {
              return (
                <motion.a
                  key={item.id}
                  href={`mailto:${item.value}`}
                  variants={itemVariants}
                  className={cardClasses}
                >
                  {cardContent}
                </motion.a>
              )
            }

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={cardClasses}
              >
                {cardContent}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default ContactInfo