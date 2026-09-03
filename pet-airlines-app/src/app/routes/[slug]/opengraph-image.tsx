import { ImageResponse } from 'next/og'

import { POPULAR_ROUTES, countryName } from '@/lib/countries'

export const runtime = 'edge'
export const alt = 'Pet Airlines route'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return POPULAR_ROUTES.map((route) => ({ slug: route.slug }))
}

export default function Image({ params }: { params: { slug: string } }) {
  const route = POPULAR_ROUTES.find((entry) => entry.slug === params.slug)
  const fromName = route ? countryName(route.from) : ''
  const toName = route ? countryName(route.to) : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '96px',
          backgroundColor: '#E8F4FB',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -110,
            right: -90,
            width: 420,
            height: 420,
            borderRadius: 999,
            backgroundColor: '#87CEEB',
            opacity: 0.45,
          }}
        />
        <div style={{ display: 'flex', fontSize: 32, color: '#3B9AE1', fontWeight: 600 }}>
          Pet Airlines
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: 34,
            fontSize: 76,
            fontWeight: 700,
            color: '#1B3A5F',
            letterSpacing: -2,
          }}
        >
          {fromName}
          <div
            style={{
              display: 'flex',
              width: 110,
              height: 10,
              borderRadius: 6,
              backgroundColor: '#FFA366',
              margin: '0 32px',
            }}
          />
          {toName}
        </div>
        <div style={{ display: 'flex', marginTop: 28, fontSize: 38, color: '#1B3A5F', opacity: 0.75 }}>
          Pet transport requirements, timeline &amp; crate guidance
        </div>
      </div>
    ),
    { ...size }
  )
}
