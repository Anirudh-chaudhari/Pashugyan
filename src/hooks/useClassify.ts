"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ClassificationResult,
  classifyImage,
  pingMLService,
} from "@/lib/classify";

export type ScanStatus =
  | "idle"
  | "preview"
  | "compressing"
  | "analyzing"
  | "done"
  | "error";

const STATUS_MESSAGES = [
  "Preprocessing image...",
  "Running breed classification model...",
  "Analyzing physical characteristics...",
  "Matching against 20 breed profiles...",
  "Preparing farm-ready insights...",
];

export function useClassify() {
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModelAwake, setIsModelAwake] = useState<boolean | null>(null);
  const messageTimer = useRef<number | null>(null);

  useEffect(() => {
    pingMLService().then(setIsModelAwake).catch(() => setIsModelAwake(false));
  }, []);

  const stopMessages = useCallback(() => {
    if (messageTimer.current) {
      window.clearInterval(messageTimer.current);
      messageTimer.current = null;
    }
  }, []);

  useEffect(() => () => stopMessages(), [stopMessages]);

  const reset = useCallback(() => {
    stopMessages();
    setStatus("idle");
    setStatusMessage("");
    setResult(null);
    setError(null);
  }, [stopMessages]);

  const analyze = useCallback(async (file: File) => {
    stopMessages();
    setError(null);
    setResult(null);
    setStatus("compressing");
    setStatusMessage("Compressing image...");

    await new Promise((resolve) => window.setTimeout(resolve, 450));

    setStatus("analyzing");
    setStatusMessage(STATUS_MESSAGES[0]);
    let index = 0;
    messageTimer.current = window.setInterval(() => {
      index = (index + 1) % STATUS_MESSAGES.length;
      setStatusMessage(STATUS_MESSAGES[index]);
    }, 2500);

    const response = await classifyImage(file);
    stopMessages();

    if (response.ok) {
      setResult(response.data);
      setStatus("done");
      return response;
    }

    setError(response.error);
    setStatus("error");
    return response;
  }, [stopMessages]);

  const setPreviewState = useCallback(() => {
    setStatus("preview");
    setError(null);
    setResult(null);
  }, []);

  return {
    status,
    statusMessage,
    result,
    error,
    isModelAwake,
    analyze,
    reset,
    setPreviewState,
  };
}
