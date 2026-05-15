"use server";

import { createClient } from "@/lib/supabase/server";
import { getCustomerSession } from "@/lib/customer-auth";
import { revalidatePath } from "next/cache";

export async function addAddress(formData: FormData) {
  const session = await getCustomerSession();
  if (!session?.customer?.id) return { error: "Unauthorized" };

  const supabase = await createClient();
  
  const address = {
    customer_id: session.customer.id,
    address_line1: formData.get("address_line1") as string,
    address_line2: formData.get("address_line2") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    postal_code: formData.get("postal_code") as string,
    country: formData.get("country") as string,
    is_default: formData.get("is_default") === "on",
  };

  if (address.is_default) {
    // Unset other defaults
    await supabase
      .from("customer_addresses")
      .update({ is_default: false })
      .eq("customer_id", session.customer.id);
  }

  const { error } = await supabase.from("customer_addresses").insert(address);

  if (error) return { error: "Failed to add address" };

  revalidatePath("/profile");
  return { success: true };
}

export async function deleteAddress(addressId: string) {
  const session = await getCustomerSession();
  if (!session?.customer?.id) return { error: "Unauthorized" };

  const supabase = await createClient();

  const { error } = await supabase
    .from("customer_addresses")
    .delete()
    .eq("id", addressId)
    .eq("customer_id", session.customer.id);

  if (error) return { error: "Failed to delete address" };

  revalidatePath("/profile");
  return { success: true };
}
