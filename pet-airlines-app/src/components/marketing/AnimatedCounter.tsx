'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  target: number
  suffix?: string
  colorClass: string
  label: string
}

export function AnimatedCounter({ target, suffix = '', colorClass, label }: AnimatedCounterProps) {
  // Starts at the final value so server-rendered markup and the pre-intersection
  // client render agree — the count-up only replaces it once the tile scrolls in.
  const [value, setValue] = useState(target)
  const elementRef = useRef<HTMLDivElement | null>(null)
  const hasAnimatedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const node = elementRef.current
    if (!node) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Value already holds the target, so honouring reduced motion means simply
    // never starting the count-up.
    if (prefersReducedMotion) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true
            setValue(0)
            const increment = target / 200
            let current = 0
            const step = () => {
              current += increment
              if (current < target) {
                setValue(Math.ceil(current))
                timerRef.current = setTimeout(step, 10)
              } else {
                timerRef.current = null
                setValue(target)
              }
            }
            step()
            observer.unobserve(node)
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [target])

  return (
    <div ref={elementRef} className="bg-white rounded-2xl p-6 shadow-lg">
      <span className={`text-4xl font-bold ${colorClass} counter-number`}>
        {value}
        {suffix}
      </span>
      <p className="text-gray-600 mt-2">{label}</p>
    </div>
  )
}
