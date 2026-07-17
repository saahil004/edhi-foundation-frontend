import { motion } from 'framer-motion'
import { causesData } from '../../data/causesData.js'
import CauseCard from '../ui/CauseCard.jsx'
import causesImg from '../../assets/images/mission-bg-2.png'

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

const OurCauses = () => {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2">
            {/* left: full-bleed image */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="group relative h-[400px] overflow-hidden lg:h-auto"
            >
                <img
                    src={causesImg}
                    alt="Edhi Foundation volunteers"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-green-950/0 transition-colors duration-500 group-hover:bg-green-950/20" />
            </motion.div>

            {/* right: content + cards */}
            <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:px-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-800" />
                        Our Causes
                    </span>

                    <h2 className="mt-4 text-4xl font-bold leading-tight text-green-950 md:text-5xl">
                        Building a Just and Sustainable Future
                    </h2>

                    <p className="mt-5 max-w-lg text-gray-600">
                        By addressing interconnected social & environmental issues, we
                        strive to create inclusive communities and lasting positive
                        change worldwide.
                    </p>
                </motion.div>

                <motion.div
                    className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {causesData.map((cause) => (
  <motion.div key={cause.id} variants={cardVariants}>
    <CauseCard
      icon={cause.icon}
      title={cause.title}
      description={cause.description}
      image={cause.image}
      id={cause.id}
    />
  </motion.div>
))}
                </motion.div>
            </div>
        </section>
    )
}

export default OurCauses