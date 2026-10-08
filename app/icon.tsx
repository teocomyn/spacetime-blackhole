import { ImageResponse } from "next/og";

// Google n'affiche un favicon dans ses résultats que s'il mesure un multiple de 48 px.
export const size = { width: 48, height: 48 };
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
          border: "3px solid #3ca0ff",
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#00e5ff",
            boxShadow: "0 0 18px #3ca0ff",
          }}
        />
      </div>
    ),
    size
  );
}
