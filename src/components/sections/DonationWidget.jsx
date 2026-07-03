import { useState } from 'react'
import { Check, ChevronRight } from 'lucide-react'

const STEPS = ['Choose Amount', 'Details', 'Payment']
const AMOUNTS = [10, 25, 50, 100]
const FEE_RATE = 0.03

const DonationWidget = () => {
  const [frequency, setFrequency] = useState('one-time') // 'one-time' | 'monthly'
  const [amount, setAmount] = useState(50)
  const [customAmount, setCustomAmount] = useState('')
  const [coverFee, setCoverFee] = useState(true)
  const [showSplit, setShowSplit] = useState(false)

  const selectedAmount = customAmount ? Number(customAmount) || 0 : amount
  const fee = coverFee ? Math.round(selectedAmount * FEE_RATE * 100) / 100 : 0
  const total = selectedAmount + fee

  const handlePresetClick = (value) => {
    setAmount(value)
    setCustomAmount('')
  }

  return (
    <section className="relative w-full bg-white overflow-hidden my-3">
      <div className="relative max-w-6xl mx-auto min-h-205 md:min-h-150 flex items-stretch">
        {/* Left photo */}
        <div className="hidden md:block absolute inset-y-0 left-0 w-[30%] rounded-l-2xl overflow-hidden">
          <img
            src="/src/assets/images/fdg.jpg"
            alt="Food donation box with groceries and warm clothing"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right photo */}
        <div className="hidden md:block absolute inset-y-0 right-0 w-[30%] rounded-r-2xl overflow-hidden">
          <img
            src="/src/assets/images/donation.jpeg"
            alt="Hand placing a heart into a donation box"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Floating card */}
        <div className="relative z-10 mx-auto my-6 md:my-10 w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
          {/* Steps */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-bold tracking-wide px-3 py-1.5 rounded ${
                    i === 0
                      ? 'bg-green-800 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {step.toUpperCase()}
                </span>
                {i < STEPS.length - 1 && (
                  <ChevronRight size={14} className="text-gray-300" />
                )}
              </div>
            ))}
          </div>

          <h2 className="text-lg font-bold text-gray-900 mb-4">Choose Amount</h2>

          {/* Frequency toggle */}
          <div className="grid grid-cols-2 rounded-lg border border-green-800 overflow-hidden mb-4">
            <button
              onClick={() => setFrequency('one-time')}
              className={`py-2.5 text-sm font-semibold transition-colors ${
                frequency === 'one-time'
                  ? 'bg-green-800 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              One-time
            </button>
            <button
              onClick={() => setFrequency('monthly')}
              className={`py-2.5 text-sm font-semibold transition-colors ${
                frequency === 'monthly'
                  ? 'bg-green-800 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Monthly
            </button>
          </div>

          {/* Amount presets */}
          <div className="grid grid-cols-4 gap-2 mb-3">
            {AMOUNTS.map((value) => {
              const isActive = !customAmount && amount === value
              return (
                <button
                  key={value}
                  onClick={() => handlePresetClick(value)}
                  className={`py-2.5 rounded-lg border text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-green-800 text-white border-green-800'
                      : 'border-green-800 text-gray-800 hover:bg-green-50'
                  }`}
                >
                  ${value}
                </button>
              )
            })}
          </div>

          {/* Custom amount */}
          <div className="mb-5">
            <label className="block text-center text-xs font-semibold text-gray-500 mb-1.5">
              Other
            </label>
            <input
              type="number"
              min="0"
              placeholder="Enter amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent"
            />
          </div>

          {/* Fund split notice */}
          <div className="bg-gray-100 rounded-lg p-3 mb-3 flex items-start justify-between gap-3">
            <p className="text-xs text-gray-700 leading-relaxed">
              Your donation will be split between{' '}
              <span className="font-semibold">General Fund</span> and{' '}
              <span className="font-semibold">Community Welfare Fund</span>.
            </p>
            <button
              onClick={() => setShowSplit((s) => !s)}
              className="shrink-0 text-xs font-semibold text-red-600 hover:underline"
            >
              {showSplit ? 'Hide' : 'Show'}
            </button>
          </div>

          {showSplit && (
            <div className="mb-3 text-xs text-gray-600 border border-gray-200 rounded-lg p-3 space-y-1">
              <div className="flex justify-between">
                <span>General Fund</span>
                <span>{(selectedAmount / 2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Community Welfare Fund</span>
                <span>{(selectedAmount / 2).toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Fee checkbox */}
          <label className="flex items-center gap-3 mb-4 cursor-pointer select-none">
            <span
              onClick={() => setCoverFee((c) => !c)}
              className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                coverFee
                  ? 'bg-green-800 border-green-800'
                  : 'border-gray-300 bg-white'
              }`}
            >
              {coverFee && <Check size={14} className="text-white" />}
            </span>
            <span className="text-sm text-gray-700">
              Add ${fee.toFixed(2)} to cover the transaction fee
            </span>
          </label>

          {/* Amount summary */}
          <div className="flex items-center justify-between text-sm font-semibold text-gray-900 mb-6">
            <span>
              Amount: <span className="font-bold">${selectedAmount.toFixed(2)}</span>
            </span>
            <span>
              Fees: <span className="font-bold">${fee.toFixed(2)}</span>
            </span>
          </div>

          {/* Checkout */}
          <h3 className="text-sm font-bold text-gray-900 mb-1">Checkout</h3>
          <p className="text-sm text-gray-600 mb-4">
            Have an account?{' '}
            <button className="text-red-600 font-semibold hover:underline">
              Sign in to give faster
            </button>
          </p>

          <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg mb-3 transition-colors">
            <span className="flex gap-1 items-center text-[10px] font-bold">
              <span className="bg-white text-blue-700 px-1 rounded">VISA</span>
              <span className="bg-white text-orange-600 px-1 rounded">MC</span>
            </span>
            Pay with card (${total.toFixed(2)})
          </button>

          <div className="grid grid-cols-3 gap-2">
            <button className="bg-black hover:bg-gray-800 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
               Pay
            </button>
            <button className="bg-black hover:bg-gray-800 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
              G Pay
            </button>
            <button className="bg-black hover:bg-gray-800 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
              PayPal
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DonationWidget