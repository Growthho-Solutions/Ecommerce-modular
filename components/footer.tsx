import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold tracking-tight">ECOMM.</Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Modern e-commerce boilerplate built for speed and aesthetics. 
              Start your next big store with confidence.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-primary">All Products</Link></li>
              <li><Link href="/categories/electronics" className="hover:text-primary">Electronics</Link></li>
              <li><Link href="/categories/fashion" className="hover:text-primary">Fashion</Link></li>
              <li><Link href="/categories/home" className="hover:text-primary">Home & Living</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-primary">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-primary">Returns & Exchanges</Link></li>
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to get the latest updates and offers.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ECOMM. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary">Terms</Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary">Privacy</Link>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
