import TeachersPage from "@/components/pages/reference/TeachersPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("teachers", "en");

export default function Page() {
  return <TeachersPage locale="en" />;
}
