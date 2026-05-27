import { ImageResponse } from "next/og";
import { getBreedBySlug } from "@/lib/breeds";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: { slug: string };
};

export default function OpenGraphImage({ params }: Props) {
  const breed = getBreedBySlug(params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at top left, rgba(74,222,128,.28), transparent 30%), linear-gradient(135deg, #0d1f14, #173526)",
          color: "white",
          padding: "56px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          PashuGyan Breed Profile
        </div>
        <div>
          <div style={{ fontSize: 82, fontWeight: 800 }}>{breed?.name ?? "Breed"}</div>
          <div style={{ fontSize: 32, marginTop: 14, opacity: 0.8 }}>
            {breed?.nameHindi ?? "पशुज्ञान"} • {breed?.origin ?? "Indian livestock"}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 18,
            fontSize: 26,
            opacity: 0.92,
          }}
        >
          <div>{breed ? `${breed.avgMilkYieldMin}-${breed.avgMilkYieldMax} L/day` : "AI insights"}</div>
          <div>•</div>
          <div>{breed?.purpose ?? "Research ready"}</div>
        </div>
      </div>
    ),
    size,
  );
}
