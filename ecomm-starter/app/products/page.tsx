import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { products } from "@/lib/mock-data";
import { ProductCard } from "@/components/product-card";

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
            <p className="text-muted-foreground mt-1">
              Browse our complete collection of premium items.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-background border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Sort by: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
