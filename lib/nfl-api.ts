/**
 * NFL data via ESPN public API.
 * No API key required.
 * Base: https://site.api.espn.com/apis/site/v2/sports/football/nfl
 */

const BASE = "https://site.api.espn.com/apis/site/v2/sports/football/nfl"

async function espnFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 86400 } })
  if (!res.ok) throw new Error(`ESPN NFL ${res.status}: ${path}`)
  return res.json() as Promise<T>
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface NFLScheduleGame {
  id: string
  date: string
  name: string
  shortName: string
  week: string
  awayTeam: { id: string; abbreviation: string; displayName: string; logo: string; score?: string }
  homeTeam: { id: string; abbreviation: string; displayName: string; logo: string; score?: string }
  status: string
  venue: string
  broadcast: string
  odds?: { details: string; overUnder: number }
}

export interface NFLTeamRecord {
  id: string
  abbreviation: string
  displayName: string
  wins: number
  losses: number
  logo: string
}

/* ------------------------------------------------------------------ */
/*  Scoreboard / Schedule                                              */
/* ------------------------------------------------------------------ */

export async function getNFLScoreboard(week?: number, year?: number): Promise<NFLScheduleGame[]> {
  const params = new URLSearchParams()
  if (week) params.set("week", String(week))
  if (year) params.set("seasontype", "2") // regular season
  const qs = params.toString() ? `?${params.toString()}` : ""
  const raw = await espnFetch<ESPNScoreboard>(`/scoreboard${qs}`)
  return (raw.events ?? []).map((ev) => {
    const away = ev.competitions[0]?.competitors?.find((c: ESPNCompetitor) => c.homeAway === "away")
    const home = ev.competitions[0]?.competitors?.find((c: ESPNCompetitor) => c.homeAway === "home")
    const odds = ev.competitions[0]?.odds?.[0]
    return {
      id: ev.id,
      date: ev.date,
      name: ev.name,
      shortName: ev.shortName,
      week: ev.week?.text ?? raw.week?.text ?? "",
      awayTeam: {
        id: away?.team?.id ?? "",
        abbreviation: away?.team?.abbreviation ?? "???",
        displayName: away?.team?.displayName ?? "Unknown",
        logo: away?.team?.logo ?? "",
        score: away?.score,
      },
      homeTeam: {
        id: home?.team?.id ?? "",
        abbreviation: home?.team?.abbreviation ?? "???",
        displayName: home?.team?.displayName ?? "Unknown",
        logo: home?.team?.logo ?? "",
        score: home?.score,
      },
      status: ev.status?.type?.description ?? "Scheduled",
      venue: ev.competitions[0]?.venue?.fullName ?? "",
      broadcast: ev.competitions[0]?.broadcasts?.[0]?.names?.[0] ?? "",
      odds: odds ? { details: odds.details ?? "", overUnder: odds.overUnder ?? 0 } : undefined,
    }
  })
}

/* ------------------------------------------------------------------ */
/*  Teams                                                              */
/* ------------------------------------------------------------------ */

export async function getNFLTeams(): Promise<NFLTeamRecord[]> {
  const raw = await espnFetch<{ sports: { leagues: { teams: { team: ESPNTeam }[] }[] }[] }>(
    "/teams"
  )
  const teams = raw.sports?.[0]?.leagues?.[0]?.teams ?? []
  return teams.map((t) => ({
    id: t.team.id,
    abbreviation: t.team.abbreviation,
    displayName: t.team.displayName,
    wins: Number(t.team.record?.items?.[0]?.stats?.find((s: { name: string }) => s.name === "wins")?.value ?? 0),
    losses: Number(t.team.record?.items?.[0]?.stats?.find((s: { name: string }) => s.name === "losses")?.value ?? 0),
    logo: t.team.logos?.[0]?.href ?? "",
  }))
}

/* ------------------------------------------------------------------ */
/*  ESPN response shapes (internal)                                    */
/* ------------------------------------------------------------------ */

interface ESPNCompetitor {
  homeAway: string
  team: { id: string; abbreviation: string; displayName: string; logo: string }
  score?: string
}

interface ESPNScoreboard {
  events: {
    id: string
    date: string
    name: string
    shortName: string
    week?: { text: string }
    status: { type: { description: string } }
    competitions: {
      competitors: ESPNCompetitor[]
      venue?: { fullName: string }
      broadcasts?: { names: string[] }[]
      odds?: { details?: string; overUnder?: number }[]
    }[]
  }[]
  week?: { text: string }
}

interface ESPNTeam {
  id: string
  abbreviation: string
  displayName: string
  logos?: { href: string }[]
  record?: { items: { stats: { name: string; value: number }[] }[] }
}
