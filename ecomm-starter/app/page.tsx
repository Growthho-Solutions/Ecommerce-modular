import { createClient } from "@/lib/supabase/server";
import { getStoreId } from "@/lib/store-utils";
import { ProductCard } from "@/components/product-card";
import { ArrowRight, ShoppingBag, Zap, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createClient();
  const storeId = getStoreId();

  // Fetch featured products (latest active products)
  const { data: products } = await supabase
    .from("products")
    .select(`
      *,
      product_variants (price),
      product_images (image_url),
      product_tags (tag_id, tags (name))
    `)
    .eq("store_id", storeId)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(8);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-100 dark:bg-[#0c0c0c]">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full transform translate-x-1/2 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-indigo-600/5 blur-[120px] rounded-full transform -translate-x-1/2 translate-y-1/4" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 text-blue-600 border border-blue-600/20">
              <Zap className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">New Season Collection 2026</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              Define Your <br />
              <span className="text-blue-600">Premium</span> <br />
              Lifestyle.
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Experience the pinnacle of craftmanship and design. Our curated collection brings you the future of lifestyle essentials today.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <Link href="/products">
                <button className="h-16 px-10 rounded-2xl bg-blue-600 text-white font-bold text-sm uppercase tracking-widest hover:bg-blue-500 shadow-2xl shadow-blue-600/30 transition-all flex items-center gap-2 group">
                  Explore Collection
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/lookbook">
                <button className="h-16 px-10 rounded-2xl bg-white dark:bg-white/5 border border-border font-bold text-sm uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
                  View Lookbook
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 p-12 rounded-[3rem] bg-slate-50 dark:bg-white/5 border border-border/50">
          <div className="flex flex-col items-center text-center space-y-4">
             <div className="w-16 h-16 rounded-[1.5rem] bg-white dark:bg-black/20 flex items-center justify-center border border-border/50 shadow-sm">
               <ShieldCheck className="h-8 w-8 text-blue-600" />
             </div>
             <h4 className="font-bold text-lg">Secure Payments</h4>
             <p className="text-sm text-muted-foreground">Encryption at every step for your peace of mind.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
             <div className="w-16 h-16 rounded-[1.5rem] bg-white dark:bg-black/20 flex items-center justify-center border border-border/50 shadow-sm">
               <Truck className="h-8 w-8 text-blue-600" />
             </div>
             <h4 className="font-bold text-lg">Fast Delivery</h4>
             <p className="text-sm text-muted-foreground">Worldwide shipping with real-time tracking.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
             <div className="w-16 h-16 rounded-[1.5rem] bg-white dark:bg-black/20 flex items-center justify-center border border-border/50 shadow-sm">
               <ShoppingBag className="h-8 w-8 text-blue-600" />
             </div>
             <h4 className="font-bold text-lg">Easy Returns</h4>
             <p className="text-sm text-muted-foreground">30-day no-hassle return policy on all orders.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-6 space-y-12">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tighter">Featured Items</h2>
            <p className="text-muted-foreground">The most popular pieces from our latest drop.</p>
          </div>
          <Link href="/products" className="text-sm font-bold text-blue-600 uppercase tracking-widest hover:underline">
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {(!products || products.length === 0) && (
            <div className="col-span-full py-20 text-center opacity-40">
              <p className="text-lg font-medium">No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
