"use client"

import Link from "next/link"
import { Lock, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth, type UserTier } from "@/hooks/use-auth"

interface RowPaywallProps {
  /** Total number of rows in the dataset */
  totalRows: number
  children: React.ReactNode
}

const ANONYMOUS_ROWS = 3
const FREE_ROWS = 6

export function getVisibleRowCount(tier: UserTier, totalRows: number): number {
  if (tier === "pro") return totalRows
  if (tier === "free") return Math.min(FREE_ROWS, totalRows)
  return Math.min(ANONYMOUS_ROWS, totalRows)
}

export function RowPaywall({ totalRows, children }: RowPaywallProps) {
  const { tier, loading } = useAuth()

  if (loading || tier === "pro") {
    return <>{children}</>
  }

  const visibleCount = getVisibleRowCount(tier, totalRows)
  const hiddenCount = totalRows - visibleCount

  if (hiddenCount <= 0) {
    return <>{children}</>
  }

  return (
    <div className="relative">
      {children}

      {/* Fade-to-lock overlay */}
      <div className="relative -mt-2">
        {/* Gradient fade */}
        <div className="absolute -top-20 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />

        {/* CTA card */}
        <div className="relative z-20 rounded-xl border border-border bg-card p-8 flex flex-col items-center gap-4 text-center">
          {tier === "anonymous" ? (
            <>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10">
                <UserPlus className="h-5 w-5 text-accent" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-base font-semibold text-foreground">
                  Sign up to see {hiddenCount} more rows
                </h4>
                <p className="text-sm text-muted-foreground">
                  Create a free account to see up to {FREE_ROWS} rows, or go
                  Pro for the full dataset.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  asChild
                >
                  <Link href="/auth/sign-up">Sign up free</Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-border text-foreground hover:bg-secondary"
                  asChild
                >
                  <Link href="/#pricing">View Pro plan</Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-base font-semibold text-foreground">
                  Unlock all {totalRows} rows
                </h4>
                <p className="text-sm text-muted-foreground">
                  Upgrade to Pro for unlimited access to all data, dashboards,
                  and insights.
                </p>
              </div>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                asChild
              >
                <Link href="/#pricing">Get Pro - $12/mo</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
