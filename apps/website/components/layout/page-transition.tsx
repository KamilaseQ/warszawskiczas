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
    swapTimerRef.current = setTimeout(() => setContentKey(pathname), 320)
    hideTimerRef.current = setTimeout(() => setShowCurtain(false), 680)
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
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={(definition) => {
              if (
                typeof definition === 'object' &&
                definition !== null &&
                'y' in definition &&
                (definition as { y: number | string }).y === 0
              ) {
                if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
                hideTimerRef.current = setTimeout(() => setShowCurtain(false), 220)
              }
            }}
            className="pointer-events-none fixed inset-0 z-[400] bg-[#0a0a0a]"
          >
            <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center">
              <span className="font-serif text-2xl tracking-[0.3em] text-accent-gold">
                WC
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
