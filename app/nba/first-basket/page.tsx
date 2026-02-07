"use client"

import { useState, useCallback } from "react"
import { NBAHeader } from "@/components/nba/nba-header"
import { DateNavigator } from "@/components/nba/date-navigator"
import { FirstBasketTable } from "@/components/nba/first-basket-table"
import { todayGames, type TimeFrame } from "@/lib/nba-first-basket-data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function NBAFirstBasketPage() {
  const [date, setDate] = useState(new Date(2026, 1, 7)) // Feb 7, 2026
  const [gameFilter, setGameFilter] = useState("all")
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("season")
  const [sortColumn, setSortColumn] = useState("firstBasketPerGmPct")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  const handlePrevDay = useCallback(() => {
    setDate((prev) => {
      const d = new Date(prev)
      d.setDate(d.getDate() - 1)
      return d
    })
  }, [])

  const handleNextDay = useCallback(() => {
    setDate((prev) => {
      const d = new Date(prev)
      d.setDate(d.getDate() + 1)
      return d
    })
  }, [])

  function handleSort(column: string) {
    if (sortColumn === column) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <NBAHeader />
      <main className="mx-auto max-w-[1440px] px-6 py-6 flex flex-col gap-6">
        {/* Page heading */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-foreground">First Basket Analysis</h2>
          <p className="text-sm text-muted-foreground">
            Track which players score the first basket of the game. Filter by matchup and time frame to spot trends.
          </p>
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Date navigator */}
          <DateNavigator date={date} onPrev={handlePrevDay} onNext={handleNextDay} />

          {/* Matchup filter */}
          <div className="flex items-center gap-2">
            <Select value={gameFilter} onValueChange={setGameFilter}>
              <SelectTrigger className="w-[180px] h-9 bg-card border-border text-sm">
                <SelectValue placeholder="All Matchups" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Matchups</SelectItem>
                {todayGames.map((game) => (
                  <SelectItem key={game.id} value={`${game.away}-${game.home}`}>
                    {game.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time frame toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Range</span>
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(
                [
                  { key: "season", label: "Season" },
                  { key: "L10", label: "L10" },
                  { key: "L5", label: "L5" },
                ] as const
              ).map((option) => (
                <button
                  key={option.key}
                  onClick={() => setTimeFrame(option.key)}
                  className={`px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    timeFrame === option.key
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Games strip */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground mr-1">{"Today's games:"}</span>
          {todayGames.map((game) => (
            <button
              key={game.id}
              onClick={() =>
                setGameFilter((prev) =>
                  prev === `${game.away}-${game.home}` ? "all" : `${game.away}-${game.home}`
                )
              }
              className={`inline-flex items-center rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                gameFilter === `${game.away}-${game.home}`
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-secondary text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              {game.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <FirstBasketTable
          timeFrame={timeFrame}
          gameFilter={gameFilter}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSort={handleSort}
        />
      </main>
    </div>
  )
}
