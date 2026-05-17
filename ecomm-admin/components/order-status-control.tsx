"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface OrderStatusControlProps {
  orderId: string;
  currentStatus: string;
}

export function OrderStatusControl({ orderId, currentStatus }: OrderStatusControlProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleStatusChange = async (newStatus: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      setStatus(newStatus);
      toast.success(`Order status updated to ${newStatus}`);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case "delivered": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "shipped": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "paid": return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20";
      default: return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className={cn(
        "hidden md:block px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all duration-500",
        getStatusColor(status)
      )}>
        Current: {status}
      </div>

      <Select value={status} onValueChange={handleStatusChange} disabled={isLoading}>
        <SelectTrigger className="h-12 w-48 rounded-2xl bg-white dark:bg-[#12141c] border-border/50 shadow-sm font-bold">
          <SelectValue placeholder="Update Status" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl border-border/50 shadow-xl">
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="paid">Mark as Paid</SelectItem>
          <SelectItem value="shipped">Mark as Shipped</SelectItem>
          <SelectItem value="delivered">Mark as Delivered</SelectItem>
          <SelectItem value="cancelled">Cancel Order</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
