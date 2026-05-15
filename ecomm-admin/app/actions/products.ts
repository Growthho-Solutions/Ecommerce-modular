"use server";

import { createClient } from "@/lib/supabase/server";
import { getAuthStoreId, isSuperadmin } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: string) {
  const supabase = await createClient();
  const storeId = await getAuthStoreId();

  const query = supabase
    .from("products")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", productId);

  if (!isSuperadmin()) {
    query.eq("store_id", storeId);
  }

  const { error } = await query;

  if (error) return { error: "Failed to delete product" };

  revalidatePath("/products");
  return { success: true };
}
