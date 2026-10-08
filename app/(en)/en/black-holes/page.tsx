import BlackHolesPage from "@/components/pages/topics/BlackHolesPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("blackHoles", "en");

export default function Page() {
  return <BlackHolesPage locale="en" />;
}
