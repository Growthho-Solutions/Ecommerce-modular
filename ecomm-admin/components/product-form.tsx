"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Trash2,
  Package,
  DollarSign,
  Hash,
  Save,
  ChevronLeft,
  X
} from "lucide-react";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Variant {
  id?: string;
  sku: string;
  price: number;
  stock_quantity: number;
  is_active: boolean;
}

import { ImageUploader } from "./image-uploader";

interface ProductFormProps {
  product: any;
  tags: any[];
  storeId: string;
  isNew: boolean;
}

export function ProductForm({ product, tags, storeId, isNew }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [tempId] = useState(product?.id || crypto.randomUUID());
  const router = useRouter();
  const supabase = createClient();

  // Basic Info State
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [isActive, setIsActive] = useState(product?.is_active ?? true);

  // Tags State
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(
    product?.product_tags?.map((pt: any) => pt.tag_id) || []
  );

  // Variants State
  const [variants, setVariants] = useState<Variant[]>(
    product?.product_variants || [{ sku: "", price: 0, stock_quantity: 0, is_active: true }]
  );

  // Images State
  const [imageUrls, setImageUrls] = useState<string[]>(
    product?.product_images?.map((pi: any) => pi.image_url) || []
  );

  const handleAddVariant = () => {
    setVariants([...variants, { sku: "", price: 0, stock_quantity: 0, is_active: true }]);
  };

  const handleRemoveVariant = (index: number) => {
    if (variants.length === 1) {
      toast.error("A product must have at least one variant.");
      return;
    }
    setVariants(variants.filter((_, i) => i !== index));
  };

  const updateVariant = (index: number, field: keyof Variant, value: any) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
  };

  const toggleTag = (tagId: string) => {
    setSelectedTagIds(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Product name is required.");
    if (variants.some(v => !v.sku.trim())) return toast.error("All variants must have a SKU.");

    setIsLoading(true);
    try {
      const productId = tempId;

      // 1. Save/Update Product
      if (isNew) {
        const { error } = await supabase
          .from("products")
          .insert({ id: productId, name, description, is_active: isActive, store_id: storeId });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("products")
          .update({ name, description, is_active: isActive })
          .eq("id", productId);
        if (error) throw error;
      }

      // 2. Sync Tags
      await supabase.from("product_tags").delete().eq("product_id", productId);
      if (selectedTagIds.length > 0) {
        const tagInserts = selectedTagIds.map(tag_id => ({ product_id: productId, tag_id }));
        const { error: tagError } = await supabase.from("product_tags").insert(tagInserts);
        if (tagError) throw tagError;
      }

      // 3. Sync Variants
      const currentVariantIds = product?.product_variants?.map((v: any) => v.id) || [];
      const incomingVariantIds = variants.map(v => v.id).filter(Boolean);
      const idsToDelete = currentVariantIds.filter((id: string) => !incomingVariantIds.includes(id));
      if (idsToDelete.length > 0) {
        await supabase.from("product_variants").delete().in("id", idsToDelete);
      }
      for (const v of variants) {
        const variantData = {
          product_id: productId,
          sku: v.sku,
          price: v.price,
          stock_quantity: v.stock_quantity,
          is_active: v.is_active
        };
        if (v.id) {
          await supabase.from("product_variants").update(variantData).eq("id", v.id);
        } else {
          await supabase.from("product_variants").insert(variantData);
        }
      }

      // 4. Sync Images
      await supabase.from("product_images").delete().eq("product_id", productId);
      if (imageUrls.length > 0) {
        const imageInserts = imageUrls.map((url, index) => ({
          product_id: productId,
          image_url: url,
          display_order: index
        }));
        const { error: imageError } = await supabase.from("product_images").insert(imageInserts);
        if (imageError) throw imageError;
      }

      toast.success(isNew ? "Product created!" : "Product updated!");
      router.push("/products");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {/* Basic Info */}
        <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <Package className="h-5 w-5 text-blue-600" />
            <h3 className="text-xl font-bold">General Information</h3>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold ml-1">Product Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Premium Cotton T-Shirt"
              className="h-12 rounded-2xl bg-slate-50 dark:bg-white/5 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-semibold ml-1">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell your customers about this product..."
              className="min-h-[150px] rounded-2xl bg-slate-50 dark:bg-white/5 border-border/50"
            />
          </div>
        </div>

        {/* Variants */}
        <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm space-y-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-blue-600" />
              <h3 className="text-xl font-bold">Variants & Inventory</h3>
            </div>
            <Button
              type="button"
              onClick={handleAddVariant}
              variant="outline"
              size="sm"
              className="rounded-xl border-blue-600/20 text-blue-600 hover:bg-blue-600/5"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Variant
            </Button>
          </div>

          <div className="space-y-4">
            {variants.map((variant, index) => (
              <div key={index} className="flex flex-wrap md:flex-nowrap items-end gap-4 p-5 rounded-3xl bg-slate-50 dark:bg-white/5 border border-border/30 relative group">
                <div className="flex-1 space-y-2 min-w-[120px]">
                  <Label className="text-[10px] uppercase tracking-widest font-bold opacity-50 ml-1">SKU</Label>
                  <Input
                    value={variant.sku}
                    onChange={(e) => updateVariant(index, "sku", e.target.value)}
                    placeholder="TSHIRT-RED-S"
                    className="h-10 rounded-xl bg-white dark:bg-black/20 border-border/50"
                  />
                </div>
                <div className="w-full md:w-32 space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold opacity-50 ml-1">Price (Cents)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                    <Input
                      type="number"
                      value={variant.price}
                      onChange={(e) => updateVariant(index, "price", parseInt(e.target.value) || 0)}
                      className="h-10 pl-8 rounded-xl bg-white dark:bg-black/20 border-border/50"
                    />
                  </div>
                </div>
                <div className="w-full md:w-28 space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest font-bold opacity-50 ml-1">Stock</Label>
                  <Input
                    type="number"
                    value={variant.stock_quantity}
                    onChange={(e) => updateVariant(index, "stock_quantity", parseInt(e.target.value) || 0)}
                    className="h-10 rounded-xl bg-white dark:bg-black/20 border-border/50"
                  />
                </div>
                <div className="flex items-center h-10 mb-0.5 px-2">
                  <Switch
                    checked={variant.is_active}
                    onCheckedChange={(checked) => updateVariant(index, "is_active", checked)}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveVariant(index)}
                  className="h-10 w-10 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-xl"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Publish / Status */}
        <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">Status</h3>
              <p className="text-xs text-muted-foreground">Visible in storefront</p>
            </div>
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 font-bold"
            disabled={isLoading}
          >
            <Save className="h-5 w-5 mr-2" />
            {isLoading ? "Saving..." : isNew ? "Create Product" : "Save Changes"}
          </Button>
          <Link href="/products" className="block">
            <Button variant="ghost" className="w-full h-12 rounded-2xl">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </Link>
        </div>

        {/* Media */}
        <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm space-y-4">
          <h3 className="font-bold">Product Media</h3>
          <ImageUploader
            storeId={storeId}
            productId={tempId}
            initialImages={imageUrls}
            onImagesChange={setImageUrls}
          />
        </div>

        {/* Tags Selection */}
        <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm space-y-4">
          <h3 className="font-bold">Tags & Categories</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold transition-all border",
                  selectedTagIds.includes(tag.id)
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-transparent border-border hover:border-blue-500/50 text-muted-foreground"
                )}
              >
                {tag.name}
              </button>
            ))}
            {tags.length === 0 && (
              <p className="text-xs text-muted-foreground italic">No tags created yet. Go to Tags menu to add some.</p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
