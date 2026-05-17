# 🛍️ Growthho Customer Storefront Template (`ecomm-starter`)

This is the customer-facing storefront template of the **Growthho E-commerce Platform**. It is designed to be highly responsive, lightning-fast, SEO-optimized, and visually stunning. 

For each new merchant on the platform, this template is visually customized and deployed as a standalone instance connected back to the central Supabase database using an injected `NEXT_PUBLIC_STORE_ID`.

---

## ✨ Features

*   **Custom Isolated Customer Authentication:**
    *   Since Supabase Auth requires globally unique emails per database, we handle customer accounts in a strictly isolated manner.
    *   Authentication uses a custom credentials credentials flow verifying against a dedicated `customers` database table.
    *   Sessions are secured using a custom **JWT cookie payload** created via `jose` inside `lib/customer-auth.ts`.
*   **State-of-the-Art Cart Management (Zustand):**
    *   Shopping carts are managed locally via highly optimized Zustand hooks with local storage persistence.
    *   Carts are synchronized automatically to the database (`carts` and `cart_items` tables) upon customer sign-in or guest checkout session generation.
*   **Intuitive Guest Checkout Flow:**
    *   Allows guest checkouts using standard email and delivery configurations.
    *   Automatically creates "shadow" customer records, allowing users to later "claim" their guest accounts and save orders by choosing a password.
*   **Deterministic Inventory Race-Condition Protection:**
    *   To prevent double-selling issues, variant `stock_quantity` is deducted **only upon successful payment validation**, rather than when items are placed in carts.
*   **Search Engine Optimization (SEO) Built-in:**
    *   Includes semantic HTML, dynamic `sitemap.xml`, and metadata setups, along with high-end responsive styling.
    *   Includes a customizable **Cookie Consent** banner, Terms of Service, and Privacy Policy out of the box.

---

## 🏗️ Technical Architecture Details

### 🔑 Customer Authentication & Session Management
*   **JWT Encryption:** Storefront utilizes JWT cookies for authentication. Custom encryption (`encrypt`) and decryption (`decrypt`) helpers are managed in [ecomm-starter/lib/customer-auth.ts](file:///home/xaxh/git/growthho/ecomm-starter/lib/customer-auth.ts).
*   **Middleware Boundary:** Traffic interceptions, cookie renewals, and rate-limiting triggers are handled cleanly in the Next.js [ecomm-starter/proxy.ts](file:///home/xaxh/git/growthho/ecomm-starter/proxy.ts) file.

### 🛡️ Type-Safe Checkout Actions
The checkout processor is typed to avoid implicit parameters. Custom models are defined inside [ecomm-starter/app/actions/checkout.ts](file:///home/xaxh/git/growthho/ecomm-starter/app/actions/checkout.ts) with `CartItem` interfaces:
```typescript
export interface CartItem {
  variantId: string;
  quantity: number;
  name: string;
  price: number;
}
```

---

## 🚀 Getting Started

### 1. Environment Requirements
Ensure the following variables are configured inside your `ecomm-starter/.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
NEXT_PUBLIC_STORE_ID=your-scoped-store-uuid # Dynamically scopes this storefront to a merchant
JWT_SECRET=your-customer-auth-jwt-secret # Used for customer secure session cookies
```

### 2. Run Local Development
You can run this application specifically from the monorepo root:
```bash
# Start ecomm-starter only
pnpm --filter @growthho/starter dev
```
Or run both applications at once using:
```bash
make dev
```

### 3. Production Compilation
To compile and build the storefront application, run:
```bash
pnpm --filter @growthho/starter build
```
