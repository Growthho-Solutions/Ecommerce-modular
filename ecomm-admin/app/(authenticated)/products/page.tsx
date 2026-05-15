import { createClient } from "@/lib/supabase/server";
import { getAuthStoreId, isSuperadmin } from "@/lib/auth-utils";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Package, Layers } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/store-utils";
import { DeleteProductButton } from "@/components/delete-product-button";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const storeId = await getAuthStoreId();
  
  const query = supabase
    .from("products")
    .select(`
      *,
      product_variants (price, stock_quantity)
    `)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (!isSuperadmin()) {
    query.eq("store_id", storeId);
  }

  const { data: products } = await query;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter">Inventory</h1>
          <p className="text-muted-foreground">Manage your product catalog, variants, and stock levels.</p>
        </div>
        
        <Link href="/products/new">
          <Button className="h-14 px-8 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold shadow-xl shadow-blue-500/20 gap-2">
            <Plus className="h-5 w-5" />
            Add New Product
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-[#12141c] rounded-[2.5rem] border border-border/50 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/50 bg-slate-50/50 dark:bg-white/5">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Product</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Variants</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Price Range</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Stock</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {products?.map((product) => {
              const prices = product.product_variants.map((v: any) => v.price);
              const minPrice = Math.min(...prices);
              const maxPrice = Math.max(...prices);
              const totalStock = product.product_variants.reduce((acc: number, v: any) => acc + v.stock_quantity, 0);

              return (
                <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-muted-foreground border border-border/50">
                        <Package className="h-6 w-6" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm">{product.name}</span>
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">ID: {product.id.split("-")[0]}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{product.product_variants.length} SKU(s)</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-black text-blue-600">
                    {prices.length > 0 
                      ? minPrice === maxPrice 
                        ? formatCurrency(minPrice) 
                        : `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`
                      : "---"}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-sm font-bold ${totalStock < 10 ? 'text-red-500' : ''}`}>
                      {totalStock} units
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link href={`/products/${product.id}`}>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-blue-600/10 hover:text-blue-600">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteProductButton id={product.id} />
                    </div>
                  </td>
                </tr>
              );
            })}
            {(!products || products.length === 0) && (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                   <div className="space-y-3 opacity-30">
                      <Package className="h-12 w-12 mx-auto" />
                      <p className="font-bold uppercase tracking-widest text-xs">No products found</p>
                   </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
