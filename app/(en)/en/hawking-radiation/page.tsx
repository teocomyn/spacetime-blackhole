import HawkingPage from "@/components/pages/topics/HawkingPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("hawking", "en");

export default function Page() {
  return <HawkingPage locale="en" />;
}
