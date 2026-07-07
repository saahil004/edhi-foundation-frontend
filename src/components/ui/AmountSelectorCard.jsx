import { useState } from 'react'

const presetAmounts = [10, 25, 50, 100, 250, 500]

const AmountSelector = () => {
  const currencyOptions = ['USD $', 'PKR RS']  
  const [amount, setAmount] = useState(10)
  const [customAmount, setCustomAmount] = useState('')

  const handlePresetClick = (value) => {
    setAmount(value)
    setCustomAmount('')
  }

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value)
    setAmount(null)
  }

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            How much would you like to donate today?
          </h2>
          <p className="text-sm text-gray-500">
            All donations directly impact our organization and help us further our mission.
          </p>
        </div>

        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm font-medium text-gray-700 shrink-0">
          {
             currencyOptions.map((curr, index) => (
                <option key={index}>{curr}</option>
             )) 
          }
        </select>
      </div>

      <p className="text-sm font-medium text-gray-700 mb-3">
        Donation Amount <span className="text-red-600">*</span>
      </p>

      <div className="grid grid-cols-3 gap-3 mb-3">
        {presetAmounts.map((value) => {
          const isSelected = amount === value

          return (
            <button
              key={value}
              onClick={() => handlePresetClick(value)}
              className={`relative px-4 py-3 rounded-lg font-semibold border transition-colors ${
                isSelected
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-gray-800 border-gray-300 hover:border-gray-400'
              }`}
            >
              ${value.toFixed(2)}
              {isSelected && (
                <span className="hidden absolute top-1/2 right-3 -translate-y-1/2 w-5 h-5 rounded-full bg-white lg:flex items-center justify-center">
                  <span className="w-3 h-3 rounded-full bg-red-600" />
                </span>
              )}
            </button>
          )
        })}
      </div>

      <input
        type="number"
        placeholder="Enter custom amount"
        value={customAmount}
        onChange={handleCustomChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400"
      />
    </div>
  )
}

export default AmountSelector