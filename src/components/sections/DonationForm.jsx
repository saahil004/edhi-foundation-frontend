import { useState } from 'react'
import { motion } from 'framer-motion'
import DonationStepper from '../ui/DonationStep.jsx'
import ServiceSelector from '../ui/ServiceSelector.jsx'
import AmountSelector from '../ui/AmountSelectorCard.jsx'
import FrequencySelector from '../ui/FrequencySelector.jsx'
import DonorInfoForm from '../ui/DonorInfoForm.jsx'
import GrandTotal from '../ui/GrandTotal.jsx'
import { services } from '../../data/servicesData.js'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const DonationForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedService, setSelectedService] = useState(services?.[0]?.id ?? null)
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
    // Later: send { service: selectedService, amount: finalAmount, frequency, ...formData } to POST /api/donations
  }

  return (
    <motion.section
      className="max-w-6xl mx-auto px-6 py-16 space-y-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div variants={itemVariants}>
        <DonationStepper currentStep={currentStep} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ServiceSelector
          services={services}
          selectedService={selectedService}
          onSelect={setSelectedService}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <AmountSelector
          amount={amount}
          customAmount={customAmount}
          onAmountChange={setAmount}
          onCustomAmountChange={setCustomAmount}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FrequencySelector
          frequency={frequency}
          onSelect={setFrequency}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <DonorInfoForm
          formData={formData}
          onChange={setFormData}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <GrandTotal
          amount={finalAmount}
          frequency={frequency}
          onBack={handleBack}
          onCheckout={handleCheckout}
          serviceName={services.find((s) => s.id === selectedService)?.title}
        />
      </motion.div>
    </motion.section>
  )
}

export default DonationForm