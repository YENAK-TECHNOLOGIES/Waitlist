import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { generateRandomCode } from '@/lib/utils/code-generator'

export async function POST(request: NextRequest) {
  try {
    const { email, fullName, phoneNumber, role, city } = await request.json()

    // Validation
    if (!email || !fullName || !phoneNumber || !role || !city) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    if (!phoneRegex.test(phoneNumber) || phoneNumber.replace(/\D/g, '').length < 7) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Check if email already exists
    const { data: existing } = await supabase
      .from('waitlist_entries')
      .select('id')
      .eq('email', email.toLowerCase())
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered on waitlist' },
        { status: 409 }
      )
    }

    // Generate unique referral code
    const referralCode = generateRandomCode()

    // Insert new entry
    const { data: newEntry, error: insertError } = await supabase
      .from('waitlist_entries')
      .insert({
        email: email.toLowerCase(),
        full_name: fullName,
        phone_number: phoneNumber,
        role: role,
        city: city,
        referral_code: referralCode,
      })
      .select('id, created_at, email')
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to join waitlist' },
        { status: 500 }
      )
    }

    // Get position (count entries created before this one)
    const { count: position } = await supabase
      .from('waitlist_entries')
      .select('id', { count: 'exact', head: true })
      .lt('created_at', newEntry.created_at)

    return NextResponse.json(
      {
        success: true,
        email: newEntry.email,
        referralCode,
        position: (position || 0) + 1,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
