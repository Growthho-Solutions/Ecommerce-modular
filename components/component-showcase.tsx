"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ProductCard } from "@/components/product-card";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ShoppingCart, Mail, Search, Bell, Heart, Star, ChevronRight, Github, User, Settings, Info } from "lucide-react";

/**
 * ComponentShowcase displays all modular components used in the application.
 * This serves as a live style guide and ensures codebase cleanliness.
 */
export function ComponentShowcase() {
  return (
    <section className="container mx-auto ~px-4/8 ~py-16/24 space-y-24">
      <div className="flex flex-col items-center text-center space-y-4">
        <Badge variant="outline" className="px-4 py-1 rounded-full border-primary/20 text-primary">
          Design System
        </Badge>
        <h2 className="~text-3xl/5xl font-bold tracking-tight">Modular Component Library</h2>
        <p className="text-muted-foreground max-w-2xl text-lg">
          A showcase of our premium, reusable components that power this e-commerce experience.
        </p>
      </div>

      {/* Buttons Section */}
      <div className="space-y-10">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">Buttons</h3>
          <p className="text-muted-foreground text-sm max-w-2xl">
            The fundamental building block for user interaction. Buttons are used for actions, 
            navigation, and form submissions. They support multiple variants and sizes for different hierarchies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="bg-muted/30 border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-base">Variants</CardTitle>
              <CardDescription>Use <code>variant</code> to change the visual priority.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </CardContent>
          </Card>

          <Card className="bg-muted/30 border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-base">Sizes</CardTitle>
              <CardDescription>Use <code>size</code> to scale the button for its container.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small (sm)</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large (lg)</Button>
              <Button size="icon"><Search className="h-4 w-4" /></Button>
            </CardContent>
          </Card>

          <Card className="bg-muted/30 border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-base">Icon Integration</CardTitle>
              <CardDescription>Buttons can include Lucide icons for better affordance.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button variant="outline">
                Login <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Form Elements */}
      <div className="space-y-10">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">Form Controls</h3>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Input components allow users to provide data and interact with the application state. 
            All controls are fully accessible and support various states.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-muted/30 border-none shadow-none">
            <CardHeader>
              <CardTitle className="text-base">Inputs</CardTitle>
              <CardDescription>Standard <code>Input</code> component with various types.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email-demo">Email Address</Label>
                <Input type="email" id="email-demo" placeholder="Email" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="search-demo">Search Products</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="text" id="search-demo" placeholder="Search..." className="pl-10" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/30 border-none">
            <CardHeader>
              <CardTitle>Selection</CardTitle>
              <CardDescription>Checkboxes and other interactive toggles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>New Arrival</Badge>
                <Badge variant="secondary">Featured</Badge>
                <Badge variant="outline">Limited Edition</Badge>
                <Badge variant="destructive">Sale</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Complex Components */}
      <div className="space-y-10">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">Modular Blocks</h3>
          <p className="text-muted-foreground text-sm max-w-2xl">
            Higher-level components composed of atomic elements. These form the primary 
            user interface sections of the store.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <div>
              <h4 className="text-base font-semibold">Product Card</h4>
              <p className="text-sm text-muted-foreground mt-1">
                The core display unit for items. Includes image hover effects and price formatting.
              </p>
            </div>
            <ProductCard 
              product={{
                id: "demo-1",
                name: "Premium Wireless Headphones",
                description: "Experience crystal clear audio with our flagship noise-cancelling headphones.",
                price: 299.99,
                image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
                category: "Electronics",
                stock_quantity: 10
              }} 
            />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Utility Components</h4>
              <div className="flex flex-wrap items-center gap-6 p-6 rounded-2xl bg-muted/20 border border-border/50">
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-muted-foreground">Theme Switcher</span>
                  <ThemeSwitcher />
                </div>
                <div className="h-10 w-px bg-border" />
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-muted-foreground">User Actions</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon"><User className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Settings className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Bell className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="hover-lift transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    Premium Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every component is built with performance and aesthetics in mind, ensuring a seamless user journey.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-lift transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Info className="h-4 w-4 text-primary" />
                    Developer Friendly
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Highly modular and typed with TypeScript for the best developer experience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Full Sections Placeholder */}
      <div className="bg-primary/5 rounded-[2rem] p-12 border border-primary/10">
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold">Ready to Build?</h3>
          <p className="text-muted-foreground max-w-xl mx-auto">
            These modular components are designed to work together seamlessly, 
            allowing you to create complex layouts with ease.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 shadow-xl">
              Start Shopping
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              View Github
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
