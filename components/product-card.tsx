import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category: string | null;
  stock_quantity: number;
}

interface ProductCardProps {
  product: Product;
}

/**
 * Individual Product Card component.
 * Displays product image, details, and an "Add to Cart" action.
 * Features premium hover effects and responsive image sizing.
 */
export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <Card className="group overflow-hidden flex flex-col h-full border-none bg-card shadow-sm hover-lift ring-1 ring-border/50">
      {/* Product Image Wrapper */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px] font-medium uppercase tracking-widest px-4 text-center">
            No Image Available
          </div>
        )}
        
        {/* Category Badge */}
        {product.category && (
          <Badge 
            className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background border-none shadow-sm" 
            variant="outline"
          >
            {product.category}
          </Badge>
        )}
        
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Product Info */}
      <CardHeader className="p-4 pb-1">
        <CardTitle className="text-base font-semibold line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 pt-0 flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-3 min-h-[2.5rem]">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-lg font-bold tracking-tight">
            {formattedPrice}
          </p>
        </div>
      </CardContent>

      {/* Action Button */}
      <CardFooter className="p-4 pt-0">
        <Button className="w-full h-10 rounded-full font-medium transition-all" variant="default">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
