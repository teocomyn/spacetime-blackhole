import ParadoxPage from "@/components/pages/topics/ParadoxPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("paradox", "en");

export default function Page() {
  return <ParadoxPage locale="en" />;
}
