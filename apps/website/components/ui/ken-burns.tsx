'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface KenBurnsProps {
  children: React.ReactNode
  className?: string
  /** Intensywność powiększenia 1.0 = brak, 1.15 default */
  intensity?: number
  /** Lekki vertical drift dla parallax-like efektu */
  drift?: boolean
}

/**
 * Ken Burns — bardzo powolne, ciągłe powiększanie obrazu w trakcie scrolla,
 * gdy element jest w viewporcie. Zaprojektowane do owijania <ImagePlaceholder>
 * lub <Image>. Powiększenie liniowe od 1 do `intensity` w zależności od scrollu.
 */
export function KenBurns({ children, className, intensity = 1.15, drift = false }: KenBurnsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, intensity])
  const y = useTransform(scrollYProgress, [0, 1], drift ? ['-3%', '3%'] : ['0%', '0%'])

  if (reduce) {
    return <div className={cn('overflow-hidden', className)}>{children}</div>
  }

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div
        style={{ scale, y }}
        className="relative h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  )
}
