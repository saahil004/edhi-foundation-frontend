import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import contactImg from '../../assets/images/contact-form.png'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
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
    //   setFormData({ firstName: '', lastName: '', phone: '', email: '', message: '' })
    // } catch {
    //   setStatus('error')
    // }

    // Placeholder until backend is ready:
    setTimeout(() => setStatus('success'), 800)
    setFormData({ firstName: '', lastName: '', phone: '', email: '', message: '' })
  }

  return (
    <section className="w-full bg-gray-50 px-6 py-20 md:px-12 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-sm lg:grid-cols-2"
      >
        {/* left: image */}
        <div className="relative hidden h-full min-h-[600px] lg:block">
          <img
            src={contactImg}
            alt="Community rally"
            className="h-full w-full object-cover"
          />
        </div>

        {/* right: form */}
        <div className="p-6 md:p-10 lg:p-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-600">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
            Get In Touch
          </span>

          <h2 className="mt-4 text-4xl font-bold leading-tight text-green-950">
            Contact Us Today
          </h2>

          <p className="mt-4 text-gray-600">
            We'd love to hear from you! Whether you want to volunteer,
            support our programs, or learn more about our initiatives.
          </p>

          <form onSubmit={handleSubmit} className="mt-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-green-950">
                  First Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter First Name*"
                  value={formData.firstName}
                  onChange={handleChange('firstName')}
                  className="w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-green-950">
                  Last Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleChange('lastName')}
                  className="w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-green-950">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Enter Phone Number"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  className="w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800/30"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-green-950">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter Email Address"
                  value={formData.email}
                  onChange={handleChange('email')}
                  className="w-full rounded-lg bg-gray-100 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800/30"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-green-950">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Any Message..."
                value={formData.message}
                onChange={handleChange('message')}
                className="w-full resize-none rounded-lg bg-gray-100 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-800/30"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-800 disabled:opacity-60"
            >
              {status === 'submitting' ? 'Sending...' : 'Submit Message'}
              <Send size={18} />
            </button>

            {status === 'success' && (
              <p className="mt-4 text-sm font-medium text-green-700">
                Thank you! Your message has been sent.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-sm font-medium text-red-600">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </section>
  )
}

export default ContactForm