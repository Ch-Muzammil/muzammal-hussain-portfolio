import { ImageResponse } from "next/og";
import { hero, site } from "@/modules/portfolio";

export const alt = "Muzammal Hussain, frontend engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#16110D",
          color: "#F2EBE3",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.14em",
            color: "#D9A066",
          }}
        >
          {hero.eyebrow.toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            marginTop: 24,
            lineHeight: 1.05,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            marginTop: 28,
            lineHeight: 1.35,
            color: "#B8A99A",
            maxWidth: 860,
          }}
        >
          {hero.headline}
        </div>
      </div>
    ),
    { ...size },
  );
}
