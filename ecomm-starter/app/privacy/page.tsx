import { getStoreId } from "@/lib/store-utils";
import { createClient } from "@/lib/supabase/server";

export default async function PrivacyPage() {
  const supabase = await createClient();
  const storeId = getStoreId();
  const { data: store } = await supabase
    .from("stores")
    .select("name, support_email")
    .eq("id", storeId)
    .single();

  const storeName = store?.name || "Growthho Store";
  const supportEmail = store?.support_email || "support@growthho.com";

  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl space-y-12">
      <div className="space-y-4">
        <h1 className="text-5xl font-black tracking-tighter">Privacy Policy</h1>
        <p className="text-muted-foreground italic uppercase tracking-widest text-xs font-bold">Last Updated: May 2026</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-lg leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">1. Data Collection</h2>
          <p>At <strong>{storeName}</strong>, we collect personal information such as your name, email address, and shipping details primarily to process your orders and provide a personalized shopping experience.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">2. Use of Information</h2>
          <p>Your data is used to fulfill transactions, communicate order updates, and improve our services. We do not sell your personal information to third parties.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">3. Security</h2>
          <p>We implement robust security measures to protect your data. All transactions are processed through encrypted channels, and sensitive information is never stored directly on our servers.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black tracking-tight">4. Contact Us</h2>
          <p>If you have any questions regarding your privacy or wish to exercise your data rights, please contact us at <a href={`mailto:${supportEmail}`} className="text-blue-600 font-bold">{supportEmail}</a>.</p>
        </section>
      </div>
    </div>
  );
}
