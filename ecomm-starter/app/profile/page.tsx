import { getCustomerSession } from "@/lib/customer-auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/lib/store-utils";
import { 
  User, 
  MapPin, 
  ShoppingBag, 
  Settings, 
  Trash2, 
  Plus,
  Package,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { AddressForm } from "@/components/address-form";
import { DeleteAddressButton } from "@/components/delete-address-button";

export default async function ProfilePage() {
  const session = await getCustomerSession();
  if (!session?.customer?.id) {
    redirect("/login");
  }

  const supabase = await createClient();

  // Fetch addresses
  const { data: addresses } = await supabase
    .from("customer_addresses")
    .select("*")
    .eq("customer_id", session.customer.id)
    .order("is_default", { ascending: false });

  // Fetch recent orders
  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(count)")
    .eq("customer_id", session.customer.id)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl space-y-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter">Your Profile</h1>
          <p className="text-muted-foreground italic">Manage your account settings and track your premium orders.</p>
        </div>
        
        <div className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50 dark:bg-white/5 border border-border/50">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-xl">
            {session.customer.name?.[0] || <User />}
          </div>
          <div>
            <p className="font-black text-lg leading-none">{session.customer.name}</p>
            <p className="text-xs text-muted-foreground">{session.customer.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-16">
          {/* Recent Orders */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
                Recent Orders
              </h2>
              <Link href="/profile/orders" className="text-xs font-bold uppercase tracking-widest text-blue-600 hover:underline">View All</Link>
            </div>

            <div className="space-y-4">
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order.id} className="p-6 rounded-[2rem] bg-white dark:bg-[#12141c] border border-border/50 hover:shadow-xl hover:shadow-blue-600/5 transition-all flex items-center justify-between group">
                    <div className="space-y-1">
                      <p className="font-black">Order #{order.id.split("-")[0].toUpperCase()}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">
                        {new Date(order.created_at).toLocaleDateString()} • {order.status}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <p className="font-black text-blue-600">{formatCurrency(order.total_amount)}</p>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center rounded-[2rem] border-2 border-dashed border-border/50 space-y-4">
                   <Package className="h-10 w-10 text-muted-foreground mx-auto opacity-20" />
                   <p className="text-muted-foreground font-medium italic">You haven't placed any orders yet.</p>
                   <Link href="/products" className="inline-block text-sm font-black text-blue-600 uppercase tracking-widest hover:underline">Start Shopping</Link>
                </div>
              )}
            </div>
          </section>

          {/* Address Book */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                <MapPin className="h-6 w-6 text-blue-600" />
                Address Book
              </h2>
              <AddressForm />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses?.map((address) => (
                <div key={address.id} className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-border/50 space-y-4 relative group">
                  {address.is_default && (
                    <span className="absolute top-6 right-6 text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-blue-600 text-white rounded-lg">Default</span>
                  )}
                  <div className="space-y-1">
                    <p className="font-bold text-lg">{address.address_line1}</p>
                    {address.address_line2 && <p className="text-sm text-muted-foreground">{address.address_line2}</p>}
                    <p className="text-sm text-muted-foreground">{address.city}, {address.state} {address.postal_code}</p>
                    <p className="text-sm font-bold uppercase tracking-widest pt-2">{address.country}</p>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <DeleteAddressButton id={address.id} />
                  </div>
                </div>
              ))}
              {(!addresses || addresses.length === 0) && (
                <div className="col-span-full p-12 text-center rounded-[2rem] border-2 border-dashed border-border/50">
                  <p className="text-muted-foreground font-medium italic">No addresses saved yet.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-8">
          <div className="glass-card p-10 rounded-[3rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-2xl shadow-blue-600/5 space-y-8 h-fit sticky top-32">
            <h3 className="text-2xl font-black tracking-tight flex items-center gap-3">
              <Settings className="h-6 w-6 text-blue-600" />
              Settings
            </h3>
            
            <div className="space-y-4">
               <button className="w-full text-left p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 font-bold transition-all flex items-center justify-between group">
                 Change Password
                 <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
               </button>
               <button className="w-full text-left p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 font-bold transition-all flex items-center justify-between group">
                 Email Preferences
                 <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
               </button>
               <div className="pt-6 border-t border-border/50">
                 <form action="/api/auth/logout" method="POST">
                   <button className="w-full h-16 rounded-2xl bg-red-500/10 text-red-500 font-black text-sm uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                     Log Out
                   </button>
                 </form>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
