"use client"

import { useState } from "react"
import type { Player } from "@/lib/players-data"
import { DashboardHeader } from "@/components/dashboard-header"
import { FiltersBar } from "@/components/filters-bar"
import { PlayersTable } from "@/components/players-table"
import { PlayerDetail } from "@/components/player-detail"

export default function Page() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  if (selectedPlayer) {
    return (
      <PlayerDetail
        player={selectedPlayer}
        onBack={() => setSelectedPlayer(null)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="mx-auto max-w-[1440px] px-6 py-6 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-foreground">Players Hitting Stats</h2>
          <p className="text-sm text-muted-foreground">
            Click on a player row to view their detailed game log and at-bat analysis.
          </p>
        </div>
        <FiltersBar variant="overview" />
        <PlayersTable onSelectPlayer={setSelectedPlayer} />
      </main>
    </div>
  )
}
