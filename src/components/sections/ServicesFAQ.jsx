import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { servicesFaqData } from '../../data/servicesFaqData.js'
import FAQItem from '../ui/FAQItem.jsx'

const ServicesFAQ = () => {
  const [openId, setOpenId] = useState(1)

  const leftColumn = servicesFaqData.slice(0, 4)
  const rightColumn = servicesFaqData.slice(4, 8)

  const handleToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="px-6 py-20 md:px-12 lg:px-20">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-600">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
            Frequently Asked Questions
          </span>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-green-950 md:text-5xl">
            Helping you Understand <br /> Our Work Better
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="max-w-sm"
        >
          <p className="text-gray-600">
            We've gathered answers to the questions we hear most, making it
            easy for you to learn about our work, values, and the impact we
            create together.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white transition hover:bg-red-700"
          >
            Contact Us Now
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-8">
        <div className="flex flex-col gap-4">
          {leftColumn.map((faq, i) => (
            <FAQItem
              key={faq.id}
              index={i + 1}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {rightColumn.map((faq, i) => (
            <FAQItem
              key={faq.id}
              index={i + 1}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesFAQ