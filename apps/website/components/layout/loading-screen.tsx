'use client'

import { useEffect, useState } from 'react'

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const markFinished = () => {
      ;(window as unknown as { __wcLoadingFinished?: boolean }).__wcLoadingFinished = true
      window.dispatchEvent(new Event('wc-loading-finish'))
    }

    if (sessionStorage.getItem('wc-loaded') === '1') {
      setVisible(false)
      markFinished()
      return
    }

    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      setFading(true)
      sessionStorage.setItem('wc-loaded', '1')
      markFinished()
      window.setTimeout(() => setVisible(false), 800)
    }

    if (document.readyState === 'complete') {
      window.setTimeout(finish, 600)
    } else {
      window.addEventListener('load', () => window.setTimeout(finish, 300), { once: true })
      window.setTimeout(finish, 2200)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] transition-opacity duration-[800ms] ease-in-out ${fading ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '180px 180px',
      }} />

      <div className="flex flex-col items-center gap-6 animate-[wc-mono-in_900ms_ease-out]">
        {/* Monogram WC */}
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 140 80" className="h-20 w-auto">
            <text
              x="70"
              y="58"
              textAnchor="middle"
              fontFamily="'Playfair Display', serif"
              fontStyle="italic"
              fontWeight="500"
              fontSize="60"
              fill="none"
              stroke="#c9a962"
              strokeWidth="0.8"
              letterSpacing="2"
            >
              WC
            </text>
          </svg>
        </div>

        <div className="h-px w-24 overflow-hidden bg-white/10">
          <div className="h-full w-full origin-left animate-[wc-load-bar_1600ms_ease-in-out_infinite] bg-accent-gold" />
        </div>

        <p className="font-sans text-[9px] font-bold uppercase tracking-[0.6em] text-white/40">
          Warszawski Czas
        </p>
      </div>

      <style jsx>{`
        @keyframes wc-mono-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wc-load-bar {
          0% { transform: scaleX(0); transform-origin: left; }
          50% { transform: scaleX(1); transform-origin: left; }
          51% { transform: scaleX(1); transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
      `}</style>
    </div>
  )
}
