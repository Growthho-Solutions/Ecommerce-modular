"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Ticket,
  Plus,
  Trash2,
  Percent,
  DollarSign,
  Calendar,
  X
} from "lucide-react";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

interface Discount {
  id: string;
  code: string;
  type: "percentage" | "fixed_amount";
  value: number;
  is_active: boolean;
  store_id: string;
}

export function DiscountManager({ initialDiscounts, storeId }: { initialDiscounts: Discount[], storeId: string }) {
  const [discounts, setDiscounts] = useState<Discount[]>(initialDiscounts);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  // Form State
  const [newCode, setNewCode] = useState("");
  const [newType, setNewType] = useState<"percentage" | "fixed_amount">("percentage");
  const [newValue, setNewValue] = useState(0);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || newValue <= 0) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("discounts")
        .insert({
          code: newCode.trim().toUpperCase(),
          type: newType,
          value: newValue,
          is_active: true,
          store_id: storeId
        })
        .select()
        .single();

      if (error) throw error;

      setDiscounts([data, ...discounts]);
      setIsAdding(false);
      setNewCode("");
      setNewValue(0);
      toast.success("Discount code created!");
    } catch (error: any) {
      toast.error(error.message || "Failed to create discount");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("discounts")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;

      setDiscounts(discounts.map(d => d.id === id ? { ...d, is_active: !currentStatus } : d));
      toast.success("Discount status updated");
    } catch (error: any) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("discounts")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setDiscounts(discounts.filter(d => d.id !== id));
      toast.success("Discount deleted");
    } catch (error: any) {
      toast.error("Failed to delete discount");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            className="h-12 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 font-bold"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Discount Code
          </Button>
        )}
      </div>

      {isAdding && (
        <div className="glass-card p-8 rounded-[2.5rem] bg-white dark:bg-[#12141c] border-2 border-blue-600/20 shadow-xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">New Discount Code</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsAdding(false)} className="rounded-xl">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest ml-1">Code</Label>
              <Input
                placeholder="SAVE20"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="h-12 rounded-2xl bg-slate-50 dark:bg-white/5 border-border/50 font-mono font-bold uppercase"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest ml-1">Type</Label>
              <Select value={newType} onValueChange={(v: any) => setNewType(v)}>
                <SelectTrigger className="h-12 rounded-2xl bg-slate-50 dark:bg-white/5 border-border/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-2xl shadow-xl">
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed_amount">Fixed Amount ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-widest ml-1">Value ({newType === "percentage" ? "%" : "Cents"})</Label>
              <Input
                type="number"
                value={newValue}
                onChange={(e) => setNewValue(parseInt(e.target.value) || 0)}
                className="h-12 rounded-2xl bg-slate-50 dark:bg-white/5 border-border/50"
              />
            </div>
            <div className="md:col-span-3 flex justify-end gap-3 mt-2">
              <Button type="button" variant="ghost" onClick={() => setIsAdding(false)} className="h-12 rounded-2xl px-6">
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-12 rounded-2xl px-8 bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 font-bold"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Save Discount Code"}
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="glass-card rounded-[2.5rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs uppercase tracking-widest text-muted-foreground border-b bg-slate-50/50 dark:bg-white/5">
              <th className="px-8 py-5 font-bold">Code</th>
              <th className="px-8 py-5 font-bold text-center">Value</th>
              <th className="px-8 py-5 font-bold text-center">Status</th>
              <th className="px-8 py-5 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {discounts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-8 py-20 text-center opacity-40">
                  <Ticket className="h-12 w-12 mx-auto mb-4" />
                  <p className="text-lg font-medium">No discounts created yet</p>
                </td>
              </tr>
            )}
            {discounts.map((discount) => (
              <tr key={discount.id} className="group hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                      <Ticket className="h-5 w-5" />
                    </div>
                    <span className="font-mono font-bold text-lg tracking-wider">{discount.code}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-center font-bold">
                  <div className="flex items-center justify-center gap-2">
                    {discount.type === "percentage" ? (
                      <>
                        <Percent className="h-4 w-4 text-muted-foreground" />
                        <span>{discount.value}% OFF</span>
                      </>
                    ) : (
                      <>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>${(discount.value / 100).toFixed(2)} OFF</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest",
                      discount.is_active ? "text-emerald-500" : "text-muted-foreground"
                    )}>
                      {discount.is_active ? "Active" : "Inactive"}
                    </span>
                    <Switch
                      checked={discount.is_active}
                      onCheckedChange={() => toggleStatus(discount.id, discount.is_active)}
                    />
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(discount.id)}
                    className="h-10 w-10 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
