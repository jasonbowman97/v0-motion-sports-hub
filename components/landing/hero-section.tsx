import Link from "next/link"
import { ArrowRight, TrendingUp, Target, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">
              Now covering MLB, NBA, and NFL
            </span>
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-6xl lg:text-7xl">
            Turn raw data into your{" "}
            <span className="text-primary">competitive edge</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">
            Advanced sports analytics that surface the trends others miss.
            Player matchups, pitch arsenals, shooting splits, and rushing
            tendencies -- all in one dashboard built for decisions.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base" asChild>
              <Link href="/dashboard">
                Start free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent h-12 px-8 text-base border-border text-foreground hover:bg-secondary" asChild>
              <Link href="#features">See how it works</Link>
            </Button>
          </div>

          {/* Stat highlights */}
          <div className="mt-16 grid grid-cols-3 gap-8 md:gap-16">
            <div className="flex flex-col items-center gap-1">
              <TrendingUp className="h-5 w-5 text-primary mb-2" />
              <span className="text-2xl font-bold text-foreground md:text-3xl">3</span>
              <span className="text-xs text-muted-foreground md:text-sm">Major Leagues</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Target className="h-5 w-5 text-accent mb-2" />
              <span className="text-2xl font-bold text-foreground md:text-3xl">50+</span>
              <span className="text-xs text-muted-foreground md:text-sm">Stat Categories</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Zap className="h-5 w-5 text-primary mb-2" />
              <span className="text-2xl font-bold text-foreground md:text-3xl">Live</span>
              <span className="text-xs text-muted-foreground md:text-sm">Daily Updates</span>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="mt-20 w-full max-w-5xl">
            <div className="relative rounded-xl border border-border bg-card p-2 shadow-2xl shadow-primary/5">
              <div className="rounded-lg border border-border/50 bg-muted overflow-hidden">
                {/* Faux dashboard table preview */}
                <div className="px-4 py-3 border-b border-border/50 flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-destructive" />
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="ml-4 h-3 w-40 rounded bg-secondary" />
                </div>
                <div className="p-6 flex flex-col gap-3">
                  {/* Header row */}
                  <div className="grid grid-cols-8 gap-3">
                    {["Player", "Team", "AVG", "SLG", "XBH", "HR", "Exit Velo", "Barrel %"].map(
                      (col) => (
                        <div key={col} className="h-3 rounded bg-secondary/80">
                          <span className="sr-only">{col}</span>
                        </div>
                      )
                    )}
                  </div>
                  {/* Data rows */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={`row-${i}`} className="grid grid-cols-8 gap-3">
                      <div className="h-3 rounded bg-secondary/50 col-span-1" />
                      <div className="h-3 rounded bg-secondary/40" />
                      <div className={`h-3 rounded ${i < 2 ? "bg-primary/30" : i < 4 ? "bg-accent/25" : "bg-destructive/20"}`} />
                      <div className={`h-3 rounded ${i < 3 ? "bg-primary/25" : "bg-accent/20"}`} />
                      <div className="h-3 rounded bg-secondary/40" />
                      <div className="h-3 rounded bg-secondary/40" />
                      <div className={`h-3 rounded ${i < 2 ? "bg-primary/30" : "bg-secondary/40"}`} />
                      <div className={`h-3 rounded ${i < 3 ? "bg-primary/25" : "bg-destructive/20"}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
