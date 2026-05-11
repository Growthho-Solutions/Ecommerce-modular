import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "./product-card";

/**
 * Product List component that fetches products from Supabase.
 * Displays a grid of ProductCard components with fluid spacing.
 */
export async function ProductList() {
  const supabase = await createClient();

  // Fetch all products, ordered by newest first
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  // Handle fetch errors gracefully
  if (error) {
    return (
      <div className="text-center p-10 border border-dashed rounded-3xl bg-destructive/5 text-destructive">
        <p className="font-semibold">Error loading products</p>
        <p className="text-sm opacity-80">{error.message}</p>
        <p className="mt-4 text-xs font-mono">
          Ensure the 'products' table exists in your Supabase database.
        </p>
      </div>
    );
  }

  // Handle empty state
  if (!products || products.length === 0) {
    return (
      <div className="text-center p-10 border border-dashed rounded-3xl bg-muted/30">
        <p className="font-medium">No products found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Add some products to your database to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ~gap-6/10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

/**
 * Loading skeleton for the product list.
 */
export function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ~gap-6/8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-2xl" />
      ))}
    </div>
  );
}

/**
 * Visual warning for missing database connection.
 */
export function DatabaseWarning() {
  return (
    <div className="flex flex-col items-center justify-center p-20 border border-dashed rounded-3xl bg-muted/20">
      <h3 className="text-xl font-semibold mb-2">Connect Your Database</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        Connect your Supabase project to start seeing real products in your storefront.
      </p>
    </div>
  );
}
