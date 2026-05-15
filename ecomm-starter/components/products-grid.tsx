"use client";

import { useState } from "react";
import { ProductCard } from "./product-card";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ProductsGridProps {
  initialProducts: any[];
  tags: any[];
  initialQuery: string;
}

export function ProductsGrid({ initialProducts, tags, initialQuery }: ProductsGridProps) {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTagId, setSelectedTagId] = useState<string | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTagId || product.product_tags?.some((pt: any) => pt.tag_id === selectedTagId);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 border-transparent focus:bg-white dark:focus:bg-black/20 transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
          <button
            onClick={() => setSelectedTagId(null)}
            className={cn(
              "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all whitespace-nowrap",
              !selectedTagId 
                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "bg-white dark:bg-white/5 border-border hover:border-blue-500/50"
            )}
          >
            All Items
          </button>
          {tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => setSelectedTagId(tag.id)}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all whitespace-nowrap",
                selectedTagId === tag.id 
                  ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20" 
                  : "bg-white dark:bg-white/5 border-border hover:border-blue-500/50"
              )}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-32 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mx-auto">
            <Search className="h-10 w-10 text-muted-foreground opacity-20" />
          </div>
          <p className="text-xl font-bold">No results found for "{searchQuery}"</p>
          <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
          <button 
            onClick={() => { setSearchQuery(""); setSelectedTagId(null); }}
            className="text-blue-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
