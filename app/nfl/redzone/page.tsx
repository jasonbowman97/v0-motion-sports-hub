import Link from "next/link"
import { BarChart3 } from "lucide-react"
import { RedzoneTable } from "@/components/nfl/redzone-table"

export const metadata = {
  title: "Diamond Analytics - NFL Redzone Stats",
  description:
    "NFL redzone target and efficiency data. Passing, rushing, and receiving breakdowns for redzone performance.",
}

export default function NFLRedzonePage() {
  return (
    <div className="min-h-screen bg-background">
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
                <p className="text-xs text-muted-foreground">NFL Redzone Stats</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-end">
            <Link
              href="/mlb/hitting-stats"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary"
            >
              MLB
            </Link>
            <Link
              href="/nba/first-basket"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary"
            >
              NBA
            </Link>
            <div className="hidden sm:block h-5 w-px bg-border mx-1" />
            <Link
              href="/nfl/matchup"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary"
            >
              Matchup
            </Link>
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-md">
              Redzone
            </span>
            <Link
              href="/nfl/trends"
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary"
            >
              Trends
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-6 py-8 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground text-balance">
            NFL Redzone Stats
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Passing, rushing, and receiving efficiency inside the red zone. 2025-26 Regular Season.
          </p>
        </div>

        <RedzoneTable />
      </main>
    </div>
  )
}
