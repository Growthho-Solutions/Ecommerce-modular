# Development Plan: Growthho E-commerce MVP

## 🤖 Instructions for AI Coding Agent
1. **Granularity:** Execute tasks strictly one at a time. Do not combine multiple checkboxes into a single step. Small, incremental changes are mandatory.
2. **Commit History:** After making small, incremental changes, run `git add .` and `git commit -m "<simple standard message>"` to maintain a clean, readable git commit history.
3. **No Dev Servers:** Do NOT run commands like `npm run dev` or `npm run build` autonomously. Ask the USER to run these commands in their own terminal and wait for them to report back the results/errors.
4. **Track Progress:** When you complete a task, you MUST update this `PLAN.md` file to mark the checkbox `[x]`. 
5. **Living Documents:** Keep all Markdown files (`REQUIREMENTS.md`, `PLAN.md`, and all `README.md` files) perfectly up-to-date and in sync with the codebase as architectural, feature, or developer workflow changes occur.

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
- [x] 1.9 Write a basic seed script to populate test data (1 Admin, 1 Manager, 1 Store, some products).

### Phase 2: Central Admin Setup (`ecomm-admin`)
- [x] 2.1 Set up Supabase SSR authentication utility files.
- [x] 2.2 Create Admin Login page (`/login`).
- [x] 2.3 Create Protected Route Layout (verifying `user_roles`).
- [x] 2.4 Create Growthho Superadmin Dashboard (overview metrics).
- [x] 2.5 Create Store Manager Dashboard (metrics scoped to `store_id`).
- [x] 2.6 Create "Store Configuration" page for Managers to update Name, Logo, Currency.

### Phase 3: Admin Product Management
- [x] 3.1 Create Tags management UI (Create/Delete tags).
- [x] 3.2 Create Products list view (table with pagination).
- [x] 3.3 Create Product Creation form (basic details).
- [x] 3.4 Add Product Variants management to Product form (SKU, price, stock).
- [x] 3.5 Implement Supabase Storage upload for Product Images.
- [x] 3.6 Create simple Discount Codes management page (Create/Deactivate).

### Phase 4: Admin Order & Customer Management
- [x] 4.1 Create Orders list view (table with status filters).
- [x] 4.2 Create Order Detail view (customer info, line items, status update).
- [x] 4.3 Create Customers list view (LTV and order history).
- [x] 4.4 Refine Dashboard Analytics with live data (AOV, LTV, total revenue).

