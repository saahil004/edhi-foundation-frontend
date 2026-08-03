import { motion } from 'framer-motion'
import { AlertTriangle, FileText, HeartHandshake, HelpCircle, ShieldCheck } from 'lucide-react'
import FAQItem from './FAQItem.jsx'

const icons = { HelpCircle, FileText, ShieldCheck, HeartHandshake, AlertTriangle }

const Subsection = ({ title, body, items }) => (
  <div>
    <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
    {body && <p className="text-gray-600 leading-relaxed">{body}</p>}
    {items && (
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-gray-600">
            <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-green-700 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    )}
  </div>
)

const PolicySection = ({ section, openFaqId, onToggleFaq }) => {
  const Icon = icons[section.icon]

  return (
    <motion.section
      id={section.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="scroll-mt-24 md:scroll-mt-36"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center shrink-0">
          <Icon className="text-white" size={20} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
      </div>

      {section.intro && <p className="text-gray-600 leading-relaxed mb-6">{section.intro}</p>}

      {section.faqs && (
        <div className="flex flex-col gap-4">
          {section.faqs.map((faq, i) => (
            <FAQItem
              key={faq.question}
              index={i + 1}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFaqId === i}
              onToggle={() => onToggleFaq(i)}
            />
          ))}
        </div>
      )}

      {section.subsections && (
        <div className="space-y-6">
          {section.subsections.map((sub) => (
            <Subsection key={sub.title} {...sub} />
          ))}
        </div>
      )}

      {section.paragraphs && (
        <div className="space-y-3">
          {section.paragraphs.map((p) => (
            <p key={p} className="text-gray-600 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      )}
    </motion.section>
  )
}

export default PolicySection
