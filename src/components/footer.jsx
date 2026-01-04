


export default function Footer() {
  return (
    <footer className="w-full bg-primary text-secondary border-t border-secondary/10">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-secondary/70">
        &copy; {new Date().getFullYear()} My E-commerce Site. All rights reserved.
      </div>
    </footer>
  );
}