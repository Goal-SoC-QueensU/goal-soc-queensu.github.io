"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"

const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

const NAV = [
  { name: "Home",         href: "/" },
  { name: "Research",     href: "/research" },
  { name: "Publications", href: "/publications" },
  { name: "News",         href: "/news" },
  { name: "People",       href: "/people" },
  { name: "About Us",     href: "/about" },
]

/* -------------------------------------------------------------- */

export function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* strip a GitHub‑Pages basePath (e.g. /goal‑lab) so matching works */
  const cleanPath = pathname.replace(new RegExp(`^${prefix}`), "")

  /* -------- shared classes for glowing link -------- */
  const base =
    "relative group px-3 py-1 font-medium transition-all duration-300"
  const glow =
    "before:absolute before:-inset-1 before:rounded before:bg-gradient-to-r " +
    "before:from-transparent before:via-purple-500/25 before:to-transparent " +
    "before:opacity-0 before:transition-opacity before:duration-300 " +
    "group-hover:before:opacity-100 group-hover:scale-105 " +
    "hover:shadow-[0_0_22px_rgba(147,51,234,0.35)]"

  const activeExtra =
    "text-primary before:opacity-100 shadow-[0_0_22px_rgba(147,51,234,0.35)]"

  /* -------------------------------------------------- */

  const LinkItem = ({
    name,
    href,
    mobile = false,
  }: {
    name: string
    href: string
    mobile?: boolean
  }) => {
    const isActive =
      href === "/"
        ? cleanPath === "/"
        : cleanPath.startsWith(href)

    return (
      <Link
        href={href}
        className={cn(
          base,
          glow,
          mobile && "text-sm",
          isActive && activeExtra,
          !isActive && "text-muted-foreground"
        )}
      >
        <span className="relative z-10">{name}</span>
      </Link>
    )
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* ---------- Logo + brand ---------- */}
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Image
                src={`${prefix}/images/goal_logo_black.png`}
                alt="GOAL Lab Logo"
                width={100}
                height={100}
                className="h-8 w-auto"
                priority
              />
            </Link>
            <Link href="/" className="font-bold text-xl">
              GOAL Lab
            </Link>
          </div>

          {/* ---------- Desktop nav ---------- */}
          <nav className="hidden md:flex items-center space-x-6 text-lg md:text-xl">
            {NAV.map((item) => (
              <LinkItem key={item.name} {...item} />
            ))}
          </nav>

          {/* ---------- Queen’s Computing logo ---------- */}
          <div className="hidden md:flex items-center">
            <Link href="https://www.cs.queensu.ca/" target="_blank">
              <Image
                src={`${prefix}/images/QSC-logo-lockup.png`}
                alt="Queen’s Computing"
                width={100}
                height={100}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* ---------- Mobile burger ---------- */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="right">
                <nav className="mt-8 flex flex-col space-y-4">
                  {NAV.map((item) => (
                    <LinkItem key={item.name} {...item} mobile />
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
