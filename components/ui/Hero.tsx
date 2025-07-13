'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import WhyChooseUs from '@/components/WhyChooseUs'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const burgerRef = useRef(null)
  const handRef = useRef(null)

 useEffect(() => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
        markers: false,
      },
    })

    // Burger falls and bounces!
    tl.fromTo(
      burgerRef.current,
      { y: -200, opacity: 0 },
      {
        y: 300,
        opacity: 1,
        ease: 'power2.out',
        duration: 1,
      },
      0
    )
    .to(
      burgerRef.current,
      {
        y: 260,
        ease: 'bounce.out',
        duration: 0.5,
      },
      "+=0.1" // slight delay to simulate bounce
    )

    // Hand rises up to meet burger
    tl.fromTo(
      handRef.current,
      { y: 100, opacity: 0 },
      {
        y: -120,
        opacity: 1,
        ease: 'power2.out',
        duration: 1,
      },
      0
    )
  }, sectionRef)

  return () => ctx.revert()
}, [])


  return (
    <section
      ref={sectionRef}
      className="hero relative w-full h-[150vh] bg-white dark:bg-black overflow-hidden flex items-center justify-center"
    >
      {/* ✅ Centered Text */}
      <div className="absolute top-60 left-1/2 -translate-x-1/2 z-30 bg-black/50 p-8 rounded-xl text-center text-white">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">Bite into Greatness</h2>
        <p className="text-lg md:text-xl">Crafted with love. Delivered with speed.</p>
      </div>
           


      {/* 🍔 Bigger Burger */}
      <div
        ref={burgerRef}
        className="burger absolute top-32 left-1/2 -translate-x-1/2 z-20 opacity-0"
      >
        <Image src="/backgrundburger.png" alt="Burger" width={400} height={320} priority />
      </div>

      {/* 🖐️ Bigger Hand */}
      <div
        ref={handRef}
        className="hand absolute bottom-0 left-1/2 -translate-x-1/2 z-10 opacity-0"
      >
       
        <Image src="/hand.png" alt="Hand" width={350} height={350} priority />
      </div>
    </section>
  )
}
