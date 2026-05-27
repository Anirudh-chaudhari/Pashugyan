import { Breed } from "@/types/breed";
import { ClassificationResult } from "@/lib/classify";

export type ApiError = {
  ok: false;
  error: string;
  code: number;
};

export type BreedsApiResponse =
  | {
      ok: true;
      data: Breed[];
    }
  | ApiError;

export type BreedApiResponse =
  | {
      ok: true;
      data: Breed;
    }
  | ApiError;

export type ClassifyApiResponse =
  | {
      ok: true;
      data: ClassificationResult;
    }
  | ApiError;
