import { Heart } from 'lucide-react'

const countryCodes = ['+92', '+1', '+44', '+91']

const DonorInfoForm = ({ formData, onChange }) => {
  const handleChange = (field) => (e) => {
    onChange((prev) => ({ ...prev, [field]: e.target.value }))
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            First name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={handleChange('firstName')}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 font-medium text-gray-900 focus:outline-none focus:border-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Last name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={handleChange('lastName')}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 font-medium text-gray-900 focus:outline-none focus:border-gray-400"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Email Address <span className="text-red-600">*</span>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400"
        />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Phone Number <span className="text-red-600">*</span>
        </label>
        <div className="flex gap-3">
          <select
            value={formData.countryCode}
            onChange={handleChange('countryCode')}
            className="border border-gray-300 rounded-lg px-3 py-3 font-medium text-gray-900 focus:outline-none focus:border-gray-400"
          >
            {countryCodes.map((code) => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
          <input
            type="tel"
            value={formData.phone}
            onChange={handleChange('phone')}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-red-500" />
        <Heart className="text-red-600" fill="#dc2626" size={20} />
        <div className="flex-1 h-px bg-red-500" />
      </div>
    </div>
  )
}

export default DonorInfoForm