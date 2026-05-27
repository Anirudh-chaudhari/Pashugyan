import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the PashuGyan platform and breed insights.",
};

export default function TermsPage() {
  return (
    <main className="page-shell py-12 sm:py-16">
      <div className="mx-auto max-w-4xl rounded-[36px] border border-[var(--border-raw)] bg-[var(--bg-surface)] p-6 shadow-card sm:p-8">
        <div className="section-kicker">Terms of Use</div>
        <h1 className="mt-4 font-display text-4xl font-bold text-[var(--text-primary)]">
          Terms
        </h1>
        <div className="mt-6 space-y-5 text-sm leading-8 text-[var(--text-secondary)]">
          <p>
            PashuGyan provides AI-assisted breed identification and livestock
            information for educational and farm-support purposes.
          </p>
          <p>
            Results are probabilistic and should not replace veterinary
            diagnosis, breeding certification, or regulatory documentation where
            those are required.
          </p>
          <p>
            Users are responsible for lawful image uploads, responsible sharing,
            and verifying critical decisions before acting on a result.
          </p>
          <p>
            Continued use of the platform indicates acceptance of these terms and
            any future updates made to maintain safety, compliance, or service
            quality.
          </p>
        </div>
      </div>
    </main>
  );
}
