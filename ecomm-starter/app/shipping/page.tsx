import { getStoreId } from "@/lib/store-utils";
import { createClient } from "@/lib/supabase/server";

export default async function ShippingPage() {
  const supabase = await createClient();
  const storeId = getStoreId();
  const { data: store } = await supabase
    .from("stores")
    .select("name")
    .eq("id", storeId)
    .single();

  const storeName = store?.name || "Growthho Store";

  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl space-y-12">
      <div className="space-y-4">
        <h1 className="text-5xl font-black tracking-tighter">Shipping Policy</h1>
        <p className="text-muted-foreground italic uppercase tracking-widest text-xs font-bold">Fast & Reliable Delivery</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-lg leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">1. Dispatch Times</h2>
          <p>At <strong>{storeName}</strong>, we strive to process and dispatch all orders within 24-48 business hours. Orders placed on weekends or public holidays will be processed on the next business day.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">2. Delivery Methods</h2>
          <p>We partner with premium couriers to ensure your package arrives safely. Delivery times typically range from 3-7 business days depending on your location.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">3. Tracking Your Order</h2>
          <p>Once your order has shipped, you will receive an email with a tracking number and a link to monitor your package's journey in real-time.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">4. Shipping Rates</h2>
          <p>Shipping rates are calculated at checkout based on your delivery address and the weight of your order. We occasionally offer free shipping promotions—stay tuned to our newsletter!</p>
        </section>
      </div>
    </div>
  );
}
