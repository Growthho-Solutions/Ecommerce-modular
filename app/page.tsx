import { Hero } from "@/components/hero";
import { ComponentShowcase } from "@/components/component-showcase";
import { ProductList, ProductListSkeleton, DatabaseWarning } from "@/components/product-list";
import { BrandPromise } from "@/components/brand-promise";
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
      
      <main className="flex-1 space-y-20 lg:space-y-32">
        <Hero />
        
        {/* Featured Products Section */}
        <section className="container mx-auto ~px-4/8 ~py-12/20">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="~text-3xl/5xl font-bold tracking-tight">Featured Collections</h2>
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

        <BrandPromise />

        <ComponentShowcase />
      </main>

      <Footer />
    </div>
  );
}
