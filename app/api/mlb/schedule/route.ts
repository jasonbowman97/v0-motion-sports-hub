import { getTodaySchedule, getTeamMap } from "@/lib/mlb-api/client"
import { NextResponse } from "next/server"

export const revalidate = 14400 // 4 hours

export async function GET() {
  try {
    const [games, teamMap] = await Promise.all([getTodaySchedule(), getTeamMap()])

    const enriched = games.map((g) => {
      const away = teamMap.get(g.teams.away.team.id)
      const home = teamMap.get(g.teams.home.team.id)
      return {
        gamePk: g.gamePk,
        gameDate: g.gameDate,
        status: g.status.detailedState,
        away: {
          id: g.teams.away.team.id,
          name: g.teams.away.team.name,
          abbreviation: away?.abbreviation ?? g.teams.away.team.abbreviation ?? "???",
          probablePitcher: g.teams.away.probablePitcher ?? null,
        },
        home: {
          id: g.teams.home.team.id,
          name: g.teams.home.team.name,
          abbreviation: home?.abbreviation ?? g.teams.home.team.abbreviation ?? "???",
          probablePitcher: g.teams.home.probablePitcher ?? null,
        },
        venue: g.venue.name,
        weather: g.weather ?? null,
      }
    })

    return NextResponse.json({ games: enriched, date: new Date().toISOString().split("T")[0] })
  } catch (e) {
    console.error("[MLB Schedule API]", e)
    return NextResponse.json({ games: [], date: new Date().toISOString().split("T")[0], error: "Failed to fetch schedule" }, { status: 500 })
  }
}
