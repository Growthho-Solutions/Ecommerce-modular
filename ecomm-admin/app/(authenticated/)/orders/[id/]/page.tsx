import { getCurrentUserRole } from "@/lib/auth-utils";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { OrderStatusControl } from "@/components/order-status-control";
import { 
  Package, 
  User, 
  MapPin, 
  CreditCard, 
  Calendar,
  ChevronLeft,
  ShoppingBag
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const roleMapping = await getCurrentUserRole();
  const supabase = await createClient();

  if (!roleMapping || roleMapping.role !== "manager" || !roleMapping.store_id) {
    redirect("/");
  }

  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      *,
      customers (*),
      order_items (
        *,
        product_variants (
          *,
          products (name)
        )
      )
    `)
    .eq("id", id)
    .eq("store_id", roleMapping.store_id)
    .single();

  if (error || !order) {
    notFound();
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/orders">
            <Button variant="ghost" size="icon" className="rounded-xl h-12 w-12 border border-border/50 bg-white dark:bg-[#12141c]">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-1">
              Order #{order.id.split("-")[0].toUpperCase()}
            </h1>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">
                Placed on {new Date(order.created_at).toLocaleString("en-US", {
                  dateStyle: "long",
                  timeStyle: "short"
                })}
              </span>
            </div>
          </div>
        </div>

        <OrderStatusControl orderId={order.id} currentStatus={order.status} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm overflow-hidden">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
              <h3 className="text-xl font-bold">Line Items</h3>
            </div>

            <div className="space-y-6">
              {order.order_items.map((item: any) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-3xl bg-slate-50 dark:bg-white/5 border border-border/30">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white dark:bg-black/20 flex items-center justify-center border border-border/50">
                      <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-bold text-base">{item.product_variants.products.name}</p>
                      <p className="text-xs text-muted-foreground">SKU: {item.product_variants.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">
                      {item.quantity} × ${(item.unit_price / 100).toFixed(2)}
                    </p>
                    <p className="text-xs font-medium text-blue-600 mt-1">
                      Total: ${( (item.quantity * item.unit_price) / 100).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-10 border-t space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold">${(order.total_amount / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-bold text-emerald-500 font-mono uppercase tracking-widest text-[10px]">Free</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-lg font-bold">Order Total</span>
                <span className="text-2xl font-black text-blue-600">${(order.total_amount / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="space-y-8">
          <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-5 w-5 text-blue-600" />
              <h3 className="text-xl font-bold">Customer Details</h3>
            </div>
            
            <div className="space-y-1">
              <p className="font-bold">{order.customers?.name}</p>
              <p className="text-sm text-muted-foreground">{order.customers?.email}</p>
            </div>

            <div className="pt-4 border-t space-y-4">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-1">Shipping Address</p>
                  <p className="text-sm leading-relaxed">
                    123 Marketplace Ave, Suite 400<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-1">Payment Method</p>
                  <p className="text-sm font-bold">Stripe Card (Ending in 4242)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm">
             <h4 className="font-bold mb-4">Internal Notes</h4>
             <p className="text-xs text-muted-foreground italic">No internal notes for this order.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
