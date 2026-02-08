import { getPitchingLeaders } from "@/lib/mlb-api"
import { NextResponse } from "next/server"

export const runtime = 'nodejs'
export const revalidate = 86400

export async function GET() {
  try {
    const leaders = await getPitchingLeaders()
    return NextResponse.json({ leaders })
  } catch (e) {
    console.error("[MLB Pitching API]", e)
    return NextResponse.json({ leaders: [] })
  }
}
