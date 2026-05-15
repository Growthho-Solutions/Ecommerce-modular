"use server";

import { createClient } from "@/lib/supabase/server";
import { getStoreId } from "@/lib/store-utils";
import bcrypt from "bcryptjs";
import { login } from "@/lib/customer-auth";
import { redirect } from "next/navigation";

export async function claimAccount(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const storeId = getStoreId();
  const supabase = await createClient();

  // 1. Find the shadow account
  const { data: customer, error } = await supabase
    .from("customers")
    .select("*")
    .eq("email", email)
    .eq("store_id", storeId)
    .single();

  if (error || !customer) {
    return { error: "Account not found" };
  }

  if (customer.password_hash) {
    return { error: "Account already claimed. Please log in." };
  }

  // 2. Set the password
  const passwordHash = await bcrypt.hash(password, 10);
  
  const { error: updateError } = await supabase
    .from("customers")
    .update({ password_hash: passwordHash })
    .eq("id", customer.id);

  if (updateError) return { error: "Failed to claim account" };

  // 3. Log them in
  await login({
    id: customer.id,
    email: customer.email,
    name: customer.name
  });

  redirect("/profile");
}
