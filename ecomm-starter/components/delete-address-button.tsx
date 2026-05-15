"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteAddress } from "@/app/actions/profile";
import { toast } from "sonner";

export function DeleteAddressButton({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this address?")) return;
    
    setIsLoading(true);
    const result = await deleteAddress(id);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Address deleted");
    }
    setIsLoading(false);
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={isLoading}
      className="p-3 rounded-2xl text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all"
    >
      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
    </button>
  );
}
