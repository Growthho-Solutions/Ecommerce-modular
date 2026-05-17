import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
  LogOut,
  Store,
  Ticket
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserRole } from "@/lib/auth-utils";

interface SidebarProps {
  className?: string;
  role: UserRole;
}

export function Sidebar({ className, role }: SidebarProps) {
  const menuItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard, roles: ["superadmin", "manager"] },
    { label: "Stores", href: "/stores", icon: Store, roles: ["superadmin"] },
    { label: "Products", href: "/products", icon: Package, roles: ["manager"] },
    { label: "Tags", href: "/tags", icon: Package, roles: ["manager"] },
    { label: "Orders", href: "/orders", icon: ShoppingCart, roles: ["manager"] },
    { label: "Customers", href: "/customers", icon: Users, roles: ["manager"] },
    { label: "Discounts", href: "/discounts", icon: Ticket, roles: ["manager"] },
    { label: "Analytics", href: "/analytics", icon: BarChart3, roles: ["superadmin", "manager"] },
    { label: "Settings", href: "/settings", icon: Settings, roles: ["superadmin", "manager"] },
  ].filter(item => item.roles.includes(role));

  return (
    <aside className={cn("flex flex-col w-72 bg-white dark:bg-[#12141c] border-r h-screen sticky top-0", className)}>
      <div className="p-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-xl font-black text-white italic tracking-tighter">G.</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">GROWTHHO.</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3.5 text-sm font-semibold rounded-2xl hover:bg-slate-100 dark:hover:bg-white/5 transition-all group"
          >
            <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-6 mt-auto border-t border-border/50">
        <button className="flex items-center gap-3 w-full px-4 py-3.5 text-sm font-semibold rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
