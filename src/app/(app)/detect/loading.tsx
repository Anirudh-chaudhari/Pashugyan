export default function DetectLoading() {
  return (
    <main className="page-shell py-10 sm:py-14">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="h-8 w-32 animate-pulse rounded-full bg-[var(--bg-muted)]" />
        <div className="h-16 w-full animate-pulse rounded-[32px] bg-[var(--bg-muted)]" />
        <div className="h-[360px] w-full animate-pulse rounded-[32px] bg-[var(--bg-muted)]" />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="h-12 animate-pulse rounded-full bg-[var(--bg-muted)]" />
          <div className="h-12 animate-pulse rounded-full bg-[var(--bg-muted)]" />
        </div>
      </div>
    </main>
  );
}
