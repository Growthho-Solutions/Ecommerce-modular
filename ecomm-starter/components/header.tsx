import Link from "next/link";
import { ShoppingCart, Search, Menu, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import { AuthButton } from "./auth-button";
import { ThemeSwitcher } from "./theme-switcher";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  columns?: number;
  subItems?: {
    label: string;
    href: string;
    description: string;
  }[];
}

/**
 * Navigation configuration with support for nested sub-items and multi-column layouts.
 */
const NAV_LINKS: NavItem[] = [
  { 
    label: "Shop", 
    href: "/products",
    subItems: [
      { label: "All Products", href: "/products", description: "Browse our entire collection" },
      { label: "New Arrivals", href: "/products?filter=new", description: "Freshly added items" },
      { label: "Best Sellers", href: "/products?filter=popular", description: "Our most loved products" },
      { label: "On Sale", href: "/products?filter=sale", description: "Great deals at low prices" },
    ]
  },
  { 
    label: "Categories", 
    href: "/categories",
    columns: 2,
    subItems: [
      { label: "Electronics", href: "/categories/electronics", description: "Gadgets and tech gear" },
      { label: "Fashion", href: "/categories/fashion", description: "Trending clothing and style" },
      { label: "Home Decor", href: "/categories/home", description: "Modern furniture and art" },
      { label: "Health & Beauty", href: "/categories/beauty", description: "Wellness and care" },
      { label: "Sports", href: "/categories/sports", description: "Fitness and outdoor gear" },
      { label: "Accessories", href: "/categories/accessories", description: "The perfect finishing touch" },
    ]
  },
  { label: "Lookbook", href: "/lookbook" },
];

/**
 * Main application Header.
 * Handles navigation with hover dropdowns, search, and user auth.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b glass">
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8 py-4 md:py-6">
        {/* Logo and Desktop Nav */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <span className="text-xl font-bold tracking-tight text-primary">ECOMM.</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavDropdown key={link.label} link={link} />
            ))}
          </nav>
        </div>

        {/* Search and Icons */}
        <div className="flex flex-1 items-center justify-end gap-3 md:gap-4">
          <div className="hidden lg:flex w-full max-w-sm items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-9 h-9 bg-muted/50 border-none focus-visible:ring-1 transition-all focus-visible:max-w-[400px]"
            />
          </div>
          
          <div className="flex items-center gap-1 md:gap-2">
            <IconButton className="lg:hidden">
              <Search className="h-5 w-5" />
            </IconButton>
            
            <ThemeSwitcher />

            <Suspense fallback={<div className="w-8 h-8 rounded-full bg-muted animate-pulse" />}>
              <AuthButton />
            </Suspense>

            <CartButton />

            <IconButton className="md:hidden">
              <Menu className="h-5 w-5" />
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Navigation item with a hover dropdown effect.
 */
function NavDropdown({ link }: { link: NavItem }) {
  const hasSubItems = link.subItems && link.subItems.length > 0;

  return (
    <div className="relative group">
      <Link 
        href={link.href}
        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-all rounded-full group-hover:bg-muted"
      >
        {link.label}
        {hasSubItems && <ChevronDown className="h-3.5 w-3.5 opacity-40 group-hover:rotate-180 group-hover:opacity-100 transition-all duration-300" />}
      </Link>

      {hasSubItems && (
        <div className="absolute left-0 top-full pt-2 opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-[100]">
          <div className={cn(
            "bg-background border rounded-2xl shadow-2xl p-5 min-w-[260px] ring-1 ring-black/5",
            link.columns === 2 ? "md:min-w-[520px] grid grid-cols-2 gap-2" : "flex flex-col gap-1"
          )}>
            {link.subItems?.map((subItem) => (
              <Link 
                key={subItem.href}
                href={subItem.href}
                className="group/item flex flex-col p-3.5 rounded-xl hover:bg-muted transition-all"
              >
                <span className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors">
                  {subItem.label}
                </span>
                <span className="text-[12px] text-muted-foreground line-clamp-1 mt-0.5 leading-tight">
                  {subItem.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Helper component for icon buttons.
 */
function IconButton({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <Button variant="ghost" size="icon" className={cn("h-9 w-9", className)} onClick={onClick}>
      {children}
    </Button>
  );
}

/**
 * Cart button with item count badge.
 */
function CartButton() {
  return (
    <Link href="/cart">
      <Button variant="ghost" size="icon" className="relative group h-9 w-9">
        <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
          2
        </span>
      </Button>
    </Link>
  );
}
