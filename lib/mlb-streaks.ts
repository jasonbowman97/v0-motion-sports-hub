/**
 * MLB Streak Detection
 * Fetches player leaders and analyzes their game logs to find active streaks.
 */
import "server-only"

import { getMLBBattingLeaders, getMLBPitchingLeaders, getPlayerGameLog } from "./espn/mlb"
import { detectHittingStreaks, detectPitchingStreaks, type StreakResult } from "./streak-detector"
import type { Trend } from "./trends-types"

/**
 * Fetch MLB trends based on active player streaks (not just season totals)
 * This analyzes recent game logs to find hot/cold performers.
 */
export async function getMLBStreakTrends(): Promise<Trend[]> {
  try {
    const [batters, pitchers] = await Promise.all([
      getMLBBattingLeaders(),
      getMLBPitchingLeaders(),
    ])

    const allStreaks: StreakResult[] = []

    // Analyze top 30 batters for streaks
    const topBatters = batters.slice(0, 30)
    for (const batter of topBatters) {
      try {
        const gameLogs = await getPlayerGameLog(batter.id)
        if (gameLogs.length < 5) continue // Need at least 5 games

        const streaks = detectHittingStreaks(
          batter.id,
          batter.name,
          batter.team,
          batter.position,
          gameLogs
        )
        allStreaks.push(...streaks)
      } catch (err) {
        console.error(`[MLB Streaks] Failed to fetch game log for ${batter.name}:`, err)
      }
    }

    // Analyze top 20 pitchers for streaks
    const topPitchers = pitchers.slice(0, 20)
    for (const pitcher of topPitchers) {
      try {
        const gameLogs = await getPlayerGameLog(pitcher.id)
        if (gameLogs.length < 3) continue // Need at least 3 games

        const streaks = detectPitchingStreaks(
          pitcher.id,
          pitcher.name,
          pitcher.team,
          "SP",
          gameLogs
        )
        allStreaks.push(...streaks)
      } catch (err) {
        console.error(`[MLB Streaks] Failed to fetch game log for ${pitcher.name}:`, err)
      }
    }

    // Convert streak results to Trend format
    const trends: Trend[] = allStreaks.map((streak, idx) => ({
      id: `mlb-streak-${idx}`,
      playerName: streak.playerName,
      team: streak.team,
      position: streak.position,
      type: streak.streakType,
      category: streak.category,
      headline: streak.streakDescription,
      detail: generateDetail(streak),
      streakLength: streak.currentStreak,
      streakLabel: "Recent games",
      recentGames: streak.recentGames,
      statValue: String(streak.statValue),
      statLabel: streak.statLabel,
    }))

    // Sort: Hot streaks first (by streak length), then cold streaks
    const hotTrends = trends.filter((t) => t.type === "hot").sort((a, b) => b.streakLength - a.streakLength)
    const coldTrends = trends.filter((t) => t.type === "cold").sort((a, b) => b.streakLength - a.streakLength)

    // Return top 12 hot + top 6 cold
    return [...hotTrends.slice(0, 12), ...coldTrends.slice(0, 6)]
  } catch (err) {
    console.error("[MLB Streaks] Failed to generate trends:", err)
    return []
  }
}

function generateDetail(streak: StreakResult): string {
  if (streak.streakType === "hot") {
    if (streak.category === "Hitting") {
      return `Consistently getting on base with hits in ${streak.streakDescription}. Strong recent form at the plate.`
    }
    if (streak.category === "Power Hitting" || streak.category === "Power") {
      return `Locked in with power numbers. ${streak.streakDescription} shows elite bat speed and contact.`
    }
    if (streak.category === "Pitching") {
      return `Dominant pitching performance with ${streak.streakDescription}. Locked in on the mound.`
    }
    if (streak.category === "Strikeouts") {
      return `Elite strikeout numbers with ${streak.streakDescription}. Overpowering opposing batters.`
    }
  } else {
    if (streak.category === "Hitting") {
      return `Struggling at the plate with ${streak.streakDescription}. Cold stretch continues.`
    }
    if (streak.category === "Pitching") {
      return `Rough stretch on the mound. ${streak.streakDescription} indicates loss of command.`
    }
  }
  return `Notable trend: ${streak.streakDescription}.`
}
