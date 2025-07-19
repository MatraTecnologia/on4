"use client"

import { useEffect, useState, useRef } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  decimals?: number
}

export default function AnimatedCounter({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, ref] = useIntersectionObserver({ threshold: 0.1, freezeOnceVisible: true })
  const countRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isVisible) return

    const startTime = performance.now()
    const endTime = startTime + duration * 1000

    const updateCount = (currentTime: number) => {
      if (currentTime >= endTime) {
        setCount(end)
        return
      }

      const progress = (currentTime - startTime) / (duration * 1000)
      const nextCount = Math.min(progress * end, end)
      countRef.current = nextCount
      setCount(nextCount)

      rafRef.current = requestAnimationFrame(updateCount)
    }

    rafRef.current = requestAnimationFrame(updateCount)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [isVisible, end, duration])

  const formattedCount = count.toFixed(decimals)

  return (
    <div ref={ref} className={className}>
      {prefix}
      {formattedCount}
      {suffix}
    </div>
  )
}
