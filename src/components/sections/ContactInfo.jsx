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
    <section className="relative w-full bg-gray-50">
      {/* single decorative dot, top-left of section */}
      <span className="absolute left-6 top-6 h-2.5 w-2.5 rounded-full bg-yellow-400 md:left-12 lg:left-20" />

      <div className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {contactInfo.map((item) => {
            const Icon = item.icon

            const cardContent = (
              <>
                {/* Icon circle — half above the card */}
                <div className="absolute -top-8 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-red-600 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <Icon className="text-white" size={26} />
                </div>

                <div className="pt-10 text-center">
                  <h3 className="text-2xl font-bold text-green-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-500">
                    We work closely with communities to identify real needs.
                  </p>

                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <p className="text-sm font-bold text-green-950">
                      {item.value}
                    </p>
                  </div>
                </div>
              </>
            )

            const cardClasses =
              'group relative flex flex-col items-center rounded-2xl bg-white p-8 pt-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl'

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
              <motion.div key={item.id} variants={itemVariants} className={cardClasses}>
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