"use client";

import { createStore } from "@/app/actions/stores";
import { useState } from "react";
import { ArrowRight, Building2, Mail, Coins, Loader2, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import Link from "next/link";

export default function NewStorePage() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);

    const result = await createStore(formData);
    if (result?.error) {
      toast.error(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-12">
      <div className="space-y-2">
        <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 mb-6">
          <Sparkles className="h-8 w-8" />
        </div>
        <h1 className="text-5xl font-black tracking-tighter">Provision Tenant</h1>
        <p className="text-muted-foreground italic text-lg">Initialize a new standalone storefront instance in the Growthho ecosystem.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#12141c] rounded-[3rem] border border-border/50 p-12 shadow-2xl shadow-blue-500/5 space-y-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Store Name</label>
            <div className="relative">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                required
                placeholder="e.g. Modern Boutique"
                className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent focus:bg-white dark:focus:bg-black/40 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="supportEmail" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Support Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="supportEmail"
                  name="supportEmail"
                  type="email"
                  required
                  placeholder="support@store.com"
                  className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent focus:bg-white dark:focus:bg-black/40 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="baseCurrency" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Base Currency</label>
              <div className="relative">
                <Coins className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="baseCurrency"
                  name="baseCurrency"
                  required
                  placeholder="USD"
                  defaultValue="USD"
                  className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent focus:bg-white dark:focus:bg-black/40 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border/50 flex items-center justify-between gap-6">
          <Link href="/stores">
            <Button type="button" variant="ghost" className="h-16 px-8 rounded-2xl font-bold">Cancel</Button>
          </Link>
          <Button
            disabled={isLoading}
            className="flex-1 h-16 rounded-2xl bg-blue-600 hover:bg-blue-500 font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/20 group"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Initialize Store
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
