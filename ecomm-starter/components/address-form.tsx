"use client";

import { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { addAddress } from "@/app/actions/profile";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AddressForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    
    const result = await addAddress(formData);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Address added successfully!");
      setIsOpen(false);
    }
    setIsLoading(false);
  }

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600/10 text-blue-600 font-bold text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
      >
        <Plus className="h-4 w-4" />
        Add New
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="relative w-full max-w-xl bg-white dark:bg-[#12141c] rounded-[3rem] border border-border/50 shadow-2xl overflow-hidden p-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-3xl font-black tracking-tighter">Add Address</h3>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Street Address</label>
              <Input name="address_line1" required placeholder="123 Luxury Ave" className="h-14 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Apartment / Suite (Optional)</label>
              <Input name="address_line2" placeholder="Suite 404" className="h-14 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">City</label>
                <Input name="city" required placeholder="New York" className="h-14 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">State / Province</label>
                <Input name="state" required placeholder="NY" className="h-14 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Postal Code</label>
                <Input name="postal_code" required placeholder="10001" className="h-14 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Country</label>
                <Input name="country" required placeholder="USA" className="h-14 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-4">
            <input type="checkbox" name="is_default" id="is_default" className="w-5 h-5 rounded-lg border-border" />
            <label htmlFor="is_default" className="text-sm font-bold text-muted-foreground">Set as default address</label>
          </div>

          <Button 
            disabled={isLoading}
            className="w-full h-20 rounded-3xl bg-blue-600 text-white font-black text-lg uppercase tracking-widest hover:bg-blue-500 shadow-2xl shadow-blue-600/30"
          >
            {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : "Save Address"}
          </Button>
        </form>
      </div>
    </div>
  );
}
