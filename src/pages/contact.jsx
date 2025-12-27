import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <main className="w-full bg-primary text-secondary">
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-accent">Contact Us</h1>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Info */}
          <div>
            <p className="text-secondary/80 leading-relaxed mb-6">
              Need a quotation, custom PC build, or technical support?
              Send us a message and we’ll get back to you as soon as possible.
            </p>

            <ul className="space-y-3 text-sm">
              <li><strong>📍 Location:</strong> Sri Lanka</li>
              <li><strong>📞 Phone:</strong> +94 71 123 456</li>
              <li><strong>📧 Email:</strong> madumaleranda123@gmail.com</li>
            </ul>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-secondary/10 p-6 space-y-4"
          >
            <input
              required
              placeholder="Your Name"
              className="w-full rounded-xl border border-secondary/20 px-4 py-3 outline-none focus:border-accent"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              required
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl border border-secondary/20 px-4 py-3 outline-none focus:border-accent"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <textarea
              required
              rows="4"
              placeholder="Your Message"
              className="w-full rounded-xl border border-secondary/20 px-4 py-3 outline-none focus:border-accent"
              value={form.message}
              onChange={(e) =>
                setForm({ ...form, message: e.target.value })
              }
            />

            <button
              type="submit"
              className="w-full rounded-xl bg-accent text-white py-3 font-semibold hover:bg-accent/90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
