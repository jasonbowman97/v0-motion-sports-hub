"use client"

import { useState } from "react"
import Link from "next/link"
import { BarChart3 } from "lucide-react"
import { nbaGames } from "@/lib/nba-h2h-data"
import { H2HMatchupSelector } from "@/components/nba/h2h-matchup-selector"
import { H2HHistory } from "@/components/nba/h2h-history"
import { H2HMomentum } from "@/components/nba/h2h-momentum"
import { H2HDefense } from "@/components/nba/h2h-defense"
import { H2HInjuries } from "@/components/nba/h2h-injuries"

export default function NBAH2HPage() {
  const [selectedGameId, setSelectedGameId] = useState(nbaGames[0].id)
  const selectedGame = nbaGames.find((g) => g.id === selectedGameId) ?? nbaGames[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-[1440px] flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-foreground">
                  Diamond Analytics
                </h1>
                <p className="text-xs text-muted-foreground">NBA Head-to-Head</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/nba/first-basket"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary"
            >
              First Basket
            </Link>
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-md">
              H2H
            </span>
            <Link
              href="/nba/trends"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary"
            >
              Trends
            </Link>
            <div className="hidden sm:block h-5 w-px bg-border mx-1" />
            <Link
              href="/mlb/hitting-stats"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary"
            >
              MLB
            </Link>
            <Link
              href="/nfl/matchup"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary"
            >
              NFL
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Team vs Team H2H Analysis</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Comprehensive matchup analytics with betting insights and injury reports
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <H2HMatchupSelector
            games={nbaGames}
            selectedId={selectedGameId}
            onSelect={setSelectedGameId}
          />
          <H2HHistory game={selectedGame} />
          <H2HMomentum game={selectedGame} />
          <H2HDefense game={selectedGame} />
          <H2HInjuries game={selectedGame} />
        </div>
      </main>
    </div>
  )
}
