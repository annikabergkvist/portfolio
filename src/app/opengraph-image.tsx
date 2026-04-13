import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

/** Default share preview when no route-specific OG image exists. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(145deg, #0a0a0b 0%, #141418 45%, #0f0f12 100%)",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#a3e635",
            marginBottom: 24,
          }}
        >
          Annika Bergkvist
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: 900,
          }}
        >
          Design Engineer
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 26,
            fontWeight: 500,
            color: "rgba(250,250,250,0.65)",
            maxWidth: 820,
            lineHeight: 1.4,
          }}
        >
          Bridging product design and frontend development — Kristianstad, Sweden
        </div>
      </div>
    ),
    { ...size },
  );
}
