import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { products } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-8 py-12">
        <Link 
          href="/products" 
          className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image */}
          <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-muted">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-8">
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">
                {product.name}
              </h1>
              <p className="text-2xl font-bold mt-4">{formattedPrice}</p>
            </div>

            <div className="prose prose-sm text-muted-foreground mb-10">
              <p className="text-lg leading-relaxed">
                {product.description}
              </p>
              <p className="mt-4">
                This is a high-quality product designed for long-lasting use and exceptional performance. Crafted with attention to detail and premium materials.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <Button size="lg" className="h-14 px-8 rounded-full text-base font-semibold flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-base font-semibold">
                Wishlist
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-border/50">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">Availability</h3>
                  <p className="text-sm text-muted-foreground">In Stock ({product.stock_quantity} units)</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-2">Shipping</h3>
                  <p className="text-sm text-muted-foreground">Free worldwide shipping on orders over $100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
