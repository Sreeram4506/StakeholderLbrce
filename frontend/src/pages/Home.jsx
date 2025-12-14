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
    if (!stakeholder) return 'Please select stakeholder type'
    if (stakeholder === 'Students' && !regno) return 'Please enter registration number'
    if (regno && !/^[a-zA-Z0-9-]+$/.test(regno))
      return 'Registration number must be alphanumeric'
    return ''
  }

  const handleContinue = (e) => {
    e.preventDefault()
    const err = validate()
    setError(err)
    if (!err) {
      const params = new URLSearchParams({ type: stakeholder, reg: regno })
      navigate('/stakeholder-info?' + params.toString())
    }
  }

  return (
    <div className="w-full max-w-md">

      <div className="bg-white/85 backdrop-blur-md shadow rounded-2xl p-8 border border-gray-200">

        {/* Title */}
        <div className="text-center mb-6">
          <img src="/clg-logo.png" className="h-16 mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-[#273469]">
            Start Feedback Process
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Your response helps us improve academic quality
          </p>
        </div>

        {/* Stakeholder */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Stakeholder Type
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2.5 mb-4 focus:outline-none focus:ring-2 focus:ring-[#273469]"
          value={stakeholder}
          onChange={(e) => setStakeholder(e.target.value)}
        >
          <option value="">Select stakeholder</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>

        {/* Registration - Only for Students */}
        {stakeholder === 'Students' && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Registration Number *
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg p-2.5 mb-4 focus:outline-none focus:ring-2 focus:ring-[#273469]"
              value={regno}
              onChange={(e) => setRegno(e.target.value)}
              placeholder="Enter registration number"
            />
          </>
        )}

        {/* Error */}
        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">
            {error}
          </div>
        )}

        {/* Button */}
        <button
          className="w-full bg-[#273469] text-white py-2.5 rounded-lg font-medium hover:bg-[#1f2a57] transition"
          onClick={handleContinue}
        >
          Continue to Feedback
        </button>

      </div>
    </div>
  )
}
