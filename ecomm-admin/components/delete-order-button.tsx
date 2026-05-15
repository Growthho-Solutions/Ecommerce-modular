"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteOrder } from "@/app/actions/orders";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function DeleteOrderButton({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to archive this order?")) return;
    
    setIsLoading(true);
    const result = await deleteOrder(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Order archived");
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
