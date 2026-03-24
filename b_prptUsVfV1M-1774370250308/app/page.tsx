'use client'

import { useState, useEffect } from 'react'
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
  const [referrerName, setReferrerName] = useState<string | undefined>(undefined)

  useEffect(() => {
    // Check for referral code in URL
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')

    if (ref) {
      // Fetch referrer information
      fetch(`/api/waitlist/referral?ref=${ref}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setReferrerName(data.referrerName)
          }
        })
        .catch((err) => console.error('[v0] Referral fetch error:', err))
    }
  }, [])

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

      {/* Hero Section with Prominent Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold text-white text-balance">
                Real-Time Emergency <span className="text-red-600">Response System</span>
              </h1>
              <p className="text-xl text-gray-400 text-balance">
                Emergency Echo connects communities with real-time emergency alerts, coordinated response protocols, and direct integration with emergency services to save lives and protect neighborhoods.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3 pt-4">
              <div className="flex gap-3">
                <span className="text-red-600 text-2xl">⚡</span>
                <div>
                  <p className="font-semibold text-white">Instant Real-Time Alerts</p>
                  <p className="text-gray-500 text-sm">Get emergency notifications within seconds of incidents in your area</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-red-600 text-2xl">🤝</span>
                <div>
                  <p className="font-semibold text-white">Community Coordination Hub</p>
                  <p className="text-gray-500 text-sm">Connect with neighbors and verified community members for rapid response</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-red-600 text-2xl">📍</span>
                <div>
                  <p className="font-semibold text-white">Precise Location Intelligence</p>
                  <p className="text-gray-500 text-sm">Advanced geolocation technology to find nearest help and resources</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-red-600 text-2xl">🔗</span>
                <div>
                  <p className="font-semibold text-white">Direct Service Integration</p>
                  <p className="text-gray-500 text-sm">Seamless coordination with emergency services and first responders</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-red-500 pt-4 font-semibold">
              🔥 LIMITED TIME OFFER: Join before March 31st for lifetime premium access!
            </p>
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
                  <h2 className="text-3xl font-bold text-white">Join the Waitlist</h2>
                  <p className="text-gray-400">
                    Be among the first responders to access Emergency Echo. Exclusive early-bird benefits for waitlist members.
                  </p>
                </div>
                <WaitlistForm
                  referrerName={referrerName}
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

      {/* Features Section */}
      <section id="features" className="bg-gray-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Why Emergency Echo?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Millisecond Response Times',
                description:
                  'Push notifications delivered instantly so help arrives faster and communities stay safer',
              },
              {
                title: 'Verified Community Network',
                description:
                  'Connect with trusted neighbors and verified first responders in your area',
              },
              {
                title: 'Privacy-First Design',
                description:
                  'Your location and personal data stay secure with military-grade encryption',
              },
              {
                title: '24/7 Emergency Monitoring',
                description:
                  'Round-the-clock monitoring and alerts for all incident types in your location',
              },
              {
                title: 'Multi-Channel Alerts',
                description:
                  'Receive notifications via push, SMS, and email for critical emergencies',
              },
              {
                title: 'Professional Coordination',
                description:
                  'Direct API integration with 911 dispatch centers and emergency management agencies',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-red-600 transition-colors"
              >
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Getting Started
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Join Waitlist', description: 'Register with your information' },
              {
                step: '2',
                title: 'Verify Profile',
                description: 'Complete identity verification',
              },
              {
                step: '3',
                title: 'Set Preferences',
                description: 'Configure alerts and location',
              },
              {
                step: '4',
                title: 'Stay Safe',
                description: 'Receive real-time emergency alerts',
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

      {/* About Section */}
      <section id="about" className="bg-gray-900 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            About Emergency Echo
          </h2>
          <div className="space-y-6 text-gray-400">
            <p>
              Emergency Echo is revolutionizing how communities respond to emergencies. Our platform combines real-time alert technology, community coordination tools, and direct integration with emergency services to create a comprehensive emergency response ecosystem.
            </p>
            <p>
              We believe that informed communities are safer communities. By providing instant access to emergency information and enabling coordinated community response, we're building a future where help arrives faster and everyone has the tools to protect themselves and their neighbors.
            </p>
            <p>
              Our mission: To save lives through technology, community, and rapid emergency response coordination.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-800 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-4xl font-bold text-white">Don't Wait for an Emergency</h2>
          <p className="text-xl text-gray-400">
            Join thousands of community members preparing for safety. Get lifetime premium access when you join before March 31st.
          </p>
          <Link
            href="#"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Join the Waitlist Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-500">
              © 2026 Emergency Echo. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-gray-500 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
