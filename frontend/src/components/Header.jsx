import React from 'react'

export default function Header() {
  return (
    <header className="w-full bg-[#273469] text-white shadow">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
        <img src="/logo.svg" alt="logo" className="h-10 w-10 rounded" />
        <h1 className="text-xl font-semibold">Online Stakeholders Feedback</h1>
      </div>
    </header>
  )
}
