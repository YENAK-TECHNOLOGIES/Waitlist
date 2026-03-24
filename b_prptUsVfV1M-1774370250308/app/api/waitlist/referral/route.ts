import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const referralCode = searchParams.get('ref')

    if (!referralCode) {
      return NextResponse.json(
        { error: 'Referral code is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Get referrer's information
    const { data: referrer } = await supabase
      .from('waitlist_entries')
      .select('id, email, full_name')
      .eq('referral_code', referralCode)
      .single()

    if (!referrer) {
      return NextResponse.json(
        { error: 'Invalid referral code' },
        { status: 404 }
      )
    }

    // Record the referral click
    const { error: clickError } = await supabase
      .from('referral_clicks')
      .insert({
        referrer_id: referrer.id,
        ip_address: request.headers.get('x-forwarded-for') || 'unknown',
      })

    if (clickError) {
      console.error('Click tracking error:', clickError)
    }

    return NextResponse.json(
      {
        success: true,
        referrerName: referrer.full_name,
        referrerEmail: referrer.email,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Referral error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
