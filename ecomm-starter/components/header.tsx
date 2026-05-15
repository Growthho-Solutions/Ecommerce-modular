import Link from "next/link";
import { CartIcon } from "./cart-icon";
import { Search, User } from "lucide-react";

export function Header({ session }: { session?: any }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white rounded-full" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic">Growthho</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/products" className="text-sm font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Shop</Link>
            <Link href="/categories" className="text-sm font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">Categories</Link>
            <Link href="/new-arrivals" className="text-sm font-bold uppercase tracking-widest hover:text-blue-600 transition-colors">New arrivals</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-slate-100 dark:bg-white/5 rounded-full px-4 py-2 border border-transparent hover:border-blue-500/30 transition-all">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-transparent border-none outline-none text-sm w-40"
            />
          </div>
          
          <Link href={session ? "/profile" : "/login"} className="p-2 hover:text-blue-600 transition-colors">
            <User className="h-6 w-6" />
          </Link>
          
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
