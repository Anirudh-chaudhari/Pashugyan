export default function DatabaseLoading() {
  return (
    <main className="page-shell py-10 sm:py-14">
      <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="hidden h-[540px] animate-pulse rounded-[32px] bg-[var(--bg-muted)] lg:block" />
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-[420px] animate-pulse rounded-[32px] bg-[var(--bg-muted)]"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
