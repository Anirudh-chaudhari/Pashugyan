import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        popover: "hsl(var(--popover))",
        "popover-foreground": "hsl(var(--popover-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        secondary: "hsl(var(--secondary))",
        "secondary-foreground": "hsl(var(--secondary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        destructive: "hsl(var(--destructive))",
        "destructive-foreground": "hsl(var(--destructive-foreground))",
        forest: "var(--color-forest)",
        "forest-mid": "var(--color-forest-mid)",
        amber: "var(--color-amber)",
        "amber-light": "var(--color-amber-light)",
        glow: "var(--color-glow)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        hindi: ["var(--font-hindi)", "sans-serif"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to right, rgba(74,222,128,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(74,222,128,.08) 1px, transparent 1px)",
        "aurora":
          "radial-gradient(circle at 20% 20%, rgba(74,222,128,.25), transparent 38%), radial-gradient(circle at 80% 20%, rgba(217,119,6,.18), transparent 30%), radial-gradient(circle at 50% 80%, rgba(27,67,50,.35), transparent 35%)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        lifted: "var(--shadow-lifted)",
        glow: "0 0 0 1px rgba(74, 222, 128, .2), 0 0 40px rgba(74, 222, 128, .16)",
      },
      keyframes: {
        scanLine: {
          "0%": { top: "8%", opacity: "0" },
          "10%": { opacity: "0.9" },
          "90%": { opacity: "0.9" },
          "100%": { top: "90%", opacity: "0" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 1px rgba(74,222,128,.18)" },
          "50%": {
            boxShadow: "0 0 0 1px rgba(74,222,128,.28), 0 0 32px rgba(74,222,128,.18)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        drift: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(10px, -18px, 0)" },
          "100%": { transform: "translate3d(0, 0, 0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        sonar: {
          "0%": { transform: "scale(.6)", opacity: "0.65" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "scan-line": "scanLine 2.15s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.6s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
        drift: "drift 12s ease-in-out infinite",
        marquee: "marquee 24s linear infinite",
        sonar: "sonar 1.8s ease-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
