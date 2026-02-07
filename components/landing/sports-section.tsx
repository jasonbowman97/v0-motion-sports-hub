import { Activity, Crosshair, Flame } from "lucide-react"
import Link from "next/link"

const sports = [
  {
    name: "MLB",
    label: "Baseball",
    icon: Activity,
    href: "/mlb/hitting-stats",
    description:
      "Pitcher vs. batter matchups, pitch arsenal breakdowns, exit velocity trends, barrel rates, and NRFI tracking. Filter by handedness, pitch type, and time range.",
    stats: ["Pitching Stats & Arsenal", "Batter vs. Pitcher Matchups", "NRFI Tracking", "Hot & Cold Trends"],
    accentClass: "text-primary bg-primary/10",
  },
  {
    name: "NBA",
    label: "Basketball",
    icon: Crosshair,
    href: "/nba/first-basket",
    description:
      "First basket analysis, tip-off win tracking, team head-to-head breakdowns, defensive matchups, and injury reports. Filter by matchup, time frame, and game slate.",
    stats: ["First Basket Tracking", "Head-to-Head Analysis", "Defense vs Position", "Hot & Cold Trends"],
    accentClass: "text-accent bg-accent/10",
  },
  {
    name: "NFL",
    label: "Football",
    icon: Flame,
    href: "/nfl/matchup",
    description:
      "Head-to-head matchup breakdowns, passing/rushing/receiving splits, team stat comparisons with league rankings, and recent game log trends.",
    stats: ["Team Stat Comparisons", "Positional Breakdowns", "League Rankings", "Hot & Cold Trends"],
    accentClass: "text-primary bg-primary/10",
  },
]

export function SportsSection() {
  return (
    <section id="sports" className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Coverage
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            Three leagues. One platform.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Deep analytics for every sport that matters. Each league gets a
            purpose-built dashboard tailored to its unique data.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {sports.map((sport) => {
            const Wrapper = sport.comingSoon ? "div" : Link
            const wrapperProps = sport.comingSoon ? {} : { href: sport.href }
            return (
              <Wrapper
                key={sport.name}
                {...(wrapperProps as Record<string, string>)}
                className={`group relative flex flex-col rounded-xl border border-border bg-card p-8 transition-colors ${
                  sport.comingSoon
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:border-primary/30"
                }`}
              >
                {sport.comingSoon && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-secondary px-2.5 py-1 rounded-md">
                    Coming soon
                  </span>
                )}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${sport.accentClass}`}>
                    <sport.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{sport.name}</h3>
                    <p className="text-xs text-muted-foreground">{sport.label}</p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                  {sport.description}
                </p>

                <div className="mt-auto flex flex-col gap-2">
                  {sport.stats.map((stat) => (
                    <div
                      key={stat}
                      className="flex items-center gap-2 text-xs text-foreground/80"
                    >
                      <span className="h-1 w-1 rounded-full bg-primary shrink-0" />
                      {stat}
                    </div>
                  ))}
                </div>

                {!sport.comingSoon && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <span className="text-xs font-semibold text-primary group-hover:underline">
                      Explore dashboard
                    </span>
                  </div>
                )}
              </Wrapper>
            )
          })}
        </div>
      </div>
    </section>
  )
}
