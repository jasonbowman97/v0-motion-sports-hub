import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-20 md:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
          </div>

          <div className="relative flex flex-col items-center gap-6 px-8 py-16 text-center md:py-24">
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
              The data is already there. Start reading it.
            </h2>
            <p className="max-w-lg text-muted-foreground">
              Create a free account in seconds. No credit card required. Upgrade
              to Pro anytime for the full analytical experience.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8"
                asChild
              >
                <Link href="/mlb/hitting-stats">
                  Get started free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <span className="text-xs text-muted-foreground">
                Free forever -- no credit card needed
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
