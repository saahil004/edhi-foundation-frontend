import { Link } from 'react-router-dom'
import { FaFacebookF, FaXTwitter, FaYoutube, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { Mail } from 'lucide-react'

const quickLinks = ['Home', 'About Us', 'Services', 'Blog', 'Contact Us']
const ourServices = ['Education Support Programs', 'Community Healthcare Services', 'Food & Nutrition Assistance', 'Shelter & Housing Support', 'Emergency & Disaster Relief']
const support = ['Help Center', 'Terms & Conditions', 'Privacy Policy', 'Donation Policy', 'Disclaimer']

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      {/* Newsletter bar */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-800">
        <div className='lg-hidden'>
          <Mail className="text-red-600" />
        </div>
        <div className="flex items-center gap-3">
          <Mail className="hidden lg:text-red-600" />
          <div className='text-center lg:text-left'>
            <h4 className="text-white font-semibold">Subscribe to our newsletter</h4>
            <p className="text-sm text-gray-400">Stay updated with our latest news, events and stories of compassion.</p>
          </div>
        </div>
        <form className="flex w-full md:w-auto">
          <input
            type="email"
            placeholder="Enter Email Address"
            className="px-4 py-2 rounded-l-md text-black w-full md:w-72 focus:outline-none bg-white"
          />
          <button className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-r-md text-white font-semibold transition-colors">
            Subscribe
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
        <li key={item}>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a>
        </li>
      ))}
    </ul>
  </div>
)

export default Footer