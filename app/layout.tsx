import type { Metadata } from "next";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Emergent Spacetime | L'espace n'existe pas",
  description: "Une expérience interactive explorant comment l'espace-temps pourrait émerge de l'information quantique et de l'intrication.",
  openGraph: {
    title: "Emergent Spacetime",
    description: "L'univers n'est pas fait de matière dans l'espace-temps. L'espace-temps est la façon dont l'information s'organise.",
    url: "https://emergent-spacetime.vercel.app",
    siteName: "Emergent Spacetime",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className="antialiased font-sans text-text-primary bg-bg-primary overflow-x-hidden">
        <ScrollProgress />
        <GrainOverlay />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
