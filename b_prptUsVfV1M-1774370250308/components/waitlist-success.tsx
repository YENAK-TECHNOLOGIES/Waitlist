'use client'

import { useState } from 'react'

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
    const message = `I just joined Emergency Echo! I'm #${position} on the waitlist. Join me: ${referralUrl}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const shareOnTwitter = () => {
    const text = `Just joined Emergency Echo! I'm #${position} on the waitlist. Join me: ${referralUrl}`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(twitterUrl, '_blank')
  }

  const shareOnEmail = () => {
    const subject = 'Join Emergency Echo - Exclusive Waitlist Access'
    const body = `Hi,\n\nI just joined Emergency Echo and got a spot on the waitlist (#${position})!\n\nYou can join using my referral link:\n${referralUrl}\n\nCheers`
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoUrl)
  }

  return (
    <div className="w-full max-w-md space-y-6 p-6 bg-green-50 rounded-xl border border-green-200">
      {/* Success Header */}
      <div className="text-center space-y-2">
        <div className="text-5xl">✓</div>
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
        <h3 className="font-semibold text-gray-900">Share with Friends</h3>
        <p className="text-sm text-gray-600">
          Invite friends using your referral code to earn rewards!
        </p>

        {/* Referral Code */}
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-500 mb-1">Your Referral Code:</p>
          <div className="flex items-center gap-2">
            <code className="text-sm font-mono font-bold text-gray-900 flex-1">{referralCode}</code>
            <button
              onClick={copyToClipboard}
              className="bg-gray-900 hover:bg-gray-800 text-white text-xs px-3 py-1 rounded whitespace-nowrap"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={shareOnWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
          >
            WhatsApp
          </button>
          <button
            onClick={shareOnTwitter}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
          >
            Twitter
          </button>
        </div>

        <button
          onClick={shareOnEmail}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-2 rounded-lg transition-colors"
        >
          Share via Email
        </button>
      </div>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-medium py-2 rounded-lg transition-colors"
      >
        Join Another Email
      </button>
    </div>
  )
}
