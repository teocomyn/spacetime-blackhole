import QuizPage from "@/components/pages/tools/QuizPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("quiz", "fr");

export default function Page() {
  return <QuizPage locale="fr" />;
}
