import { NextResponse } from "next/server";
import { getBreedBySlug } from "@/lib/breeds";

type Context = {
  params: { slug: string };
};

export function GET(_: Request, { params }: Context) {
  const breed = getBreedBySlug(params.slug);

  if (!breed) {
    return NextResponse.json(
      { ok: false, error: "Breed not found.", code: 404 },
      { status: 404 },
    );
  }

  return NextResponse.json({ ok: true, data: breed });
}
