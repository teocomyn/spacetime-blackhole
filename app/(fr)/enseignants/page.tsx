import TeachersPage from "@/components/pages/reference/TeachersPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("teachers", "fr");

export default function Page() {
  return <TeachersPage locale="fr" />;
}
