import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'

export const CountUpNumber = ({ value }) => {
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

const StatBadge = ({ icon: IconCmp, value, suffix, label, avatars }) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.05 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
    className="group/card flex flex-col items-center justify-center gap-2 rounded-3xl border-4 border-green-950 bg-white p-5 text-center shadow-[0_12px_30px_-8px_rgba(0,0,0,0.35)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.4)] w-36 h-36 shrink-0"
  >
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-800 transition-colors duration-300 group-hover/card:bg-red-700">
      <IconCmp className="h-5 w-5 text-white" />
    </div>
    <p className="text-xl font-bold text-green-950 leading-none">
      <CountUpNumber value={value} />
      {suffix}
    </p>
    <p className="text-xs font-medium text-gray-600 leading-tight">{label}</p>
    {avatars && (
      <div className="flex -space-x-2">
        {avatars.map((avatar, i) => (
          <img key={i} src={avatar} alt="" className="h-5 w-5 rounded-full border-2 border-white object-cover" />
        ))}
      </div>
    )}
  </motion.div>
)

export default StatBadge