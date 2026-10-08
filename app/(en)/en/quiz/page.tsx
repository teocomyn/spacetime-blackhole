import QuizPage from "@/components/pages/tools/QuizPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("quiz", "en");

export default function Page() {
  return <QuizPage locale="en" />;
}
