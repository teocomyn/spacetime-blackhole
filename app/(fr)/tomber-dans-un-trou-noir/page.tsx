import FallingInPage from "@/components/pages/topics/FallingInPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("fallingIn", "fr");

export default function Page() {
  return <FallingInPage locale="fr" />;
}
