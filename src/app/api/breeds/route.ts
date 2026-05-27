import { NextRequest, NextResponse } from "next/server";
import { filterBreeds, getAllBreeds } from "@/lib/breeds";
import { AnimalType, BreedPurpose } from "@/types/breed";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type") as AnimalType | "all" | null;
  const purpose = searchParams.get("purpose") as BreedPurpose | "all" | null;
  const originState = searchParams.get("originState");
  const search = searchParams.get("search");
  const milkYieldMin = searchParams.get("milkYieldMin");
  const milkYieldMax = searchParams.get("milkYieldMax");

  const data =
    type || purpose || originState || search || milkYieldMin || milkYieldMax
      ? filterBreeds({
          type: type ?? undefined,
          purpose: purpose ?? undefined,
          originState: originState || undefined,
          search: search || undefined,
          milkYieldMin: milkYieldMin ? Number(milkYieldMin) : undefined,
          milkYieldMax: milkYieldMax ? Number(milkYieldMax) : undefined,
        })
      : getAllBreeds();

  return NextResponse.json({ ok: true, data });
}
