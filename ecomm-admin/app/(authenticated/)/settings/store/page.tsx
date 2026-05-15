import { getCurrentUserRole } from "@/lib/auth-utils";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { StoreForm } from "@/components/store-form";

export default async function StoreSettingsPage() {
  const roleMapping = await getCurrentUserRole();
  const supabase = await createClient();

  if (!roleMapping || roleMapping.role !== "manager" || !roleMapping.store_id) {
    // Only Managers can manage their specific store settings
    // Superadmins manage stores via the "Stores" menu
    redirect("/");
  }

  const { data: store, error } = await supabase
    .from("stores")
    .select("*")
    .eq("id", roleMapping.store_id)
    .single();

  if (error || !store) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-500">Error loading store settings</h2>
        <p className="text-muted-foreground">Please contact support if this persists.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Store Configuration</h1>
        <p className="text-muted-foreground text-lg">Update your store's identity and basic settings.</p>
      </div>

      <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm">
        <StoreForm store={store} />
      </div>
    </div>
  );
}
