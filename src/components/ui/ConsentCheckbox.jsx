const ConsentCheckbox = ({ checked, onChange }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 w-5 h-5 rounded border-gray-300 text-green-800 focus:ring-green-700 shrink-0"
        />
        <span className="text-sm text-gray-700 leading-relaxed">
          I consent to Edhi Foundation processing my personal information and
          payment details to complete this donation, and agree to the{' '}
          <span className="font-semibold text-green-800">Terms of Service</span>{' '}
          and{' '}
          <span className="font-semibold text-green-800">Privacy Policy</span>.
          <span className="text-red-600"> *</span>
        </span>
      </label>
    </div>
  )
}

export default ConsentCheckbox
