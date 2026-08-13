import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#060609",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            color: "#e8e8f0",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: 3,
          }}
        >
          JNK
          <span style={{ color: "#6d5dfc" }}>.</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
