export function PageLoading() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center px-6 py-24"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="border-4 border-(--nb-border) bg-(--nb-yellow) px-6 py-4 font-heading text-sm font-black uppercase shadow-[6px_6px_0_0_var(--nb-shadow)] sm:text-base">
        Loading…
      </div>
    </div>
  );
}
