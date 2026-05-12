import { Sidebar } from "@/components/sidebar";
import { orders } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Eye, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminOrdersPage() {
  return (
    <div className="flex min-h-screen bg-muted/40">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-card flex items-center justify-between px-8">
          <h1 className="text-lg font-bold">Orders</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search orders..." className="pl-9 h-9 w-64 rounded-lg" />
            </div>
            <Button variant="outline" size="sm" className="rounded-lg h-9">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </header>

        <div className="p-8">
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Order ID</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Customer</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Date</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Total</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium">{order.customerName}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">
                      ${order.total}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full",
                        order.status === "delivered" ? "bg-green-100 text-green-700" : 
                        order.status === "shipped" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
                      )}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
