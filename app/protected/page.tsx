import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { InfoIcon, User, Key, Settings } from "lucide-react";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

/**
 * Fetch and display user details.
 */
async function UserDetails() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth/login");
  }

  return (
    <pre className="text-xs font-mono p-4 rounded-lg bg-muted/50 overflow-auto max-h-[400px]">
      {JSON.stringify(user, null, 2)}
    </pre>
  );
}

/**
 * Protected Dashboard page.
 * Provides a starting point for authenticated user features.
 */
export default function ProtectedPage() {
  return (
    <div className="space-y-12">
      {/* Welcome Banner */}
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight">Your Dashboard</h1>
        <div className="bg-primary/5 text-primary border border-primary/10 p-4 rounded-2xl flex gap-3 items-center text-sm">
          <InfoIcon size={18} />
          <span>This is a protected area. You are currently authenticated.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Details Card */}
        <Card className="md:col-span-2 overflow-hidden border-none shadow-sm ring-1 ring-border/50">
          <CardHeader className="bg-muted/30">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User size={20} />
              Session Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
              <UserDetails />
            </Suspense>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="border-none shadow-sm ring-1 ring-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <DashboardAction icon={<Settings size={16} />} label="Account Settings" />
            <DashboardAction icon={<Key size={16} />} label="Security & Privacy" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/**
 * Helper component for dashboard actions.
 */
function DashboardAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-3 w-full p-3 text-sm font-medium rounded-xl hover:bg-muted transition-colors text-left">
      {icon}
      {label}
    </button>
  );
}
