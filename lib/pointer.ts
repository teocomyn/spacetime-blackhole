"use client";

// Position du pointeur partagée par les effets (fond 3D, titre) sans provoquer de rendu React.
// x et y sont normalisés de -1 à 1 (y vers le haut), clientX/Y en pixels.
export const pointer = {
  x: 0,
  y: 0,
  clientX: -9999,
  clientY: -9999,
  active: false,
  lastMove: 0,
};

let started = false;

function update(clientX: number, clientY: number) {
  pointer.clientX = clientX;
  pointer.clientY = clientY;
  pointer.x = (clientX / window.innerWidth) * 2 - 1;
  pointer.y = -((clientY / window.innerHeight) * 2 - 1);
  pointer.active = true;
  pointer.lastMove = performance.now();
}

export function startPointerTracking() {
  if (started || typeof window === "undefined") return;
  started = true;

  window.addEventListener("pointermove", (e) => update(e.clientX, e.clientY), { passive: true });
  window.addEventListener(
    "touchmove",
    (e) => {
      const touch = e.touches[0];
      if (touch) update(touch.clientX, touch.clientY);
    },
    { passive: true }
  );
  window.addEventListener(
    "touchstart",
    (e) => {
      const touch = e.touches[0];
      if (touch) update(touch.clientX, touch.clientY);
    },
    { passive: true }
  );
  window.addEventListener("touchend", () => {
    pointer.active = false;
  });
  document.documentElement.addEventListener("pointerleave", () => {
    pointer.active = false;
  });
  window.addEventListener("blur", () => {
    pointer.active = false;
  });
}
