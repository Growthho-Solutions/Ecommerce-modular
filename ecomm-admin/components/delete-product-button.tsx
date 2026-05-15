"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteProduct } from "@/app/actions/products";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function DeleteProductButton({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this product? It will be moved to archives.")) return;
    
    setIsLoading(true);
    const result = await deleteProduct(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product archived");
    }
    setIsLoading(false);
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleDelete}
      disabled={isLoading}
      className="h-10 w-10 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all"
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  );
}
