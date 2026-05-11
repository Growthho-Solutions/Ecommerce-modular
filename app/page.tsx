import { Hero } from "@/components/hero";
import { ComponentShowcase } from "@/components/component-showcase";
import { ProductList } from "@/components/product-list";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { hasEnvVars } from "@/lib/utils";
import { Suspense } from "react";

/**
 * Main Home Page component.
 * Organizes the landing page sections with fluid spacing and premium aesthetics.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <Hero />
        
        {/* Featured Products Section */}
        <section className="container mx-auto ~px-4/8 ~py-16/24">
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="~text-3xl/4xl font-bold tracking-tight">Featured Collections</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl text-lg">
              Explore our handpicked selection of premium products, designed for quality and style.
            </p>
          </div>

          {hasEnvVars ? (
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList />
            </Suspense>
          ) : (
            <DatabaseWarning />
          )}
        </section>

        {/* Brand Promise Section */}
        <section className="bg-primary text-primary-foreground ~py-20/32">
          <div className="container mx-auto ~px-4/8 text-center">
            <h2 className="~text-3xl/4xl font-bold tracking-tight mb-6">Experience Premium Quality</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg mb-10 leading-relaxed">
              Our products are crafted with the finest materials and attention to detail, 
              ensuring you get only the best delivered right to your door.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-background text-foreground hover:bg-background/90 px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Component Showcase Section */}
        <ComponentShowcase />
      </main>

      <Footer />
    </div>
  );
}

/**
 * Loading skeleton for the product list.
 */
function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ~gap-6/8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-2xl" />
      ))}
    </div>
  );
}

/**
 * Visual warning for missing database connection.
 */
function DatabaseWarning() {
  return (
    <div className="flex flex-col items-center justify-center p-20 border border-dashed rounded-3xl bg-muted/20">
      <h3 className="text-xl font-semibold mb-2">Connect Your Database</h3>
      <p className="text-muted-foreground text-center max-w-md mb-6">
        Connect your Supabase project to start seeing real products in your storefront.
      </p>
    </div>
  );
}
