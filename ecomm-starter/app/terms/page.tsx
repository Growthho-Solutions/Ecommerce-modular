import { getStoreId } from "@/lib/store-utils";
import { createClient } from "@/lib/supabase/server";

export default async function TermsPage() {
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
        <h1 className="text-5xl font-black tracking-tighter">Terms of Service</h1>
        <p className="text-muted-foreground italic uppercase tracking-widest text-xs font-bold">Last Updated: May 2026</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-lg leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">1. Agreement to Terms</h2>
          <p>By accessing and using the storefront of <strong>{storeName}</strong>, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">2. E-commerce Transactions</h2>
          <p>All purchases made through <strong>{storeName}</strong> are final. We utilize secure payment processing and inventory management to ensure your order is fulfilled accurately. Prices are inclusive of applicable taxes unless stated otherwise.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">3. User Accounts</h2>
          <p>When you create an account or checkout as a guest, you are responsible for maintaining the confidentiality of your account information. You agree to provide accurate and complete information for all transactions.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">4. Intellectual Property</h2>
          <p>All content on this site, including text, graphics, logos, and images, is the property of <strong>{storeName}</strong> or its content suppliers and is protected by international copyright laws.</p>
        </section>
      </div>
    </div>
  );
}
