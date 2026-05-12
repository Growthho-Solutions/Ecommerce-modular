import { products } from "@/lib/mock-data";
import { ProductCard } from "./product-card";

/**
 * Product List component that displays featured products.
 * Uses mock data for now.
 */
export async function ProductList() {
  // Use mock products
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
      {featuredProducts.map((product) => (
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
