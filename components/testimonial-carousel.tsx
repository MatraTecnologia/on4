"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface TestimonialCarouselProps {
  children: React.ReactNode[]
  autoPlay?: boolean
  interval?: number
  showControls?: boolean
  showIndicators?: boolean
}

export default function TestimonialCarousel({
  children,
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showIndicators = true,
}: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const updateIndex = useCallback(
    (newIndex: number) => {
      if (newIndex < 0) {
        newIndex = children.length - 1
      } else if (newIndex >= children.length) {
        newIndex = 0
      }

      setActiveIndex(newIndex)
    },
    [children.length],
  )

  useEffect(() => {
    if (!autoPlay || isPaused) return

    const timer = setInterval(() => {
      updateIndex(activeIndex + 1)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, activeIndex, updateIndex, isPaused])

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>

      {showControls && (
        <>
          <button
            onClick={() => updateIndex(activeIndex - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-[#1e3352]" />
          </button>
          <button
            onClick={() => updateIndex(activeIndex + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-[#1e3352]" />
          </button>
        </>
      )}

      {showIndicators && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {children.map((_, index) => (
            <button
              key={index}
              onClick={() => updateIndex(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-colors",
                index === activeIndex ? "bg-[#1e3352]" : "bg-gray-300",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
