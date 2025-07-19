"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface ParallaxBackgroundProps {
  src: string
  alt: string
  overlayColor?: string
  speed?: number
}

export default function ParallaxBackground({
  src,
  alt,
  overlayColor = "rgba(30, 51, 82, 0.5)",
  speed = 0.5,
}: ParallaxBackgroundProps) {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <div
        style={{
          transform: `translateY(${offsetY * speed}px)`,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      >
        <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" priority sizes="100vw" />
      </div>
      <div className="absolute inset-0" style={{ backgroundColor: overlayColor }}></div>
    </div>
  )
}
