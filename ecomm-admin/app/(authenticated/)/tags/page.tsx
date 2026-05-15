import { getCurrentUserRole } from "@/lib/auth-utils";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { TagManager } from "@/components/tag-manager";

export default async function TagsPage() {
  const roleMapping = await getCurrentUserRole();
  const supabase = await createClient();

  if (!roleMapping || roleMapping.role !== "manager" || !roleMapping.store_id) {
    redirect("/");
  }

  const { data: tags, error } = await supabase
    .from("tags")
    .select("*")
    .eq("store_id", roleMapping.store_id)
    .order("name", { ascending: true });

  if (error) {
    return <div className="p-8 text-red-500 text-center font-bold text-xl">Error loading tags.</div>;
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Tag Management</h1>
        <p className="text-muted-foreground text-lg">Organize your products with custom tags and categories.</p>
      </div>

      <TagManager initialTags={tags || []} storeId={roleMapping.store_id} />
    </div>
  );
}
