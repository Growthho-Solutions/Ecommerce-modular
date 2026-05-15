import { createClient } from "@/lib/supabase/server";
import { getCurrentUserRole } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { 
  Plus, 
  Building2, 
  Globe, 
  Users, 
  ArrowUpRight,
  Search,
  MoreVertical
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function StoresPage() {
  const roleMapping = await getCurrentUserRole();
  if (roleMapping?.role !== "superadmin") {
    redirect("/");
  }

  const supabase = await createClient();
  const { data: stores } = await supabase
    .from("stores")
    .select("*, user_roles(count)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter">Store Registry</h1>
          <p className="text-muted-foreground">Manage and provision standalone e-commerce tenants.</p>
        </div>
        
        <Link href="/stores/new">
          <Button className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold shadow-xl shadow-blue-500/20 gap-2">
            <Plus className="h-5 w-5" />
            Provision New Store
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {stores?.map((store) => (
          <div key={store.id} className="group relative bg-white dark:bg-[#12141c] rounded-[2.5rem] border border-border/50 p-8 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
               <Button variant="ghost" size="icon" className="rounded-xl">
                 <MoreVertical className="h-4 w-4" />
               </Button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                  <Building2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight">{store.name}</h3>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">{store.base_currency}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-border/50">
                   <div className="flex items-center gap-2 text-muted-foreground mb-1">
                     <Users className="h-3 w-3" />
                     <span className="text-[10px] font-bold uppercase tracking-widest">Managers</span>
                   </div>
                   <p className="font-black text-lg">{store.user_roles?.[0]?.count || 0}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-border/50">
                   <div className="flex items-center gap-2 text-muted-foreground mb-1">
                     <Globe className="h-3 w-3" />
                     <span className="text-[10px] font-bold uppercase tracking-widest">Status</span>
                   </div>
                   <p className="font-black text-sm text-emerald-500 uppercase tracking-widest">Active</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                <p className="text-[10px] text-muted-foreground font-medium">ID: {store.id.split("-")[0].toUpperCase()}...</p>
                <Link href={`/stores/${store.id}`} className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline">
                  Store Console
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
