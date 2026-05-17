"use client";

import { customerLogin } from "@/app/actions/auth";
import { useState } from "react";
import { ArrowRight, Mail, Lock, Loader2 } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    
    const result = await customerLogin(formData);
    if (result?.error) {
      toast.error(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-6 py-24 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tighter">Welcome Back</h1>
          <p className="text-muted-foreground italic">Sign in to your account to manage orders and checkout faster.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-10 rounded-[3rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-2xl shadow-blue-600/5 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  name="email" 
                  type="email" 
                  placeholder="hello@example.com" 
                  required 
                  className="pl-11 h-14 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent focus:bg-white dark:focus:bg-black/40 transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Password</label>
                <Link href="/forgot-password" className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-widest">Forgot?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  name="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  className="pl-11 h-14 rounded-2xl bg-slate-50 dark:bg-black/20 border-transparent focus:bg-white dark:focus:bg-black/40 transition-all"
                />
              </div>
            </div>
          </div>

          <Button 
            disabled={isLoading} 
            className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-500 font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 group"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="font-bold text-blue-600 hover:underline italic">
            Create one today
          </Link>
        </p>
      </div>
    </div>
  );
}
