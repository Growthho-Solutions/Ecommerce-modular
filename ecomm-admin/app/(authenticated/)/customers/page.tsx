import { getCurrentUserRole } from "@/lib/auth-utils";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { 
  Users, 
  Search, 
  Mail, 
  Calendar,
  DollarSign,
  ShoppingBag
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default async function AdminCustomersPage() {
  const roleMapping = await getCurrentUserRole();
  const supabase = await createClient();

  if (!roleMapping || roleMapping.role !== "manager" || !roleMapping.store_id) {
    redirect("/");
  }

  // Fetch customers with their order count and total spent
  const { data: customers, error } = await supabase
    .from("customers")
    .select(`
      *,
      orders (
        total_amount,
        created_at
      )
    `)
    .eq("store_id", roleMapping.store_id)
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-8 text-red-500 text-center font-bold">Error loading customers.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Customers</h1>
          <p className="text-muted-foreground text-lg">Manage and analyze your customer base and their purchasing habits.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search customers..." 
            className="pl-10 h-12 w-full md:w-72 rounded-2xl bg-white dark:bg-[#12141c] border-border/50 shadow-sm" 
          />
        </div>
      </div>

      <div className="glass-card rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-muted-foreground border-b bg-slate-50/50 dark:bg-white/5">
                <th className="px-8 py-5 font-bold">Customer</th>
                <th className="px-8 py-5 font-bold text-center">Orders</th>
                <th className="px-8 py-5 font-bold text-center">Total Spent</th>
                <th className="px-8 py-5 font-bold text-center">Last Order</th>
                <th className="px-8 py-5 font-bold text-center">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {customers?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center opacity-40">
                    <Users className="h-12 w-12 mx-auto mb-4" />
                    <p className="text-lg font-medium">No customers yet</p>
                  </td>
                </tr>
              )}
              {customers?.map((customer) => {
                const totalSpent = customer.orders?.reduce((acc: number, o: any) => acc + o.total_amount, 0) || 0;
                const orderCount = customer.orders?.length || 0;
                const lastOrderDate = customer.orders?.length > 0 
                  ? new Date(Math.max(...customer.orders.map((o: any) => new Date(o.created_at).getTime())))
                  : null;

                return (
                  <tr key={customer.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-sm block">{customer.name}</span>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                            <Mail className="h-3 w-3" />
                            {customer.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-100 dark:bg-white/5 font-bold text-xs">
                        <ShoppingBag className="h-3 w-3 opacity-50" />
                        {orderCount}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center font-black text-sm text-blue-600">
                      ${(totalSpent / 100).toFixed(2)}
                    </td>
                    <td className="px-8 py-6 text-center text-xs font-medium text-muted-foreground">
                      {lastOrderDate 
                        ? lastOrderDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                        : "Never"}
                    </td>
                    <td className="px-8 py-6 text-center">
                       <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3 opacity-50" />
                        {new Date(customer.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                       </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
