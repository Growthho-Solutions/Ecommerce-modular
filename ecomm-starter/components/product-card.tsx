import Link from "next/link";
import { ShoppingBag, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/store-utils";

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  // Get the lowest price from variants
  const prices = product.product_variants?.map((v: any) => v.price) || [];
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const mainImage = product.product_images?.[0]?.image_url;

  return (
    <div className="group relative bg-white dark:bg-[#12141c] rounded-[2rem] overflow-hidden border border-border/50 hover:shadow-2xl hover:shadow-blue-600/5 transition-all duration-500">
      <Link href={`/products/${product.id}`} className="block aspect-[4/5] overflow-hidden relative">
        {mainImage ? (
          <img 
            src={mainImage} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-muted-foreground italic text-xs uppercase tracking-widest">
            No Image
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
           <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-[50ms]">
             <Eye className="h-5 w-5" />
           </div>
           <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-[100ms]">
             <ShoppingBag className="h-5 w-5" />
           </div>
        </div>
      </Link>

      <div className="p-6 space-y-2">
        <div className="flex items-center justify-between">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-bold text-lg tracking-tight hover:text-blue-600 transition-colors">{product.name}</h3>
          </Link>
          <span className="font-black text-blue-600">{formatCurrency(minPrice)}</span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {product.description || "No description available for this premium item."}
        </p>
        
        <div className="pt-4 flex flex-wrap gap-1.5">
          {product.product_tags?.slice(0, 2).map((pt: any) => (
            <span key={pt.tag_id} className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-muted-foreground">
              {pt.tags?.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
