import React from 'react'
import { Link } from 'react-router-dom'

export default function ThankYou(){
  return (
    <div className="w-full max-w-md">
      <div className="bg-white shadow-md rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-[#273469] mb-3">Thank you!</h2>
        <p className="mb-6">Your feedback has been submitted successfully.</p>
        <Link to="/" className="inline-block bg-[#273469] text-white px-4 py-2 rounded">Back to Home</Link>
      </div>
    </div>
  )
}
