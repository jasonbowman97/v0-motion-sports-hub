"use client"

import { BarChart3, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  showBack?: boolean
  onBack?: () => void
  playerName?: string
}

export function DashboardHeader({ showBack, onBack, playerName }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-[1440px] flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          {showBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          )}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-foreground">
                {playerName ? playerName : "Diamond Analytics"}
              </h1>
              {!playerName && (
                <p className="text-xs text-muted-foreground">Player Hitting Stats</p>
              )}
              {playerName && (
                <p className="text-xs text-muted-foreground">Game Log & At-Bat Analysis</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-md">
            2024 Season
          </span>
        </div>
      </div>
    </header>
  )
}