### Phase 5: Storefront Infrastructure (`ecomm-starter`)
- [x] 5.1 Configure `NEXT_PUBLIC_STORE_ID` in `.env.local` and create a centralized DB client that automatically passes this ID to all queries.
- [x] 5.2 Set up Zustand store for the Shopping Cart.
- [x] 5.3 Create global Layout with Navigation Header (Cart icon) and Footer.
- [x] 5.4 Implement basic localization logic (formatting integer cents to the store's `base_currency`).

### Phase 6: Storefront Shopping Experience
- [x] 6.1 Create Home Page (Hero section, featured products).
- [x] 6.2 Create Products Listing page with basic pagination.
- [x] 6.3 Implement text-based Search functionality on the Products page.
- [x] 6.4 Create Product Detail page (showing variant selector, images).
- [x] 6.5 Connect "Add to Cart" button to Zustand store.

- [/] Phase 7: Storefront Checkout & Auth
  - [x] 7.1 Create Cart slide-out/page (view items, change quantity, remove).
  - [x] 7.2 Implement Cart persistence logic (sync Zustand to `carts` table).
  - [x] 7.3 Create Custom Credentials Login/Signup page for Customers.
  - [x] 7.6 Create Checkout Page (Shipping info collection).
  - [x] 7.8 Build Mock Payment Gateway processing step.
  - [x] 7.9 Implement Order creation transaction.

### Phase 9: Advanced Customer Features
- [x] 9.1 Implement Customer Password Reset flow (generating tokens and sending emails).
- [x] 9.2 Create Customer Profile page with Address Book management.
- [x] 9.3 Implement Guest Checkout "Shadow Account" creation & Claim Account flow.

### Phase 10: Admin Operations & Scaling
- [x] 10.1 Build Superadmin Store Provisioning UI (Create Stores/Managers).
- [x] 10.2 Implement Bulk CSV Import for products in the Admin panel.
- [x] 10.3 Implement soft-delete logic across Admin UI (Products/Orders).
- [x] 10.4 Implement automated transactional email triggers (Order Confirmation).

### Phase 11: Compliance & Localization
- [x] 11.1 Create dynamic Terms of Service & Privacy Policy pages for storefronts.
- [x] 11.2 Implement a Cookie Consent banner for the storefront.
- [x] 11.3 Audit and finalize i18n support for the starter template.

### Phase 8: Polish & Finalization
- [x] 8.1 Add standard `robots.txt` and dynamic `sitemap.xml` to `ecomm-starter`.
- [x] 8.2 Add simple API rate-limiting middleware to `ecomm-admin` and `ecomm-starter`.
- [x] 8.3 Verify all RLS policies are strictly enforcing multi-tenant isolation.
- [x] 8.4 Perform final end-to-end testing of the complete checkout flow.
- [x] 8.5 Define Monorepo vs. Multirepo hybrid repository architecture, Git workflows, and build troubleshooting strategy in REQUIREMENTS.md.
- [x] 8.6 Resolve the Next.js Workspace Root lockfile inference issue by deleting `/home/xaxh/yarn.lock` or configuring `turbopack.root` in Next.js configs.
- [x] 8.7 Remove unused, non-existent logo imports causing TypeScript typecheck failures in ecomm-admin/components/hero.tsx.
- [x] 8.8 Create root biome.json to enforce strict linter rules (raising noUnusedImports to error level) and standardized formatting across the monorepo.
- [x] 8.9 Remove invalid 'size="sm"' attribute from Next.js <Link> component in ecomm-starter/app/login/page.tsx to resolve compiler typecheck failures.
- [x] 8.10 Fix incorrect relative import of hasEnvVars inside unused library ecomm-starter/lib/supabase/proxy.ts by defining the environment variable check locally.
- [x] 8.11 Create a developer Makefile at the root of the workspace to provide unified command shortcuts for development, building, linting, formatting, and cache clearing.
- [x] 8.12 Enforce dynamic rendering (force-dynamic) on ecomm-admin/app/(authenticated)/layout.tsx to prevent Next.js static prerendering build failures.
- [x] 8.13 Exclude Next.js compile directories (.next), node_modules, and cache files from Biome lint scans to prevent linter scanning errors.
- [x] 8.14 Resolve accessibility (a11y) labels and explicit button types inside storefront pages (claim-account and order-confirmation).
- [x] 8.15 Strongly type the cartItems parameter and eliminate the unused redirect import in ecomm-starter/app/actions/checkout.ts.
- [x] 8.16 Disable nextConfig.cacheComponents in ecomm-admin/next.config.ts to restore build compatibility with dynamic route layouts.
- [x] 8.17 Migrate deprecated middleware.ts to proxy.ts (renaming functions to proxy) in both ecomm-admin and ecomm-starter to comply with Next.js 16+ conventions.
- [x] 8.18 Rewrite root, ecomm-admin, and ecomm-starter README files to deliver complete, premium documentation for developers, tenant environments, and custom checkout/auth solutions.
- [x] 8.19 Expand AI instructions in PLAN.md to strictly mandate clean commit histories with standard simple commit messages and keeping all monorepo markdown files up-to-date.
- [x] 8.20 Fix all outstanding accessibility (a11y) labels and button type constraints inside ecomm-admin dashboard layout/store-creation and ecomm-starter login forms.
