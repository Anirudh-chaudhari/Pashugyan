import Link from "next/link";
import { Leaf } from "lucide-react";

const footerColumns = [
  {
    title: "Product",
    links: [
      { href: "/detect", label: "Detect Breed" },
      { href: "/database", label: "Breed Database" },
      { href: "/dashboard", label: "Dashboard" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/how-it-works", label: "How It Works" },
      { href: "/what-we-provide", label: "What We Provide" },
      { href: "/help-guide", label: "Help Guide" },
      { href: "/privacy-policy", label: "Privacy Policy" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "mailto:hello@pashugyan.in", label: "Email Us" },
      { href: "https://github.com", label: "GitHub" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--bg-base)]">
      <div className="page-shell grid gap-10 py-14 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-forest to-forest-mid text-lg text-white shadow-card">
              <Leaf className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display text-lg font-bold">PashuGyan</div>
              <div className="font-hindi text-xs text-[var(--text-muted)]">
                Know Your Animal. Grow Your Farm.
              </div>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-7 text-[var(--text-secondary)]">
            AI-powered livestock intelligence for Indian farmers, veterinarians,
            and breed researchers.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title} className="space-y-4">
            <h2 className="font-display text-lg font-semibold">{column.title}</h2>
            <div className="flex flex-col gap-3 text-sm text-[var(--text-secondary)]">
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-[var(--text-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-[var(--text-muted)]">
        Made with care for Indian farmers | PashuGyan 2026
      </div>
    </footer>
  );
}
