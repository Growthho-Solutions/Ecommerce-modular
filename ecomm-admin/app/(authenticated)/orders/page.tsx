import { createClient } from "@/lib/supabase/server";
import { getAuthStoreId, isSuperadmin } from "@/lib/auth-utils";
import { Button } from "@/components/ui/button";
import { Eye, Search, Filter, ShoppingBag, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/store-utils";
import Link from "next/link";
import { DeleteOrderButton } from "@/components/delete-order-button";

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const storeId = await getAuthStoreId();
  
  const query = supabase
    .from("orders")
    .select(`
      *,
      customers (name, email)
    `)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (!isSuperadmin()) {
    query.eq("store_id", storeId);
  }

  const { data: orders } = await query;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter">Order Hub</h1>
          <p className="text-muted-foreground">Monitor transactions and manage fulfillment across your store.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-blue-600 transition-colors" />
            <Input placeholder="Search orders..." className="pl-11 h-12 w-64 rounded-2xl bg-white dark:bg-[#12141c] border-border/50 focus:border-blue-500/50 shadow-sm transition-all" />
          </div>
          <Button variant="outline" className="h-12 px-6 rounded-2xl border-border/50 bg-white dark:bg-[#12141c] font-bold gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#12141c] rounded-[2.5rem] border border-border/50 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/50 bg-slate-50/50 dark:bg-white/5">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Order</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Customer</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Amount</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {orders?.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm tracking-tight uppercase italic">#{order.id.split("-")[0]}</span>
                      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-muted-foreground">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold">{order.customers?.name || "Guest"}</span>
                      <span className="text-[10px] text-muted-foreground">{order.customers?.email || "Guest Checkout"}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-black text-blue-600">{formatCurrency(order.total_amount)}</span>
                </td>
                <td className="px-8 py-6">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border ${
                    order.status === "paid" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                    order.status === "shipped" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                    "bg-amber-500/10 text-amber-500 border-amber-500/20"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/orders/${order.id}`}>
                      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-blue-600/10 hover:text-blue-600">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <DeleteOrderButton id={order.id} />
                  </div>
                </td>
              </tr>
            ))}
            {(!orders || orders.length === 0) && (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                   <div className="space-y-3 opacity-30">
                      <ShoppingBag className="h-12 w-12 mx-auto" />
                      <p className="font-bold uppercase tracking-widest text-xs">No orders found</p>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
