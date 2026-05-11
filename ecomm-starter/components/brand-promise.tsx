import { Button } from "@/components/ui/button";

/**
 * Brand Promise Section component.
 * Displays a high-impact section highlighting brand value.
 */
export function BrandPromise() {
  return (
    <section className="bg-primary text-primary-foreground py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
          Experience Premium Quality
        </h2>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg md:text-xl mb-12 leading-relaxed">
          Our products are crafted with the finest materials and attention to detail, 
          ensuring you get only the best delivered right to your door.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="secondary" size="lg" className="rounded-full shadow-2xl hover:shadow-primary/20 px-12 h-14 text-lg font-semibold transition-all">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
