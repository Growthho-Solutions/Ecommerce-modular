import { getCurrentUserRole } from "@/lib/auth-utils";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { 
  BarChart3, 
  ShoppingCart, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Store,
  Package,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function DashboardPage() {
  const roleMapping = await getCurrentUserRole();
  const supabase = await createClient();

  if (!roleMapping) {
    redirect("/login");
  }

  const isSuperadmin = roleMapping.role === "superadmin";

  if (isSuperadmin) {
    // Superadmin Dashboard Data
    const { count: storeCount } = await supabase.from("stores").select("*", { count: "exact", head: true });
    const { data: allOrders } = await supabase.from("orders").select("total_amount").not("status", "eq", "cancelled");
    const { count: customerCount } = await supabase.from("customers").select("*", { count: "exact", head: true });
    
    const totalRevenue = allOrders?.reduce((acc, order) => acc + order.total_amount, 0) || 0;

    const stats = [
      { label: "Total Stores", value: storeCount?.toString() || "0", change: "+2", trend: "up", icon: Store },
      { label: "Platform Revenue", value: `$${(totalRevenue / 100).toLocaleString()}`, change: "+12.5%", trend: "up", icon: BarChart3 },
      { label: "Total Customers", value: customerCount?.toString() || "0", change: "+180", trend: "up", icon: Users },
      { label: "Active Orders", value: allOrders?.length.toString() || "0", change: "+4", trend: "up", icon: ShoppingCart },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Platform Overview</h1>
          <p className="text-muted-foreground text-lg">Central control for all Growthho ecosystem stores.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-6 rounded-[2rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest",
                  stat.trend === "up" ? "text-emerald-500 bg-emerald-500/10" : "text-red-500 bg-red-500/10"
                )}>
                  {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-black mt-1 tracking-tight">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm">
             <h3 className="text-xl font-bold mb-6">Recent Store Activity</h3>
             <p className="text-sm text-muted-foreground italic">Coming soon: Store performance comparison charts.</p>
           </div>
           <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm">
             <h3 className="text-xl font-bold mb-6">System Health</h3>
             <div className="flex items-center gap-3 text-emerald-500">
               <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
               <span className="font-bold text-sm uppercase tracking-widest">All Systems Operational</span>
             </div>
           </div>
        </div>
      </div>
    );
  }

  // Manager Dashboard View
  const { data: storeOrders } = await supabase
    .from("orders")
    .select("total_amount, status, created_at, customers(name)")
    .eq("store_id", roleMapping.store_id)
    .not("status", "eq", "cancelled")
    .order("created_at", { ascending: false });
  
  const { data: variants } = await supabase
    .from("product_variants")
    .select("stock_quantity")
    .eq("is_active", true);
  
  const lowStockCount = variants?.filter(v => v.stock_quantity < 10).length || 0;
  const totalSales = storeOrders?.reduce((acc, o) => acc + o.total_amount, 0) || 0;
  const orderCount = storeOrders?.length || 0;

  const managerStats = [
    { label: "Total Sales", value: `$${(totalSales / 100).toLocaleString()}`, change: "+8.2%", trend: "up", icon: TrendingUp },
    { label: "Total Orders", value: orderCount.toString(), change: "+12", trend: "up", icon: ShoppingCart },
    { label: "Avg. Order Value", value: `$${orderCount > 0 ? ((totalSales / orderCount) / 100).toFixed(2) : "0.00"}`, change: "+2.1%", trend: "up", icon: BarChart3 },
    { label: "Low Stock Alerts", value: lowStockCount.toString(), change: lowStockCount > 0 ? "Action needed" : "Healthy", trend: lowStockCount > 0 ? "down" : "up", icon: AlertTriangle },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Store Dashboard</h1>
        <p className="text-muted-foreground text-lg">Real-time performance metrics for your store.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {managerStats.map((stat) => (
          <div key={stat.label} className="glass-card p-6 rounded-[2rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest",
                stat.trend === "up" ? "text-emerald-500 bg-emerald-500/10" : "text-red-500 bg-red-500/10"
              )}>
                {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black mt-1 tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders List */}
        <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Recent Orders</h3>
            <Link href="/orders" className="text-xs font-bold text-blue-600 hover:underline uppercase tracking-widest">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {storeOrders?.slice(0, 5).map((order: any, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-border/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-black/20 flex items-center justify-center text-xs font-bold border border-border/50">
                    #{i + 1}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{order.customers?.name || "Guest"}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-blue-600">${(order.total_amount / 100).toFixed(2)}</p>
                  <span className="text-[9px] font-bold uppercase tracking-widest opacity-50">{order.status}</span>
                </div>
              </div>
            ))}
            {storeOrders?.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">No orders yet.</p>
            )}
          </div>
        </div>

        {/* Quick Actions / Alerts */}
        <div className="space-y-8">
           <div className="glass-card p-8 rounded-[2.5rem] bg-blue-600 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden group">
             <div className="relative z-10">
               <h3 className="text-xl font-bold mb-2">Grow your sales</h3>
               <p className="text-blue-100 text-sm mb-6 max-w-[200px]">Create a new discount code to boost conversion rate.</p>
               <Link href="/discounts">
                 <button className="px-6 py-3 bg-white text-blue-600 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-blue-50 transition-colors">
                    Create Discount
                 </button>
               </Link>
             </div>
             <TrendingUp className="absolute -right-4 -bottom-4 h-32 w-32 text-white/10 group-hover:scale-110 transition-transform duration-700" />
           </div>

           <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm">
             <h3 className="text-lg font-bold mb-4">Stock Alerts</h3>
             {lowStockCount > 0 ? (
               <div className="flex items-center gap-3 text-amber-500">
                 <AlertTriangle className="h-5 w-5" />
                 <span className="font-bold text-xs uppercase tracking-widest">{lowStockCount} items running low on stock</span>
               </div>
             ) : (
               <p className="text-sm text-muted-foreground italic">All products are well stocked.</p>
             )}
           </div>
        </div>
      </div>
    </div>
  );
}
