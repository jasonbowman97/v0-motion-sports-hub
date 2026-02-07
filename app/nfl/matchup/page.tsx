"use client"

import { useState } from "react"
import { NFLHeader } from "@/components/nfl/nfl-header"
import { TeamStatsComparison } from "@/components/nfl/team-stats-comparison"
import { PassingSection, RushingSection, ReceivingSection } from "@/components/nfl/positional-tables"
import { getAllMatchups, type NFLMatchup } from "@/lib/nfl-matchup-data"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

export default function NFLMatchupPage() {
  const matchups = getAllMatchups()
  const [selectedMatchup, setSelectedMatchup] = useState<NFLMatchup>(matchups[0])
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 8)) // Feb 8, 2026

  const dateStr = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  function shiftDate(days: number) {
    setCurrentDate((d) => {
      const next = new Date(d)
      next.setDate(next.getDate() + days)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <NFLHeader />

      <main className="mx-auto max-w-[1440px] px-6 py-6 flex flex-col gap-6">
        {/* Controls bar */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Date navigator */}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-card px-1 py-1">
            <button
              onClick={() => shiftDate(-1)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              aria-label="Previous day"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 px-3">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm font-semibold text-foreground min-w-[110px] text-center">
                {dateStr}
              </span>
            </div>
            <button
              onClick={() => shiftDate(1)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              aria-label="Next day"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-border" />

          {/* Matchup chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground mr-1">Games</span>
            {matchups.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMatchup(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  selectedMatchup.id === m.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
              >
                {m.away.abbreviation} @ {m.home.abbreviation}
              </button>
            ))}
          </div>
        </div>

        {/* Matchup Header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-foreground text-balance">
            {selectedMatchup.away.name}{" "}
            <span className="text-muted-foreground font-normal">@</span>{" "}
            {selectedMatchup.home.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {selectedMatchup.dateTime} -- {selectedMatchup.week}
          </p>
        </div>

        {/* Team Stats Comparison */}
        <TeamStatsComparison
          away={selectedMatchup.away}
          home={selectedMatchup.home}
        />

        {/* Positional Breakdowns */}
        <PassingSection
          awayPlayers={selectedMatchup.away.passing}
          homePlayers={selectedMatchup.home.passing}
          awayTeam={selectedMatchup.away.abbreviation}
          homeTeam={selectedMatchup.home.abbreviation}
        />

        <RushingSection
          awayPlayers={selectedMatchup.away.rushing}
          homePlayers={selectedMatchup.home.rushing}
          awayTeam={selectedMatchup.away.abbreviation}
          homeTeam={selectedMatchup.home.abbreviation}
        />

        <ReceivingSection
          awayPlayers={selectedMatchup.away.receiving}
          homePlayers={selectedMatchup.home.receiving}
          awayTeam={selectedMatchup.away.abbreviation}
          homeTeam={selectedMatchup.home.abbreviation}
        />
      </main>
    </div>
  )
}
