"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video play failed:", error)
      })
    }
  }, [])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <video ref={videoRef} className="h-full w-full object-cover" autoPlay muted loop playsInline>
          <source src="/background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center text-white">
        <h1 className="mb-4 text-4xl font-bold md:text-6xl">Welcome</h1>
        <p className="mb-8 max-w-md text-center text-lg md:text-xl">Experience the atmosphere</p>
        <Link href="/reviews">
          <button className="rounded-full border border-white bg-transparent px-6 py-2 text-white transition-colors hover:bg-white hover:text-black">
            Explore
          </button>
        </Link>
      </div>
    </main>
  )
}

