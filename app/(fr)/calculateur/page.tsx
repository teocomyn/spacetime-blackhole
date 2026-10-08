import CalculatorPage from "@/components/pages/tools/CalculatorPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("calculator", "fr");

export default function Page() {
  return <CalculatorPage locale="fr" />;
}
