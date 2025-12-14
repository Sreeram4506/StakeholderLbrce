import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const options = [
  'Students',
  'Alumni',
  'Parents',
  'Industry Experts',
  'Academic Faculty Expert',
  'Employer'
]

export default function Home() {
  const [stakeholder, setStakeholder] = useState('')
  const [regno, setRegno] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function validate() {
    if (!stakeholder) return 'Select stakeholder type'
    if (!regno) return 'Enter registration number'
    if (!/^[a-zA-Z0-9-]+$/.test(regno)) return 'Registration must be alphanumeric'
    return ''
  }

  const handleContinue = (e) => {
    e.preventDefault()
    const err = validate()
    setError(err)
    if (!err) {
      const params = new URLSearchParams({ type: stakeholder, reg: regno })
      navigate('/feedback?' + params.toString())
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#e9eef8] text-[#273469] rounded-full p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" fill="#273469" />
              <path d="M4 20a8 8 0 0116 0" fill="#273469" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold">Start Feedback</h3>
        </div>
        <label className="block text-sm font-medium text-gray-700 mb-2">StakeHolder Type</label>
        <select
          className="w-full border rounded p-2 mb-4"
          value={stakeholder}
          onChange={(e) => setStakeholder(e.target.value)}
        >
          <option value="">Select stakeholder</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>

        <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
        <input
          className="w-full border rounded p-2 mb-4"
          value={regno}
          onChange={(e) => setRegno(e.target.value)}
          placeholder="Enter registration number"
        />

        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}

        <button
          className="w-full bg-[#273469] text-white py-2 rounded hover:opacity-95 transition"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
