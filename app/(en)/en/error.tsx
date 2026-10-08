"use client";

import { useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { locale } = useApp();
  const t = useTranslation(locale);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg-primary px-6 text-center">
      <h1 className="font-sans text-3xl text-white">{t.error.title}</h1>
      <p className="max-w-md text-text-secondary">{t.error.desc}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full border border-accent-blue/40 px-6 py-3 font-sans text-xs tracking-widest text-accent-cyan hover:bg-accent-blue/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan"
      >
        {t.error.retry}
      </button>
    </div>
  );
}
