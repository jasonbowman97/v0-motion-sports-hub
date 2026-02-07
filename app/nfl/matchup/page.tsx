"use client"

import { useState, useMemo } from "react"
import useSWR from "swr"
import { NFLHeader } from "@/components/nfl/nfl-header"
import { TeamStatsComparison } from "@/components/nfl/team-stats-comparison"
import { PassingSection, RushingSection, ReceivingSection } from "@/components/nfl/positional-tables"
import { getAllMatchups, type NFLMatchup } from "@/lib/nfl-matchup-data"
import type { NFLScheduleGame } from "@/lib/nfl-api"
import { ChevronLeft, ChevronRight, Calendar, Loader2 } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function NFLMatchupPage() {
  const staticMatchups = getAllMatchups()
  const [selectedMatchup, setSelectedMatchup] = useState<NFLMatchup>(staticMatchups[0])
  const [currentDate, setCurrentDate] = useState(new Date())

  const { data, isLoading } = useSWR<{ games: NFLScheduleGame[] }>("/api/nfl/schedule", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 3600000,
  })

  const liveGames = data?.games ?? []
  const isLive = liveGames.length > 0
  const weekLabel = liveGames[0]?.week || ""

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
            {staticMatchups.map((m) => (
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

        {/* Live game strip */}
        {isLive && (
          <div className="flex flex-wrap items-center gap-2 p-4 rounded-xl bg-card border border-border">
            <div className="flex items-center gap-2 mr-2">
              {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md">
                Live
              </span>
              {weekLabel && <span className="text-xs text-muted-foreground">{weekLabel}</span>}
            </div>
            {liveGames.map((g) => (
              <div
                key={g.id}
                className="flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs"
              >
                <span className="font-semibold text-foreground">{g.awayTeam.abbreviation}</span>
                <span className="text-muted-foreground">@</span>
                <span className="font-semibold text-foreground">{g.homeTeam.abbreviation}</span>
                {g.odds && (
                  <span className="text-muted-foreground ml-1">O/U {g.odds.overUnder}</span>
                )}
              </div>
            ))}
          </div>
        )}

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
