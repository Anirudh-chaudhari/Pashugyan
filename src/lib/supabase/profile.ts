import type { User } from "@supabase/supabase-js";
import type { ClassificationResult, Prediction } from "@/lib/classify";

export type ScanHistoryItem = {
  id: string;
  createdAt: string;
  imageName: string;
  result: ClassificationResult;
};

export type ScanHistoryDraft = Omit<ScanHistoryItem, "id" | "createdAt">;

export const MAX_SYNCED_SCAN_HISTORY = 20;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isSafeAvatarDataUrl(value: string) {
  return (
    /^data:image\/(jpeg|jpg|png|webp);base64,/i.test(value) &&
    value.length <= 300_000
  );
}

function normalizeConfidence(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    if (value > 1) {
      return Math.min(1, Math.max(0, value / 100));
    }

    return Math.min(1, Math.max(0, value));
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value);

    if (!Number.isFinite(parsed)) {
      return 0;
    }

    if (value.includes("%") || parsed > 1) {
      return Math.min(1, Math.max(0, parsed / 100));
    }

    return Math.min(1, Math.max(0, parsed));
  }

  return 0;
}

function sanitizePrediction(value: unknown): Prediction | null {
  if (!isObject(value)) {
    return null;
  }

  const breed =
    typeof value.breed === "string" && value.breed.trim().length > 0
      ? value.breed.trim()
      : null;

  if (!breed) {
    return null;
  }

  return {
    breed,
    confidence: normalizeConfidence(value.confidence),
  };
}

function sanitizeClassificationResult(
  value: unknown,
): ClassificationResult | null {
  if (!isObject(value)) {
    return null;
  }

  const breed =
    typeof value.breed === "string" && value.breed.trim().length > 0
      ? value.breed.trim()
      : null;

  if (!breed) {
    return null;
  }

  const animalType =
    value.animalType === "cattle" ||
    value.animalType === "buffalo" ||
    value.animalType === "unknown"
      ? value.animalType
      : "unknown";

  const predictions = Array.isArray(value.allPredictions)
    ? value.allPredictions
        .map((prediction) => sanitizePrediction(prediction))
        .filter((prediction): prediction is Prediction => prediction !== null)
    : [];

  return {
    breed,
    confidence: normalizeConfidence(value.confidence),
    animalType,
    allPredictions: predictions.length
      ? predictions
      : [
          {
            breed,
            confidence: normalizeConfidence(value.confidence),
          },
        ],
  };
}

function sanitizeHistoryItem(value: unknown): ScanHistoryItem | null {
  if (!isObject(value)) {
    return null;
  }

  const result = sanitizeClassificationResult(value.result);

  if (!result) {
    return null;
  }

  const id =
    typeof value.id === "string" && value.id.trim().length > 0
      ? value.id.trim()
      : globalThis.crypto.randomUUID();

  const imageName =
    typeof value.imageName === "string" && value.imageName.trim().length > 0
      ? value.imageName.trim()
      : "uploaded-image";

  const createdAt =
    typeof value.createdAt === "string" && value.createdAt.trim().length > 0
      ? value.createdAt
      : new Date().toISOString();

  return {
    id,
    createdAt,
    imageName,
    result,
  };
}

export function sanitizeScanHistory(value: unknown): ScanHistoryItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return sortScanHistory(
    value
      .map((item) => sanitizeHistoryItem(item))
      .filter((item): item is ScanHistoryItem => item !== null),
  );
}

export function sortScanHistory(history: ScanHistoryItem[]) {
  return [...history]
    .sort((left, right) => {
      const rightTime = new Date(right.createdAt).getTime();
      const leftTime = new Date(left.createdAt).getTime();

      if (Number.isNaN(rightTime) || Number.isNaN(leftTime)) {
        return right.createdAt.localeCompare(left.createdAt);
      }

      return rightTime - leftTime;
    })
    .slice(0, MAX_SYNCED_SCAN_HISTORY);
}

export function mergeScanHistory(...collections: ScanHistoryItem[][]) {
  const unique = new Map<string, ScanHistoryItem>();

  collections.flat().forEach((item) => {
    unique.set(item.id, item);
  });

  return sortScanHistory(Array.from(unique.values()));
}

export function createScanHistoryItem(item: ScanHistoryDraft): ScanHistoryItem {
  return {
    ...item,
    id: globalThis.crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
}

export function readScanHistoryFromMetadata(metadata: unknown) {
  if (!isObject(metadata)) {
    return [];
  }

  return sanitizeScanHistory(metadata.scan_history);
}

export function getUserDisplayName(user: Pick<User, "email" | "user_metadata"> | null) {
  if (!user) {
    return "Guest Farmer";
  }

  if (isObject(user.user_metadata)) {
    const fullName =
      typeof user.user_metadata.full_name === "string"
        ? user.user_metadata.full_name
        : typeof user.user_metadata.name === "string"
          ? user.user_metadata.name
          : null;

    if (fullName && fullName.trim().length > 0) {
      return fullName.trim();
    }
  }

  if (typeof user.email === "string" && user.email.includes("@")) {
    return user.email.split("@")[0].replace(/[._-]+/g, " ");
  }

  return "Farmer";
}

export function getUserAvatarUrl(
  user: Pick<User, "user_metadata"> | null,
) {
  if (!user || !isObject(user.user_metadata)) {
    return null;
  }

  const avatarValue =
    typeof user.user_metadata.avatar_url === "string"
      ? user.user_metadata.avatar_url
      : typeof user.user_metadata.avatar_data_url === "string"
        ? user.user_metadata.avatar_data_url
        : null;

  if (!avatarValue || !isSafeAvatarDataUrl(avatarValue)) {
    return null;
  }

  return avatarValue;
}

export function getUserInitials(name: string) {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "F";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 1).toUpperCase();
  }

  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}
