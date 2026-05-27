"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="page-shell flex min-h-[70vh] items-center justify-center py-16">
      <div className="max-w-xl rounded-[36px] border border-[var(--border-raw)] bg-[var(--bg-surface)] p-8 text-center shadow-lifted">
        <div className="section-kicker">Application Error</div>
        <h1 className="mt-4 font-display text-4xl font-bold text-[var(--text-primary)]">
          Something interrupted the scan path
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
          {error.message || "An unexpected error occurred while rendering the app."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="focus-ring mt-8 rounded-full bg-[var(--color-forest)] px-5 py-3 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
