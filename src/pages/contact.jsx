import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const TO_EMAIL = "madumaleranda123@gmail.com";

  function buildEmailBody() {
    return (
      `Hi SL Computers,\n\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n\n` +
      `Message:\n${form.message}\n`
    );
  }

  function buildMailtoLink() {
    const subject = `SL Computers Inquiry - ${form.name || "Customer"}`;
    const body = buildEmailBody();
    return `mailto:${TO_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  function buildGmailLink() {
    const subject = `SL Computers Inquiry - ${form.name || "Customer"}`;
    const body = buildEmailBody();

    // Works in browser without needing a mail app configured
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      TO_EMAIL
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function handleSubmit(e) {
    e.preventDefault();

    // ✅ Easy way: open Gmail compose with filled details
    window.open(buildGmailLink(), "_blank", "noopener,noreferrer");

    toast.success("Opening email compose…");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <main className="w-full bg-primary text-secondary">
      <section className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/10 bg-white/5 px-4 py-2 text-xs font-medium text-secondary/70">
            Quotes • Repairs • Custom Builds • Support
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-accent sm:text-5xl">
            Contact Us
          </h1>

          <p className="mt-4 max-w-3xl text-secondary/80 leading-relaxed">
            Need a quotation, custom PC build, or technical support? Send us a
            message and we’ll get back to you as soon as possible. For faster
            replies, WhatsApp is recommended.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Info */}
          <div className="space-y-6">
            {/* Contact cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-secondary/10 bg-white/5 p-5 shadow-sm">
                <p className="text-sm font-semibold text-secondary">Location</p>
                <p className="mt-1 text-sm text-secondary/70">Sri Lanka</p>
              </div>

              <div className="rounded-2xl border border-secondary/10 bg-white/5 p-5 shadow-sm">
                <p className="text-sm font-semibold text-secondary">Hours</p>
                <p className="mt-1 text-sm text-secondary/70">
                  Mon–Sat • 9:00 AM – 7:00 PM
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-secondary/10 bg-white/5 p-6 shadow-sm">
              <p className="text-base font-semibold text-secondary">
                Reach us directly
              </p>

              <ul className="mt-4 space-y-3 text-sm text-secondary/80">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5">📞</span>
                  <div>
                    <p className="font-semibold text-secondary">Phone</p>
                    <a
                      className="text-secondary/75 hover:text-accent transition-colors"
                      href="tel:+9471123456"
                    >
                      +94 71 123 456
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-0.5">💬</span>
                  <div>
                    <p className="font-semibold text-secondary">WhatsApp</p>
                    <a
                      className="text-secondary/75 hover:text-accent transition-colors"
                      href="https://wa.me/9471123456?text=Hello%20SL%20Computers!%20I%20need%20a%20quotation%20/%20support."
                      target="_blank"
                      rel="noreferrer"
                    >
                      Chat on WhatsApp
                    </a>
                    <p className="text-xs text-secondary/60 mt-1">
                      Fastest response (recommended)
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-0.5">📧</span>
                  <div>
                    <p className="font-semibold text-secondary">Email</p>

                    {/* ✅ Mail app (may fail if no mail client configured) */}
                    <a
                      className="text-secondary/75 hover:text-accent transition-colors break-all"
                      href={buildMailtoLink()}
                    >
                      {TO_EMAIL}
                    </a>

                    <p className="text-xs text-secondary/60 mt-1">
                      If mail app doesn’t open, use “Email Us (Gmail)” below.
                    </p>
                  </div>
                </li>
              </ul>

              {/* Quick actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://wa.me/9471123456?text=Hello%20SL%20Computers!%20I%20need%20a%20quotation%20/%20support."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-400"
                >
                  WhatsApp Now
                </a>

                {/* ✅ Always works in browser (Gmail) */}
                <a
                  href={buildGmailLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-secondary/15 bg-white/5 px-5 py-3 text-sm font-semibold text-secondary transition hover:bg-white/10"
                >
                  Email Us (Gmail)
                </a>
              </div>
            </div>

            {/* Note box */}
            <div className="rounded-2xl border border-secondary/10 bg-gradient-to-r from-accent/10 via-white/5 to-secondary/10 p-6 shadow-sm">
              <p className="text-sm font-semibold text-secondary">Tip</p>
              <p className="mt-2 text-sm text-secondary/70 leading-relaxed">
                When requesting a quotation, include your budget and usage (Gaming / Office /
                Design) to get the best recommendations.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-secondary/10 bg-white/5 p-6 space-y-4 shadow-sm"
          >
            <div>
              <label className="block text-sm font-semibold text-secondary mb-2">
                Your Name
              </label>
              <input
                required
                placeholder="Your Name"
                className="w-full rounded-xl border border-secondary/20 bg-primary/40 px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary mb-2">
                Email Address
              </label>
              <input
                required
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-secondary/20 bg-primary/40 px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <p className="mt-2 text-xs text-secondary/60">
                We’ll only use your email to reply to your message.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary mb-2">
                Message
              </label>
              <textarea
                required
                rows="5"
                placeholder="Tell us what you need (budget, usage, preferred parts, etc.)"
                className="w-full rounded-xl border border-secondary/20 bg-primary/40 px-4 py-3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-accent text-white py-3 font-semibold hover:bg-accent/90 transition shadow-sm active:scale-[0.99]"
            >
              Send Message
            </button>

            <p className="text-center text-xs text-secondary/60">
              When you click Submit, the Gmail compose window opens and the details are auto-filled.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}