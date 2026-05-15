"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createStore(formData: FormData) {
  const roleMapping = await getCurrentUserRole();
  if (roleMapping?.role !== "superadmin") {
    return { error: "Unauthorized" };
  }

  const supabase = await createClient();
  
  const name = formData.get("name") as string;
  const baseCurrency = formData.get("baseCurrency") as string;
  const supportEmail = formData.get("supportEmail") as string;

  const { data: store, error } = await supabase
    .from("stores")
    .insert({
      name,
      base_currency: baseCurrency,
      support_email: supportEmail
    })
    .select()
    .single();

  if (error) {
    return { error: "Failed to provision store" };
  }

  revalidatePath("/stores");
  redirect("/stores");
}
