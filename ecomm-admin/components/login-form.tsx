"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      
      router.push("/");
      router.refresh();
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-white/70 text-xs uppercase tracking-widest ml-1">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@growthho.com"
            required
            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-xl focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between ml-1">
            <Label htmlFor="password" title="Enter your password" className="text-white/70 text-xs uppercase tracking-widest">Password</Label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-xl focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}
        <Button 
          type="submit" 
          className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]" 
          disabled={isLoading}
        >
          {isLoading ? "Authenticating..." : "Sign In to Dashboard"}
        </Button>
      </form>
    </div>
  );
}
