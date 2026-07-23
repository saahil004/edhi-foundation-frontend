const ProgramSelector = ({ programs = [], selectedProgram, onSelect }) => {
  if (programs.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <label htmlFor="program-select" className="block font-bold text-gray-900 text-lg mb-4">
        Choose what your donation supports
      </label>
      <select
        id="program-select"
        value={selectedProgram ?? ''}
        onChange={(e) => onSelect(Number(e.target.value))}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
      >
        {programs.map((program) => (
          <option key={program.id} value={program.id}>
            {program.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ProgramSelector
