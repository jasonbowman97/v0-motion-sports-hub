import Link from "next/link"
import { BarChart3 } from "lucide-react"
import { TrendsDashboard } from "@/components/trends/trends-dashboard"
import { mlbTrends, mlbCategories } from "@/lib/mlb-trends-data"
import { getBattingLeaders, getPitchingLeaders } from "@/lib/mlb-api"
import { buildTrends } from "@/lib/trends-builder"

export const metadata = {
  title: "HeatCheck HQ - MLB Trends",
  description: "Hot and cold streaks for MLB players across hitting, power, pitching, and on-base performance.",
}

async function getLiveTrends() {
  try {
    const [batters, pitchers] = await Promise.all([getBattingLeaders(), getPitchingLeaders()])
    if (!batters.length && !pitchers.length) return null
    return buildTrends(
      [
        {
          config: { name: "Hitting", statLabel: "AVG", hotPrefix: "Batting", coldPrefix: "Slumping at" },
          leaders: batters.filter((b) => b.atBats >= 50).sort((a, b) => b.avg - a.avg)
            .map((b) => ({ id: String(b.id), name: b.name, team: b.team, position: b.pos, value: b.avg, displayValue: b.avg.toFixed(3) })),
        },
        {
          config: { name: "Power", statLabel: "HR", hotPrefix: "Leading with", coldPrefix: "Only" },
          leaders: batters.filter((b) => b.atBats >= 50).sort((a, b) => b.homeRuns - a.homeRuns)
            .map((b) => ({ id: String(b.id), name: b.name, team: b.team, position: b.pos, value: b.homeRuns, displayValue: String(b.homeRuns) })),
        },
        {
          config: { name: "Pitching", statLabel: "ERA", hotPrefix: "Elite", coldPrefix: "Struggling with", lowerIsBetter: true },
          leaders: pitchers.filter((p) => p.inningsPitched >= 20).sort((a, b) => a.era - b.era)
            .map((p) => ({ id: String(p.id), name: p.name, team: p.team, position: "SP", value: p.era, displayValue: p.era.toFixed(2) })),
        },
        {
          config: { name: "On Base", statLabel: "OBP", hotPrefix: "Leading with", coldPrefix: "Low" },
          leaders: batters.filter((b) => b.atBats >= 50).sort((a, b) => b.obp - a.obp)
            .map((b) => ({ id: String(b.id), name: b.name, team: b.team, position: b.pos, value: b.obp, displayValue: b.obp.toFixed(3) })),
        },
      ],
      "mlb"
    )
  } catch {
    return null
  }
}

export default async function MLBTrendsPage() {
  const liveTrends = await getLiveTrends()
  const trends = liveTrends ?? mlbTrends
  const isLive = !!liveTrends
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
                <h1 className="text-lg font-semibold tracking-tight text-foreground">HeatCheck HQ</h1>
                <p className="text-xs text-muted-foreground">MLB Trends</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-end">
            <Link href="/mlb/hitting-stats" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary">
              Hitting Stats
            </Link>
            <Link href="/mlb/nrfi" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary">
              NRFI
            </Link>
            <Link href="/mlb/pitching-stats" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary">
              Pitching Stats
            </Link>
            <Link href="/mlb/weather" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary">
              Weather
            </Link>
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-md">
              Trends
            </span>
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

      <main className="mx-auto max-w-[1440px] px-6 py-8">
        <TrendsDashboard
          trends={trends}
          categories={mlbCategories}
          title="MLB Hot & Cold Trends"
          subtitle="Players on notable streaks based on recent game performance. Identify edges from consistent patterns in hitting, power, pitching, and on-base stats."
          isLive={isLive}
        />
      </main>
    </div>
  )
}
