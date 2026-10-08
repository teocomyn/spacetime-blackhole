import ParadoxPage from "@/components/pages/topics/ParadoxPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("paradox", "fr");

export default function Page() {
  return <ParadoxPage locale="fr" />;
}
