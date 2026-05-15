import { getCurrentUserRole } from "@/lib/auth-utils";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function AdminProductsPage() {
  const roleMapping = await getCurrentUserRole();
  const supabase = await createClient();

  if (!roleMapping || roleMapping.role !== "manager" || !roleMapping.store_id) {
    redirect("/");
  }

  // Fetch products with their variants and main image
  const { data: products, error } = await supabase
    .from("products")
    .select(`
      *,
      product_variants (
        price,
        stock_quantity
      ),
      product_images (
        image_url
      )
    `)
    .eq("store_id", roleMapping.store_id)
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-8 text-red-500 text-center font-bold">Error loading products.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Products</h1>
          <p className="text-muted-foreground text-lg">Manage your inventory, pricing, and variants.</p>
        </div>
        <Link href="/products/new">
          <Button className="h-12 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 font-bold">
            <Plus className="h-5 w-5 mr-2" />
            Add New Product
          </Button>
        </Link>
      </div>

      <div className="glass-card rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-widest text-muted-foreground border-b bg-slate-50/50 dark:bg-white/5">
                <th className="px-8 py-5 font-bold">Product</th>
                <th className="px-8 py-5 font-bold text-center">Status</th>
                <th className="px-8 py-5 font-bold text-center">Variants</th>
                <th className="px-8 py-5 font-bold text-center">Stock</th>
                <th className="px-8 py-5 font-bold text-center">Price Range</th>
                <th className="px-8 py-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {products?.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center opacity-40">
                    <Package className="h-12 w-12 mx-auto mb-4" />
                    <p className="text-lg font-medium">No products found</p>
                    <Link href="/products/new" className="text-blue-500 hover:underline text-sm font-bold mt-2 inline-block">
                      Create your first product
                    </Link>
                  </td>
                </tr>
              )}
              {products?.map((product) => {
                const totalStock = product.product_variants?.reduce((acc: number, v: any) => acc + v.stock_quantity, 0) || 0;
                const prices = product.product_variants?.map((v: any) => v.price) || [];
                const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
                const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
                const mainImage = product.product_images?.[0]?.image_url;

                return (
                  <tr key={product.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-2xl bg-slate-100 dark:bg-white/5 flex-shrink-0 overflow-hidden border border-border/50">
                          {mainImage ? (
                            <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              <Package className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-base block group-hover:text-blue-600 transition-colors">{product.name}</span>
                          <span className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">{product.description}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={cn(
                        "text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest",
                        product.is_active ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-500/10 text-slate-500"
                      )}>
                        {product.is_active ? "Active" : "Draft"}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center font-bold text-sm">
                      {product.product_variants?.length || 0}
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={cn(
                        "font-bold text-sm",
                        totalStock < 10 ? "text-red-500" : ""
                      )}>
                        {totalStock}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center font-bold text-sm">
                      {minPrice === maxPrice 
                        ? `$${(minPrice / 100).toFixed(2)}` 
                        : `$${(minPrice / 100).toFixed(2)} - $${(maxPrice / 100).toFixed(2)}`}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/products/${product.id}`}>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-blue-500/10 hover:text-blue-600 transition-all">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
