import { getCurrentUserRole } from "@/lib/auth-utils";
import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { ProductForm } from "@/components/product-form";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const isNew = id === "new";
  const roleMapping = await getCurrentUserRole();
  const supabase = await createClient();

  if (!roleMapping || roleMapping.role !== "manager" || !roleMapping.store_id) {
    redirect("/");
  }

  // Fetch tags for selection
  const { data: tags } = await supabase
    .from("tags")
    .select("*")
    .eq("store_id", roleMapping.store_id)
    .order("name", { ascending: true });

  let product = null;
  if (!isNew) {
    // Fetch existing product details
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        product_variants (*),
        product_images (*),
        product_tags (tag_id)
      `)
      .eq("id", id)
      .eq("store_id", roleMapping.store_id)
      .single();

    if (error || !data) {
      notFound();
    }
    product = data;
  }

  return (
    <div className="max-w-5xl space-y-8 pb-20">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          {isNew ? "Create New Product" : `Edit ${product?.name}`}
        </h1>
        <p className="text-muted-foreground text-lg">
          {isNew 
            ? "Define your product, variants, and upload media to start selling." 
            : "Update your product details, inventory, and marketing tags."}
        </p>
      </div>

      <ProductForm 
        product={product} 
        tags={tags || []} 
        storeId={roleMapping.store_id} 
        isNew={isNew} 
      />
    </div>
  );
}
