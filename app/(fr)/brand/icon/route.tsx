import { iconImage } from "@/lib/brandImages";

export const dynamic = "force-static";

export function GET() {
  return iconImage();
}
