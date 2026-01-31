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

      {/* Overlay only for NON-Academics pages */}
      {!isAcademics && <div className="bg-overlay" />}

      {/* Header */}
      <Header />

      {/* Page Content */}
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/curriculum" element={<Home />} />

          {/* ✅ CENTERED PAGES */}
          <Route
            path="/stakeholder-info"
            element={
              <div className="flex justify-center">
                <StakeholderInfo />
              </div>
            }
          />

          <Route
            path="/feedback"
            element={
              <div className="flex justify-center">
                <Feedback />
              </div>
            }
          />

          <Route
            path="/thankyou"
            element={
              <div className="flex justify-center">
                <ThankYou />
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-sm text-gray-700 py-4">
        © 2026 LAKI REDDY BALI REDDY | Stakeholder Feedback System
      </footer>

    </div>
  )
}
