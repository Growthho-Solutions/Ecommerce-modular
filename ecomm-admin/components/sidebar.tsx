import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  BarChart3,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Products", href: "/products", icon: Package },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("flex flex-col w-64 bg-card border-r h-screen sticky top-0", className)}>
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-primary">ADMIN.</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl hover:bg-muted transition-colors group"
          >
            <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-border/50">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium rounded-xl text-destructive hover:bg-destructive/10 transition-colors">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
