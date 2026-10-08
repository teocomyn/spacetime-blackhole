import { socialImage } from "@/lib/brandImages";

export const dynamic = "force-static";

export function GET() {
  return socialImage("en");
}
