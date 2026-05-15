import { getCurrentUserRole } from "@/lib/auth-utils";
import { createClient } from "@/lib/supabase/server";
import { 
  BarChart3, 
  ShoppingCart, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Store,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";

export default async function DashboardPage() {
  const roleMapping = await getCurrentUserRole();
  const supabase = await createClient();

  if (roleMapping?.role === "superadmin") {
    // Superadmin Dashboard Data
    const { count: storeCount } = await supabase.from("stores").select("*", { count: "exact", head: true });
    const { data: orders } = await supabase.from("orders").select("total_amount");
    const totalRevenue = orders?.reduce((acc, order) => acc + order.total_amount, 0) || 0;

    const stats = [
      { label: "Total Stores", value: storeCount?.toString() || "0", change: "+2", trend: "up", icon: Store },
      { label: "Platform Revenue", value: `$${(totalRevenue / 100).toLocaleString()}`, change: "+12.5%", trend: "up", icon: BarChart3 },
      { label: "Total Customers", value: "1,240", change: "+180", trend: "up", icon: Users },
      { label: "Active Subscriptions", value: "84", change: "+4", trend: "up", icon: ShoppingCart },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Platform Overview</h1>
          <p className="text-muted-foreground text-lg">Central control for all Growthho ecosystem stores.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-6 rounded-3xl bg-white dark:bg-[#12141c] border border-border/50 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-full",
                  stat.trend === "up" ? "text-emerald-500 bg-emerald-500/10" : "text-red-500 bg-red-500/10"
                )}>
                  {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Recent Store Signups</h3>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-xs font-bold text-muted-foreground">S{i}</div>
                    <div>
                      <p className="text-sm font-bold">Store Name {i}</p>
                      <p className="text-xs text-muted-foreground">manager{i}@example.com</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-600">Active</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm">
            <h3 className="text-xl font-bold mb-6">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                <span className="text-sm font-medium">Database Node</span>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Operational</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                <span className="text-sm font-medium">Edge Functions</span>
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Manager Dashboard View
  const { data: storeOrders } = await supabase
    .from("orders")
    .select("total_amount, status")
    .eq("store_id", roleMapping?.store_id);
  
  const totalSales = storeOrders?.reduce((acc, o) => acc + o.total_amount, 0) || 0;
  const orderCount = storeOrders?.length || 0;

  const managerStats = [
    { label: "Total Sales", value: `$${(totalSales / 100).toLocaleString()}`, change: "+8.2%", trend: "up", icon: BarChart3 },
    { label: "Total Orders", value: orderCount.toString(), change: "+12", trend: "up", icon: ShoppingCart },
    { label: "Avg. Order Value", value: `$${orderCount > 0 ? ((totalSales / orderCount) / 100).toFixed(2) : "0.00"}`, change: "+2.1%", trend: "up", icon: BarChart3 },
    { label: "Low Stock", value: "3", change: "-1", trend: "down", icon: Package },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Store Dashboard</h1>
        <p className="text-muted-foreground text-lg">Manage your products, orders, and customer relationships.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {managerStats.map((stat) => (
          <div key={stat.label} className="glass-card p-6 rounded-3xl bg-white dark:bg-[#12141c] border border-border/50 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-full",
                stat.trend === "up" ? "text-emerald-500 bg-emerald-500/10" : "text-red-500 bg-red-500/10"
              )}>
                {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-widest text-muted-foreground border-b">
                  <th className="pb-4 font-semibold">Order ID</th>
                  <th className="pb-4 font-semibold">Customer</th>
                  <th className="pb-4 font-semibold">Amount</th>
                  <th className="pb-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-4 text-sm font-mono">ORD-00{i}</td>
                    <td className="py-4 text-sm font-bold">John Doe {i}</td>
                    <td className="py-4 text-sm font-bold">$129.00</td>
                    <td className="py-4">
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 uppercase tracking-widest">Processing</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Top Products</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5" />
                <div className="flex-1">
                  <p className="text-sm font-bold">Premium T-Shirt {i}</p>
                  <p className="text-xs text-muted-foreground">124 sold</p>
                </div>
                <span className="text-sm font-bold">$24.00</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
