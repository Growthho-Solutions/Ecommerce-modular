import { getCurrentUserRole } from "@/lib/auth-utils";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Eye, Search, Filter, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const roleMapping = await getCurrentUserRole();
  const supabase = await createClient();

  if (!roleMapping || roleMapping.role !== "manager" || !roleMapping.store_id) {
    redirect("/");
  }

  const currentStatus = searchParams.status || "all";

  let query = supabase
    .from("orders")
    .select(`
      *,
      customers (
        name,
        email
      )
    `)
    .eq("store_id", roleMapping.store_id)
    .order("created_at", { ascending: false });

  if (currentStatus !== "all") {
    query = query.eq("status", currentStatus);
  }

  const { data: orders, error } = await query;

  if (error) {
    return <div className="p-8 text-red-500 text-center font-bold">Error loading orders.</div>;
  }

  const statuses = [
    { label: "All Orders", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Paid", value: "paid" },
    { label: "Shipped", value: "shipped" },
    { label: "Delivered", value: "delivered" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Orders</h1>
          <p className="text-muted-foreground text-lg">Track and manage your store's sales and fulfillment.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by order ID or customer..." 
              className="pl-10 h-12 w-full md:w-72 rounded-2xl bg-white dark:bg-[#12141c] border-border/50 shadow-sm" 
            />
          </div>
          <Button variant="outline" className="h-12 w-12 rounded-2xl border-border/50 bg-white dark:bg-[#12141c] p-0">
            <Filter className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {statuses.map((s) => (
          <Link
            key={s.value}
            href={`/orders${s.value === "all" ? "" : `?status=${s.value}`}`}
            className={cn(
              "px-6 py-3 rounded-2xl text-sm font-bold transition-all border whitespace-nowrap",
              currentStatus === s.value
                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "bg-white dark:bg-[#12141c] border-border/50 text-muted-foreground hover:border-blue-500/50"
            )}
          >
            {s.label}
          </Link>
        ))}
      </div>

      <div className="glass-card rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-muted-foreground border-b bg-slate-50/50 dark:bg-white/5">
                <th className="px-8 py-5 font-bold">Order ID</th>
                <th className="px-8 py-5 font-bold">Customer</th>
                <th className="px-8 py-5 font-bold text-center">Date</th>
                <th className="px-8 py-5 font-bold text-center">Amount</th>
                <th className="px-8 py-5 font-bold text-center">Status</th>
                <th className="px-8 py-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {orders?.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center opacity-40">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-4" />
                    <p className="text-lg font-medium">No orders found</p>
                    <p className="text-sm mt-1">Orders will appear here once customers start buying.</p>
                  </td>
                </tr>
              )}
              {orders?.map((order) => (
                <tr key={order.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all">
                  <td className="px-8 py-6">
                    <span className="font-mono text-xs font-bold bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-lg">
                      {order.id.split("-")[0].toUpperCase()}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div>
                      <span className="font-bold text-sm block">{order.customers?.name || "Guest Customer"}</span>
                      <span className="text-xs text-muted-foreground">{order.customers?.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="font-bold text-sm">
                      ${(order.total_amount / 100).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={cn(
                      "text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border",
                      order.status === "delivered" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : 
                      order.status === "shipped" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" : 
                      order.status === "paid" ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" :
                      "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link href={`/orders/${order.id}`}>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-blue-500/10 hover:text-blue-600 transition-all">
                        <Eye className="h-5 w-5" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
