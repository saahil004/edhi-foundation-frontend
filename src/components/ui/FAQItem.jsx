import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const FAQItem = ({ index, question, answer, isOpen, onToggle }) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-gray-100">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-medium text-green-950">
          {index}. {question}
        </span>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-800"
        >
          <Plus className="h-4 w-4 text-white" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-gray-600">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FAQItem