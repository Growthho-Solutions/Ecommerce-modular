"use client";

import { useCartStore } from "@/lib/cart-store";
import { formatCurrency } from "@/lib/store-utils";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck,
  Truck
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeItem, getTotalPrice, getTotalItems } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="container mx-auto px-6 py-32 text-center">
      <div className="animate-pulse space-y-8">
        <div className="w-24 h-24 bg-slate-100 dark:bg-white/5 rounded-full mx-auto" />
        <div className="h-8 bg-slate-100 dark:bg-white/5 w-48 mx-auto rounded-xl" />
      </div>
    </div>
  );

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-32 text-center space-y-8">
        <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto">
          <ShoppingBag className="h-10 w-10 text-muted-foreground opacity-20" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter">Your cart is empty</h1>
          <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        </div>
        <Link href="/products">
          <Button className="h-16 px-10 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-5xl font-black tracking-tighter">Your Cart</h1>
        <p className="text-muted-foreground">You have {getTotalItems()} items in your cart.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-8">
          <div className="divide-y border-t border-b border-border/50">
            {items.map((item) => (
              <div key={item.variantId} className="py-8 flex flex-col sm:flex-row items-center gap-8 group">
                <div className="w-32 aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100 dark:bg-white/5 border border-border/50 flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground opacity-20">
                      <ShoppingBag className="h-8 w-8" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h3 className="text-xl font-black tracking-tight">{item.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">SKU: {item.sku}</p>
                  <p className="font-black text-blue-600 text-lg pt-2">{formatCurrency(item.price)}</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3 bg-slate-100 dark:bg-white/5 p-2 rounded-2xl border border-border/50">
                    <button 
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white dark:hover:bg-black/20 transition-all"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white dark:hover:bg-black/20 transition-all"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeItem(item.variantId)}
                    className="p-3 rounded-2xl text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-border/50">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                 <Truck className="h-6 w-6" />
               </div>
               <div>
                 <p className="font-bold text-sm">Free Shipping</p>
                 <p className="text-xs text-muted-foreground italic">You've unlocked free standard shipping!</p>
               </div>
            </div>
            <Link href="/products" className="text-sm font-bold uppercase tracking-widest text-blue-600 hover:underline">
               Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-8">
          <div className="glass-card p-10 rounded-[3rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-2xl shadow-blue-600/5 space-y-8">
            <h3 className="text-2xl font-black tracking-tight">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">Subtotal</span>
                <span className="font-bold">{formatCurrency(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">Shipping</span>
                <span className="font-black text-emerald-500 uppercase tracking-widest text-[10px]">Free</span>
              </div>
              <div className="pt-6 border-t border-border/50 flex justify-between items-end">
                <span className="text-sm font-black uppercase tracking-widest">Total</span>
                <span className="text-4xl font-black text-blue-600">{formatCurrency(getTotalPrice())}</span>
              </div>
            </div>

            <Link href="/checkout" className="block">
              <button className="w-full h-20 rounded-3xl bg-blue-600 text-white font-black text-lg uppercase tracking-widest hover:bg-blue-500 shadow-2xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3 group">
                Checkout
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>

            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              <ShieldCheck className="h-4 w-4" />
              Secure Checkout Powered by Growthho
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] border-2 border-dashed border-border/50 flex items-center justify-center text-center">
             <p className="text-xs text-muted-foreground font-medium">Have a discount code? You can apply it during the final checkout step.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
