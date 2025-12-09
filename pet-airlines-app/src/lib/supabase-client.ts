import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
})

// City type
export type City = {
  id: string
  name: string
  country_id: string
  airport_codes: string[]
  is_major_city: boolean
  timezone: string
}

// Get cities for a specific country
export async function getCitiesForCountry(countryId: string): Promise<City[]> {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('country_id', countryId)
    .order('is_major_city', { ascending: false })
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching cities:', error)
    return []
  }

  return data || []
}

// Get all countries with their city count
export async function getCountriesWithCities() {
  const { data, error } = await supabase
    .from('countries')
    .select(`
      *,
      cities:cities(count)
    `)
    .eq('is_active', true)
    .order('name')

  if (error) {
    console.error('Error fetching countries:', error)
    return []
  }

  return data || []
}