import { Sidebar } from "@/components/sidebar";
import { getCurrentUserRole } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { User, Bell, Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const roleMapping = await getCurrentUserRole();

  if (!roleMapping) {
    redirect("/login?error=unauthorized");
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc] dark:bg-[#0a0c10]">
      <Sidebar className="hidden lg:flex" role={roleMapping.role} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 flex items-center justify-between px-8 border-b bg-white/50 dark:bg-[#12141c]/50 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {roleMapping.role === "superadmin" ? "Platform Control" : "Store Management"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <SettingsIcon className="h-4 w-4" />
            </Button>
            <div className="h-8 w-px bg-border mx-1" />
            <div className="flex items-center gap-3 pl-2">
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold leading-none">Admin User</span>
                <span className="text-[10px] text-muted-foreground uppercase font-medium">{roleMapping.role}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
                <User className="h-5 w-5" />
              </div>
            </div>
            <ThemeSwitcher />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
