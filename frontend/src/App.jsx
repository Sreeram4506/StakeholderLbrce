import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Landing from './pages/Academics'
import Home from './pages/Home'
import StakeholderInfo from './pages/StakeholderInfo'
import Feedback from './pages/Feedback'
import ThankYou from './pages/ThankYou'
import Header from './components/Header'

export default function App() {
  const location = useLocation()
  const isAcademics = location.pathname === "/"

  return (
    <div className="min-h-screen relative">

      {/* Global Background */}
      <div className="bg-watermark" />

      {/* 🔥 Apply overlay only for NON-Academics pages */}
      {!isAcademics && <div className="bg-overlay" />}

      {/* Header */}
      <Header />

      {/* Page Content */}
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/curriculum" element={<Home />} />
          <Route path="/stakeholder-info" element={<StakeholderInfo />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-sm text-gray-700 py-4">
        © 2026 LAKI REDDY BALI REDDY | Stakeholder Feedback System
      </footer>

    </div>
  )
}
