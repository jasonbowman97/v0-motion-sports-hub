"use client"

import type { PassingPlayer, RushingPlayer, ReceivingPlayer, GameLogEntry } from "@/lib/nfl-matchup-data"

function GameLogChips({ logs, label }: { logs: GameLogEntry[]; label: "TDs" | "Att" | "Rec" }) {
  if (logs.length === 0) {
    return <span className="text-xs text-muted-foreground/50">--</span>
  }
  return (
    <div className="flex flex-wrap gap-1">
      {logs.map((log, i) => {
        const isHigh = label === "TDs" ? log.secondary >= 2 : log.yards >= 80
        return (
          <span
            key={i}
            className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-mono tabular-nums ${
              isHigh
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {log.yards}
            <span className="text-muted-foreground/60">({log.secondary})</span>
          </span>
        )
      })}
    </div>
  )
}

interface SideBySideProps {
  awayTeam: string
  homeTeam: string
}

// Passing Table
export function PassingSection({
  awayPlayers,
  homePlayers,
  awayTeam,
  homeTeam,
}: SideBySideProps & { awayPlayers: PassingPlayer[]; homePlayers: PassingPlayer[] }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-base font-bold text-foreground">Passing</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
        {/* Away side */}
        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{awayTeam}</p>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-[1fr_80px_70px_auto] gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2">
              <span>Player</span>
              <span className="text-right">Yds/G</span>
              <span className="text-right">TDs/G</span>
              <span>Game Logs — Yds (TDs)</span>
            </div>
            {awayPlayers.map((p) => (
              <div key={p.name} className="grid grid-cols-[1fr_80px_70px_auto] gap-2 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground truncate">{p.name}</span>
                  <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{p.position}</span>
                </div>
                <span className="text-sm font-mono tabular-nums text-right text-foreground">{p.yardsPerGame.toFixed(1)}</span>
                <span className="text-sm font-mono tabular-nums text-right text-foreground">{p.tdsPerGame.toFixed(1)}</span>
                <GameLogChips logs={p.gameLogs} label="TDs" />
              </div>
            ))}
          </div>
        </div>
        {/* Home side */}
        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{homeTeam}</p>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-[1fr_80px_70px_auto] gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2">
              <span>Player</span>
              <span className="text-right">Yds/G</span>
              <span className="text-right">TDs/G</span>
              <span>Game Logs — Yds (TDs)</span>
            </div>
            {homePlayers.map((p) => (
              <div key={p.name} className="grid grid-cols-[1fr_80px_70px_auto] gap-2 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground truncate">{p.name}</span>
                  <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{p.position}</span>
                </div>
                <span className="text-sm font-mono tabular-nums text-right text-foreground">{p.yardsPerGame.toFixed(1)}</span>
                <span className="text-sm font-mono tabular-nums text-right text-foreground">{p.tdsPerGame.toFixed(1)}</span>
                <GameLogChips logs={p.gameLogs} label="TDs" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Rushing Table
export function RushingSection({
  awayPlayers,
  homePlayers,
  awayTeam,
  homeTeam,
}: SideBySideProps & { awayPlayers: RushingPlayer[]; homePlayers: RushingPlayer[] }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-base font-bold text-foreground">Rushing</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{awayTeam}</p>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-[1fr_80px_70px_auto] gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2">
              <span>Player</span>
              <span className="text-right">Yds/G</span>
              <span className="text-right">Att/G</span>
              <span>Game Logs — Yds (Att)</span>
            </div>
            {awayPlayers.map((p) => (
              <div key={p.name} className="grid grid-cols-[1fr_80px_70px_auto] gap-2 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground truncate">{p.name}</span>
                  <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{p.position}</span>
                </div>
                <span className="text-sm font-mono tabular-nums text-right text-foreground">{p.yardsPerGame.toFixed(1)}</span>
                <span className="text-sm font-mono tabular-nums text-right text-foreground">{p.attemptsPerGame.toFixed(1)}</span>
                <GameLogChips logs={p.gameLogs} label="Att" />
              </div>
            ))}
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{homeTeam}</p>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-[1fr_80px_70px_auto] gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2">
              <span>Player</span>
              <span className="text-right">Yds/G</span>
              <span className="text-right">Att/G</span>
              <span>Game Logs — Yds (Att)</span>
            </div>
            {homePlayers.map((p) => (
              <div key={p.name} className="grid grid-cols-[1fr_80px_70px_auto] gap-2 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground truncate">{p.name}</span>
                  <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{p.position}</span>
                </div>
                <span className="text-sm font-mono tabular-nums text-right text-foreground">{p.yardsPerGame.toFixed(1)}</span>
                <span className="text-sm font-mono tabular-nums text-right text-foreground">{p.attemptsPerGame.toFixed(1)}</span>
                <GameLogChips logs={p.gameLogs} label="Att" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Receiving Table
export function ReceivingSection({
  awayPlayers,
  homePlayers,
  awayTeam,
  homeTeam,
}: SideBySideProps & { awayPlayers: ReceivingPlayer[]; homePlayers: ReceivingPlayer[] }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-6 py-4 border-b border-border">
        <h3 className="text-base font-bold text-foreground">Receiving</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{awayTeam}</p>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-[1fr_80px_70px_auto] gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2">
              <span>Player</span>
              <span className="text-right">Yds/G</span>
              <span className="text-right">Tgts/G</span>
              <span>Game Logs — Yds (Rec)</span>
            </div>
            {awayPlayers.map((p) => (
              <div key={p.name} className="grid grid-cols-[1fr_80px_70px_auto] gap-2 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground truncate">{p.name}</span>
                  <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{p.position}</span>
                </div>
                <span className="text-sm font-mono tabular-nums text-right text-foreground">{p.yardsPerGame.toFixed(1)}</span>
                <span className="text-sm font-mono tabular-nums text-right text-foreground">{p.targetsPerGame.toFixed(1)}</span>
                <GameLogChips logs={p.gameLogs} label="Rec" />
              </div>
            ))}
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{homeTeam}</p>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-[1fr_80px_70px_auto] gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2">
              <span>Player</span>
              <span className="text-right">Yds/G</span>
              <span className="text-right">Tgts/G</span>
              <span>Game Logs — Yds (Rec)</span>
            </div>
            {homePlayers.map((p) => (
              <div key={p.name} className="grid grid-cols-[1fr_80px_70px_auto] gap-2 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground truncate">{p.name}</span>
                  <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{p.position}</span>
                </div>
                <span className="text-sm font-mono tabular-nums text-right text-foreground">{p.yardsPerGame.toFixed(1)}</span>
                <span className="text-sm font-mono tabular-nums text-right text-foreground">{p.targetsPerGame.toFixed(1)}</span>
                <GameLogChips logs={p.gameLogs} label="Rec" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
