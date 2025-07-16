"use client"

import { Button } from "@/components/ui/button"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"

// Globe with network nodes and connections
function GlobalNetworkGlobe() {
  const shouldReduceMotion = useReducedMotion()
  const [nodes, setNodes] = useState<Array<{ id: number; x: number; y: number; brightness: number }>>([])
  const [connections, setConnections] = useState<Array<{ from: number; to: number; opacity: number }>>([])

  useEffect(() => {
    // Generate nodes on globe surface
    const globeNodes = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 50 + 35 * Math.cos((i * 2 * Math.PI) / 12) * Math.cos((i * Math.PI) / 6),
      y: 50 + 35 * Math.sin((i * 2 * Math.PI) / 12) * Math.cos((i * Math.PI) / 6),
      brightness: Math.random() * 0.5 + 0.3,
    }))
    setNodes(globeNodes)

    // Generate random connections
    const nodeConnections = []
    for (let i = 0; i < 8; i++) {
      const from = Math.floor(Math.random() * globeNodes.length)
      let to = Math.floor(Math.random() * globeNodes.length)
      while (to === from) to = Math.floor(Math.random() * globeNodes.length)
      nodeConnections.push({ from, to, opacity: Math.random() * 0.3 + 0.1 })
    }
    setConnections(nodeConnections)
  }, [])

  if (shouldReduceMotion) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-10">
        <div className="w-full h-full rounded-full border border-blue-400/20" />
      </div>
    )
  }

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80">
      {/* Globe wireframe */}
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: [0, 360] }}
        transition={{
          duration: 60,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {/* Longitude lines */}
        <div className="absolute inset-0 rounded-full border border-blue-400/15" />
        <div className="absolute inset-0 rounded-full border border-blue-400/10 transform rotate-45" />
        <div className="absolute inset-0 rounded-full border border-blue-400/10 transform -rotate-45" />

        {/* Latitude lines */}
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/15 to-transparent" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/15 to-transparent" />

        {/* Network nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute w-2 h-2 rounded-full bg-blue-400"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
              filter: "drop-shadow(0 0 6px currentColor)",
            }}
            animate={{
              opacity: [node.brightness, node.brightness * 1.5, node.brightness],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Connection arcs */}
        <svg className="absolute inset-0 w-full h-full overflow-visible">
          {connections.map((conn, index) => {
            const fromNode = nodes[conn.from]
            const toNode = nodes[conn.to]
            if (!fromNode || !toNode) return null

            const x1 = (fromNode.x / 100) * 320
            const y1 = (fromNode.y / 100) * 320
            const x2 = (toNode.x / 100) * 320
            const y2 = (toNode.y / 100) * 320

            const midX = (x1 + x2) / 2
            const midY = (y1 + y2) / 2 - 30

            return (
              <motion.path
                key={index}
                d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="4 4"
                animate={{
                  opacity: [0, conn.opacity, 0],
                  pathLength: [0, 1, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 3,
                }}
              />
            )
          })}
        </svg>
      </motion.div>
    </div>
  )
}

// Analytics visualization
function AnalyticsVisualization() {
  const shouldReduceMotion = useReducedMotion()
  const [bars, setBars] = useState<Array<{ id: number; height: number; delay: number }>>([])

  useEffect(() => {
    setBars(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        height: Math.random() * 60 + 20,
        delay: i * 0.1,
      })),
    )
  }, [])

  if (shouldReduceMotion) {
    return (
      <div className="absolute bottom-10 left-0 right-0 h-32 opacity-60">
        <div className="flex items-end justify-center h-full space-x-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 bg-gradient-to-t from-cyan-400/60 to-fuchsia-400/60"
              style={{ height: `${Math.random() * 60 + 20}%` }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="absolute bottom-10 left-0 right-0 h-32 opacity-60">
      <div className="flex items-end justify-center h-full space-x-2">
        {bars.map((bar) => (
          <motion.div
            key={bar.id}
            className="w-1.5 relative overflow-hidden"
            initial={{ height: 0 }}
            animate={{
              height: [`${bar.height}%`, `${bar.height * 1.5}%`, `${bar.height}%`],
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Number.POSITIVE_INFINITY,
              delay: bar.delay,
              ease: "easeInOut",
            }}
            style={{
              background: "linear-gradient(to top, #22d3ee 0%, #c026d3 100%)",
              backgroundSize: "200% 100%",
            }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, #22d3ee 0%, #c026d3 100%)",
                backgroundSize: "200% 100%",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: 0.5,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Scrolling line chart */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d="M 0 80 Q 100 60 200 70 T 400 65 T 600 75 T 800 70"
          stroke="rgba(34, 211, 238, 0.7)"
          strokeWidth="1.5"
          fill="none"
          animate={{
            x: [-100, 100],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  )
}

// Neural pulse learning effect
function NeuralPulseEffect({ trigger }: { trigger: boolean }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) return null

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute border border-dashed rounded-full"
          style={{
            width: `${ring * 200}px`,
            height: `${ring * 200}px`,
            left: `${-ring * 100}px`,
            top: `${-ring * 100}px`,
            borderColor: "rgba(20, 184, 166, 0.4)",
          }}
          animate={
            trigger
              ? {
                scale: [0.5, 1.5],
                opacity: [0.6, 0],
              }
              : {}
          }
          transition={{
            duration: 2,
            delay: ring * 0.3,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

// Enhanced background with all thematic elements
function ThematicBackground({ onGlobeNodesActivate }: { onGlobeNodesActivate: boolean }) {
  const [particles, setParticles] = useState<
    Array<{
      id: number
      x: number
      y: number
      z: number
      size: number
      speed: number
      opacity: number
      color: string
    }>
  >([])

  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"]
    setParticles(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.random() * 100,
        size: Math.random() * 3 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })),
    )
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Darker deep space background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #111016 100%)" }}
      />

      {/* Nebula fog layers */}
      <motion.div
        className="absolute inset-0 opacity-15"
        animate={
          shouldReduceMotion
            ? {}
            : {
              background: [
                "radial-gradient(ellipse 80% 50% at 20% 40%, #1e1b4b 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 80% 60%, #312e81 0%, transparent 50%)",
                "radial-gradient(ellipse 60% 80% at 60% 20%, #312e81 0%, transparent 50%), radial-gradient(ellipse 80% 50% at 40% 80%, #1e1b4b 0%, transparent 50%)",
                "radial-gradient(ellipse 80% 50% at 20% 40%, #1e1b4b 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 80% 60%, #312e81 0%, transparent 50%)",
              ],
            }
        }
        transition={{
          duration: 20,
          repeat: shouldReduceMotion ? 0 : Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            filter: "blur(0.5px)",
          }}
          animate={
            shouldReduceMotion
              ? {}
              : {
                y: [0, -150],
                x: [0, Math.sin(particle.id) * 30],
                opacity: [particle.opacity * 0.3, particle.opacity],
              }
          }
          transition={{
            duration: particle.speed * 12 + 8,
            repeat: shouldReduceMotion ? 0 : Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Global Network Globe */}
      <div className="opacity-20">
        <GlobalNetworkGlobe />
      </div>

      {/* Analytics Visualization */}
      <AnalyticsVisualization />

      {/* Glass caustic shapes */}
      <motion.div
        className="absolute top-1/4 right-1/6 w-64 h-64 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(59, 130, 246, 0.1)",
        }}
        animate={
          shouldReduceMotion
            ? {}
            : {
              scale: [1, 1.2],
              x: [0, 30],
              y: [0, -20],
            }
        }
        transition={{
          duration: 8,
          repeat: shouldReduceMotion ? 0 : Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Globe nodes brightness sync with enhanced glow */}
      {onGlobeNodesActivate && (
        <motion.div
          className="absolute inset-0 bg-blue-400/8"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      )}
    </div>
  )
}

// Enhanced letter-by-letter animation component
function AnimatedText({
  text,
  className,
  delay = 0,
  onComplete,
}: {
  text: string
  className?: string
  delay?: number
  onComplete?: () => void
}) {
  const shouldReduceMotion = useReducedMotion()
  const letters = text.split("")

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.03,
        delayChildren: delay,
        onComplete,
      },
    },
  }

  const child = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
      onAnimationComplete={onComplete}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child} style={{ display: "inline-block" }}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion()
  const [showNeuralPulse, setShowNeuralPulse] = useState(false)
  const [globeNodesActive, setGlobeNodesActive] = useState(false)

  // Neural pulse effect every 8 seconds
  useEffect(() => {
    if (shouldReduceMotion) return

    const interval = setInterval(() => {
      setShowNeuralPulse(true)
      setTimeout(() => setShowNeuralPulse(false), 3000)
    }, 8000)

    return () => clearInterval(interval)
  }, [shouldReduceMotion])

  // Handle headline animation completion with 0.5s offset
  const handleHeadlineComplete = () => {
    setTimeout(() => {
      setGlobeNodesActive(true)
      setTimeout(() => setGlobeNodesActive(false), 1000)
    }, 500)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ThematicBackground onGlobeNodesActivate={globeNodesActive} />

      {/* Neural pulse effect */}
      <NeuralPulseEffect trigger={showNeuralPulse} />

      <div className="relative z-10 text-center text-white px-4 max-w-8xl mx-auto">
        {/* Headline with letter-by-letter animation */}
        <AnimatedText
          text="Global Optimization, Analytics, and Learning Lab"
          className="
    break-words         /* never overflows; wrap whole words        */
    text-balance        /* nicer multi‑line balance (Tailwind v3.4) */
    leading-tight
    font-bold font-serif
    text-[clamp(1.75rem,5vw,3.5rem)]   /*  ~28 px on desktop, ~18 px on mobile  */
    md:text-5xl lg:text-6xl            /* fallback if clamp unsupported        */
    mb-6
  "
          onComplete={handleHeadlineComplete}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.8,
            delay: shouldReduceMotion ? 0 : 1.5,
            ease: "easeOut",
          }}
          className="
    break-words
    text-balance              /* subtle line‑length balance           */
    font-light italic text-gray-300
    text-[clamp(1rem,4vw,1.25rem)]   /* 16 px → 20 px fluid size         */
    md:text-xl                         /* fallback                        */
    mb-8
    max-w-screen-md mx-auto
  "
        >
          Shaping the future in healthcare, resource allocation, machine intelligence, and quantum algorithms.
        </motion.p>

        {/* CTA Buttons with glow effects */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: shouldReduceMotion ? 0 : 2,
            ease: "easeOut",
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                  scale: 1.05,
                }
            }
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <Button
              asChild
              size="lg"
              className="text-lg px-8 bg-blue-600 hover:bg-blue-700 border border-blue-500/50 relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
            >
              <Link href="mailto:goal.lab@queensu.ca">
                <span className="relative z-10">Join Us</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            whileHover={
              shouldReduceMotion
                ? {}
                : {
                  scale: 1.05,
                }
            }
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-purple-400/50 backdrop-blur-sm relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
            >
              <Link href="/publications">
                <span className="relative z-10">Latest Papers</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-purple-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
