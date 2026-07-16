import { motion } from 'framer-motion'

const marqueeItems = ['Volunteer Impact', 'Future Ready', 'Community Support', 'Health Support', 'Compassion First']

const SparkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2 L14 9 L21 12 L14 15 L12 22 L10 15 L3 12 L10 9 Z" />
  </svg>
)

const InfiniteMarquee = ({ items = marqueeItems, bgColor = 'bg-green-700', textColor = 'text-white', tilt = '' }) => {
  const loopItems = [...items, ...items]

  return (
    <div
      className={`relative ${bgColor} overflow-hidden py-2.5 ${tilt}`}
      style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        maxWidth: '100vw',
      }}
    >
      <motion.div
        className="flex items-center gap-6 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
      >
        {loopItems.map((item, i) => (
          <div key={i} className={`flex items-center gap-6 shrink-0 ${textColor}`}>
            <span className="text-lg md:text-xl font-bold whitespace-nowrap">
              {item}
            </span>
            <SparkIcon />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default InfiniteMarquee