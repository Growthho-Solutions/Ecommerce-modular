# Growthho E-commerce Platform - Comprehensive Software Requirements Specification (SRS)

## 1. Executive Summary
Growthho E-commerce is a multi-tenant Software-as-a-Service (SaaS) platform designed to provide highly customizable, standalone e-commerce storefronts for various clients (Store Managers). It allows a central administrative body (Growthho Admins) to provision stores, while Store Managers maintain full control over their inventory, orders, and storefront configuration. 

This document serves as the single source of truth for rebuilding the MVP from scratch.

---

## 2. Technology Stack
*   **Monorepo Management:** `pnpm` workspace (`@growthho/monorepo`).
*   **Framework:** Next.js 14+ (App Router) for all applications.
*   **Styling:** Tailwind CSS, Radix UI primitives.
*   **State Management:** Zustand (for client-side state like shopping carts).
*   **Database & Auth:** Supabase (PostgreSQL, Supabase Auth, Row Level Security).
*   **Hosting/Deployment:** Vercel (or equivalent modern edge provider).

---

## 3. System Architecture
The platform is physically deployed as independent applications but logically operates as a multi-tenant system via a central database.

### 3.1 Applications
1.  **`ecomm-admin` (Central Dashboard):** A single, unified Next.js application used by both Growthho Admins (Superadmins) and Store Managers. Views and permissions are dynamically rendered based on the authenticated user's role.
2.  **`ecomm-starter` (Storefronts):** A Next.js application template. For each new client/store, this repository is cloned, visually customized (CSS/branding), and deployed as a standalone instance. It securely connects back to the central Supabase database using an injected `NEXT_PUBLIC_STORE_ID` environment variable.

### 3.2 Data Architecture (Logical Tenancy)
*   **Single Database:** All tenants share a single PostgreSQL database (Supabase).
*   **Tenant Isolation:** Every tenant-specific table (e.g., `products`, `orders`, `customers`) contains a mandatory `store_id` foreign key.
*   **Security:** Data isolation is enforced strictly at the database level using Supabase Row Level Security (RLS) policies. Applications must pass the `store_id` in their database queries; RLS ensures they cannot read/write data belonging to another store.

---

## 4. Database Schema (Core MVP Tables)

*Note: All primary keys use `UUIDv4`. All monetary values use `INTEGER` (cents) to prevent floating-point errors.*

*   **`stores`**: `id`, `name`, `logo_url`, `support_email`, `base_currency` (e.g., "USD"), `created_at`.
*   **`users`**: (Managed by Supabase Auth) `id`, `email`, `encrypted_password`.
*   **`user_roles`**: `user_id`, `role` (enum: `superadmin`, `manager`), `store_id` (nullable, only for managers).
*   **`products`**: `id`, `store_id`, `name`, `description`, `is_active`, `deleted_at` (soft delete).
*   **`product_variants`**: `id`, `product_id`, `sku`, `price` (int), `stock_quantity`, `is_active`.
*   **`product_images`**: `id`, `product_id`, `image_url`, `display_order`.
*   **`tags`**: `id`, `store_id`, `name` (e.g., "Large", "Red", "Summer Collection").
*   **`product_tags`**: `product_id`, `tag_id`.
*   **`customers`**: `id`, `store_id`, `email`, `phone`, `name`, `password_hash`, `created_at`.
*   **`customer_addresses`**: `id`, `customer_id`, `address_line1`, `address_line2`, `city`, `state`, `postal_code`, `country`, `is_default` (boolean).
*   **`password_reset_tokens`**: `id`, `customer_id`, `token`, `expires_at`.
*   **`carts`**: `id`, `store_id`, `customer_id` (nullable for guests), `session_id` (for guests), `updated_at`.
*   **`cart_items`**: `id`, `cart_id`, `product_variant_id`, `quantity`.
*   **`orders`**: `id`, `store_id`, `customer_id` (nullable for guest orders), `status` (`pending`, `paid`, `failed`, `abandoned`, `processing`, `shipped`, `cancelled`), `total_amount` (int), `discount_id` (nullable), `discount_amount` (int, to preserve historical discount values), `shipping_address` (JSONB or text), `created_at`.
*   **`order_items`**: `id`, `order_id`, `product_variant_id`, `quantity`, `unit_price_at_purchase` (int).
*   **`discounts`**: `id`, `store_id`, `code`, `discount_type` (`percentage`, `fixed`), `value` (int), `is_active`.

---

## 5. User Roles & Authentication

### 5.1 Roles
1.  **Growthho Admin (Superadmin):** 
    *   Creates new `stores` records.
    *   Creates Store Manager accounts and assigns them a `store_id`.
    *   Views platform-wide analytics.
2.  **Store Manager:** 
    *   Logs into `ecomm-admin`. Restricted by RLS to only see data where `store_id` matches their assignment.
    *   Manages store settings, products, variants, and orders.
