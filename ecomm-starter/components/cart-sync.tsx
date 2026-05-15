"use client";

import { useEffect, useRef } from "react";
import { useCartStore } from "@/lib/cart-store";
import { createClient } from "@/lib/supabase/client";
import { getStoreId } from "@/lib/store-utils";

export function CartSync({ customerId }: { customerId?: string }) {
  const items = useCartStore((state) => state.items);
  const supabase = createClient();
  const storeId = getStoreId();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip first render to avoid overwriting DB with empty local cart if still loading
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!customerId) return;

    const syncCart = async () => {
      // 1. Ensure cart exists for customer
      let { data: cart } = await supabase
        .from("carts")
        .select("id")
        .eq("customer_id", customerId)
        .eq("store_id", storeId)
        .single();

      if (!cart) {
        const { data: newCart } = await supabase
          .from("carts")
          .insert({ customer_id: customerId, store_id: storeId })
          .select("id")
          .single();
        cart = newCart;
      }

      if (!cart) return;

      // 2. Clear current DB items and replace with local items
      // (Simplified sync: replace all)
      await supabase.from("cart_items").delete().eq("cart_id", cart.id);

      if (items.length > 0) {
        const cartItems = items.map((item) => ({
          cart_id: cart.id,
          variant_id: item.variantId,
          quantity: item.quantity,
        }));

        await supabase.from("cart_items").insert(cartItems);
      }
    };

    const timer = setTimeout(syncCart, 2000); // Debounce sync
    return () => clearTimeout(timer);
  }, [items, customerId, storeId]);

  return null;
}
