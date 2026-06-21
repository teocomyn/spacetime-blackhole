import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

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
          background: "#050610",
          borderRadius: "50%",
          border: "2px solid #3ca0ff",
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#00e5ff",
            boxShadow: "0 0 12px #3ca0ff",
          }}
        />
      </div>
    ),
    size
  );
}
