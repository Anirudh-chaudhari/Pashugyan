"use client";

import { motion } from "framer-motion";

type ScanOverlayProps = {
  statusMessage: string;
};

export function ScanOverlay({ statusMessage }: ScanOverlayProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black/25">
      {[
        "left-4 top-4 border-l-2 border-t-2",
        "right-4 top-4 border-r-2 border-t-2",
        "bottom-4 left-4 border-b-2 border-l-2",
        "bottom-4 right-4 border-b-2 border-r-2",
      ].map((classes) => (
        <div
          key={classes}
          className={`absolute h-8 w-8 border-[var(--color-glow)] ${classes} animate-pulse`}
        />
      ))}

      <div className="absolute inset-0 scan-grid" />
      <motion.div
        className="absolute inset-x-3 h-0.5 rounded-full bg-[var(--color-glow)] opacity-90 blur-[1px]"
        animate={{ top: ["12%", "88%", "12%"] }}
        transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity }}
      />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-7">
        <div className="rounded-full border border-white/10 bg-black/[0.55] px-4 py-2 text-sm font-medium text-[var(--color-glow)] backdrop-blur">
          {statusMessage}
        </div>
      </div>
    </div>
  );
}
