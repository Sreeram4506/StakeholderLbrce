import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function StakeholderInfo() {
  const [searchParams] = useSearchParams()
  const stakeholderType = searchParams.get('type') || ''
  const registrationNumber = searchParams.get('reg') || ''
  
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    designation: '',
    organizationAddress: '',
    facultyId: '',
    faculty: ''
  })
  
  const [error, setError] = useState('')
  const navigate = useNavigate()

  if (!stakeholderType) {
    return (
      <div className="max-w-md w-full">
        <div className="bg-white shadow-md rounded-lg p-6">Missing parameters. Return to home.</div>
      </div>
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleContinue = () => {
    if (!formData.email) {
      setError('Email is required')
      return
    }
    
    const params = new URLSearchParams({ 
      type: stakeholderType, 
      reg: registrationNumber,
      email: formData.email,
      mobile: formData.mobile,
      designation: formData.designation,
      organizationAddress: formData.organizationAddress,
      facultyId: formData.facultyId,
      faculty: formData.faculty
    })
    navigate('/feedback?' + params.toString())
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="bg-white shadow-md rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Stakeholder Information</h2>

        {/* Stakeholder Type */}
        <div className="border-b pb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            StakHolder Type:
          </label>
          <select 
            value={stakeholderType}
            disabled
            className="w-full border rounded px-4 py-2.5 bg-gray-50 focus:outline-none text-gray-700 font-medium"
          >
            <option>{stakeholderType}</option>
          </select>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Email: *
            </label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.11.33.27.645.45.925a10.025 10.025 0 003.302 3.302c.28.18.595.34.925.45l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 3 13.18 3 7V5a1 1 0 011-1h2.153z" />
              </svg>
              Mobile:
            </label>
            <input 
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Mobile"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h.01a1 1 0 100-2H6zm2 0a1 1 0 000 2h2.01a1 1 0 100-2H8zm4 0a1 1 0 000 2h.01a1 1 0 100-2h-.01zm2 0a1 1 0 000 2h2.01a1 1 0 100-2h-2.01z" clipRule="evenodd" />
              </svg>
              Designation:
            </label>
            <input 
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Designation"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Organization Address:
            </label>
            <input 
              type="text"
              name="organizationAddress"
              value={formData.organizationAddress}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Organization Address"
            />
          </div>

          {stakeholderType === 'Academic Faculty Expert' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                  Faculty ID:
                </label>
                <input 
                  type="text"
                  name="facultyId"
                  value={formData.facultyId}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Faculty ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Faculty:
                </label>
                <select 
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  className="w-full border rounded px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">--- Select Faculty ---</option>
                  <option value="LBRCE Faculty">LBRCE Faculty</option>
                  <option value="Visiting Faculty">Visiting Faculty</option>
                  <option value="Guest Faculty">Guest Faculty</option>
                  <option value="Contract Faculty">Contract Faculty</option>
                </select>
              </div>
            </>
          )}
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

        <div className="flex gap-3 pt-4">
          <button 
            onClick={handleContinue}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700 transition"
          >
            Continue to Feedback
          </button>
          <button 
            onClick={() => window.history.back()}
            className="border border-gray-300 px-6 py-3 rounded font-medium hover:bg-gray-50 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}
