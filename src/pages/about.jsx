export default function About() {
  return (
    <main className="w-full bg-primary text-secondary">
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/10 bg-white/5 px-4 py-2 text-xs font-medium text-secondary/70">
            Trusted • Sales • Repairs • Upgrades
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-accent sm:text-5xl">
            About Us
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-secondary/80">
            <span className="font-semibold text-secondary">SL Computers</span> is
            a trusted computer solutions provider specializing in custom PC
            builds, repairs, upgrades, and genuine computer accessories. We
            focus on practical advice, quality parts, and clean workmanship—so
            you get a setup that performs well and lasts.
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: "Custom Builds", desc: "Gaming • Office • Workstations" },
            { title: "Repairs & Upgrades", desc: "SSD/RAM • Cleaning • OS setup" },
            { title: "Genuine Parts", desc: "CPUs • GPUs • Monitors • Accessories" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-secondary/10 bg-white/5 p-5 shadow-sm transition hover:bg-white/10"
            >
              <h3 className="text-base font-semibold text-secondary">
                {item.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-secondary/70">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Main cards */}
        <div className="grid gap-6 md:grid-cols-3 mt-10">
          {[
            {
              title: "Our Mission",
              desc: "Deliver reliable and affordable computer solutions tailored to every customer—without confusing jargon.",
            },
            {
              title: "Our Vision",
              desc: "Become the most trusted local tech partner for individuals and businesses through consistent service quality.",
            },
            {
              title: "Why Choose Us",
              desc: "Expert advice, quality parts, fair pricing, and honest after-sales support you can rely on.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-secondary/10 bg-white/5 p-6 shadow-sm hover:shadow-md transition hover:bg-white/10"
            >
              <h3 className="text-xl font-semibold mb-2 text-secondary">
                {item.title}
              </h3>
              <p className="text-secondary/70 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Details sections */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-secondary/10 bg-white/5 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-secondary">
              What we can help you with
            </h2>

            <ul className="mt-4 space-y-2 text-sm text-secondary/75">
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/80" />
                Custom PC builds based on your budget and needs
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/80" />
                Troubleshooting, repairs, and performance tuning
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/80" />
                SSD / RAM upgrades and OS installations
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/80" />
                Cleaning & thermal paste service for better cooling
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent/80" />
                Accessories: keyboards, mice, headsets, monitors, and more
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-secondary/10 bg-white/5 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-secondary">
              Our service promise
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                { title: "Transparent Pricing", desc: "No hidden charges—clear estimates first." },
                { title: "Quality Parts", desc: "Genuine components with proper guidance." },
                { title: "Neat Work", desc: "Clean builds, cable management, tested delivery." },
                { title: "After-Sales Support", desc: "Help when you need it—no excuses." },
              ].map((p) => (
                <div
                  key={p.title}
                  className="rounded-xl border border-secondary/10 bg-primary/40 p-4"
                >
                  <p className="font-semibold text-secondary">{p.title}</p>
                  <p className="mt-1 text-sm text-secondary/70 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-secondary/10 bg-gradient-to-r from-accent/15 via-white/5 to-secondary/10 p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-secondary">
                Need a build recommendation or a repair quote?
              </h3>
              <p className="mt-1 text-sm text-secondary/70">
                Share your budget and requirements—we’ll suggest the best options.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/products"
                className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-primary transition hover:bg-accent/90"
              >
                Browse Products
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-secondary/15 bg-white/5 px-5 py-3 text-sm font-semibold text-secondary transition hover:bg-white/10"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}