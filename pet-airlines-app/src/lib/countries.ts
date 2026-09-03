// Static reference data — no DB table for this. Countries relevant to pet
// relocation routes Pet Airlines actually serves or is likely to be asked
// about, ISO-3166-1 alpha-2 codes.

export interface Country {
  code: string
  name: string
}

export const COUNTRIES: ReadonlyArray<Country> = [
  { code: 'CA', name: 'Canada' },
  { code: 'US', name: 'United States' },
  { code: 'MX', name: 'Mexico' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'IE', name: 'Ireland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'BE', name: 'Belgium' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
  { code: 'PT', name: 'Portugal' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'IS', name: 'Iceland' },
  { code: 'PL', name: 'Poland' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'HU', name: 'Hungary' },
  { code: 'RO', name: 'Romania' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'HR', name: 'Croatia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'EE', name: 'Estonia' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'GR', name: 'Greece' },
  { code: 'TR', name: 'Turkey' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'QA', name: 'Qatar' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'IL', name: 'Israel' },
  { code: 'JO', name: 'Jordan' },
  { code: 'IN', name: 'India' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'NP', name: 'Nepal' },
  { code: 'SG', name: 'Singapore' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'TH', name: 'Thailand' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'PH', name: 'Philippines' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'LA', name: 'Laos' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'CN', name: 'China' },
  { code: 'AU', name: 'Australia' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'BR', name: 'Brazil' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'PE', name: 'Peru' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'KE', name: 'Kenya' },
  { code: 'EG', name: 'Egypt' },
  { code: 'MA', name: 'Morocco' },
] as const

export const COUNTRY_CODES = COUNTRIES.map((c) => c.code) as [string, ...string[]]

export function countryName(code: string): string {
  return COUNTRIES.find((c) => c.code === code)?.name ?? code
}

export interface PopularRoute {
  slug: string
  from: string
  to: string
  title: string
}

// The 8 corridors Pet Airlines is asked about most, mirroring the routes
// already listed on the live /routes page (Canada, South Korea, Vietnam,
// France) plus the top additional destinations named on that page's "we
// serve destinations worldwide" list (United States, Australia).
export const POPULAR_ROUTES: ReadonlyArray<PopularRoute> = [
  { slug: 'canada-to-vietnam', from: 'CA', to: 'VN', title: 'Canada to Vietnam' },
  { slug: 'canada-to-south-korea', from: 'CA', to: 'KR', title: 'Canada to South Korea' },
  { slug: 'south-korea-to-vietnam', from: 'KR', to: 'VN', title: 'South Korea to Vietnam' },
  { slug: 'canada-to-france', from: 'CA', to: 'FR', title: 'Canada to France' },
  { slug: 'south-korea-to-france', from: 'KR', to: 'FR', title: 'South Korea to France' },
  { slug: 'vietnam-to-france', from: 'VN', to: 'FR', title: 'Vietnam to France' },
  { slug: 'canada-to-united-states', from: 'CA', to: 'US', title: 'Canada to United States' },
  { slug: 'canada-to-australia', from: 'CA', to: 'AU', title: 'Canada to Australia' },
] as const
