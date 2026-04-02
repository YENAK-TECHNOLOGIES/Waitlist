'use client'

import { useState } from 'react'

interface WaitlistFormProps {
  referrerName?: string
  onSuccess: (data: {
    position: number
    email: string
    referralCode: string
  }) => void
}

export function WaitlistForm({ referrerName, onSuccess }: WaitlistFormProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsappPhone, setWhatsappPhone] = useState('')
  const [role, setRole] = useState('')
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!fullName.trim() || !email.trim() || !whatsappPhone.trim() || !role || !city.trim()) {
      setError('Please fill in all fields')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    if (!phoneRegex.test(whatsappPhone) || whatsappPhone.replace(/\D/g, '').length < 7) {
      setError('Please enter a valid WhatsApp phone number')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          fullName,
          whatsappPhone,
          role,
          city,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to join waitlist')
        return
      }

      onSuccess({
        position: data.position,
        email: data.email,
        referralCode: data.referralCode,
      })

      setFullName('')
      setEmail('')
      setWhatsappPhone('')
      setRole('')
      setCity('')
    } catch (err) {
      console.error('[v0] Waitlist form error:', err)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      {referrerName && (
        <p className="text-sm text-green-600 font-medium bg-green-50 px-4 py-2 rounded-lg">
          You were referred by <strong>{referrerName}</strong>
        </p>
      )}

      <div className="space-y-2">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700">
          WhatsApp Phone Number
        </label>
        <input
          id="whatsapp"
          type="tel"
          placeholder="+234 701 234 5678"
          value={whatsappPhone}
          onChange={(e) => setWhatsappPhone(e.target.value)}
          required
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
        />
        <p className="text-xs text-gray-500">Include country code (e.g., +234)</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Professional Role
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500"
        >
          <option value="">Select your role</option>
          <option value="Doctor">Doctor</option>
          <option value="Nurse">Nurse</option>
          <option value="Patient">Patient</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City/Location
        </label>
        <input
          id="city"
          type="text"
          placeholder="Your city or region"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !fullName || !email || !whatsappPhone || !role || !city}
        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-colors"
      >
        {loading ? 'Joining Waitlist...' : 'Join the Waitlist'}
      </button>
    </form>
  )
}
