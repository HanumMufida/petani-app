import { useEffect, useState } from 'react'

// Ukuran layar iPhone Pro Max (logical points). Diasumsikan sama untuk "18 Pro Max".
const W = 440
const H = 956
const BEZEL = 14
const OUTER_W = W + BEZEL * 2
const OUTER_H = H + BEZEL * 2

export function shouldFrame() {
  if (typeof window === 'undefined') return false
  const embedded = window.self !== window.top
  return !embedded
}

// Aplikasi dimuat di dalam iframe agar 100dvh, position:fixed, dan safe-area
// mengikuti ukuran layar iPhone, bukan ukuran jendela desktop.
export default function PhoneFrame() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerHeight - 32) / OUTER_H, (window.innerWidth - 16) / OUTER_W))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'grid',
        placeItems: 'center',
        background: 'radial-gradient(circle at 50% 20%, #2b3a2f, #0f1612)',
        overflow: 'hidden',
      }}
    >
      <div style={{ width: OUTER_W * scale, height: OUTER_H * scale }}>
        <div
          style={{
            position: 'relative',
            width: OUTER_W,
            height: OUTER_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            borderRadius: 78,
            padding: BEZEL,
            background: 'linear-gradient(145deg, #3a3d40, #121314 60%, #2a2c2e)',
            boxShadow:
              '0 0 0 2px #5b5f63, 0 0 0 4px #17181a, 0 40px 80px rgba(0,0,0,.55), inset 0 0 6px rgba(255,255,255,.25)',
          }}
        >
          {/* tombol samping */}
          <span style={{ position: 'absolute', left: -6, top: 150, width: 4, height: 34, borderRadius: 2, background: '#2a2c2e' }} />
          <span style={{ position: 'absolute', left: -6, top: 215, width: 4, height: 64, borderRadius: 2, background: '#2a2c2e' }} />
          <span style={{ position: 'absolute', left: -6, top: 295, width: 4, height: 64, borderRadius: 2, background: '#2a2c2e' }} />
          <span style={{ position: 'absolute', right: -6, top: 240, width: 4, height: 100, borderRadius: 2, background: '#2a2c2e' }} />

          <div style={{ position: 'relative', width: W, height: H, borderRadius: 64, overflow: 'hidden', background: '#000' }}>
            <iframe
              title="Petani App"
              src={`${window.location.pathname}${window.location.search}${window.location.hash}`}
              style={{ width: W, height: H, border: 0, display: 'block', background: '#fff' }}
            />
            {/* Dynamic Island */}
            <span
              style={{
                position: 'absolute',
                top: 12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 124,
                height: 36,
                borderRadius: 20,
                background: '#000',
                pointerEvents: 'none',
              }}
            />
            {/* home indicator */}
            <span
              style={{
                position: 'absolute',
                bottom: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 140,
                height: 5,
                borderRadius: 3,
                background: 'rgba(0,0,0,.55)',
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
