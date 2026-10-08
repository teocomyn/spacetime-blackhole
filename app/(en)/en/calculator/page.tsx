import CalculatorPage from "@/components/pages/tools/CalculatorPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("calculator", "en");

export default function Page() {
  return <CalculatorPage locale="en" />;
}
