import "../globals.css";
import RootShell, { rootMetadata, rootViewport } from "@/components/layout/RootShell";

export const metadata = rootMetadata("fr");
export const viewport = rootViewport;

export default function FrenchRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell locale="fr">{children}</RootShell>;
}
