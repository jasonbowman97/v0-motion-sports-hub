import { Filter, Layers, LineChart, Shield, Clock, ToggleLeft } from "lucide-react"

const features = [
  {
    icon: Filter,
    title: "Granular Filtering",
    description:
      "Slice data by pitcher hand, batter hand, pitch type, time range, and custom date windows. Deselect low-usage pitches to keep stats clean.",
  },
  {
    icon: LineChart,
    title: "Heatmap Visualization",
    description:
      "Color-coded stat cells make it instant to spot who's hot and who's cold. Red-to-green gradients across every key metric.",
  },
  {
    icon: Layers,
    title: "Matchup Intelligence",
    description:
      "Auto-pulls today's opposing pitcher and their full arsenal. See how every batter on your roster performs against each pitch type.",
  },
  {
    icon: Clock,
    title: "Time-Based Trends",
    description:
      "Compare full-season numbers to last 5, 10, 15, or 30 games. Spot slumps and streaks before the market catches on.",
  },
  {
    icon: ToggleLeft,
    title: "Pitch Threshold Control",
    description:
      "Set a minimum usage percentage and toggle individual pitches on or off. Eliminate small sample noise from your analysis.",
  },
  {
    icon: Shield,
    title: "Platoon Splits",
    description:
      "Filter entire roster by LHH or RHH to see how your lineup stacks up from each side of the plate against any pitcher.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Features
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            Built for analysts, not casual fans
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Every control exists for a reason. Filter, compare, and drill down
            until you find the edge that matters.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
