// components/BurgerDrop.tsx
'use client'

import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function BurgerDrop() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  })

  return (
    <section
      ref={ref}
      className="relative h-[600px] bg-white flex flex-col items-center justify-end overflow-hidden"
    >
      {/* Shadow under burger */}
      {inView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-[110px] w-32 h-5 rounded-full bg-black opacity-20"
        />
      )}

      {/* Falling burger */}
      <motion.div
        initial={{ y: -200, opacity: 0, rotate: -15 }}
        animate={inView ? { y: 0, opacity: 1, rotate: 0 } : {}}
        transition={{ duration: 1.2, type: 'spring', bounce: 0.5 }}
        className="z-10"
      >
        <Image src="/burger.png" alt="Burger" width={140} height={140} />
      </motion.div>

      {/* Hand Image */}
      <div className="mt-[-30px] z-0">
        <Image src="/hand.png" alt="Hand" width={220} height={120} />
      </div>
    </section>
  )
}
