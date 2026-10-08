import { ImageResponse } from "next/og";
import type { Locale } from "@/context/AppContext";

// Images servies à des chemins fixes : avec deux mises en page racines (FR et EN),
// les fichiers icon/opengraph-image à la racine d'app/ ne s'appliqueraient plus à toutes les pages.

export const SOCIAL_IMAGE = { width: 1200, height: 630 };

const SOCIAL_TEXT = {
  fr: { title: "L'espace n'existe pas", tagline: "Trous noirs · intrication · espace-temps" },
  en: { title: "Space does not exist", tagline: "Black holes · entanglement · spacetime" },
} as const;

export function socialImage(locale: Locale) {
  const text = SOCIAL_TEXT[locale];
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
          {text.title}
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
          {text.tagline}
        </div>
      </div>
    ),
    SOCIAL_IMAGE
  );
}

export function iconImage() {
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
    { width: 48, height: 48 }
  );
}

export function appleIconImage() {
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
    { width: 180, height: 180 }
  );
}
