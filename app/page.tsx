"use client"

import { useState, useMemo } from "react"
import type { Player } from "@/lib/players-data"
import { players } from "@/lib/players-data"
import type { Pitcher } from "@/lib/matchup-data"
import { getTodayMatchup, aggregateBatterStats } from "@/lib/matchup-data"
import { DashboardHeader } from "@/components/dashboard-header"
import { MatchupPanel } from "@/components/matchup-panel"
import { PlayersTable } from "@/components/players-table"
import { PlayerDetail } from "@/components/player-detail"
import { Switch } from "@/components/ui/switch"

export default function Page() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

  // Matchup state
  const matchup = getTodayMatchup()
  const [selectedPitcher, setSelectedPitcher] = useState<Pitcher>(matchup.probablePitcher)
  const [selectedPitchTypes, setSelectedPitchTypes] = useState<string[]>(
    matchup.probablePitcher.arsenal.map((p) => p.pitchType)
  )
  const [minUsagePct, setMinUsagePct] = useState(5)
  const [matchupMode, setMatchupMode] = useState(true)

  // When pitcher changes, reset selected pitch types to their full arsenal
  function handlePitcherChange(pitcher: Pitcher) {
    setSelectedPitcher(pitcher)
    setSelectedPitchTypes(pitcher.arsenal.map((p) => p.pitchType))
  }

  // Compute aggregated stats for each batter vs selected pitcher's pitch mix
  const matchupStats = useMemo(() => {
    if (!matchupMode) return []
    return players
      .map((player) =>
        aggregateBatterStats(
          player.id,
          player.name,
          player.position,
          player.team,
          selectedPitcher.hand,
          selectedPitchTypes
        )
      )
      .filter((s) => s !== null)
  }, [matchupMode, selectedPitcher, selectedPitchTypes])

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
      <main className="mx-auto max-w-[1600px] px-6 py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left sidebar - Matchup Panel */}
          <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Matchup Mode</h3>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${matchupMode ? "text-primary font-medium" : "text-muted-foreground"}`}>
                  {matchupMode ? "On" : "Off"}
                </span>
                <Switch
                  checked={matchupMode}
                  onCheckedChange={setMatchupMode}
                  aria-label="Toggle matchup mode"
                />
              </div>
            </div>
            {matchupMode && (
              <MatchupPanel
                selectedPitcher={selectedPitcher}
                onPitcherChange={handlePitcherChange}
                selectedPitchTypes={selectedPitchTypes}
                onPitchTypesChange={setSelectedPitchTypes}
                minUsagePct={minUsagePct}
                onMinUsagePctChange={setMinUsagePct}
              />
            )}
          </aside>

          {/* Main content area */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold text-foreground">
                Players Hitting Stats
              </h2>
              <p className="text-sm text-muted-foreground">
                {matchupMode ? (
                  <>
                    vs {selectedPitcher.name} ({selectedPitcher.hand === "R" ? "RHP" : "LHP"}) — {selectedPitchTypes.length} pitch {selectedPitchTypes.length === 1 ? "type" : "types"} selected.{" "}
                    <span className="text-muted-foreground/70">Click a row for game log details.</span>
                  </>
                ) : (
                  "Overall season stats. Click on a player row to view their detailed game log."
                )}
              </p>
            </div>

            {/* Active pitch chips when in matchup mode */}
            {matchupMode && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground mr-1">Active pitches:</span>
                {selectedPitchTypes.map((pt) => {
                  const arsenalPitch = selectedPitcher.arsenal.find((a) => a.pitchType === pt)
                  return (
                    <span
                      key={pt}
                      className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-foreground"
                    >
                      {pt}
                      {arsenalPitch && (
                        <span className="text-muted-foreground font-mono">
                          {arsenalPitch.usagePct.toFixed(1)}%
                        </span>
                      )}
                    </span>
                  )
                })}
              </div>
            )}

            <PlayersTable
              onSelectPlayer={setSelectedPlayer}
              matchupStats={matchupStats}
              useMatchupStats={matchupMode}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
