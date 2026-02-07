import Link from "next/link"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started and explore the data.",
    cta: "Create free account",
    ctaVariant: "outline" as const,
    highlights: [
      { text: "1 sport (MLB, NBA, or NFL)", included: true },
      { text: "Season overview stats", included: true },
      { text: "5 player lookups per day", included: true },
      { text: "Matchup mode", included: false },
      { text: "Pitch arsenal breakdowns", included: false },
      { text: "Custom date ranges", included: false },
      { text: "Platoon & handedness filters", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "Full access for serious analysts.",
    cta: "Start 7-day free trial",
    ctaVariant: "default" as const,
    popular: true,
    highlights: [
      { text: "All 3 sports -- MLB, NBA, NFL", included: true },
      { text: "Unlimited player lookups", included: true },
      { text: "Full matchup intelligence", included: true },
      { text: "Pitch arsenal with toggle control", included: true },
      { text: "Time-range filtering (L5, L10, L30)", included: true },
      { text: "Custom date windows", included: true },
      { text: "Platoon & handedness splits", included: true },
    ],
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Pricing
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground text-balance md:text-4xl">
            Start free. Upgrade when you need more.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            The free tier gives you a real taste of the data. Go Pro when you are
            ready for the full analytical toolkit.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl border p-8 ${
                plan.popular
                  ? "border-primary bg-card shadow-lg shadow-primary/5"
                  : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-primary-foreground">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-8 flex flex-col gap-3">
                {plan.highlights.map((item) => (
                  <div
                    key={item.text}
                    className={`flex items-start gap-3 text-sm ${item.included ? "text-foreground" : "text-muted-foreground/50"}`}
                  >
                    {item.included ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 shrink-0" />
                    )}
                    {item.text}
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-transparent border-border text-foreground hover:bg-secondary"
                  }`}
                  variant={plan.ctaVariant}
                  size="lg"
                  asChild
                >
                  <Link href="/mlb/hitting-stats">{plan.cta}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
