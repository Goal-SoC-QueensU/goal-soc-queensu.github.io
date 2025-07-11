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

const navigation = [
  { name: "Home", href: "/" },
  { name: "Research", href: "/research" },
  { name: "Publications", href: "/publications" },
  { name: "News", href: "/news" },
  { name: "People", href: "/people" },
  { name: "About Us", href: "/about" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* left: logo + brand */}
          <div className="flex items-center space-x-2">
            <Link href="/">
              <Image
                src={`${prefix}/images/goal_logo_black.png`}
                alt="GOAL Lab Logo"
                width={100}
                height={100}
                className="h-8 w-auto"
              />
            </Link>
            <Link href="/" className="font-bold text-xl">
              GOAL Lab
            </Link>
          </div>

          {/* desktop nav */}
          <nav className="hidden md:flex items-center space-x-8 text-lg md:text-xl">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* right: Queen’s Computing logo */}
          <div className="hidden md:flex items-center">
            <Link href="https://www.cs.queensu.ca/">
              <Image
                src={`${prefix}/images/QSC-logo-lockup.png`}
                alt="Queen’s Computing"
                width={100}
                height={100}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* mobile sheet trigger */}
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
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
