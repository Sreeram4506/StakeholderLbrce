import React from 'react'

export default function Header() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">

        {/* College Logo */}
        <img
          src="/clg-logo.png"
          alt="College Logo"
          className="h-12 w-12"
        />

        {/* Title */}
        <div>
          <h1 className="text-xl font-semibold text-[#273469]">
            Online Stakeholder Feedback System
          </h1>
          <p className="text-xs text-gray-600">
            LBRCE | Lakireddy Bali Reddy College of Engineering
          </p>
        </div>

      </div>
    </header>
  )
}
