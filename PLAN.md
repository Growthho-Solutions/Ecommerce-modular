# Development Plan: Growthho E-commerce MVP

## 🤖 Instructions for AI Coding Agent
1. **Granularity:** Execute tasks strictly one at a time. Do not combine multiple checkboxes into a single step. Small, incremental changes are mandatory.
2. **Commit Often:** After successfully completing a single task checkbox, run `git add .` and `git commit -m "<simple message>"` to save progress.
3. **No Dev Servers:** Do NOT run commands like `npm run dev` or `npm run build` autonomously. Ask the USER to run these commands in their own terminal and wait for them to report back the results/errors.
4. **Track Progress:** When you complete a task, you MUST update this `PLAN.md` file to mark the checkbox `[x]`. 
5. **Living Documents:** If architectural changes occur during development, you MUST update both `REQUIREMENTS.md` and `PLAN.md` to reflect the new reality. Keep these documents perfectly in sync with the codebase.

---

## 📋 Task Breakdown

### Phase 0: Codebase Cleanup & Foundation Setup
- [x] 0.1 Audit existing code in `ecomm-admin` and `ecomm-starter` to remove unused files/dead code.
- [x] 0.2 Review and update `package.json` dependencies for security and compatibility (Replaced ESLint with Biome).
- [x] 0.3 Run Next.js linting (`npm run lint`) and resolve any existing warnings/errors.
- [x] 0.4 Run TypeScript compilation checks (`tsc --noEmit`) and fix any type errors.
- [x] 0.5 Reorganize shared UI components and utility functions to enforce DRY principles (Decided on decoupled Option B).
- [x] 0.6 Standardize folder structures (e.g., separating `/components`, `/lib`, `/hooks`, `/actions`) across both apps.

### Phase 1: Database Foundation (Supabase)
- [x] 1.1 Create migration for `stores` table and basic RLS policies.
- [x] 1.2 Create migration for `user_roles` table (mapping Auth users to roles/stores).
- [x] 1.3 Create migration for `products`, `product_variants`, and `product_images`.
- [x] 1.4 Create migration for `tags` and `product_tags`.
- [x] 1.5 Create migration for `customers`, `customer_addresses`, and `password_reset_tokens` (custom auth implementation).
- [x] 1.6 Create migration for `carts` and `cart_items`.
- [x] 1.7 Create migration for `discounts`.
- [x] 1.8 Create migration for `orders` and `order_items`.
- [ ] 1.9 Write a basic seed script to populate test data (1 Admin, 1 Manager, 1 Store, some products).

### Phase 2: Central Admin Setup (`ecomm-admin`)
- [ ] 2.1 Set up Supabase SSR authentication utility files.
- [ ] 2.2 Create Admin Login page (`/login`).
- [ ] 2.3 Create Protected Route Layout (verifying `user_roles`).
- [ ] 2.4 Create Growthho Superadmin Dashboard (overview metrics).
- [ ] 2.5 Create Store Manager Dashboard (metrics scoped to `store_id`).
- [ ] 2.6 Create "Store Configuration" page for Managers to update Name, Logo, Currency.

### Phase 3: Admin Product Management
- [ ] 3.1 Create Tags management UI (Create/Delete tags).
- [ ] 3.2 Create Products list view (table with pagination).
- [ ] 3.3 Create Product Creation form (basic details).
- [ ] 3.4 Add Product Variants management to Product form (SKU, price, stock).
- [ ] 3.5 Implement Supabase Storage upload for Product Images.
- [ ] 3.6 Create simple Discount Codes management page (Create/Deactivate).

### Phase 4: Admin Order Management
- [ ] 4.1 Create Orders list view (table with status filters).
- [ ] 4.2 Create Order details page (showing items, total, customer info).
- [ ] 4.3 Add functionality to manually update Order Status (e.g., mark as Shipped).
- [ ] 4.4 Add functionality to manually Cancel an order and process a manual refund.

### Phase 5: Storefront Infrastructure (`ecomm-starter`)
- [ ] 5.1 Configure `NEXT_PUBLIC_STORE_ID` in `.env.local` and create a centralized DB client that automatically passes this ID to all queries.
- [ ] 5.2 Set up Zustand store for the Shopping Cart.
- [ ] 5.3 Create global Layout with Navigation Header (Cart icon) and Footer.
- [ ] 5.4 Implement basic localization logic (formatting integer cents to the store's `base_currency`).

### Phase 6: Storefront Shopping Experience
- [ ] 6.1 Create Home Page (Hero section, featured products).
- [ ] 6.2 Create Products Listing page with basic pagination.
- [ ] 6.3 Implement text-based Search functionality on the Products page.
- [ ] 6.4 Create Product Detail page (showing variant selector, images).
- [ ] 6.5 Connect "Add to Cart" button to Zustand store.

### Phase 7: Storefront Checkout & Auth
- [ ] 7.1 Create Cart slide-out/page (view items, change quantity, remove).
- [ ] 7.2 Implement Cart persistence logic (sync Zustand to `carts` table).
- [ ] 7.3 Create Custom Credentials Login/Signup page for Customers (interacting with the `customers` table, not global Auth).
- [ ] 7.4 Implement Customer Password Reset flow (generating tokens and sending emails).
- [ ] 7.5 Create Customer Profile page (Address Book management).
- [ ] 7.6 Create Checkout Page (Shipping info collection, discount code input).
- [ ] 7.7 Implement Guest Checkout "Shadow Account" creation logic.
- [ ] 7.8 Build Mock Payment Gateway processing step.
- [ ] 7.9 Implement Order creation transaction (move cart items to order items, deduct stock).

### Phase 8: Polish & Finalization
- [ ] 8.1 Add standard `robots.txt` and dynamic `sitemap.xml` to `ecomm-starter`.
- [ ] 8.2 Add simple API rate-limiting middleware to `ecomm-admin` and `ecomm-starter`.
- [ ] 8.3 Verify all RLS policies are strictly enforcing multi-tenant isolation.
- [ ] 8.4 Perform final end-to-end testing of the complete checkout flow.
