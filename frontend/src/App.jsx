import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import StakeholderInfo from './pages/StakeholderInfo'
import Feedback from './pages/Feedback'
import ThankYou from './pages/ThankYou'
import Header from './components/Header'

export default function App() {
  return (
    <div className="min-h-screen relative">

      {/* College Background + Gradient Overlay */}
      <div className="bg-watermark" />

      {/* Header */}
      <Header />

      {/* Page Content */}
      <main className="relative z-10 flex items-center justify-center py-16 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stakeholder-info" element={<StakeholderInfo />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-sm text-gray-700 py-4">
        © 2025 LAKI REDDY BALI REDDY | Stakeholder Feedback System
      </footer>

    </div>
  )
}
