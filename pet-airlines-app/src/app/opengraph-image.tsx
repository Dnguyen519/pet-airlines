import { ImageResponse } from 'next/og'

// ImageResponse renders a Satori subset of CSS — arbitrary SVG components do
// not render reliably here, so the composition is built from plain divs in the
// same brand palette as the on-page illustrations.

export const runtime = 'edge'
export const alt = 'Pet Airlines — International Pet Transportation'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
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
            top: -120,
            right: -80,
            width: 460,
            height: 460,
            borderRadius: 999,
            backgroundColor: '#87CEEB',
            opacity: 0.45,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -140,
            right: 140,
            width: 320,
            height: 320,
            borderRadius: 999,
            backgroundColor: '#FFA366',
            opacity: 0.55,
          }}
        />
        <div style={{ display: 'flex', width: 120, height: 14, borderRadius: 8, backgroundColor: '#FFA366' }} />
        <div
          style={{
            display: 'flex',
            marginTop: 36,
            fontSize: 86,
            fontWeight: 700,
            color: '#1B3A5F',
            letterSpacing: -2,
          }}
        >
          Pet Airlines
        </div>
        <div style={{ display: 'flex', marginTop: 20, fontSize: 44, color: '#3B9AE1' }}>
          International Pet Transportation
        </div>
        <div style={{ display: 'flex', marginTop: 40, fontSize: 30, color: '#1B3A5F', opacity: 0.75 }}>
          Door-to-door · Documentation · Customs clearance · IATA crating
        </div>
      </div>
    ),
    { ...size }
  )
}
