import { BarChart3 } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <BarChart3 className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">Diamond Analytics</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#sports" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Sports
            </a>
            <a href="#features" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#pricing" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              Pricing
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            2026 Diamond Analytics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
