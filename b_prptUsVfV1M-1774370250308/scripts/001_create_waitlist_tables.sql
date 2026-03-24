-- Create waitlist_entries table
CREATE TABLE IF NOT EXISTS public.waitlist_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  user_type TEXT NOT NULL CHECK (user_type IN ('user', 'practitioner')),
  referral_code TEXT UNIQUE NOT NULL,
  referred_by_code TEXT REFERENCES public.waitlist_entries(referral_code),
  position_boost INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create referral_clicks table to track referral usage
CREATE TABLE IF NOT EXISTS public.referral_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code TEXT NOT NULL REFERENCES public.waitlist_entries(referral_code) ON DELETE CASCADE,
  referred_email TEXT NOT NULL,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  converted BOOLEAN DEFAULT FALSE
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist_entries(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_referral_code ON public.waitlist_entries(referral_code);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist_entries(created_at);
CREATE INDEX IF NOT EXISTS idx_referral_clicks_code ON public.referral_clicks(referral_code);

-- Enable Row Level Security
ALTER TABLE public.waitlist_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_clicks ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow public inserts (for form submission)
CREATE POLICY "Allow public to insert waitlist entries" ON public.waitlist_entries
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read own entry" ON public.waitlist_entries
FOR SELECT USING (true);

CREATE POLICY "Allow public to read referral clicks" ON public.referral_clicks
FOR INSERT WITH CHECK (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_waitlist_entries_updated_at
BEFORE UPDATE ON public.waitlist_entries
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
