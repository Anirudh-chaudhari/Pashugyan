import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how PashuGyan handles uploaded images, analytics, and account data.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="page-shell py-12 sm:py-16">
      <div className="mx-auto max-w-4xl rounded-[36px] border border-[var(--border-raw)] bg-[var(--bg-surface)] p-6 shadow-card sm:p-8">
        <div className="section-kicker">Privacy Policy</div>
        <h1 className="mt-4 font-display text-4xl font-bold text-[var(--text-primary)]">
          Privacy policy
        </h1>
        <div className="mt-6 space-y-5 text-sm leading-8 text-[var(--text-secondary)]">
          <p>
            PashuGyan collects the minimum information needed to deliver breed
            identification, improve product quality, and maintain platform
            reliability.
          </p>
          <p>
            Uploaded images may be processed by our model gateway and temporary
            infrastructure providers for classification. If account-linked
            history is enabled, saved scans may be stored with your user profile.
          </p>
          <p>
            We do not sell personal data. Operational analytics, error logs, and
            model performance signals may be used to improve accuracy, abuse
            prevention, and service stability.
          </p>
          <p>
            If you need deletion or support requests, contact the project team
            using the support information provided in the product footer.
          </p>
        </div>
      </div>
    </main>
  );
}
