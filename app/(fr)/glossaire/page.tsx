import GlossaryPage from "@/components/pages/reference/GlossaryPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("glossary", "fr");

export default function Page() {
  return <GlossaryPage locale="fr" />;
}
