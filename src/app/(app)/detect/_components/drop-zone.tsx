"use client";

import { Camera, FileImage, Sparkles, UploadCloud, X } from "lucide-react";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { motion } from "framer-motion";
import { ScanStatus } from "@/hooks/useClassify";
import { ScanOverlay } from "@/app/(app)/detect/_components/scan-overlay";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DropZoneProps = {
  fileName?: string;
  fileSize?: string;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  isDragActive: boolean;
  onRemove: () => void;
  preview: string | null;
  status: ScanStatus;
  statusMessage: string;
};

const tips = [
  "Use natural daylight or bright shade for the clearest coat details.",
  "Capture the full animal from the side when possible.",
  "Avoid blur, shadows over the face, and crowded backgrounds.",
  "One animal per frame gives the model the best confidence.",
];

export function DropZone({
  fileName,
  fileSize,
  getInputProps,
  getRootProps,
  isDragActive,
  onRemove,
  preview,
  status,
  statusMessage,
}: DropZoneProps) {
  const interactive = status === "idle" || status === "preview";
  const isLoading = status === "compressing" || status === "analyzing";

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "relative overflow-hidden rounded-[32px] border border-white/10 bg-[var(--bg-surface)] shadow-lifted",
          interactive && "cursor-pointer",
        )}
      >
        <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(74,222,128,0.24),rgba(217,119,6,0.12),rgba(74,222,128,0.24))] opacity-50" />
        <div className="absolute inset-[1px] rounded-[31px] bg-[var(--bg-surface)]" />

        <div
          {...getRootProps()}
          className={cn(
            "relative min-h-[320px] rounded-[31px] p-5",
            preview ? "flex flex-col" : "flex items-center justify-center",
          )}
        >
          <input {...getInputProps({ capture: "environment" })} />

          {!preview ? (
            <div className="mx-auto flex max-w-lg flex-col items-center gap-5 text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-[var(--bg-muted)] text-[var(--color-forest)] shadow-card">
                {isDragActive ? (
                  <UploadCloud className="h-11 w-11" />
                ) : (
                  <Camera className="h-11 w-11" />
                )}
              </div>
              <div className="space-y-2">
                <h2 className="font-display text-3xl font-semibold text-[var(--text-primary)]">
                  Drop your animal&apos;s photo here
                </h2>
                <p className="text-base text-[var(--text-secondary)]">
                  Or tap to use your camera on mobile. JPG, PNG, WEBP up to 10MB.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-[var(--text-muted)]">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-raw)] px-3 py-2">
                  <FileImage className="h-4 w-4" />
                  Clear side profile helps the most
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border-raw)] px-3 py-2">
                  <Sparkles className="h-4 w-4" />
                  AI result in under 5 seconds when warm
                </span>
              </div>
            </div>
          ) : (
            <>
              <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[var(--bg-muted)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Selected animal preview"
                  className="h-auto max-h-[460px] w-full object-contain"
                />
                {isLoading && <ScanOverlay statusMessage={statusMessage} />}
              </div>
              <div className="mt-4 flex flex-col gap-3 rounded-[24px] border border-[var(--border-raw)] bg-[var(--bg-muted)]/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-[var(--text-primary)]">
                    {fileName}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {fileSize} • Ready to analyze
                  </div>
                </div>
                {status === "preview" && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="self-start sm:self-auto"
                    onClick={(event) => {
                      event.stopPropagation();
                      onRemove();
                    }}
                  >
                    <X className="h-4 w-4" />
                    Remove photo
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <details className="rounded-[28px] border border-[var(--border-raw)] bg-[var(--bg-surface)] px-5 py-4 shadow-card">
        <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--text-primary)]">
          📸 Tips for best results
        </summary>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {tips.map((tip) => (
            <motion.div
              key={tip}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[var(--border-raw)] bg-[var(--bg-muted)]/70 px-4 py-3 text-sm text-[var(--text-secondary)]"
            >
              {tip}
            </motion.div>
          ))}
        </div>
      </details>
    </div>
  );
}
