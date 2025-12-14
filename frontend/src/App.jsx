import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Feedback from './pages/Feedback'
import ThankYou from './pages/ThankYou'
import Header from './components/Header'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="flex items-center justify-center py-16 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </main>
    </div>
  )
}
