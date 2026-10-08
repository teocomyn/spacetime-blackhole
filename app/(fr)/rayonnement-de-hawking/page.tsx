import HawkingPage from "@/components/pages/topics/HawkingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("hawking", "fr");

export default function Page() {
  return <HawkingPage locale="fr" />;
}
