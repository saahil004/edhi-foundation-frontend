import { motion } from 'framer-motion'

const ContactMap = () => {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <motion.div
          className="rounded-2xl overflow-hidden shadow-lg h-96"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <iframe
            title="Edhi Foundation Location"
            src="https://www.google.com/maps?q=Edhi+Center+M.A.+Jinnah+Road+Karachi+Pakistan&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  )
}

export default ContactMap