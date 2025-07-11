"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

/* ----------  animated background (unchanged) ---------- */
function AnimatedBackground() {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; speed: number }>
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 0.5,
      })),
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />

      {/* animated overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, #06b6d4 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
          transition={{
            duration: p.speed * 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* decor shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-400/30 rounded-full"
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-24 h-24 border border-purple-400/30"
        animate={{ rotate: -360, scale: [1, 0.8, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-16 h-16 bg-cyan-400/20 rounded-full"
        animate={{ y: [0, -50, 0], x: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>
    </div>
  );
}

/* ----------  hero section ---------- */
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 text-center text-white px-4 max-w-none mx-auto">
        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            text-lg sm:text-3xl md:text-6xl
            font-bold font-serif mb-6
            md:whitespace-nowrap
          "
        >
          Global Optimization, Analytics, and Learning Lab
        </motion.h1>

        {/* tagline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl mb-8 font-light italic"
        >
          Shaping the future in optimization, resource allocation, healthcare,
          and machine intelligence.
        </motion.p>

        {/* buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          <Button asChild size="lg" className="w-fit text-lg px-8">
            <Link href="mailto:goal.cs.queensu@gmail.com">Join Us</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-fit text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            <Link href="/publications">Latest Papers</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
