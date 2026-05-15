"use client";

import { useCartStore } from "@/lib/cart-store";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

export function CartIcon() {
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="relative p-2">
      <ShoppingCart className="h-6 w-6" />
    </div>
  );

  return (
    <div className="relative p-2 group cursor-pointer">
      <ShoppingCart className="h-6 w-6 group-hover:text-blue-600 transition-colors" />
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center border-2 border-white dark:border-[#0a0a0a]">
          {totalItems}
        </span>
      )}
    </div>
  );
}
