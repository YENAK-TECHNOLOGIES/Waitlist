-- Add new columns to waitlist_entries table for extended form
ALTER TABLE public.waitlist_entries 
ADD COLUMN phone_number VARCHAR(20),
ADD COLUMN role VARCHAR(50),
ADD COLUMN city VARCHAR(100);

-- Create index for role to support filtering by user type
CREATE INDEX idx_waitlist_entries_role ON public.waitlist_entries(role);

-- Create index for city to support location-based queries
CREATE INDEX idx_waitlist_entries_city ON public.waitlist_entries(city);
