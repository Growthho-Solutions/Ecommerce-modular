import { ShoppingBag, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OrderConfirmationPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="container mx-auto px-6 py-32 text-center space-y-8">
      <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-500">
        <CheckCircle2 className="h-12 w-12" />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-5xl font-black tracking-tighter">Order Confirmed!</h1>
        <p className="text-muted-foreground text-lg italic">Thank you for your purchase. Your order #{params.id.split("-")[0].toUpperCase()} is being prepared.</p>
      </div>

      <div className="max-w-md mx-auto p-8 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-border/50">
        <p className="text-sm font-medium mb-6">A confirmation email has been sent to your inbox. You can track your order status in your profile.</p>
        <Link href="/products">
          <button className="w-full h-16 rounded-2xl bg-blue-600 text-white font-black text-sm uppercase tracking-widest hover:bg-blue-500 transition-all flex items-center justify-center gap-2 group">
            Continue Shopping
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </div>
  );
}
