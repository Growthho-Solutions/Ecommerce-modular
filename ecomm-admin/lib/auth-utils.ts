import { createClient } from "./supabase/server";

export type UserRole = "superadmin" | "manager";

export interface UserRoleMapping {
  role: UserRole;
  store_id: string | null;
}

/**
 * Fetches the role and store_id for the current authenticated user.
 * Returns null if no role is assigned.
 */
export async function getCurrentUserRole(): Promise<UserRoleMapping | null> {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("user_roles")
    .select("role, store_id")
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    console.error("Error fetching user role:", error);
    return null;
  }

  return {
    role: data.role as UserRole,
    store_id: data.store_id,
  };
}

export async function getAuthStoreId(): Promise<string | null> {
  const role = await getCurrentUserRole();
  return role?.store_id || null;
}

export async function isSuperadmin(): Promise<boolean> {
  const role = await getCurrentUserRole();
  return role?.role === "superadmin";
}
