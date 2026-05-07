'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

interface PageTransitionProps {
  children: React.ReactNode
}

// "Curtain" — cienka czarna zasłona zjeżdża z góry, kontent fade'uje pod spodem.
// Spójne z editorialną estetyką — bez efektu "bouncy" SPA.
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const reducedMotion = useReducedMotion()
  const [showCurtain, setShowCurtain] = useState(false)
  const [contentKey, setContentKey] = useState(pathname)
  const previousPathnameRef = useRef(pathname)
  const swapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (pathname === previousPathnameRef.current) return
    previousPathnameRef.current = pathname

    if (reducedMotion) {
      setContentKey(pathname)
      return
    }

    if (swapTimerRef.current) clearTimeout(swapTimerRef.current)
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current)

    setShowCurtain(true)
    swapTimerRef.current = setTimeout(() => setContentKey(pathname), 480)
    hideTimerRef.current = setTimeout(() => setShowCurtain(false), 1100)
  }, [pathname, reducedMotion])

  useEffect(() => {
    return () => {
      if (swapTimerRef.current) clearTimeout(swapTimerRef.current)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [])

  if (reducedMotion) {
    return <>{children}</>
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={contentKey}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.15 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showCurtain && (
          <div className="pointer-events-none fixed inset-0 z-[400]">
            {/* Top panel — slides down to cover top half */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-x-0 top-0 h-1/2 bg-[#0a0a0a]"
            >
              <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-gold/70 to-transparent" />
            </motion.div>

            {/* Bottom panel — slides up to cover bottom half */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-x-0 bottom-0 h-1/2 bg-[#0a0a0a]"
            >
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-gold/70 to-transparent" />
            </motion.div>

            {/* Center logo flourish */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.25 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative flex items-center justify-center">
                {/* Pulsujący zewnętrzny pierścień */}
                <span className="absolute h-[200px] w-[200px] rounded-full border border-accent-gold/15 animate-[wc-pt-ring_1400ms_ease-out_infinite]" />

                {/* Bazowy pierścień wokół logo */}
                <span className="absolute h-[150px] w-[150px] rounded-full border border-accent-gold/25" />

                {/* Kometa obiegająca pierścień — conic gradient z głową i ogonem, obracany */}
                <div
                  className="absolute h-[150px] w-[150px] rounded-full animate-[wc-pt-orbit_1200ms_cubic-bezier(0.4,0,0.2,1)_forwards]"
                  style={{
                    background:
                      'conic-gradient(from 0deg, transparent 0deg, transparent 220deg, rgba(201,169,98,0.0) 240deg, rgba(201,169,98,0.6) 320deg, rgba(255,232,180,1) 358deg, rgba(255,255,255,0.95) 360deg)',
                    WebkitMask:
                      'radial-gradient(circle, transparent calc(50% - 2px), black calc(50% - 2px), black 50%, transparent 50%)',
                    mask: 'radial-gradient(circle, transparent calc(50% - 2px), black calc(50% - 2px), black 50%, transparent 50%)',
                    filter: 'drop-shadow(0 0 6px rgba(201,169,98,0.7))',
                  }}
                />

                {/* Hairline cross marks */}
                <span aria-hidden className="absolute h-px w-12 bg-accent-gold/50 left-[-3.5rem] top-1/2 -translate-y-1/2" />
                <span aria-hidden className="absolute h-px w-12 bg-accent-gold/50 right-[-3.5rem] top-1/2 -translate-y-1/2" />

                {/* Logo bez shimmera — czyste */}
                <img
                  src="/logo_blank.png"
                  alt=""
                  aria-hidden="true"
                  className="relative h-16 w-auto sm:h-20"
                />
              </div>
            </motion.div>

            <style jsx>{`
              @keyframes wc-pt-ring {
                0% { transform: scale(0.85); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: scale(1.2); opacity: 0; }
              }
              @keyframes wc-pt-orbit {
                0% { transform: rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: rotate(360deg); opacity: 0; }
              }
            `}</style>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
