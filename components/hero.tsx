import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/**
 * Hero component for the landing page.
 * Features fluid typography and spacing for a premium feel.
 */
export function Hero() {
  return (
    <div className="relative overflow-hidden bg-muted/50 ~py-24/32">
      <div className="container mx-auto ~px-4/8 relative z-10">
        <div className="max-w-2xl">
          <Badge className="mb-6 px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border-none">
            New Summer Collection 2026
          </Badge>
          
          <h1 className="~text-5xl/7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Elevate Your <span className="text-gradient">Style</span> With Purpose.
          </h1>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-lg leading-relaxed">
            Discover a curated collection of essentials designed for the modern lifestyle. 
            Quality craftsmanship meets timeless design.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold group transition-all">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base font-semibold">
              View Lookbook
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative background blur */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-20 hidden lg:block">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]" />
      </div>
    </div>
  );
}

/**
 * Internal Badge component for labels.
 */
function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  )
}
