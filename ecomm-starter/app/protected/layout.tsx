import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

/**
 * Layout for protected routes.
 * Uses the standard Header and Footer for consistency.
 */
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto ~px-4/8 ~py-12/20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
