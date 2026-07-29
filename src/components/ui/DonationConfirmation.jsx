import { CheckCircle2, Download } from 'lucide-react'
import { generateInvoicePdf } from '../../utils/generateInvoicePdf.js'

const DonationConfirmation = ({ amount, frequency, serviceName, donorName, donorEmail, reference }) => {
  const frequencyLabels = {
    single: 'once',
    weekly: 'every week',
    monthly: 'every month',
    yearly: 'every year',
  }

  const handleDownload = () => {
    generateInvoicePdf({
      donorName,
      donorEmail,
      amount,
      frequency,
      programName: serviceName,
      reference,
    })
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

      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-green-800 text-green-800 font-semibold hover:bg-green-50 transition-colors"
      >
        <Download size={18} />
        Download Invoice (PDF)
      </button>
    </div>
  )
}

export default DonationConfirmation
