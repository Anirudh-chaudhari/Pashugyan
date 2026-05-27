/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type PhotoWithFallbackProps = {
  alt: string;
  className?: string;
  emojiClassName?: string;
  fallbackEmoji?: string;
  imgClassName?: string;
  loading?: "eager" | "lazy";
  src?: string | null;
};

export function PhotoWithFallback({
  alt,
  className,
  emojiClassName,
  fallbackEmoji = "🐄",
  imgClassName,
  loading = "lazy",
  src,
}: PhotoWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const showFallback = failed || !src;

  return (
    <div
      aria-label={alt}
      className={cn("relative overflow-hidden", className)}
      role="img"
    >
      {showFallback ? (
        <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(74,222,128,.18),transparent_36%),linear-gradient(135deg,#173526,#102219)] text-6xl">
          <span
            className={cn(
              "drop-shadow-[0_0_18px_rgba(74,222,128,.28)]",
              emojiClassName,
            )}
          >
            {fallbackEmoji}
          </span>
        </div>
      ) : (
        <img
          alt={alt}
          className={cn("h-full w-full object-cover", imgClassName)}
          decoding="async"
          loading={loading}
          onError={() => setFailed(true)}
          src={src}
        />
      )}
    </div>
  );
}
