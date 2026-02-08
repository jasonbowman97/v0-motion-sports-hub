export function SocialProof() {
  return (
    <section className="border-y border-border bg-card/50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-16">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground font-mono">12</p>
            <p className="mt-1 text-sm text-muted-foreground">Dashboards live</p>
          </div>
          <div className="hidden h-8 w-px bg-border md:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground font-mono">3</p>
            <p className="mt-1 text-sm text-muted-foreground">Sports covered</p>
          </div>
          <div className="hidden h-8 w-px bg-border md:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground font-mono">100+</p>
            <p className="mt-1 text-sm text-muted-foreground">Metrics tracked</p>
          </div>
          <div className="hidden h-8 w-px bg-border md:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-primary font-mono">Daily</p>
            <p className="mt-1 text-sm text-muted-foreground">Data updates</p>
          </div>
        </div>
      </div>
    </section>
  )
}
