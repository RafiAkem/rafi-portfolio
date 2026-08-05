import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const alt = `${profile.name} - ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Share card, set like the page: paper, ink, one rule, one pine mark.
 * Satori has no access to the site's webfonts, so this leans on weight and
 * spacing rather than trying to fake the Bodoni display face badly.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3f1ea",
          color: "#17150f",
          padding: "68px 76px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #b3ab97",
            paddingBottom: 20,
            fontSize: 21,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#6f6a5c",
            fontFamily: "monospace",
          }}
        >
          <span>{profile.name}</span>
          <span>{profile.city}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 78, lineHeight: 1.1 }}>Membangun aplikasi web</div>
          <div style={{ display: "flex", fontSize: 78, lineHeight: 1.1 }}>
            <span>dan sistem&nbsp;</span>
            <span style={{ fontStyle: "italic", color: "#1d4e3f" }}>berbasis AI.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #b3ab97",
            paddingTop: 20,
            fontSize: 21,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#6f6a5c",
            fontFamily: "monospace",
          }}
        >
          <span>{profile.role}</span>
          <span>MangMicro · MangQuiz · Akem&apos;s Ramblings</span>
        </div>
      </div>
    ),
    size,
  );
}
