"use client";

import { requestPasswordReset } from "@/app/actions/auth";
import { useState } from "react";
import { Mail, ArrowRight, Loader2, Key } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    
    const result = await requestPasswordReset(formData);
    if (result.success) {
      setIsSent(true);
      toast.success("Reset link sent if account exists.");
    } else {
      toast.error("Something went wrong.");
    }
    setIsLoading(false);
  }

  if (isSent) {
    return (
      <div className="container mx-auto px-6 py-24 flex items-center justify-center">
        <div className="w-full max-w-md text-center space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="w-20 h-20 rounded-3xl bg-blue-600 flex items-center justify-center mx-auto text-white shadow-2xl shadow-blue-600/20">
            <Mail className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter">Check Your Email</h1>
            <p className="text-muted-foreground italic">If an account exists with that email, we've sent instructions to reset your password.</p>
          </div>
          <Link href="/login" className="inline-block font-bold text-blue-600 hover:underline uppercase tracking-widest text-xs">Return to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-24 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mx-auto text-blue-600 mb-4">
            <Key className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter">Forgot Password</h1>
          <p className="text-muted-foreground italic">Enter your email and we'll send you a recovery link.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-10 rounded-[3rem] bg-white dark:bg-[#12141c] border border-border/50 shadow-2xl shadow-blue-600/5 space-y-6">
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

          <Button 
            disabled={isLoading} 
            className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-500 font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 group"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Send Reset Link
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link href="/login" className="font-bold text-blue-600 hover:underline italic">
            Go back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
