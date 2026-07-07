import { useState } from 'react'
import DonationStepper from '../ui/DonationStep.jsx'
import AmountSelector from '../ui/AmountSelectorCard.jsx'
import FrequencySelector from '../ui/FrequencySelector.jsx'
import DonorInfoForm from '../ui/DonorInfoForm.jsx'
import GrandTotal from '../ui/GrandTotal.jsx'

const DonationForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [amount, setAmount] = useState(10)
  const [customAmount, setCustomAmount] = useState('')
  const [frequency, setFrequency] = useState('yearly')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+92',
    phone: '',
  })

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : (amount || 0)

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleCheckout = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4))
    // Later: send { amount: finalAmount, frequency, ...formData } to POST /api/donations
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16 space-y-6">
      <DonationStepper currentStep={currentStep} />

      <AmountSelector
        amount={amount}
        customAmount={customAmount}
        onAmountChange={setAmount}
        onCustomAmountChange={setCustomAmount}
      />

      <FrequencySelector
        frequency={frequency}
        onSelect={setFrequency}
      />

      <DonorInfoForm
        formData={formData}
        onChange={setFormData}
      />

      <GrandTotal
        amount={finalAmount}
        frequency={frequency}
        onBack={handleBack}
        onCheckout={handleCheckout}
      />
    </section>
  )
}

export default DonationForm























