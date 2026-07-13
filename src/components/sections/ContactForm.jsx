import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    question: '',
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    // Later: POST to your Laravel endpoint, e.g.:
    // try {
    //   const res = await fetch('http://127.0.0.1:8000/api/questions', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   })
    //   if (!res.ok) throw new Error('Failed to submit')
    //   setStatus('success')
    //   setFormData({ name: '', email: '', phone: '', subject: '', question: '' })
    // } catch {
    //   setStatus('error')
    // }

    

    // Placeholder until backend is ready:
    setTimeout(() => setStatus('success'), 800)
    setFormData({name: '',email: '',phone: '',subject: '',question: ''})
  }

  return (
    <section className="w-full bg-gray-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-red-600 text-sm font-semibold flex items-center justify-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-600" /> GET IN TOUCH
          </span>
          <h2 className="text-3xl font-bold text-gray-900">Send Us a Message</h2>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={handleChange('name')}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={handleChange('email')}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={handleChange('phone')}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Subject <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={handleChange('subject')}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Your Message <span className="text-red-600">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={formData.question}
              onChange={handleChange('question')}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-lg transition-colors"
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'} <Send size={18} />
          </button>

          {status === 'success' && (
            <p className="text-green-700 text-sm text-center mt-4 font-medium">
              Thank you! Your message has been sent.
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-600 text-sm text-center mt-4 font-medium">
              Something went wrong. Please try again.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  )
}

export default ContactForm