import SourcesPage from "@/components/pages/reference/SourcesPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("sources", "fr");

export default function Page() {
  return <SourcesPage locale="fr" />;
}
