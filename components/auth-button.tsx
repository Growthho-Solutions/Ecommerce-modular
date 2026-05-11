import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { User } from "lucide-react";

/**
 * AuthButton handles the user authentication state in the header.
 * Displays user info and logout when authenticated, or sign-in/sign-up when guest.
 */
export async function AuthButton() {
  const supabase = await createClient();

  // Get user claims for authentication state
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  return user ? (
    <div className="flex items-center gap-2 md:gap-4">
      <Link 
        href="/protected" 
        className="hidden lg:flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
      >
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <User className="h-4 w-4" />
        </div>
        <span className="max-w-[120px] truncate">{user.email}</span>
      </Link>
      
      {/* Mobile/Compact view icon */}
      <Link href="/protected" className="lg:hidden">
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </Link>

      <LogoutButton />
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex">
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant="default" className="rounded-full px-4">
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
