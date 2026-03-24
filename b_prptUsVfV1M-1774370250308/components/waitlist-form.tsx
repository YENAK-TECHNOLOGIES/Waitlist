'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

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
  const [phoneNumber, setPhoneNumber] = useState('')
  const [role, setRole] = useState('')
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!fullName.trim() || !email.trim() || !phoneNumber.trim() || !role || !city.trim()) {
      setError('Please fill in all fields')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    if (!phoneRegex.test(phoneNumber) || phoneNumber.replace(/\D/g, '').length < 7) {
      setError('Please enter a valid phone number')
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
          phoneNumber,
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
      setPhoneNumber('')
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
        <p className="text-sm text-emerald-600 font-medium bg-emerald-50 px-4 py-2 rounded-lg">
          You were referred by <strong>{referrerName}</strong> 🎉
        </p>
      )}

      <div className="space-y-2">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <Input
          id="fullName"
          type="text"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          disabled={loading}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          disabled={loading}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
          Role/Position
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
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City/Location
        </label>
        <Input
          id="city"
          type="text"
          placeholder="Your city or region"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          disabled={loading}
          className="w-full"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={loading || !fullName || !email || !phoneNumber || !role || !city}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition-colors"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Spinner />
            <span>Joining Waitlist...</span>
          </div>
        ) : (
          'Join the Waitlist'
        )}
      </Button>
    </form>
  )
}
