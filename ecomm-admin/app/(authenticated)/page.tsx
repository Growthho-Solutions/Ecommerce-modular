import { Sidebar } from "@/components/sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { products, orders } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  ShoppingCart,
  Users,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { label: "Total Revenue", value: "$45,231.89", change: "+20.1%", trend: "up", icon: BarChart3 },
    { label: "Subscriptions", value: "+2350", change: "+180.1%", trend: "up", icon: Users },
    { label: "Sales", value: "+12,234", change: "+19%", trend: "up", icon: ShoppingCart },
    { label: "Active Now", value: "+573", change: "+201", trend: "up", icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen bg-muted/40">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-card flex items-center justify-between px-8">
          <h1 className="text-lg font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
              JD
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 overflow-y-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card p-6 rounded-2xl border border-border/50 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className={cn(
                    "flex items-center text-xs font-medium px-2 py-1 rounded-full",
                    stat.trend === "up" ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"
                  )}>
                    {stat.change}
                    {stat.trend === "up" ? <ArrowUpRight className="ml-1 h-3 w-3" /> : <ArrowDownRight className="ml-1 h-3 w-3" />}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border/50 flex items-center justify-between">
                <h2 className="font-bold">Recent Orders</h2>
                <button className="text-xs font-medium text-primary hover:underline">View All</button>
              </div>
              <div className="divide-y divide-border/50">
                {orders.map((order) => (
                  <div key={order.id} className="p-6 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.id} • {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">${order.total}</p>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                        order.status === "delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                      )}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border/50 flex items-center justify-between">
                <h2 className="font-bold">Top Products</h2>
                <button className="text-xs font-medium text-primary hover:underline">Manage</button>
              </div>
              <div className="divide-y divide-border/50">
                {products.slice(0, 4).map((product) => (
                  <div key={product.id} className="p-6 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-muted flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">${product.price}</p>
                      <p className="text-xs text-muted-foreground">{product.stock_quantity} in stock</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

