export function getStoreId(): string {
  const storeId = process.env.NEXT_PUBLIC_STORE_ID;
  if (!storeId) {
    throw new Error("NEXT_PUBLIC_STORE_ID is not defined");
  }
  return storeId;
}

export function formatCurrency(amountCents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amountCents / 100);
}
