"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { BarChart3 } from "lucide-react"
import { pitchers } from "@/lib/pitching-data"
import type { PitcherStats } from "@/lib/pitching-data"
import { PitchingTable } from "@/components/mlb/pitching-table"
import { PitcherArsenal } from "@/components/mlb/pitcher-arsenal"

type HandFilter = "ALL" | "L" | "R"

export default function PitchingStatsPage() {
  const [handFilter, setHandFilter] = useState<HandFilter>("ALL")
  const [selectedPitcher, setSelectedPitcher] = useState<PitcherStats | null>(null)

  const filteredData = useMemo(() => {
    if (handFilter === "ALL") return pitchers
    return pitchers.filter((p) => p.hand === handFilter)
  }, [handFilter])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-[1440px] flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-foreground">Diamond Analytics</h1>
                <p className="text-xs text-muted-foreground">Pitching Stats</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/mlb/hitting-stats" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary">
              Hitting Stats
            </Link>
            <Link href="/mlb/nrfi" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary">
              NRFI
            </Link>
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-md">
              Pitching Stats
            </span>
            <Link href="/mlb/trends" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary">
              Trends
            </Link>
            <div className="hidden sm:block h-5 w-px bg-border mx-1" />
            <Link href="/nba/first-basket" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary">
              NBA
            </Link>
            <Link href="/nfl/matchup" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary">
              NFL
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-6 py-8 flex flex-col gap-6">
        {selectedPitcher ? (
          <PitcherArsenal pitcher={selectedPitcher} onBack={() => setSelectedPitcher(null)} />
        ) : (
          <>
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">Hand:</span>
                <div className="flex items-center rounded-lg border border-border bg-card overflow-hidden">
                  {(["ALL", "L", "R"] as const).map((h) => (
                    <button
                      key={h}
                      onClick={() => setHandFilter(h)}
                      className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                        handFilter === h
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      {h === "ALL" ? "All" : `${h}HP`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="ml-auto text-xs text-muted-foreground font-mono tabular-nums">
                {filteredData.length} pitchers
              </div>
            </div>

            {/* Table */}
            <PitchingTable data={filteredData} onSelectPitcher={setSelectedPitcher} />
          </>
        )}
      </main>
    </div>
  )
}
