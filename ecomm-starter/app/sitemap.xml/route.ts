import { createClient } from "@/lib/supabase/server";
import { getStoreId } from "@/lib/store-utils";

export async function GET() {
  const supabase = await createClient();
  const storeId = getStoreId();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Fetch all active products
  const { data: products } = await supabase
    .from("products")
    .select("id, updated_at")
    .eq("store_id", storeId)
    .eq("is_active", true);

  // Fetch all categories (tags)
  const { data: tags } = await supabase
    .from("tags")
    .select("id")
    .eq("store_id", storeId);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/products</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      ${products?.map((product) => `
        <url>
          <loc>${baseUrl}/products/${product.id}</loc>
          <lastmod>${new Date(product.updated_at).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `).join("")}
      ${tags?.map((tag) => `
        <url>
          <loc>${baseUrl}/products?category=${tag.id}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.5</priority>
        </url>
      `).join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
