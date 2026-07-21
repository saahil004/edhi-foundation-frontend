import { Heart, ShieldCheck, ArrowRight, HandHeart } from 'lucide-react'

const frequencyLabels = {
  single: 'once',
  weekly: 'every week',
  monthly: 'every month',
  yearly: 'every year',
}

const GrandTotal = ({ amount, frequency, serviceName, onBack, onCheckout, disabled = false }) => {
  const isRecurring = frequency !== 'single'

  return (
    <>
      <div className="bg-green-50 rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-green-800 flex items-center justify-center shrink-0 bg-white">
              <Heart className="text-green-800" size={28} fill="#065f46" />
            </div>
            <div>
              <p className="text-green-800 font-semibold text-sm mb-1 tracking-wide uppercase">Grand Total</p>
              <p className="text-3xl font-bold text-gray-900">
                ${amount.toFixed(2)} <span className="text-lg font-medium text-gray-500">USD</span>
              </p>
              <p className="text-sm text-gray-500 mt-0.5">
                {isRecurring ? `Billed ${frequencyLabels[frequency]}` : 'One-time donation'}
              </p>
            </div>
          </div>

          <div className="hidden md:block w-px self-stretch bg-green-200 mx-2" />

          {serviceName && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
                <HandHeart className="text-green-800" size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Donating to</p>
                <p className="text-sm font-semibold text-gray-900">{serviceName}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 md:ml-auto">
            <ShieldCheck className="text-green-800 shrink-0 mt-1" size={20} fill="#065f46" strokeWidth={0} />
            <p className="text-sm text-gray-700 max-w-xs leading-relaxed">
              {isRecurring
                ? <>You will donate this amount {frequencyLabels[frequency]}, you can <span className="font-semibold text-green-800">cancel</span> anytime.</>
                : 'You will donate this amount once, as a one-time contribution.'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-5">
        <button
          onClick={onBack}
          className="w-full border border-green-800 text-green-800 font-bold py-4 rounded-lg hover:bg-green-50 transition-colors"
        >
          Back
        </button>

        <button
          onClick={onCheckout}
          disabled={disabled}
          className={`w-full flex items-center justify-center gap-2 font-bold py-4 rounded-lg transition-colors shadow-sm ${
            disabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-md'
          }`}
        >
          Checkout <ArrowRight size={18} />
        </button>
      </div>

      <p className={`text-sm text-gray-500 text-center mt-3 mb-5 ${disabled ? '' : 'invisible'}`}>
        Please fill in your details above and give consent to proceed.
      </p>
    </>
  )
}

export default GrandTotal