export function SocialProof() {
  return (
    <section className="border-y border-border bg-card/50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-16">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">2,400+</p>
            <p className="mt-1 text-sm text-muted-foreground">Active analysts</p>
          </div>
          <div className="hidden h-8 w-px bg-border md:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">1.2M</p>
            <p className="mt-1 text-sm text-muted-foreground">Data points processed daily</p>
          </div>
          <div className="hidden h-8 w-px bg-border md:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">98%</p>
            <p className="mt-1 text-sm text-muted-foreground">Data accuracy rate</p>
          </div>
          <div className="hidden h-8 w-px bg-border md:block" />
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">4.9/5</p>
            <p className="mt-1 text-sm text-muted-foreground">User satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  )
}
