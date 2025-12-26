export default function About() {
  return (
    <main className="w-full bg-primary text-secondary">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-accent">About Us</h1>

        <p className="text-lg leading-relaxed text-secondary/80 mb-6">
          <span className="font-semibold">SL Computers</span> is a trusted
          computer solutions provider specializing in custom PC builds, repairs,
          upgrades, and genuine computer accessories.
        </p>

        <div className="grid gap-6 md:grid-cols-3 mt-10">
          {[
            {
              title: "Our Mission",
              desc: "Deliver reliable and affordable computer solutions tailored to every customer.",
            },
            {
              title: "Our Vision",
              desc: "Become the most trusted local tech partner for individuals and businesses.",
            },
            {
              title: "Why Choose Us",
              desc: "Expert advice, quality parts, fair pricing, and honest after-sales support.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-secondary/10 p-6 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-secondary/70 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
