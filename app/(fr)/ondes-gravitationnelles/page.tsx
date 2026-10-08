import WavesPage from "@/components/pages/topics/WavesPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("waves", "fr");

export default function Page() {
  return <WavesPage locale="fr" />;
}
