import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const slogans = useMemo(
    () => [
      "Your one-stop solution for all your computing needs.",
      "Gaming rigs. Workstations. Everyday PCs.",
      "Best performance. Best value. Reliable local support.",
      "Build it. Fix it. Boost it — Eranda Computers.",
    ],
    []
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slogans.length);
    }, 2500);
    return () => clearInterval(id);
  }, [slogans.length]);

  return (
    <main className="w-full">
      {/* HERO */}
      <section
        className="
          relative w-full
          min-h-[calc(100vh-76px)]
          bg-[url('/home.jpg')] bg-cover bg-center
        "
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Trusted Computer Shop • Sales • Repairs • Upgrades
          </div>

          {/* Title */}
          <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            SL Technologies
            <span className="block text-white/80">
              Modern PCs, parts, and expert support.
            </span>
          </h1>

          {/* Animated slogan */}
          <div className="mt-4 max-w-2xl">
            <p className="text-base leading-relaxed text-white/80 sm:text-lg">
              <span className="mr-2 text-white/60">Slogan:</span>
              <span
                key={index}
                className="inline-block animate-[fadeUp_450ms_ease-out] font-medium text-white"
              >
                {slogans[index]}
              </span>
            </p>

            <div className="mt-3 flex items-center gap-2">
              {slogans.map((_, i) => (
                <span
                  key={i}
                  className={[
                    "h-1.5 w-6 rounded-full transition-all duration-300",
                    i === index ? "bg-emerald-400" : "bg-white/20",
                  ].join(" ")}
                />
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/products"
              className="
                inline-flex items-center justify-center rounded-xl
                bg-emerald-500 px-5 py-3 text-sm font-semibold text-black
                shadow-lg shadow-emerald-500/20
                transition hover:bg-emerald-400 active:scale-[0.99]
              "
            >
              Shop Products
            </Link>

            <Link
              to="/contact"
              className="
                inline-flex items-center justify-center rounded-xl
                border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white
                backdrop-blur transition
                hover:bg-white/10 active:scale-[0.99]
              "
            >
              Get a Quote / Contact
            </Link>
          </div>

          {/* NEW: Quick stats (details) */}
          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {[
              { k: "Fast Service", v: "Quick diagnostics & clear pricing" },
              { k: "Quality Builds", v: "Budget to high-end configurations" },
              { k: "After-Sales", v: "Friendly support & guidance" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <p className="text-sm font-semibold text-white">{s.k}</p>
                <p className="mt-1 text-sm text-white/70">{s.v}</p>
              </div>
            ))}
          </div>

          {/* Quick highlights */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              { title: "Custom Builds", desc: "Gaming & productivity PCs tailored to your budget." },
              { title: "Repairs & Upgrades", desc: "Fast diagnostics, SSD/RAM upgrades, cleaning." },
              { title: "Genuine Parts", desc: "GPUs, CPUs, monitors, accessories & more." },
            ].map((card) => (
              <div
                key={card.title}
                className="
                  rounded-2xl border border-white/10 bg-white/5 p-5
                  backdrop-blur
                  transition hover:bg-white/10
                "
              >
                <h3 className="text-base font-semibold text-white">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative bottom fade (slightly smaller to reduce “gap feeling”) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/70 to-transparent" />
      </section>

      {/* CONTENT SECTIONS */}
      <section className="bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
          {/* Category cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: "Laptops & Desktops", desc: "Everyday machines to premium performance." },
              { title: "Gaming Gear", desc: "GPUs, monitors, keyboards, headsets." },
              { title: "Office & Networking", desc: "Routers, printers, UPS, accessories." },
            ].map((c) => (
              <div
                key={c.title}
                className="
                  group rounded-2xl border border-white/10 bg-zinc-900/40 p-6
                  transition hover:border-emerald-500/40 hover:bg-zinc-900/60
                "
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{c.title}</h3>
                    <p className="mt-2 text-sm text-white/70">{c.desc}</p>
                  </div>
                  <div
                    className="
                      h-10 w-10 shrink-0 rounded-xl border border-white/10
                      bg-white/5 transition group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10
                    "
                  />
                </div>
              </div>
            ))}
          </div>

          {/* NEW: Services list (more details) */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-semibold text-white">What we do</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>• New PC builds (Gaming / Work / Office)</li>
                <li>• Laptop & desktop repairs</li>
                <li>• SSD/RAM upgrades + OS installations</li>
                <li>• Cleaning & thermal paste service</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
              <h3 className="text-lg font-semibold text-white">How it works</h3>
              <ol className="mt-3 space-y-2 text-sm text-white/70">
                <li>1) Tell us your need/budget</li>
                <li>2) We recommend parts/options</li>
                <li>3) Build/repair + testing</li>
                <li>4) Pickup / delivery + support</li>
              </ol>
            </div>
          </div>

          {/* CTA strip */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-500/10 via-white/5 to-sky-500/10 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Need help choosing parts?
                </h3>
                <p className="mt-1 text-sm text-white/70">
                  Tell us your budget and we’ll recommend the best build.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/products"
                  className="
                    inline-flex items-center justify-center rounded-xl
                    bg-white px-5 py-3 text-sm font-semibold text-zinc-950
                    transition hover:bg-white/90
                  "
                >
                  Browse Products
                </Link>
                <Link
                  to="/contact"
                  className="
                    inline-flex items-center justify-center rounded-xl
                    border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white
                    transition hover:bg-white/10
                  "
                >
                  Talk to an Expert
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(8px); filter: blur(2px); }
            to { opacity: 1; transform: translateY(0); filter: blur(0); }
          }
        `}
      </style>
    </main>
  );
}