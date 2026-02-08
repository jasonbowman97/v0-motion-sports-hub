import Link from "next/link"
import { BarChart3 } from "lucide-react"
import { TrendsDashboard } from "@/components/trends/trends-dashboard"
import { nflTrends, nflCategories } from "@/lib/nfl-trends-data"
import { getNFLLeaders } from "@/lib/nfl-api"
import { buildTrends } from "@/lib/trends-builder"

export const revalidate = 3600

export const metadata = {
  title: "HeatCheck HQ - NFL Trends",
  description: "Hot and cold streaks for NFL players across passing, rushing, receiving, and touchdowns.",
}

const CATEGORY_MAP: Record<string, { name: string; statLabel: string; hotPrefix: string; coldPrefix: string }> = {
  passingYards: { name: "Passing", statLabel: "Pass YDS", hotPrefix: "Throwing for", coldPrefix: "Only" },
  rushingYards: { name: "Rushing", statLabel: "Rush YDS", hotPrefix: "Running for", coldPrefix: "Just" },
  receivingYards: { name: "Receiving", statLabel: "Rec YDS", hotPrefix: "Racking up", coldPrefix: "Only" },
  totalTouchdowns: { name: "Touchdowns", statLabel: "TD", hotPrefix: "Scoring", coldPrefix: "Just" },
}

async function getLiveTrends() {
  try {
    const espnCategories = await getNFLLeaders()
    if (!espnCategories.length) return null
    const categoryInputs = Object.entries(CATEGORY_MAP)
      .map(([espnName, config]) => {
        const cat = espnCategories.find((c) => c.name === espnName)
        if (!cat) return null
        return {
          config,
          leaders: cat.leaders.slice(0, 15).map((l) => ({
            id: l.athlete.id,
            name: l.athlete.displayName,
            team: l.athlete.team?.abbreviation ?? "???",
            position: l.athlete.position?.abbreviation ?? "??",
            value: l.value,
            displayValue: l.displayValue,
          })),
        }
      })
      .filter(Boolean) as Parameters<typeof buildTrends>[0]
    return buildTrends(categoryInputs, "nfl")
  } catch {
    return null
  }
}

export default async function NFLTrendsPage() {
  const liveTrends = await getLiveTrends()
  const trends = liveTrends ?? nflTrends
  const isLive = !!liveTrends
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
                <h1 className="text-lg font-semibold tracking-tight text-foreground">HeatCheck HQ</h1>
                <p className="text-xs text-muted-foreground">NFL Trends</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-end">
            <Link href="/mlb/hitting-stats" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary">
              MLB
            </Link>
            <Link href="/nba/first-basket" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary">
              NBA
            </Link>
            <div className="hidden sm:block h-5 w-px bg-border mx-1" />
            <Link href="/nfl/matchup" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary">
              Matchup
            </Link>
            <Link href="/nfl/redzone" className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md hover:bg-secondary">
              Redzone
            </Link>
            <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-md">
              Trends
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-6 py-8">
        <TrendsDashboard
          trends={trends}
          categories={nflCategories}
          title="NFL Hot & Cold Trends"
          subtitle="Players on notable streaks based on recent game performance. Find edges in passing yards, rushing production, receiving consistency, and touchdown scoring."
          isLive={isLive}
        />
      </main>
    </div>
  )
}
