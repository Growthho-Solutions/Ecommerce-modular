import Link from "next/link";
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Mail, 
  MapPin, 
  Phone 
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-[#0a0a0a] border-t pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded-full" />
              </div>
              <span className="text-lg font-black tracking-tighter uppercase italic">Growthho</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Elevate your lifestyle with our curated collection of premium products. Quality and style, delivered to your door.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2 rounded-full bg-white dark:bg-white/5 border hover:text-blue-600 transition-colors">
                <Instagram className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-white dark:bg-white/5 border hover:text-blue-600 transition-colors">
                <Twitter className="h-4 w-4" />
              </Link>
              <Link href="#" className="p-2 rounded-full bg-white dark:bg-white/5 border hover:text-blue-600 transition-colors">
                <Facebook className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-[10px] mb-6">Shop</h4>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
              <li><Link href="/products" className="hover:text-blue-600 transition-colors">All Products</Link></li>
              <li><Link href="/new-arrivals" className="hover:text-blue-600 transition-colors">New Arrivals</Link></li>
              <li><Link href="/best-sellers" className="hover:text-blue-600 transition-colors">Best Sellers</Link></li>
              <li><Link href="/sale" className="hover:text-blue-600 transition-colors">Special Offers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-[10px] mb-6">Support</h4>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
              <li><Link href="/shipping" className="hover:text-blue-600 transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-blue-600 transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/faq" className="hover:text-blue-600 transition-colors">Help & FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-[10px] mb-6">Contact</h4>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
                <span>123 Marketplace Ave, Suite 400<br />New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>hello@growthho.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-blue-600" />
                <span>+1 (555) 000-0000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground font-medium">
            © 2026 Growthho Solutions. All rights reserved. Built with passion for modern commerce.
          </p>
          <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
