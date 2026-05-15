"use server";

import { createClient } from "@/lib/supabase/server";
import { getStoreId } from "@/lib/store-utils";
import { login as setAuthCookie } from "@/lib/customer-auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function customerLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const storeId = getStoreId();
  const supabase = await createClient();

  const { data: customer, error } = await supabase
    .from("customers")
    .select("*")
    .eq("email", email)
    .eq("store_id", storeId)
    .single();

  if (error || !customer) {
    return { error: "Invalid email or password" };
  }

  const passwordMatch = await bcrypt.compare(password, customer.password_hash);
  if (!passwordMatch) {
    return { error: "Invalid email or password" };
  }

  await setAuthCookie({
    id: customer.id,
    email: customer.email,
    name: customer.name
  });

  redirect("/");
}

export async function customerSignup(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const storeId = getStoreId();
  const supabase = await createClient();

  // Check if customer already exists in this store
  const { data: existing } = await supabase
    .from("customers")
    .select("id")
    .eq("email", email)
    .eq("store_id", storeId)
    .single();

  if (existing) {
    return { error: "Email already registered for this store" };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const { data: customer, error } = await supabase
    .from("customers")
    .insert({
      name,
      email,
      password_hash: passwordHash,
      store_id: storeId
    })
    .select()
    .single();

  if (error) {
    return { error: "Failed to create account" };
  }

  await setAuthCookie({
    id: customer.id,
    email: customer.email,
    name: customer.name
  });

  redirect("/");
}

export async function customerLogout() {
  const { logout } = await import("@/lib/customer-auth");
  await logout();
  redirect("/login");
}

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get("email") as string;
  const storeId = getStoreId();
  const supabase = await createClient();

  const { data: customer } = await supabase
    .from("customers")
    .select("id")
    .eq("email", email)
    .eq("store_id", storeId)
    .single();

  if (!customer) {
    // Return success anyway to prevent email enumeration
    return { success: true };
  }

  const token = Math.random().toString(36).substring(2, 15);
  const expiresAt = new Date(Date.now() + 3600000).toISOString(); // 1 hour

  await supabase.from("password_reset_tokens").insert({
    customer_id: customer.id,
    token,
    expires_at: expiresAt
  });

  // Mock Email Sending
  console.log(`[MOCK EMAIL] Password reset for ${email}: /reset-password?token=${token}`);

  return { success: true };
}

export async function resetPassword(formData: FormData) {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { data: resetToken, error: tokenError } = await supabase
    .from("password_reset_tokens")
    .select("*, customers(*)")
    .eq("token", token)
    .gt("expires_at", new Date().toISOString())
    .single();

  if (tokenError || !resetToken) {
    return { error: "Invalid or expired token" };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  
  await supabase
    .from("customers")
    .update({ password_hash: passwordHash })
    .eq("id", resetToken.customer_id);

  // Cleanup token
  await supabase.from("password_reset_tokens").delete().eq("id", resetToken.id);

  return { success: true };
}
