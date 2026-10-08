"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { findPageByPath, pagePath } from "@/lib/routes";

export default function LanguageToggle({
  className = "fixed top-6 left-6 z-[120]",
}: {
  className?: string;
}) {
  const { locale } = useApp();
  const pathname = usePathname();
  const target = locale === "fr" ? "en" : "fr";
  const match = findPageByPath(pathname);
  const href = pagePath(match?.key ?? "home", target);

  return (
    <Link
      href={href}
      hrefLang={target}
      lang={target}
      className={`${className} rounded-full border border-white/10 bg-bg-panel/80 px-3 py-1.5 font-sans text-[10px] uppercase tracking-widest text-text-secondary backdrop-blur-md transition-colors hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan`}
      aria-label={target === "en" ? "English version" : "Version française"}
    >
      {target.toUpperCase()}
    </Link>
  );
}
