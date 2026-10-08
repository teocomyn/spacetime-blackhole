import "../../globals.css";
import RootShell, { rootMetadata, rootViewport } from "@/components/layout/RootShell";

export const metadata = rootMetadata("en");
export const viewport = rootViewport;

export default function EnglishRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell locale="en">{children}</RootShell>;
}
