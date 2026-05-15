"use client";

import { useCartStore } from "@/lib/cart-store";
import { formatCurrency } from "@/lib/store-utils";
import { useState } from "react";
import { processCheckout } from "@/app/actions/checkout";
import { 
  CreditCard, 
  MapPin, 
  ShoppingBag, 
  Lock, 
  CheckCircle2,
  ArrowRight,
  Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(event.currentTarget);
    const result = await processCheckout(formData, items);

    if (result.error) {
      toast.error(result.error);
      setIsLoading(false);
    } else {
      toast.success("Order placed successfully!");
      clearCart();
      router.push(`/order-confirmation/${result.orderId}`);
    }
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-32 text-center space-y-8">
        <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto">
          <ShoppingBag className="h-10 w-10 text-muted-foreground opacity-20" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter">Your cart is empty</h1>
        <Button onClick={() => router.push("/products")} className="h-16 px-10 rounded-2xl bg-blue-600">
          Back to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="space-y-4 mb-12">
        <h1 className="text-5xl font-black tracking-tighter text-center">Secure Checkout</h1>
        <p className="text-muted-foreground text-center">Complete your purchase with our encrypted checkout system.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
          {/* Shipping Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 font-bold">1</div>
              <h2 className="text-2xl font-black tracking-tight">Shipping Information</h2>
            </div>
            
            <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">First Name</label>
                  <Input name="firstName" required className="h-12 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent focus:bg-white dark:focus:bg-black/40" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Last Name</label>
                  <Input name="lastName" required className="h-12 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent focus:bg-white dark:focus:bg-black/40" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Street Address</label>
                <Input name="address" required className="h-12 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent focus:bg-white dark:focus:bg-black/40" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">City</label>
                  <Input name="city" required className="h-12 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent focus:bg-white dark:focus:bg-black/40" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Postal Code</label>
                  <Input name="postalCode" required className="h-12 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent focus:bg-white dark:focus:bg-black/40" />
                </div>
              </div>
            </div>
          </section>

          {/* Payment Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 font-bold">2</div>
              <h2 className="text-2xl font-black tracking-tight">Payment Method</h2>
            </div>
            
            <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-6 w-6" />
                  <span className="font-bold">Credit / Debit Card</span>
                </div>
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Card Number</label>
                  <Input placeholder="•••• •••• •••• ••••" required className="h-12 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent focus:bg-white dark:focus:bg-black/40" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Expiry Date</label>
                    <Input placeholder="MM / YY" required className="h-12 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent focus:bg-white dark:focus:bg-black/40" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">CVC</label>
                    <Input placeholder="•••" required className="h-12 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent focus:bg-white dark:focus:bg-black/40" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Summary Column */}
        <div className="space-y-8">
          <div className="glass-card p-10 rounded-[3rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-2xl shadow-blue-600/5 space-y-8 h-fit sticky top-32">
            <h3 className="text-2xl font-black tracking-tight">Order Review</h3>
            
            <div className="space-y-4 max-h-[300px] overflow-y-auto no-scrollbar pr-2">
              {items.map((item) => (
                <div key={item.variantId} className="flex items-center gap-4 py-2">
                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-50 dark:bg-black/20 border border-border/50 flex-shrink-0">
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold truncate">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.quantity} × {formatCurrency(item.price)}</p>
                  </div>
                  <p className="text-sm font-black">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-border/50">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">Subtotal</span>
                <span className="font-bold">{formatCurrency(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium uppercase tracking-widest text-[10px]">Shipping</span>
                <span className="font-black text-emerald-500 uppercase tracking-widest text-[10px]">Free</span>
              </div>
              <div className="pt-6 border-t border-border/50 flex justify-between items-end">
                <span className="text-sm font-black uppercase tracking-widest">Grand Total</span>
                <span className="text-4xl font-black text-blue-600">{formatCurrency(getTotalPrice())}</span>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full h-20 rounded-3xl bg-blue-600 hover:bg-blue-500 text-white font-black text-lg uppercase tracking-widest shadow-2xl shadow-blue-600/30 group"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  Place Order
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              <Lock className="h-4 w-4" />
              Encrypted 256-bit SSL Connection
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
