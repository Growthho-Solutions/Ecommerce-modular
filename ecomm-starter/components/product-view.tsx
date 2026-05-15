"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import { formatCurrency } from "@/lib/store-utils";
import { 
  ShoppingBag, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Truck,
  CheckCircle2,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductViewProps {
  product: any;
}

export function ProductView({ product }: ProductViewProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.product_variants[0]?.id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const addItem = useCartStore((state) => state.addItem);

  const selectedVariant = product.product_variants.find((v: any) => v.id === selectedVariantId);
  const images = product.product_images || [];

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addItem({
      id: `${product.id}-${selectedVariant.id}`,
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      sku: selectedVariant.sku,
      price: selectedVariant.price,
      quantity: 1,
      image: images[0]?.image_url
    });

    toast.success(`${product.name} added to cart!`, {
      description: `SKU: ${selectedVariant.sku}`,
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-slate-50 dark:bg-white/5 border border-border/50 relative group">
          {images.length > 0 ? (
            <img 
              src={images[activeImageIndex].image_url} 
              alt={product.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground opacity-20">
              <Package className="h-20 w-20 mb-4" />
              <p className="font-bold uppercase tracking-widest text-xs">No Image Available</p>
            </div>
          )}
          
          {images.length > 1 && (
            <div className="absolute inset-x-6 bottom-6 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-black/90 backdrop-blur-md flex items-center justify-center border border-border/50 hover:bg-blue-600 hover:text-white transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-black/90 backdrop-blur-md flex items-center justify-center border border-border/50 hover:bg-blue-600 hover:text-white transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {images.map((img: any, i: number) => (
            <button
              key={i}
              onClick={() => setActiveImageIndex(i)}
              className={cn(
                "w-24 aspect-[4/5] rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0",
                activeImageIndex === i ? "border-blue-600 scale-95" : "border-transparent opacity-50 hover:opacity-100"
              )}
            >
              <img src={img.image_url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-center space-y-10">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {product.product_tags?.map((pt: any) => (
              <span key={pt.tag_id} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-blue-600/10 text-blue-600 border border-blue-600/20">
                {pt.tags.name}
              </span>
            ))}
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight">{product.name}</h1>
          <p className="text-3xl font-black text-blue-600">
            {selectedVariant ? formatCurrency(selectedVariant.price) : "---"}
          </p>
        </div>

        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl italic">
          "{product.description || "Indulge in pure elegance with this meticulously crafted piece, designed to elevate your everyday experience."}"
        </p>

        {/* Variant Selector */}
        <div className="space-y-6">
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 block">Select Variation</label>
            <div className="flex flex-wrap gap-3">
              {product.product_variants.map((v: any) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariantId(v.id)}
                  className={cn(
                    "px-6 py-4 rounded-2xl text-sm font-bold border-2 transition-all",
                    selectedVariantId === v.id
                      ? "border-blue-600 bg-blue-600/5 text-blue-600 shadow-lg shadow-blue-600/10"
                      : "border-border/50 hover:border-blue-500/50"
                  )}
                >
                  {v.sku}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant.stock_quantity <= 0}
              className="w-full h-20 rounded-3xl bg-blue-600 text-white font-black text-lg uppercase tracking-widest hover:bg-blue-500 shadow-2xl shadow-blue-600/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:bg-slate-400"
            >
              <ShoppingBag className="h-6 w-6" />
              {selectedVariant?.stock_quantity > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>

        {/* Trust Points */}
        <div className="grid grid-cols-2 gap-6 pt-10 border-t border-border/50">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center">
               <Truck className="h-5 w-5 text-blue-600" />
             </div>
             <div className="space-y-0.5">
               <p className="text-[10px] font-black uppercase tracking-widest leading-none">Free Shipping</p>
               <p className="text-[10px] text-muted-foreground">On all orders over $150</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center">
               <ShieldCheck className="h-5 w-5 text-blue-600" />
             </div>
             <div className="space-y-0.5">
               <p className="text-[10px] font-black uppercase tracking-widest leading-none">2 Year Warranty</p>
               <p className="text-[10px] text-muted-foreground">Quality guaranteed</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
