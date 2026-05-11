import Link from "next/link";
import { ThemeSwitcher } from "./theme-switcher";

/**
 * Standard E-commerce Footer.
 * Features a newsletter signup, multi-column navigation, and legal links.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto ~px-4/8 ~py-12/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="text-xl font-bold tracking-tight text-gradient">ECOMM.</Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Modern e-commerce boilerplate built for speed and aesthetics. 
              Start your next big store with confidence.
            </p>
          </div>
          
          {/* Shop Links */}
          <div>
            <FooterHeading>Shop</FooterHeading>
            <ul className="space-y-2">
              <FooterLink href="/shop">All Products</FooterLink>
              <FooterLink href="/categories/electronics">Electronics</FooterLink>
              <FooterLink href="/categories/fashion">Fashion</FooterLink>
              <FooterLink href="/categories/home">Home & Living</FooterLink>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <FooterHeading>Support</FooterHeading>
            <ul className="space-y-2">
              <FooterLink href="/contact">Contact Us</FooterLink>
              <FooterLink href="/shipping">Shipping Policy</FooterLink>
              <FooterLink href="/returns">Returns & Exchanges</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <FooterHeading>Newsletter</FooterHeading>
            <p className="text-sm text-muted-foreground">
              Subscribe to get the latest updates and offers.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2">
                Join
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} ECOMM. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms</Link>
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Helper component for footer headings.
 */
function FooterHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">{children}</h3>;
}

/**
 * Helper component for footer links.
 */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
        {children}
      </Link>
    </li>
  );
}
