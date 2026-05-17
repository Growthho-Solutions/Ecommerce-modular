"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

interface Store {
  id: string;
  name: string;
  logo_url: string | null;
  support_email: string | null;
  base_currency: string;
}

export function StoreForm({ store }: { store: Store }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const updates = {
      name: formData.get("name") as string,
      logo_url: formData.get("logo_url") as string,
      support_email: formData.get("support_email") as string,
      base_currency: formData.get("base_currency") as string,
    };

    try {
      const { error } = await supabase
        .from("stores")
        .update(updates)
        .eq("id", store.id);

      if (error) throw error;

      toast.success("Store settings updated successfully!");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update store");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-semibold ml-1">Store Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={store.name}
            required
            className="h-12 rounded-2xl bg-slate-50 dark:bg-white/5 border-border/50 focus:ring-blue-500/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="base_currency" className="text-sm font-semibold ml-1">Base Currency</Label>
          <Select name="base_currency" defaultValue={store.base_currency}>
            <SelectTrigger className="h-12 rounded-2xl bg-slate-50 dark:bg-white/5 border-border/50">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent className="rounded-2xl border-border/50 shadow-xl">
              <SelectItem value="USD">USD - US Dollar</SelectItem>
              <SelectItem value="EUR">EUR - Euro</SelectItem>
              <SelectItem value="GBP">GBP - British Pound</SelectItem>
              <SelectItem value="INR">INR - Indian Rupee</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="support_email" className="text-sm font-semibold ml-1">Support Email</Label>
          <Input
            id="support_email"
            name="support_email"
            type="email"
            defaultValue={store.support_email || ""}
            placeholder="support@yourstore.com"
            className="h-12 rounded-2xl bg-slate-50 dark:bg-white/5 border-border/50 focus:ring-blue-500/20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo_url" className="text-sm font-semibold ml-1">Logo URL</Label>
          <Input
            id="logo_url"
            name="logo_url"
            defaultValue={store.logo_url || ""}
            placeholder="https://example.com/logo.png"
            className="h-12 rounded-2xl bg-slate-50 dark:bg-white/5 border-border/50 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          className="h-12 px-8 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95"
          disabled={isLoading}
        >
          {isLoading ? "Saving Changes..." : "Save Configuration"}
        </Button>
      </div>
    </form>
  );
}
