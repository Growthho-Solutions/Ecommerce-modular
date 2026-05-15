import { getCurrentUserRole } from "@/lib/auth-utils";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DiscountManager } from "@/components/discount-manager";

export default async function DiscountsPage() {
  const roleMapping = await getCurrentUserRole();
  const supabase = await createClient();

  if (!roleMapping || roleMapping.role !== "manager" || !roleMapping.store_id) {
    redirect("/");
  }

  const { data: discounts, error } = await supabase
    .from("discounts")
    .select("*")
    .eq("store_id", roleMapping.store_id)
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-8 text-red-500 text-center font-bold">Error loading discounts.</div>;
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Promotions & Discounts</h1>
        <p className="text-muted-foreground text-lg">Create and manage coupon codes to drive more sales.</p>
      </div>

      <DiscountManager initialDiscounts={discounts || []} storeId={roleMapping.store_id} />
    </div>
  );
}
