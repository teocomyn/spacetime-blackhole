import { ImageResponse } from "next/og";

export const alt = "Emergent Spacetime : l'espace n'existe pas. Trous noirs, intrication et espace-temps émergent.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 40%, #0d2340 0%, #050610 62%)",
          color: "#e0f0ff",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 300,
            height: 300,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              borderRadius: "50%",
              border: "1px solid rgba(60,160,255,0.35)",
            }}
          />
          <div
            style={{
              position: "absolute",
              width: 224,
              height: 224,
              borderRadius: "50%",
              border: "2px solid rgba(0,229,255,0.65)",
              boxShadow: "0 0 70px rgba(0,229,255,0.35)",
            }}
          />
          <div
            style={{
              width: 156,
              height: 156,
              borderRadius: "50%",
              background: "#000",
              boxShadow: "0 0 48px rgba(60,160,255,0.55)",
            }}
          />
        </div>
        <div style={{ marginTop: 40, fontSize: 68, letterSpacing: -2 }}>
          L'espace n'existe pas
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#8ab8d8",
          }}
        >
          Trous noirs · intrication · espace-temps
        </div>
      </div>
    ),
    size
  );
}
