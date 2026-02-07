"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { BarChart3, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NrfiTable } from "@/components/mlb/nrfi-table"
import { nrfiPitchers } from "@/lib/nrfi-data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type HandFilter = "All" | "RHP" | "LHP"

export default function NrfiPage() {
  const [handFilter, setHandFilter] = useState<HandFilter>("All")
  const [dateOffset, setDateOffset] = useState(0)
  const [yearFilter, setYearFilter] = useState("2025")

  // Date navigation
  const baseDate = new Date(2025, 7, 18) // Aug 18, 2025
  const currentDate = new Date(baseDate)
  currentDate.setDate(currentDate.getDate() + dateOffset)
  const dateLabel = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  // Filter by pitcher hand
  const filteredData = useMemo(() => {
    if (handFilter === "All") return nrfiPitchers
    const hand = handFilter === "RHP" ? "R" : "L"
    return nrfiPitchers.filter((p) => p.hand === hand)
  }, [handFilter])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <BarChart3 className="h-5 w-5 text-primary" />
              <span className="text-sm font-bold tracking-tight">Diamond Analytics</span>
            </Link>
            <span className="text-muted-foreground/40">|</span>
            <span className="text-xs font-medium text-primary">MLB</span>
          </div>

          <div className="flex items-center gap-3">
            {/* MLB sub-nav */}
            <Link
              href="/mlb/hitting-stats"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary"
            >
              Hitting Stats
            </Link>
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-md">
              NRFI
            </span>
            <div className="hidden sm:block h-5 w-px bg-border mx-1" />
            <Link
              href="/nba/first-basket"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary"
            >
              NBA
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

      <main className="mx-auto max-w-[1440px] px-6 py-6 flex flex-col gap-6">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-foreground text-balance">No Run First Inning</h1>
          <p className="text-sm text-muted-foreground">
            Probable pitchers and their NRFI track records for today{"'"}s slate.
          </p>
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Date navigator */}
          <div className="flex items-center rounded-lg border border-border overflow-hidden bg-card">
            <button
              onClick={() => setDateOffset((d) => d - 1)}
              className="flex items-center justify-center h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Previous day"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 px-3">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-semibold text-foreground min-w-[100px] text-center">
                {dateLabel}
              </span>
            </div>
            <button
              onClick={() => setDateOffset((d) => d + 1)}
              className="flex items-center justify-center h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Next day"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Year selector */}
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-[100px] h-9 text-xs bg-card border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-border" />

          {/* Pitcher hand filter */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pitcher</span>
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(["All", "RHP", "LHP"] as const).map((hand) => (
                <button
                  key={hand}
                  onClick={() => setHandFilter(hand)}
                  className={`px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    handFilter === hand
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {hand}
                </button>
              ))}
            </div>
          </div>

          {/* Reset to today */}
          {dateOffset !== 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDateOffset(0)}
              className="text-xs text-muted-foreground hover:text-foreground h-9"
            >
              Today
            </Button>
          )}
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Games Today</p>
            <p className="text-2xl font-bold text-foreground font-mono tabular-nums">
              {Math.ceil(filteredData.length / 2)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">Probable Pitchers</p>
            <p className="text-2xl font-bold text-foreground font-mono tabular-nums">
              {filteredData.length}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">{"Avg NRFI %"}</p>
            <p className="text-2xl font-bold text-primary font-mono tabular-nums">
              {filteredData.length > 0
                ? (filteredData.reduce((s, p) => s + p.nrfiPct, 0) / filteredData.length).toFixed(1)
                : 0}%
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground mb-1">{"Best NRFI %"}</p>
            <p className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
              {filteredData.length > 0 ? Math.max(...filteredData.map((p) => p.nrfiPct)) : 0}%
            </p>
          </div>
        </div>

        {/* Data table */}
        <NrfiTable data={filteredData} />
      </main>
    </div>
  )
}
