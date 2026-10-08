import BlackHolesPage from "@/components/pages/topics/BlackHolesPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("blackHoles", "fr");

export default function Page() {
  return <BlackHolesPage locale="fr" />;
}
