"use client";
/* eslint-disable @next/next/no-img-element */

import type {
  ChangeEvent,
  DragEvent,
  KeyboardEvent,
  MouseEvent,
} from "react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ResultCard } from "@/app/(app)/detect/_components/result-card";
import { useClassify } from "@/hooks/useClassify";
import { useFarmerHistory } from "@/hooks/useFarmerHistory";

type DetectClientProps = {
  fontClassName: string;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const navLinks = [
  { href: "/detect", label: "Detect", active: true },
  { href: "/database", label: "Database" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/help-guide", label: "Help" },
];

const sampleSuccesses = [
  {
    href: "/database/gir",
    title: "Gir (Cattle)",
    match: "98% Match",
    src: "/images/stitch/detect-sample-gir.jpg",
  },
  {
    href: "/database/murrah",
    title: "Murrah (Buffalo)",
    match: "96% Match",
    src: "/images/stitch/detect-sample-murrah.jpg",
  },
  {
    href: "/database/sahiwal",
    title: "Sahiwal (Cattle)",
    match: "94% Match",
    src: "/images/stitch/detect-sample-sahiwal.jpg",
  },
];

const footerColumns = [
  {
    title: "Resources",
    links: [
      { href: "/database", label: "Breed Database" },
      { href: "/how-it-works", label: "Research Papers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
];

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DetectClient({ fontClassName }: DetectClientProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [inputKey, setInputKey] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const resultRef = useRef<HTMLElement | null>(null);

  const { addScan, hasSupabase, isAuthenticated, userDisplayName } =
    useFarmerHistory();
  const {
    status,
    statusMessage,
    result,
    error,
    analyze,
    reset,
    setPreviewState,
  } = useClassify();

  const isBusy = status === "compressing" || status === "analyzing";
  const hasPreview = previewUrl !== null;
  const detectionSummary =
    status === "done" && result
      ? `${result.breed} detected`
      : status === "error" && error
        ? error
        : "Ready for analysis";

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (status === "done" && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [status]);

  const clearSelection = useCallback(() => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(null);
    setFileName("");
    setFileSize("");
    setInputKey((current) => current + 1);
    setIsDragActive(false);
    reset();
  }, [previewUrl, reset]);

  const handleAnalyze = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a JPG, PNG, or HEIC image.");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error("That file is larger than 10MB. Please choose a smaller image.");
        return;
      }

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const nextPreview = URL.createObjectURL(file);
      setPreviewUrl(nextPreview);
      setFileName(file.name);
      setFileSize(formatFileSize(file.size));
      setPreviewState();

      const response = await analyze(file);

      if (response.ok) {
        const syncResult = await addScan({
          imageName: file.name,
          result: response.data,
        });
        toast.success(
          `Detected ${response.data.breed} with ${Math.round(
            response.data.confidence * 100,
          )}% confidence.`,
        );

        if (syncResult.fallbackToLocal) {
          toast.error(
            "We couldn't sync this scan to Supabase, so it was saved locally on this device.",
          );
        }

        return;
      }

      toast.error(response.error);
    },
    [addScan, analyze, previewUrl, setPreviewState],
  );

  const onInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file || isBusy) {
      return;
    }

    await handleAnalyze(file);
  };

  const onDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (isBusy) {
      return;
    }

    setIsDragActive(false);
    const file = event.dataTransfer.files?.[0];

    if (!file) {
      return;
    }

    await handleAnalyze(file);
  };

  const onChooseClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    if (isBusy) {
      return;
    }

    inputRef.current?.click();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div
      className={`${fontClassName} min-h-screen bg-[#fbf9f8] text-[#1b1c1c]`}
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
        }

        .upload-dashed {
          background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='40' ry='40' stroke='%232E7D32FF' stroke-width='2' stroke-dasharray='12%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
        }

        @keyframes pulse-subtle {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }

          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes scanLine {
          0% {
            top: 12%;
          }

          100% {
            top: 88%;
          }
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 2s infinite ease-in-out;
        }

        .animate-float {
          animation: float 3s infinite ease-in-out;
        }

        .scan-grid {
          background-image:
            linear-gradient(to right, rgba(46, 125, 50, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(46, 125, 50, 0.08) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>

      <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-[#bfcaba] bg-[#fbf9f8]/80 px-4 py-4 backdrop-blur-md md:px-8">
        <div className="flex items-center gap-2">
          <span className="text-[24px] font-bold leading-8 text-[#2e7d32]">
            PashuGyan
          </span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.active
                  ? "border-b-2 border-[#2e7d32] pb-1 text-[14px] font-medium leading-5 text-[#2e7d32]"
                  : "text-[14px] font-medium leading-5 text-[#40493d] transition-colors hover:text-[#2e7d32]"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="#upload"
          className="rounded-full bg-[#2e7d32] px-6 py-2.5 text-[14px] font-semibold leading-5 text-white shadow-md transition-all hover:opacity-90 active:scale-95"
        >
          Try Now
        </Link>
      </header>

      <main className="mx-auto flex-grow w-full max-w-[1600px] px-4 pb-20 pt-24 md:px-8">
        <section className="mb-16 text-center">
          <h1 className="mb-6 text-6xl font-bold leading-tight text-[#1b1c1c] md:text-7xl">
            Identify Your <span className="text-[#2e7d32]">Livestock</span>{" "}
            Instantly
          </h1>
          <p className="mx-auto max-w-2xl text-[18px] leading-7 text-[#40493d]">
            Our advanced AI helps Indian farmers identify cattle and buffalo
            breeds with high precision. Upload a photo to get started.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="rounded-full border border-[#bfcaba] bg-white px-5 py-3 text-sm text-[#40493d] shadow-sm">
              {hasSupabase ? (
                isAuthenticated ? (
                  <span>History sync active for {userDisplayName}.</span>
                ) : (
                  <span>
                    Guest mode active.{" "}
                    <Link className="font-semibold text-[#2e7d32]" href="/sign-in">
                      Sign in
                    </Link>{" "}
                    to sync scans across devices.
                  </span>
                )
              ) : (
                <span>Supabase sync is not configured yet.</span>
              )}
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-7">
            <div
              id="upload"
              aria-busy={isBusy}
              className={`upload-dashed group min-h-[480px] rounded-[2.5rem] bg-white p-12 shadow-sm transition-all ${
                isDragActive ? "scale-[1.01] bg-[#2e7d32]/[0.05]" : "hover:bg-[#f5f3f3]"
              } ${isBusy ? "cursor-wait" : "cursor-pointer"}`}
              onClick={() => {
                if (!isBusy) {
                  inputRef.current?.click();
                }
              }}
              onDragLeave={() => setIsDragActive(false)}
              onDragOver={(event) => {
                event.preventDefault();
                if (!isBusy) {
                  setIsDragActive(true);
                }
              }}
              onDrop={onDrop}
              onKeyDown={onKeyDown}
              role="button"
              tabIndex={0}
            >
              <input
                key={inputKey}
                accept="image/*"
                className="hidden"
                id="file-input"
                onChange={onInputChange}
                ref={inputRef}
                type="file"
              />

              {!hasPreview ? (
                <div className="flex min-h-[384px] flex-col items-center justify-center">
                  <div className="animate-pulse-subtle mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#2e7d32]/10 text-[#2e7d32] transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined text-6xl">
                      cloud_upload
                    </span>
                  </div>
                  <h2 className="mb-3 text-center text-3xl font-semibold leading-tight text-[#1b1c1c]">
                    Drag and drop photo here
                  </h2>
                  <p className="mb-10 text-center text-[16px] leading-6 text-[#40493d]">
                    Supports JPG, PNG, or HEIC. Max file size 10MB.
                  </p>
                  <button
                    className="flex items-center gap-3 rounded-2xl bg-[#2e7d32] px-10 py-4 font-bold text-white shadow-lg transition-all hover:bg-[#2e7d32]/90"
                    onClick={onChooseClick}
                    type="button"
                  >
                    <span className="material-symbols-outlined">
                      add_photo_alternate
                    </span>
                    Select from Device
                  </button>
                </div>
              ) : (
                <div className="flex min-h-[384px] flex-col">
                  <div className="relative overflow-hidden rounded-[2rem] border border-[#bfcaba] bg-[#f0eded]">
                    <img
                      alt="Selected animal preview"
                      className="h-[280px] w-full object-cover sm:h-[340px]"
                      src={previewUrl}
                    />
                    {isBusy ? (
                      <div className="absolute inset-0 overflow-hidden bg-black/30">
                        <div className="absolute inset-0 scan-grid" />
                        <div className="absolute inset-x-3 h-0.5 rounded-full bg-[#88d982] opacity-90 blur-[1px]" style={{ animation: "scanLine 2.4s ease-in-out infinite alternate" }} />
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-7">
                          <div className="rounded-full border border-white/10 bg-black/[0.55] px-4 py-2 text-sm font-medium text-[#88d982] backdrop-blur">
                            {statusMessage}
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-6 flex flex-col gap-4 rounded-[2rem] border border-[#bfcaba] bg-[#f5f3f3] p-5">
                    <div className="flex flex-col gap-1">
                      <p className="text-[18px] font-bold leading-7 text-[#1b1c1c]">
                        {fileName}
                      </p>
                      <p className="text-[14px] leading-5 text-[#40493d]">
                        {fileSize}
                        {` • ${detectionSummary}`}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      {status !== "done" ? (
                        <button
                          className="rounded-2xl bg-[#2e7d32] px-6 py-3 text-[14px] font-bold text-white transition-all hover:bg-[#2e7d32]/90 disabled:cursor-not-allowed disabled:opacity-60"
                          disabled={isBusy}
                          onClick={async (event) => {
                            event.stopPropagation();
                            if (inputRef.current?.files?.[0]) {
                              await handleAnalyze(inputRef.current.files[0]);
                            }
                          }}
                          type="button"
                        >
                          {isBusy ? "Analyzing..." : "Analyze Again"}
                        </button>
                      ) : (
                        <button
                          className="rounded-2xl bg-[#2e7d32] px-6 py-3 text-[14px] font-bold text-white transition-all hover:bg-[#2e7d32]/90"
                          onClick={(event) => {
                            event.stopPropagation();
                            clearSelection();
                          }}
                          type="button"
                        >
                          Scan Another Animal
                        </button>
                      )}

                      <button
                        className="rounded-2xl border-2 border-[#2e7d32] px-6 py-3 text-[14px] font-bold text-[#2e7d32] transition-all hover:bg-[#2e7d32]/5"
                        onClick={(event) => {
                          event.stopPropagation();
                          clearSelection();
                        }}
                        type="button"
                      >
                        Remove Photo
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-[2.5rem] border border-[#2e7d32]/10 bg-[#2e7d32]/[0.03] p-10">
              <h3 className="-ml-4 mb-8 flex items-center gap-3 rounded-xl bg-[#2e7d32]/10 p-4 text-[20px] font-semibold leading-7 text-[#2e7d32]">
                <span className="material-symbols-outlined">tips_and_updates</span>
                Tips for High Accuracy
              </h3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="flex flex-col items-start gap-2">
                  <span className="material-symbols-outlined text-3xl text-[#2e7d32]">
                    wb_sunny
                  </span>
                  <span className="font-bold text-[#1b1c1c]">Good Lighting</span>
                  <p className="text-[12px] leading-relaxed text-[#40493d]">
                    Ensure the animal is well-lit, preferably in natural daylight.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <span className="material-symbols-outlined text-3xl text-[#2e7d32]">
                    side_navigation
                  </span>
                  <span className="font-bold text-[#1b1c1c]">Side Profile</span>
                  <p className="text-[12px] leading-relaxed text-[#40493d]">
                    Capture the full body from the side for better breed features.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <span className="material-symbols-outlined text-3xl text-[#2e7d32]">
                    center_focus_weak
                  </span>
                  <span className="font-bold text-[#1b1c1c]">Stay Focused</span>
                  <p className="text-[12px] leading-relaxed text-[#40493d]">
                    Minimize background clutter and keep the animal centered.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12 lg:col-span-5">
            <div className="rounded-[2.5rem] border border-[#bfcaba] bg-white p-10 shadow-sm">
              <h3 className="mb-8 text-[24px] font-semibold leading-8 text-[#1b1c1c]">
                Sample Successes
              </h3>
              <div className="space-y-6">
                {sampleSuccesses.map((sample) => (
                  <Link
                    key={sample.title}
                    className="group flex items-center gap-6 rounded-2xl border border-transparent p-4 transition-all hover:-translate-y-1 hover:border-[#bfcaba] hover:bg-[#f5f3f3]"
                    href={sample.href}
                  >
                    <img
                      alt={sample.title}
                      className="h-24 w-24 rounded-2xl object-cover"
                      src={sample.src}
                    />
                    <div className="flex-grow">
                      <p className="mb-1 text-xl font-bold text-[#1b1c1c]">
                        {sample.title}
                      </p>
                      <div className="inline-flex rounded-full bg-[#2e7d32] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                        {sample.match}
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#40493d] transition-transform group-hover:translate-x-1">
                      chevron_right
                    </span>
                  </Link>
                ))}
              </div>
              <Link
                className="mt-8 block w-full rounded-2xl border-2 border-[#2e7d32] py-4 text-center text-[14px] font-bold text-[#2e7d32] transition-colors hover:bg-[#2e7d32]/5"
                href="/database"
              >
                View Complete Database
              </Link>
            </div>

            <div className="animate-float relative overflow-hidden rounded-[2.5rem] border border-[#2e7d32]/20 bg-[#2e7d32]/[0.08] p-10 text-center">
              <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#2e7d32]/10" />
              <span
                className="material-symbols-outlined mb-4 text-5xl text-[#2e7d32]"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                verified_user
              </span>
              <h4 className="mb-4 text-[24px] font-semibold leading-8 text-[#1b1c1c]">
                99% Accuracy Rate
              </h4>
              <p className="mb-6 text-[16px] italic leading-6 text-[#40493d]">
                &quot;PashuGyan has revolutionized how we manage our dairy
                cooperatives by providing instant, accurate breed data.&quot;
              </p>
              <div className="border-t border-[#2e7d32]/10 pt-6">
                <p className="text-[14px] font-bold uppercase tracking-[0.18em] text-[#2e7d32]">
                  - Dr. Rajesh Kumar, Veterinary Expert
                </p>
              </div>
            </div>
          </div>
        </div>

        {result ? (
          <section className="mt-16" ref={resultRef}>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#2e7d32]">
                  Latest Analysis
                </p>
                <h2 className="text-[32px] font-bold leading-10 text-[#1b1c1c]">
                  Detection complete
                </h2>
              </div>
              <button
                className="rounded-full border border-[#bfcaba] px-5 py-3 text-sm font-semibold text-[#1b1c1c] transition hover:bg-[#f5f3f3]"
                onClick={clearSelection}
                type="button"
              >
                Start new scan
              </button>
            </div>
            <ResultCard result={result} />
          </section>
        ) : null}
      </main>

      <button
        className="fixed bottom-24 right-4 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[#2e7d32] text-white shadow-2xl transition-all hover:scale-105 active:scale-95 md:hidden"
        onClick={() => inputRef.current?.click()}
        type="button"
      >
        <span className="material-symbols-outlined text-3xl">photo_camera</span>
      </button>

      <footer className="w-full border-t border-[#bfcaba] bg-[#e4e2e1] px-4 py-12 md:px-8">
        <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex flex-col gap-2">
            <span className="text-[24px] font-bold leading-8 text-[#2e7d32]">
              PashuGyan
            </span>
            <p className="max-w-sm text-[16px] leading-6 text-[#40493d]">
              &copy; 2024 PashuGyan. Empowering Indian agriculture with AI-driven
              precision and insights for every farmer.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <p className="text-[14px] font-bold leading-5 text-[#2e7d32]">
                  {column.title}
                </p>
                {column.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[16px] leading-6 text-[#40493d] transition-all hover:text-[#2e7d32]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}

            <div className="flex flex-col gap-3">
              <p className="text-[14px] font-bold leading-5 text-[#2e7d32]">
                Connect
              </p>
              <div className="flex gap-4">
                <a
                  aria-label="Facebook"
                  className="text-[#40493d] transition-colors hover:text-[#2e7d32]"
                  href="https://facebook.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined">facebook</span>
                </a>
                <Link
                  aria-label="Website"
                  className="text-[#40493d] transition-colors hover:text-[#2e7d32]"
                  href="/"
                >
                  <span className="material-symbols-outlined">language</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
