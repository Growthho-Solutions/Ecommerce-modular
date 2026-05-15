import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <div className="flex min-h-screen bg-muted/40">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-card flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <Link href="/products" className="h-8 w-8 rounded-lg border flex items-center justify-center hover:bg-muted transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-lg font-bold">Add New Product</h1>
          </div>
          <Button size="sm" className="rounded-xl">
            <Save className="h-4 w-4 mr-2" />
            Save Product
          </Button>
        </header>

        <div className="p-8 max-w-4xl mx-auto w-full">
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-8 space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Enter product name" className="rounded-xl" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select id="category" className="w-full h-10 px-3 bg-background border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Electronics</option>
                    <option>Clothing</option>
                    <option>Home & Kitchen</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" placeholder="0.00" className="rounded-xl" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Write a detailed product description" className="rounded-xl min-h-[150px]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input id="stock" type="number" placeholder="0" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                  <Input id="sku" placeholder="E.g. WRL-HD-001" className="rounded-xl" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Product Images</Label>
                <div className="border-2 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center bg-muted/20">
                  <p className="text-sm text-muted-foreground mb-4">Drag and drop images here, or click to upload</p>
                  <Button variant="outline" size="sm" className="rounded-lg">Upload Files</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
