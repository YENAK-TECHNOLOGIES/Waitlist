'use client'

import { useState } from 'react'
import { WaitlistForm } from '@/components/waitlist-form'
import { WaitlistSuccess } from '@/components/waitlist-success'
import Link from 'next/link'

interface SuccessData {
  position: number
  email: string
  referralCode: string
}

export default function Home() {
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  const handleReset = () => {
    setSuccessData(null)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            Emergency<span className="text-red-600">Echo</span>
          </div>
          <div className="hidden md:flex gap-8">
            <Link
              href="#features"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-400 hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#about"
              className="text-gray-400 hover:text-white transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold text-white text-balance">
                Your Smart Assistant When Every Second <span className="text-red-600">Matters</span>
              </h1>
              <p className="text-xl text-gray-400 text-balance">
                EmergencyEcho connects you to real-time medical guidance, verified doctors, and emergency support — all in one tap.
              </p>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors w-fit">
              Join EmergencyEcho Today
            </button>
          </div>

          {/* Right: Form */}
          <div className="flex justify-center">
            {successData ? (
              <WaitlistSuccess
                position={successData.position}
                email={successData.email}
                referralCode={successData.referralCode}
                onReset={handleReset}
              />
            ) : (
              <div className="w-full max-w-md space-y-4 bg-gray-900/50 p-8 rounded-lg border border-gray-800">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-white">Get Early Access</h2>
                  <p className="text-gray-400">
                    Be among the first to access EmergencyEcho and get instant medical guidance when you need it most.
                  </p>
                </div>
                <WaitlistForm
                  onSuccess={(data) => {
                    console.log('[v0] Form success:', data)
                    setSuccessData(data)
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-gray-900 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 text-balance">The Problem We Solve</h2>
          <p className="text-lg text-gray-400 text-balance">
            Every year, lives are lost not because of the illness alone — but because the right information didn't reach the right hands in time. EmergencyEcho was built to change that.
          </p>
        </div>
      </section>

      {/* Who Is This For - Role Selector */}
      <section id="features" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Who Is This For?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* I'm a Patient */}
            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-red-600 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4">I'm a Patient</h3>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Get instant AI-guided triage in emergencies</li>
                <li>• Store your medical history securely (blood type, allergies, conditions)</li>
                <li>• Connect to a verified doctor in under 5 minutes</li>
                <li>• Step-by-step guided first aid while help is on the way</li>
                <li>• Affordable plans starting from ₦1,000/month</li>
              </ul>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors">
                Join as a Patient
              </button>
            </div>

            {/* I'm a Doctor */}
            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-red-600 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4">I'm a Doctor</h3>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Earn income through emergency micro-consultations</li>
                <li>• Get verified and listed on the platform</li>
                <li>• Set your own availability and manage sessions easily</li>
                <li>• Receive structured patient data before the call starts</li>
                <li>• Earn ₦500–₦1,000 per consultation</li>
              </ul>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors">
                Join as a Doctor
              </button>
            </div>

            {/* I'm a Nurse / Health Professional */}
            <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:border-red-600 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-4">I'm a Nurse / Health Professional</h3>
              <ul className="space-y-2 text-gray-400 mb-6">
                <li>• Expand your reach beyond your clinic or ward</li>
                <li>• Offer guidance and wellness support remotely</li>
                <li>• Build a trusted profile accessible to thousands</li>
                <li>• Earn recurring income on your own schedule</li>
                <li>• Subscription listing from ₦3,000–₦4,000/month</li>
              </ul>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors">
                Join as a Health Professional
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Create your account', description: 'and choose your role' },
              {
                step: '2',
                title: 'Complete your profile',
                description: 'patients upload medical history; providers get verified',
              },
              {
                step: '3',
                title: 'Activate in an emergency',
                description: 'one tap connects everything',
              },
              {
                step: '4',
                title: 'Get guided support',
                description: 'or earn by helping someone in crisis',
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: 'AI Voice Assistant', description: 'hands-free guidance, no typing needed' },
              { title: 'Digital Emergency Kit', description: 'your medical info, always accessible' },
              { title: 'Real-Time Triage', description: 'risk assessed instantly' },
              { title: 'Doctor On Duty', description: 'specialist available near you' },
              { title: 'QR Code Access', description: 'responders scan to see your critical data' },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-red-600 transition-colors text-center"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why EmergencyEcho Section */}
      <section id="about" className="bg-gray-900 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Why EmergencyEcho
          </h2>
          <div className="space-y-6 text-gray-400 text-center">
            <p className="text-xl font-semibold text-white">
              People don't just die from disease — they die from delays.
            </p>
            <p>
              Born from a personal loss, EmergencyEcho exists to make sure no family goes through what ours did. Built for Nigeria. Built for Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-16 sm:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <p className="text-gray-400">
              EmergencyEcho by Yenak Technology — <span className="font-semibold">Your Smart Assistant When Every Second Matters</span>
            </p>
            <p className="text-gray-500 text-sm">
              © 2026 EmergencyEcho. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
