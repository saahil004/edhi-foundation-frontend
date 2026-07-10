import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { Users, MessageSquare, FileText, Trophy } from 'lucide-react'
import { stats } from '../../data/statsData'
import statsBarBg from '../../assets/images/statscardbg.png'

const iconMap = {
  users: Users,
  message: MessageSquare,
  file: FileText,
  trophy: Trophy,
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const CountUpNumber = ({ value }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })

    return () => controls.stop()
  }, [isInView, value])

  return <span ref={ref}>{display.toLocaleString()}</span>
}

const StatsBar = () => {
  return (
    <section
      className="relative overflow-x-hidden"
      style={{
        backgroundImage: `url(${statsBarBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        maxWidth: '100vw',
      }}
    >
      <div className="absolute inset-0 bg-red-900/80" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon]

            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-4">
                  <Icon className="text-white" size={26} />
                </div>
                <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight tabular-nums">
                  <CountUpNumber value={stat.value} />
                  <span className="text-red-300 font-semibold">{stat.suffix}</span>
                </h3>
                <p className="text-red-100 text-sm font-medium mt-2 uppercase tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default StatsBar