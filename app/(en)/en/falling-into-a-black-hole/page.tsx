import FallingInPage from "@/components/pages/topics/FallingInPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("fallingIn", "en");

export default function Page() {
  return <FallingInPage locale="en" />;
}
