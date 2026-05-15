import { createClient } from "@/lib/supabase/server";
import { getStoreId } from "@/lib/store-utils";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/product-view";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const supabase = await createClient();
  const storeId = getStoreId();

  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      product_variants (*),
      product_images (*),
      product_tags (tag_id, tags (name))
    `)
    .eq("id", id)
    .eq("store_id", storeId)
    .eq("is_active", true)
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <ProductView product={product} />
    </div>
  );
}
