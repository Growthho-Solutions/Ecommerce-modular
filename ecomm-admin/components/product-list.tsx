import { createClient } from "@/lib/supabase/server";
import { ProductCard } from "./product-card";

export async function ProductList() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="text-center p-10 border border-dashed rounded-lg">
        <p className="text-destructive font-medium">Error loading products</p>
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <p className="mt-4 text-xs">
          Make sure you have created the products table in Supabase.
        </p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center p-10 border border-dashed rounded-lg">
        <p className="font-medium">No products found</p>
        <p className="text-sm text-muted-foreground">
          Run the migration SQL in your Supabase SQL editor to seed data.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
