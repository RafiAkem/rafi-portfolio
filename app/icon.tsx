import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Monogram favicon: pine ink on paper, squared off like the rest of the page. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1d4e3f",
          color: "#f3f1ea",
          fontSize: 44,
          fontFamily: "serif",
        }}
      >
        R
      </div>
    ),
    size,
  );
}
