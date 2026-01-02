export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 backdrop-blur-sm">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-2xl">
        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-full border-4 border-white/70 border-t-transparent animate-spin" />
          <p className="text-sm font-semibold text-white/90">Loading...</p>
          <p className="text-xs text-white/60">Please wait a moment</p>
        </div>
      </div>
    </div>
  );
}