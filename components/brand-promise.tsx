import { Button } from "@/components/ui/button";

/**
 * Brand Promise Section component.
 * Displays a high-impact section highlighting brand value.
 */
export function BrandPromise() {
  return (
    <section className="bg-primary text-primary-foreground ~py-20/32">
      <div className="container mx-auto ~px-4/8 text-center">
        <h2 className="~text-3xl/4xl font-bold tracking-tight mb-6">
          Experience Premium Quality
        </h2>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg mb-10 leading-relaxed">
          Our products are crafted with the finest materials and attention to detail, 
          ensuring you get only the best delivered right to your door.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="secondary" size="lg" className="rounded-full shadow-lg hover:shadow-xl px-10">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
