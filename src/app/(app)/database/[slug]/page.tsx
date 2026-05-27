import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreedDetail } from "@/app/(app)/database/_components/breed-detail";
import { getAllBreeds, getBreedBySlug, getRelatedBreeds } from "@/lib/breeds";

type BreedDetailPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllBreeds().map((breed) => ({ slug: breed.slug }));
}

export function generateMetadata({
  params,
}: BreedDetailPageProps): Metadata {
  const breed = getBreedBySlug(params.slug);

  if (!breed) {
    return {
      title: "Breed not found",
    };
  }

  return {
    title: breed.name,
    description: `${breed.name} breed profile: origin, milk yield, feeding guide, health care, and economic value.`,
  };
}

export default function BreedDetailPage({ params }: BreedDetailPageProps) {
  const breed = getBreedBySlug(params.slug);

  if (!breed) {
    notFound();
  }

  return <BreedDetail breed={breed} related={getRelatedBreeds(params.slug)} />;
}
