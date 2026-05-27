import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-shell flex min-h-[70vh] items-center justify-center py-16">
      <div className="max-w-xl rounded-[36px] border border-[var(--border-raw)] bg-[var(--bg-surface)] p-8 text-center shadow-lifted">
        <div className="section-kicker">404</div>
        <h1 className="mt-4 font-display text-4xl font-bold text-[var(--text-primary)]">
          This herd wandered off the path
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
          The page you were looking for does not exist or may have moved. Let’s
          get you back to a route that does.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="focus-ring rounded-full bg-[var(--color-forest)] px-5 py-3 text-sm font-semibold text-white"
          >
            Home
          </Link>
          <Link
            href="/detect"
            className="focus-ring rounded-full border border-[var(--border-raw)] px-5 py-3 text-sm font-semibold text-[var(--text-primary)]"
          >
            Go to detect
          </Link>
        </div>
      </div>
    </main>
  );
}
