"use client";

import { RefObject, useEffect, useState } from "react";

export function useIntersectionActive(
  ref: RefObject<Element | null>,
  threshold = 0.05,
  rootMargin = "0px"
): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return active;
}

export function useHasEntered(active: boolean): boolean {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (active) setEntered(true);
  }, [active]);

  return entered;
}
