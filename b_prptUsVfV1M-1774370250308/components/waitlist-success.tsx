'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface WaitlistSuccessProps {
  position: number
  email: string
  referralCode: string
  onReset: () => void
}

export function WaitlistSuccess({
  position,
  email,
  referralCode,
  onReset,
}: WaitlistSuccessProps) {
  const [copied, setCopied] = useState(false)

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const referralUrl = `${baseUrl}?ref=${referralCode}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnWhatsApp = () => {
    const message = `I just joined Emergency Echo! I'm #${position} on the waitlist. 🎉 Join me using this link: ${referralUrl}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const shareOnTwitter = () => {
    const text = `Just joined @EmergencyEcho! I'm #${position} on the waitlist. 🚀 Join me: ${referralUrl}`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(twitterUrl, '_blank')
  }

  const shareOnEmail = () => {
    const subject = 'Join Emergency Echo - Exclusive Waitlist Access'
    const body = `Hi,\n\nI just joined Emergency Echo and got a spot on the waitlist (#${position})!\n\nI thought you might be interested too. You can join using my referral link:\n${referralUrl}\n\nThey're offering a special one-week premium launch offer. Hope to see you there!\n\nCheers`
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoUrl)
  }

  return (
    <div className="w-full max-w-md space-y-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
      {/* Success Header */}
      <div className="text-center space-y-2">
        <div className="text-5xl">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900">You're In!</h2>
        <p className="text-gray-600">Welcome to Emergency Echo</p>
      </div>

      {/* Position Display */}
      <div className="bg-white rounded-lg p-4 text-center border border-green-200">
        <p className="text-gray-600 text-sm mb-1">Your Waitlist Position</p>
        <p className="text-4xl font-bold text-red-600">#{position}</p>
        <p className="text-gray-500 text-xs mt-2">{email}</p>
      </div>

      {/* Referral Section */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Boost Your Position! 📈</h3>
        <p className="text-sm text-gray-600">
          Invite friends to move up the waitlist. For each person who joins using your link, you'll gain priority access!
        </p>

        {/* Referral Link Copy */}
        <div className="bg-white rounded-lg p-3 flex items-center gap-2 border border-gray-200">
          <code className="text-xs text-gray-600 flex-1 truncate">{referralCode}</code>
          <Button
            onClick={copyToClipboard}
            size="sm"
            className="bg-gray-900 hover:bg-gray-800 text-white whitespace-nowrap"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </Button>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={shareOnWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium"
          >
            💬 WhatsApp
          </Button>
          <Button
            onClick={shareOnTwitter}
            className="bg-blue-400 hover:bg-blue-500 text-white text-sm font-medium"
          >
            𝕏 Twitter
          </Button>
        </div>

        <Button
          onClick={shareOnEmail}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium"
        >
          📧 Share via Email
        </Button>
      </div>

      {/* Call to Action */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center text-sm text-red-900">
        <p className="font-semibold">🔥 Premium offer ends in 7 days!</p>
        <p className="text-xs mt-1">Invite friends to get priority access before the offer expires.</p>
      </div>

      {/* Reset Button */}
      <Button
        onClick={onReset}
        className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-medium"
      >
        Join Another Email
      </Button>
    </div>
  )
}
