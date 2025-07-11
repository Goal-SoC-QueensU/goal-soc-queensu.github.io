"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface FadeInSectionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeInSection({ children, delay = 0, className }: FadeInSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
