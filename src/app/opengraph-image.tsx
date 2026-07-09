import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: '#050505',
          color: '#E5E5E5',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
          <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: '#22c55e' }} />
          <div style={{ fontSize: 20, letterSpacing: 4, textTransform: 'uppercase', color: '#a3a3a3' }}>
            Dean Oriade
          </div>
        </div>
        <div style={{ fontSize: 76, lineHeight: 1.1, color: '#ffffff', display: 'flex', maxWidth: 950 }}>
          Filmmaker &amp; Photographer
        </div>
        <div style={{ fontSize: 32, marginTop: 24, color: '#737373', display: 'flex' }}>
          Toronto, Canada
        </div>
      </div>
    ),
    { ...size }
  );
}
