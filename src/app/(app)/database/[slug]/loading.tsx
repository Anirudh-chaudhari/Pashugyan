export default function BreedDetailLoading() {
  return (
    <main className="page-shell py-10">
      <div className="h-[420px] animate-pulse rounded-[36px] bg-[var(--bg-muted)]" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <div className="h-[420px] animate-pulse rounded-[32px] bg-[var(--bg-muted)]" />
        <div className="h-[420px] animate-pulse rounded-[32px] bg-[var(--bg-muted)]" />
      </div>
    </main>
  );
}
