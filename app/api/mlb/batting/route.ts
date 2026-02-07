import { getBattingLeaders, getTeamMap } from "@/lib/mlb-api/client"
import { NextResponse } from "next/server"

export const revalidate = 14400 // 4 hours

export async function GET() {
  try {
    const [leaders, teamMap] = await Promise.all([getBattingLeaders(), getTeamMap()])

    const enriched = leaders.map((l) => {
      const team = teamMap.get(l.teamId)
      return { ...l, teamAbbr: team?.abbreviation ?? "???" }
    })

    return NextResponse.json({ leaders: enriched })
  } catch (e) {
    console.error("[MLB Batting API]", e)
    return NextResponse.json({ leaders: [], error: "Failed to fetch batting leaders" }, { status: 500 })
  }
}
