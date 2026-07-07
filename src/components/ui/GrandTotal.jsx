import { Heart, ShieldCheck, ArrowRight } from 'lucide-react'

const frequencyLabels = {
  single: 'once',
  weekly: 'every week',
  monthly: 'every month',
  yearly: 'every year',
}

const GrandTotal = ({ amount, frequency, onBack, onCheckout }) => {
  const isRecurring = frequency !== 'single'

  return (
    <>
      <div className="bg-green-50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-green-800 flex items-center justify-center shrink-0">
            <Heart className="text-green-800" size={28} fill="#065f46" />
          </div>
          <div>
            <p className="text-green-800 font-semibold text-sm mb-1">Grand Total</p>
            <p className="text-3xl font-bold text-gray-900">
              ${amount.toFixed(2)} <span className="text-lg font-medium text-gray-500">USD</span>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 md:ml-auto">
          <ShieldCheck className="text-green-800 shrink-0 mt-1" size={22} fill="#065f46" strokeWidth={0} />
          <p className="text-sm text-gray-700 max-w-xs">
            {isRecurring
              ? <>You will donate this amount {frequencyLabels[frequency]}, you can <span className="font-semibold text-green-800">cancel</span> anytime.</>
              : 'You will donate this amount once, as a one-time contribution.'}
          </p>
        </div>
      </div>

      <button
        onClick={onBack}
        className="w-full border border-green-800 text-green-800 font-bold py-4 rounded-lg hover:bg-green-50 transition-colors"
      >
        Back
      </button>

      <button
        onClick={onCheckout}
        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors"
      >
        Checkout <ArrowRight size={18} />
      </button>
    </>
  )
}

export default GrandTotal