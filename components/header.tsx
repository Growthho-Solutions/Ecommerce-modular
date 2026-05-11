import Link from "next/link";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";
import { AuthButton } from "./auth-button";

/**
 * Main application Header.
 * Handles navigation, search, and user authentication state.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b glass">
      <div className="container mx-auto flex h-16 items-center justify-between ~px-4/8">
        {/* Logo and Desktop Nav */}
        <div className="flex items-center ~gap-6/12">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-gradient">ECOMM.</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <NavLink href="/shop">Shop</NavLink>
            <NavLink href="/categories">Categories</NavLink>
            <NavLink href="/new-arrivals">New Arrivals</NavLink>
          </nav>
        </div>

        {/* Search and Icons */}
        <div className="flex flex-1 items-center justify-end ~gap-3/6">
          <div className="hidden lg:flex w-full max-w-sm items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-9 h-9 bg-muted/50 border-none focus-visible:ring-1 transition-all focus-visible:max-w-[400px]"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <IconButton className="md:hidden">
              <Search className="h-5 w-5" />
            </IconButton>
            
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
 * Helper component for navigation links.
 */
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
    >
      {children}
    </Link>
  );
}

/**
 * Helper component for icon buttons.
 */
function IconButton({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <Button variant="ghost" size="icon" className={className} onClick={onClick}>
      {children}
    </Button>
  );
}

/**
 * Cart button with item count badge.
 */
function CartButton() {
  return (
    <Button variant="ghost" size="icon" className="relative group">
      <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
        0
      </span>
    </Button>
  );
}
