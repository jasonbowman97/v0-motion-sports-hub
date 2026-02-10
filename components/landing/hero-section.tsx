import Link from "next/link"
import { ArrowRight, Activity, Crosshair, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/ui/fade-in"

const dashboardPreviews = [
  {
    sport: "MLB",
    label: "NRFI",
    icon: Activity,
    description: "No Run First Inning probabilities, pitcher matchups, and streak data.",
    href: "/mlb/nrfi",
    accentClass: "text-primary bg-primary/10",
  },
  {
    sport: "NBA",
    label: "First Basket",
    icon: Crosshair,
    description: "Tip-off win rates, first shot percentages, and player rankings.",
    href: "/nba/first-basket",
    accentClass: "text-accent bg-accent/10",
  },
  {
    sport: "NFL",
    label: "Matchup",
    icon: Flame,
    description: "Side-by-side team stats, positional splits, and game log trends.",
    href: "/nfl/matchup",
    accentClass: "text-primary bg-primary/10",
  },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <FadeIn delay={0.1}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground">
                Data-driven insights across MLB, NBA, and NFL
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-foreground text-balance md:text-6xl lg:text-7xl">
              Find the trends{" "}
              <span className="text-primary">that matter</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">
              Data-driven insight tools to help you spot sports trends across
              MLB, NBA, and NFL -- updated daily and built for smarter decisions.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base" asChild>
                <Link href="/mlb/hitting-stats">
                  Explore dashboards
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent h-12 px-8 text-base border-border text-foreground hover:bg-secondary" asChild>
                <Link href="#pricing">View pricing</Link>
              </Button>
            </div>
          </FadeIn>

          {/* Three preview cards */}
          <div className="mt-20 w-full grid gap-5 md:grid-cols-3">
            {dashboardPreviews.map((preview, index) => (
              <FadeIn key={preview.label} delay={0.5 + index * 0.1}>
                <Link
                  href={preview.href}
                  className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${preview.accentClass}`}>
                      <preview.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        {preview.sport}
                      </span>
                      <p className="text-sm font-semibold text-foreground">{preview.label}</p>
                    </div>
                    <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {preview.description}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
