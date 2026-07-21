import { CheckCircle2 } from 'lucide-react'

const DonationConfirmation = ({ amount, frequency, serviceName }) => {
  const frequencyLabels = {
    single: 'once',
    weekly: 'every week',
    monthly: 'every month',
    yearly: 'every year',
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm text-center">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle2 className="text-green-800" size={44} />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you for your donation!</h2>
      <p className="text-gray-600 max-w-md mx-auto mb-6">
        Your contribution of <span className="font-semibold text-gray-900">${amount.toFixed(2)} USD</span>{' '}
        {frequencyLabels[frequency] ?? ''} {serviceName ? <>to <span className="font-semibold text-gray-900">{serviceName}</span></> : ''}{' '}
        means a great deal to those we serve. A confirmation has been sent to your email.
      </p>
    </div>
  )
}

export default DonationConfirmation
