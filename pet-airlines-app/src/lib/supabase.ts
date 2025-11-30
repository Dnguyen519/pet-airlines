import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Inquiry {
  id: string
  inquiry_number: string
  full_name: string
  email: string
  phone?: string
  pet_type: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other'
  pet_breed?: string
  pet_weight_kg?: number
  pet_count: number
  from_country_id?: string
  from_city?: string
  to_country_id?: string
  to_city?: string
  travel_date?: string
  special_requests?: string
  status: 'new' | 'contacted' | 'quoted' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
  created_at: string
}

export interface Country {
  id: string
  code: string
  name: string
  currency_code?: string
}

export interface Language {
  code: string
  name: string
  native_name: string
  flag_emoji?: string
}

// Helper functions
export async function submitInquiry(inquiryData: Partial<Inquiry>) {
  const { data, error } = await supabase
    .from('inquiries')
    .insert([inquiryData])
    .select()
    .single()

  if (error) {
    console.error('Error submitting inquiry:', error)
    throw error
  }

  return data
}

export async function getCountries() {
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .eq('is_active', true)
    .order('name')

  if (error) {
    console.error('Error fetching countries:', error)
    return []
  }

  return data
}

export async function getLanguages() {
  const { data, error } = await supabase
    .from('languages')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching languages:', error)
    return []
  }

  return data
}