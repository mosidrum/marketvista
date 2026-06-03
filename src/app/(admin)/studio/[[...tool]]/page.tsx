import { NextStudio } from "next-sanity/studio";
import config from "../../../../../sanity.config";
import { AdminGuard } from "@/app/components/admin/AdminGuard";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return (
    <AdminGuard>
      <NextStudio config={config} />
    </AdminGuard>
  );
}
