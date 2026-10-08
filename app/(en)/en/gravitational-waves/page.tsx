import WavesPage from "@/components/pages/topics/WavesPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("waves", "en");

export default function Page() {
  return <WavesPage locale="en" />;
}
