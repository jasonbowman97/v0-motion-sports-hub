"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { type Player, getHeatmapColor, players } from "@/lib/players-data"
import { ChevronRight } from "lucide-react"

interface PlayersTableProps {
  onSelectPlayer: (player: Player) => void
}

// Get min/max for each stat column for heatmap coloring
function getStatBounds(data: Player[]) {
  const fields = ["slg", "iso", "exitVelo", "barrelPct", "hardHitPct", "flyBallPct"] as const
  const bounds: Record<string, { min: number; max: number }> = {}
  for (const field of fields) {
    const values = data.map((p) => p[field])
    bounds[field] = { min: Math.min(...values), max: Math.max(...values) }
  }
  return bounds
}

export function PlayersTable({ onSelectPlayer }: PlayersTableProps) {
  const bounds = getStatBounds(players)

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border hover:bg-transparent">
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground w-10">
              <span className="sr-only">View Details</span>
            </TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Team</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Player</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">ABs</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">SLG</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">ISO</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">HR</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Balls Launched</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">Exit Velo</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">Barrel %</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">Hard-Hit %</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Fly Ball %</TableHead>
            <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Pulled-Air %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow
              key={player.id}
              className="border-b border-border/50 cursor-pointer hover:bg-secondary/50 transition-colors group"
              onClick={() => onSelectPlayer(player)}
            >
              <TableCell className="py-3">
                <button
                  className="flex items-center justify-center h-7 w-7 rounded-md bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                  aria-label={`View ${player.name} details`}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </TableCell>
              <TableCell className="py-3">
                <span className="text-sm font-medium text-muted-foreground">{player.team}</span>
              </TableCell>
              <TableCell className="py-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{player.name}</span>
                  <span className="text-xs text-muted-foreground">({player.position})</span>
                </div>
              </TableCell>
              <TableCell className="py-3 text-right">
                <span className="text-sm text-muted-foreground font-mono">{player.abs}</span>
              </TableCell>
              <TableCell className="py-3 text-center">
                <span className={`inline-flex items-center justify-center rounded-md px-2.5 py-1 text-xs font-semibold font-mono ${getHeatmapColor(player.slg, bounds.slg.min, bounds.slg.max)}`}>
                  {player.slg.toFixed(3)}
                </span>
              </TableCell>
              <TableCell className="py-3 text-center">
                <span className={`inline-flex items-center justify-center rounded-md px-2.5 py-1 text-xs font-semibold font-mono ${getHeatmapColor(player.iso, bounds.iso.min, bounds.iso.max)}`}>
                  {player.iso.toFixed(3)}
                </span>
              </TableCell>
              <TableCell className="py-3 text-right">
                <span className="text-sm text-foreground font-mono">{player.hr}</span>
              </TableCell>
              <TableCell className="py-3 text-right">
                <span className="text-sm text-muted-foreground font-mono">{player.ballsLaunched}</span>
              </TableCell>
              <TableCell className="py-3 text-center">
                <span className={`inline-flex items-center justify-center rounded-md px-2.5 py-1 text-xs font-semibold font-mono ${getHeatmapColor(player.exitVelo, bounds.exitVelo.min, bounds.exitVelo.max)}`}>
                  {player.exitVelo.toFixed(1)}
                </span>
              </TableCell>
              <TableCell className="py-3 text-center">
                <span className={`inline-flex items-center justify-center rounded-md px-2.5 py-1 text-xs font-semibold font-mono ${getHeatmapColor(player.barrelPct, bounds.barrelPct.min, bounds.barrelPct.max)}`}>
                  {player.barrelPct.toFixed(2)}%
                </span>
              </TableCell>
              <TableCell className="py-3 text-center">
                <span className={`inline-flex items-center justify-center rounded-md px-2.5 py-1 text-xs font-semibold font-mono ${getHeatmapColor(player.hardHitPct, bounds.hardHitPct.min, bounds.hardHitPct.max)}`}>
                  {player.hardHitPct.toFixed(2)}%
                </span>
              </TableCell>
              <TableCell className="py-3 text-right">
                <span className="text-sm text-muted-foreground font-mono">{player.flyBallPct.toFixed(2)}%</span>
              </TableCell>
              <TableCell className="py-3 text-right">
                <span className="text-sm text-muted-foreground font-mono">{player.pulledAirPct.toFixed(0)}%</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
