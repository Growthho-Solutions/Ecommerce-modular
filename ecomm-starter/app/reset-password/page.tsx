"use client";

import { resetPassword } from "@/app/actions/auth";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Lock, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;
    
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    formData.append("token", token);
    
    const result = await resetPassword(formData);
    if (result.success) {
      setIsDone(true);
      toast.success("Password updated successfully!");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      toast.error(result.error || "Failed to reset password");
    }
    setIsLoading(false);
  }

  if (isDone) {
    return (
      <div className="container mx-auto px-6 py-24 flex items-center justify-center">
        <div className="w-full max-w-md text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500 flex items-center justify-center mx-auto text-white shadow-2xl shadow-emerald-500/20">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter">Success!</h1>
            <p className="text-muted-foreground italic">Your password has been updated. Redirecting you to login...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="container mx-auto px-6 py-24 flex items-center justify-center">
        <p className="font-black text-red-500 uppercase tracking-widest text-xs">Invalid Reset Link</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-24 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mx-auto text-blue-600 mb-4">
            <Lock className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter">New Password</h1>
          <p className="text-muted-foreground italic">Please enter your new secure password below.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-10 rounded-[3rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-2xl shadow-blue-600/5 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-4">New Password</label>
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

          <Button 
            disabled={isLoading} 
            className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-500 font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 group"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Update Password
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
