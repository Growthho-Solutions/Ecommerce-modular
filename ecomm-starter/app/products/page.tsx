import { createClient } from "@/lib/supabase/server";
import { getStoreId } from "@/lib/store-utils";
import { ProductsGrid } from "@/components/products-grid";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string };
}) {
  const supabase = await createClient();
  const storeId = getStoreId();
  const query = searchParams.q || "";

  let supabaseQuery = supabase
    .from("products")
    .select(`
      *,
      product_variants (price),
      product_images (image_url),
      product_tags (tag_id, tags (name))
    `)
    .eq("store_id", storeId)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (query) {
    supabaseQuery = supabaseQuery.ilike("name", `%${query}%`);
  }

  const { data: products } = await supabaseQuery;

  // Also fetch tags for filtering
  const { data: tags } = await supabase
    .from("tags")
    .select("*")
    .eq("store_id", storeId);

  return (
    <div className="container mx-auto px-6 py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-5xl font-black tracking-tighter">Shop All</h1>
        <p className="text-muted-foreground max-w-xl">
          Browse our entire collection of premium essentials. Refine your search to find exactly what you're looking for.
        </p>
      </div>

      <ProductsGrid 
        initialProducts={products || []} 
        tags={tags || []} 
        initialQuery={query}
      />
    </div>
  );
}
