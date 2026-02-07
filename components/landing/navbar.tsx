"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Diamond Analytics
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#sports" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Sports
          </a>
          <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Pricing
          </a>
          <Link href="/dashboard" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            MLB
          </Link>
          <Link href="/nba/first-basket" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            NBA
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
            <Link href="/dashboard">Log in</Link>
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <Link href="/dashboard">Sign up free</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="#sports" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground">Sports</a>
            <a href="#features" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground">Features</a>
            <a href="#pricing" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground">Pricing</a>
            <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground">MLB Dashboard</Link>
            <Link href="/nba/first-basket" onClick={() => setMobileOpen(false)} className="text-sm text-muted-foreground">NBA Dashboard</Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <Button variant="ghost" size="sm" className="justify-start text-muted-foreground" asChild>
                <Link href="/dashboard">Log in</Link>
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground" asChild>
                <Link href="/dashboard">Sign up free</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
