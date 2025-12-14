import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Feedback() {
  const [searchParams] = useSearchParams()
  const stakeholderType = searchParams.get('type') || ''
  const registrationNumber = searchParams.get('reg') || ''
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rating, setRating] = useState(5)
  const [comments, setComments] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  if (!stakeholderType || !registrationNumber) {
    return (
      <div className="max-w-md w-full">
        <div className="bg-white shadow-md rounded-lg p-6">Missing parameters. Return to home.</div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email) {
      setError('Please provide name and email')
      return
    }

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stakeholderType, registrationNumber, name, email, rating, comments })
      })
      if (res.ok) {
        navigate('/thankyou')
      } else {
        const body = await res.json()
        setError(body.message || 'Submission failed')
      }
    } catch (err) {
      setError('Network error')
    }
  }

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-semibold">Feedback Form</h2>

        <label className="text-sm font-medium text-gray-600">Registration Number</label>
        <input className="w-full border rounded p-2 bg-gray-100" value={registrationNumber} readOnly />

        <label className="text-sm font-medium text-gray-600">Stakeholder Type</label>
        <input className="w-full border rounded p-2 bg-gray-100" value={stakeholderType} readOnly />

        <label className="text-sm font-medium text-gray-600">Name</label>
        <input className="w-full border rounded p-2" value={name} onChange={(e)=>setName(e.target.value)} />

        <label className="text-sm font-medium text-gray-600">Email</label>
        <input className="w-full border rounded p-2" value={email} onChange={(e)=>setEmail(e.target.value)} />

        <label className="text-sm font-medium text-gray-600">Rating (1-5)</label>
        <select className="w-full border rounded p-2" value={rating} onChange={(e)=>setRating(Number(e.target.value))}>
          {[1,2,3,4,5].map(n=> <option key={n} value={n}>{n}</option>)}
        </select>

        <label className="text-sm font-medium text-gray-600">Comments</label>
        <textarea className="w-full border rounded p-2" rows={4} value={comments} onChange={(e)=>setComments(e.target.value)} />

        {error && <div className="text-red-600">{error}</div>}

        <div className="flex gap-3">
          <button className="bg-[#273469] text-white px-4 py-2 rounded" onClick={handleSubmit}>Submit</button>
          <button className="border px-4 py-2 rounded" onClick={()=>window.history.back()}>Back</button>
        </div>
      </div>
    </div>
  )
}
