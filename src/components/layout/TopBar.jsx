import { Mail, Phone } from 'lucide-react'
import { FaFacebookF, FaXTwitter, FaYoutube, FaInstagram, FaLinkedinIn } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const TopBar = () => {
  return (
    <div className="hidden lg:fixed lg:flex lg:top-0 lg:left-0 lg:w-full lg:z-50 bg-white text-sm items-center justify-between border-b border-gray-200 px-6 py-2">
      {/* Left: tagline */}
      <p className="text-gray-700">
        Serving Humanity <span className="text-red-600 font-semibold">Since 1951</span>
      </p>

      {/* Middle: contact info */}
      <div className="flex items-center gap-6">
        <a href="mailto:info@edhi.org" className="flex items-center gap-2 text-gray-700 hover:text-red-600">
          <Mail size={16} className="text-green-700" />
          info@edhi.org
        </a>
        <a href="tel:+92213241323" className="flex items-center gap-2 text-gray-700 hover:text-red-600">
          <Phone size={16} className="text-green-700" />
          +92 (21) 32413232
        </a>
      </div>

      {/* Social icons */}
      <div className="flex items-center gap-4 text-gray-500">
        <a href="#" aria-label="Facebook" className="hover:text-black"><FaFacebookF size={14} /></a>
        <a href="#" aria-label="Twitter" className="hover:text-black"><FaXTwitter size={14} /></a>
        <a href="#" aria-label="Youtube" className="hover:text-black"><FaYoutube size={14} /></a>
        <a href="#" aria-label="Instagram" className="hover:text-black"><FaInstagram size={14} /></a>
        <a href="#" aria-label="LinkedIn" className="hover:text-black"><FaLinkedinIn size={14} /></a>
      </div>

      {/* Right: buttons */}
      <div className="flex items-center gap-3">
        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition-colors">
          <Link to='/donation'>
          DONATE NOW
          </Link>
        </button>
        <button className="bg-green-800 hover:bg-green-900 text-white font-semibold px-4 py-2 rounded-md transition-colors">
          INTERNATIONAL PARTNERS
        </button>
      </div>
    </div>
  )
}

export default TopBar