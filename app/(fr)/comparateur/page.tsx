import ScalePage from "@/components/pages/tools/ScalePage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("scale", "fr");

export default function Page() {
  return <ScalePage locale="fr" />;
}
