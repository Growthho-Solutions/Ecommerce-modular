"use server";

import { createClient } from "@/lib/supabase/server";
import { getStoreId } from "@/lib/store-utils";
import { getCustomerSession } from "@/lib/customer-auth";
import { redirect } from "next/navigation";

export async function processCheckout(formData: FormData, cartItems: any[]) {
  const supabase = await createClient();
  const storeId = getStoreId();
  const session = await getCustomerSession();
  const customerId = session?.customer?.id;

  if (!customerId) {
    // For MVP, we require login for checkout. 
    // In Phase 7.7 we can add guest checkout.
    return { error: "Please login to complete your order." };
  }

  // 1. Calculate totals and validate stock
  let subtotal = 0;
  for (const item of cartItems) {
    const { data: variant } = await supabase
      .from("product_variants")
      .select("price, stock_quantity")
      .eq("id", item.variantId)
      .single();

    if (!variant || variant.stock_quantity < item.quantity) {
      return { error: `Insufficient stock for ${item.name}` };
    }
    subtotal += variant.price * item.quantity;
  }

  // 2. Create Order (Transaction-ish)
  // We'll create the order first
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      store_id: storeId,
      customer_id: customerId,
      total_amount: subtotal,
      status: "paid", // Mock payment success
    })
    .select()
    .single();

  if (orderError) return { error: "Failed to create order" };

  // 3. Create Order Items and update stock
  for (const item of cartItems) {
    await supabase.from("order_items").insert({
      order_id: order.id,
      product_variant_id: item.variantId,
      quantity: item.quantity,
      unit_price: item.price,
    });

    // Deduct stock
    const { data: v } = await supabase
      .from("product_variants")
      .select("stock_quantity")
      .eq("id", item.variantId)
      .single();
    
    await supabase
      .from("product_variants")
      .update({ stock_quantity: (v?.stock_quantity || 0) - item.quantity })
      .eq("id", item.variantId);
  }

  // 4. Clear DB Cart
  const { data: cart } = await supabase
    .from("carts")
    .select("id")
    .eq("customer_id", customerId)
    .single();
  
  if (cart) {
    await supabase.from("cart_items").delete().eq("cart_id", cart.id);
  }

  return { success: true, orderId: order.id };
}
