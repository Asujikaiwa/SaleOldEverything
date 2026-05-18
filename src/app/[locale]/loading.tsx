export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <span className="absolute inset-0 animate-ping rounded-full bg-brand-green-500/30" />
          <span className="absolute inset-2 rounded-full bg-gradient-to-br from-brand-green-600 to-brand-blue-700" />
        </div>
        <span className="text-sm font-medium text-ink-muted">Loading…</span>
      </div>
    </div>
  );
}
