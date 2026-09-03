'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  target: number
  suffix?: string
  colorClass: string
  label: string
}

export function AnimatedCounter({ target, suffix = '', colorClass, label }: AnimatedCounterProps) {
  const [value, setValue] = useState(target)
  const elementRef = useRef<HTMLDivElement | null>(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    const node = elementRef.current
    if (!node) return

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
                setTimeout(step, 10)
              } else {
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
    return () => observer.disconnect()
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
