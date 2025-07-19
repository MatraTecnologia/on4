"use client"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedElementProps {
  children: ReactNode
  animation: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "zoom-out" | "slide-up" | "slide-down"
  delay?: number
  duration?: number
  className?: string
  threshold?: number
  once?: boolean
}

export default function AnimatedElement({
  children,
  animation,
  delay = 0,
  duration = 0.6,
  className,
  threshold = 0.1,
  once = false,
}: AnimatedElementProps) {
  const [isVisible, ref] = useIntersectionObserver({
    threshold,
    freezeOnceVisible: once,
  })

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0"

    const baseClass = "transition-all transform opacity-100"
    const durationClass = `duration-${Math.round(duration * 1000)}`
    const delayClass = delay > 0 ? `delay-${Math.round(delay * 1000)}` : ""

    switch (animation) {
      case "fade-up":
        return `${baseClass} ${durationClass} ${delayClass} translate-y-0`
      case "fade-down":
        return `${baseClass} ${durationClass} ${delayClass} translate-y-0`
      case "fade-left":
        return `${baseClass} ${durationClass} ${delayClass} translate-x-0`
      case "fade-right":
        return `${baseClass} ${durationClass} ${delayClass} translate-x-0`
      case "zoom-in":
        return `${baseClass} ${durationClass} ${delayClass} scale-100`
      case "zoom-out":
        return `${baseClass} ${durationClass} ${delayClass} scale-100`
      case "slide-up":
        return `${baseClass} ${durationClass} ${delayClass} translate-y-0`
      case "slide-down":
        return `${baseClass} ${durationClass} ${delayClass} translate-y-0`
      default:
        return baseClass
    }
  }

  const getInitialClass = () => {
    switch (animation) {
      case "fade-up":
        return "opacity-0 translate-y-16"
      case "fade-down":
        return "opacity-0 translate-y-[-16px]"
      case "fade-left":
        return "opacity-0 translate-x-[-32px]"
      case "fade-right":
        return "opacity-0 translate-x-32"
      case "zoom-in":
        return "opacity-0 scale-90"
      case "zoom-out":
        return "opacity-0 scale-110"
      case "slide-up":
        return "opacity-0 translate-y-24"
      case "slide-down":
        return "opacity-0 translate-y-[-24px]"
      default:
        return "opacity-0"
    }
  }

  return (
    <div
      ref={ref}
      className={cn(getInitialClass(), isVisible ? getAnimationClass() : "", className)}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
