"use client";

import { RefObject, useEffect, useState } from "react";

export function useIntersectionActive(
  ref: RefObject<Element | null>,
  threshold = 0.05
): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return active;
}
