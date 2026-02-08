"use client"

import Link from "next/link"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

interface FullPageLockProps {
  /** Name of the dashboard being locked */
  dashboardName: string
  children: React.ReactNode
}

export function FullPageLock({ dashboardName, children }: FullPageLockProps) {
  const { tier, loading } = useAuth()

  if (loading) {
    return <>{children}</>
  }

  if (tier === "pro") {
    return <>{children}</>
  }

  return (
    <div className="relative min-h-[60vh]">
      {/* Blurred content behind */}
      <div className="pointer-events-none select-none blur-sm opacity-40" aria-hidden="true">
        {children}
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="flex flex-col items-center gap-6 rounded-xl border border-border bg-card/95 backdrop-blur-sm p-10 shadow-xl max-w-md text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-7 w-7 text-primary" />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-foreground">
              {dashboardName} is a Pro feature
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Upgrade to Pro for full access to all dashboards, trends, and
              insights across MLB, NBA, and NFL.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <Button
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link href="/#pricing">Get Pro - $12/mo</Link>
            </Button>
            {tier === "anonymous" && (
              <Button
                size="lg"
                variant="outline"
                className="w-full bg-transparent border-border text-foreground hover:bg-secondary"
                asChild
              >
                <Link href="/auth/sign-up">Create free account</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
