"use client";

import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/lib/i18n";
import { SECTIONS } from "@/lib/constants";

export default function SkipLink() {
  const { locale } = useApp();
  const t = useTranslation(locale);

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent-blue focus:px-4 focus:py-2 focus:text-sm focus:font-sans focus:text-white focus:outline-none focus:ring-2 focus:ring-accent-cyan"
    >
      {t.skipLink}
    </a>
  );
}
