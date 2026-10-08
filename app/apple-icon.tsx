import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050610",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: "6px solid #3ca0ff",
            boxShadow: "0 0 36px rgba(0,229,255,0.45)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#00e5ff",
              boxShadow: "0 0 30px #3ca0ff",
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