3.  **Customer:** 
    *   Logs into a specific `ecomm-starter` storefront.
    *   **Strict Isolation:** A customer account is inherently tied to a specific `store_id`. If they visit a different Growthho storefront, they must create a new account.

### 5.2 Authentication Flows
*   **Admins & Managers:** Use standard Supabase Auth (Email/Password) since they are global platform users. Superadmins utilize the Supabase `service_role` key (or custom claims) to bypass RLS and view all platform data.
*   **Customers:** Because Supabase Auth enforces globally unique emails per project, and customers need strictly isolated accounts per store, Customer authentication is handled via a custom Credentials flow verifying against the `customers.password_hash` column.
*   Supports standard "Forgot Password" and "Password Reset" via email for all roles.
*   No 2FA required for the MVP.

---

## 6. Functional Requirements

### 6.1 Product & Inventory Management
*   **Parent-Variant Architecture:** Products are logical groupings (e.g., "T-Shirt"). Sellable items are Variants (e.g., "Red, Large"). Price and SKU are defined on the Variant.
*   **Tagging System:** Products and Variants are organized using a normalized tagging system for filtering (categories, materials, sizes).
*   **Data Entry:** Managers can create products manually via forms or upload via Bulk CSV import.
*   **Media:** Support for multiple images per product, stored in Supabase Storage under `/{store_id}/products/`.

### 6.2 Cart & Checkout
*   **Cart State:** Managed locally via Zustand. The cart is synced to the database (`carts` and `cart_items` tables) using either a logged-in `customer_id` or a browser `session_id` for guests, persisting the cart across sessions.
*   **Guest Checkout:** Fully supported. Collects email/phone during checkout to create a "shadow" customer record, allowing them to claim the account via a password setup later.
*   **Pricing & Tax:** All prices are tax-inclusive. 
*   **Shipping:** Simple flat-rate or condition-based delivery pricing logic defined by the Store Manager.
*   **Discounts:** Customers can apply simple active discount codes (percentage or fixed amount) at checkout. The applied discount is recorded directly on the `orders` table to preserve historical accuracy.
*   **Payments:** Integrates a Mock Payment Gateway for the MVP.
*   **Inventory Deduction (Race Conditions):** To prevent overselling, variant `stock_quantity` is optimistically deducted only upon *successful payment validation*, rather than when an item is added to the cart.

### 6.3 Order Management
*   **Order Lifecycle:** Orders progress through `pending` -> `paid` -> `processing` -> `shipped`. If payment fails or a cart is left at checkout, the status is marked as `failed` or `abandoned`.
*   **Modifications:** Post-purchase order edits (changing items) are not supported in MVP.
*   **Cancellations & Refunds:** Customers cannot cancel orders. Managers handle cancellations and issue full refunds manually via the Admin dashboard. Partial refunds are out of scope.
*   **Notifications:** Transactional emails (e.g., Order Confirmation) are sent to the customer automatically upon successful payment.

### 6.4 Customer Experience (Storefront)
*   **Discovery:** Storefronts feature product pagination and basic text-based search.
*   **Address Book:** Registered customers can save multiple shipping/billing addresses to their profile for faster checkout.
*   **Localization:** Storefront respects the `base_currency` defined in the store configuration. Basic i18n structure implemented in the starter template.

### 6.5 Analytics (Dashboards)
*   **Store Manager Home:** Displays Total Revenue, Total Orders, Average Order Value, and a list of the 5 most recent orders.
*   **Growthho Admin Home:** Displays Total Platform Stores, Total Active Stores, and Platform-wide Aggregate Revenue.

---

## 7. Non-Functional Requirements

### 7.1 Security & Compliance
*   **Rate Limiting:** Simple IP-based rate limiting on API routes to protect the central backend from abuse originating from cloned storefronts.
*   **Data Integrity:** Soft deletes (`deleted_at`) for Products and Orders to ensure historical sales data and receipts do not break if a manager deletes an item.
*   **Compliance:** Starter storefronts include customizable, standard "Terms of Service", "Privacy Policy", and Cookie Consent banner templates.

### 7.2 Performance & SEO
*   **SEO Automation:** `ecomm-starter` includes dynamic generation of `sitemap.xml` and `robots.txt` based on active products, alongside semantic HTML and OpenGraph meta tags.
*   **Observability:** Standard application logging is utilized. Advanced error tracking (e.g., Sentry) is deferred post-MVP.

### 7.3 Infrastructure & Deployment
*   **Custom Domains:** Handled manually by Growthho Admins mapping DNS records in the deployment provider (Vercel) for the specific storefront clone.
*   **Environment Variables:** 
    *   `ecomm-admin`: Requires `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
    *   `ecomm-starter`: Requires `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_STORE_ID`.
