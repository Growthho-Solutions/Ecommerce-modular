import { createClient } from "./supabase/client";

/**
 * Uploads a file to the product-images bucket.
 * Path: {store_id}/{product_id}/{filename}
 */
export async function uploadProductImage(
  storeId: string,
  productId: string,
  file: File
): Promise<string | null> {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${storeId}/${productId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from("product-images")
    .upload(filePath, file);

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from("product-images")
    .getPublicUrl(data.path);

  return publicUrl;
}

export async function deleteProductImage(path: string) {
  const supabase = createClient();
  // Extract path from public URL if needed, but here we expect the relative path
  const { error } = await supabase.storage
    .from("product-images")
    .remove([path]);

  if (error) {
    console.error("Error deleting image:", error);
  }
}
