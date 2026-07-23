import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaXTwitter, FaYoutube, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { Mail } from 'lucide-react'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact Us', path: '/contact' },
]

const ourServices = [
  { label: 'Educational Services', path: '/services/educational-services' },
  { label: 'Hospital', path: '/services/hospital' },
  { label: 'Rooti Plant', path: '/services/rooti-plant' },
  { label: 'Edhi Homes Orphanage', path: '/services/edhi-homes-orphanage' },
  { label: 'Ambulance', path: '/services/ambulance' },
]

const support = [
  { label: 'Help Center', path: '/help-center' },
  { label: 'Terms & Conditions', path: '/terms' },
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Donation Policy', path: '/donation-policy' },
  { label: 'Disclaimer', path: '/disclaimer' },
]

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // TODO: no newsletter API exists yet — this just prevents the native
  // form submit (which would full-page-reload this SPA) until a real
  // subscribe endpoint is built.
  const handleSubscribe = (e) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="bg-black text-gray-300">
      {/* Newsletter bar */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-800">
        <Mail className="md:hidden flex text-red-600 shrink-0" size={24} />
        <div className="flex items-center gap-3">
          <Mail className="hidden md:flex text-red-600 shrink-0" size={24} />
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold">Subscribe to our newsletter</h4>
            <p className="text-sm text-gray-400">Stay updated with our latest news, events and stories of compassion.</p>
          </div>
        </div>
        <form onSubmit={handleSubscribe} className="flex w-full md:w-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            className="px-4 py-2 rounded-l-md text-black w-full md:w-72 focus:outline-none bg-white"
          />
          <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-r-md text-white font-semibold transition-colors">
            {subscribed ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>
      </div>

      {/* Link columns */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-white font-semibold mb-4">Abdul Sattar Edhi</h3>
          <p className="text-sm text-gray-400 mb-4">
            We are dedicated to supporting and empowering lives by supporting communities through compassion, care and service.
          </p>
          <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaXTwitter /></a>
            <a href="#" className="hover:text-white"><FaYoutube /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>

        <FooterColumn title="Quick Links" items={quickLinks} />
        <FooterColumn title="Our Services" items={ourServices} />
        <FooterColumn title="Support" items={support} />
      </div>

      <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-800">
        © {new Date().getFullYear()} Abdul Sattar Edhi Foundation. All rights reserved.
      </div>
    </footer>
  )
}

const FooterColumn = ({ title, items }) => (
  <div>
    <h4 className="text-white font-semibold mb-4">{title}</h4>
    <ul className="space-y-2 text-sm">
      {items.map((item) => (
        <li key={item.label}>
          <Link to={item.path} className="text-gray-400 hover:text-white transition-colors">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

export default Footer