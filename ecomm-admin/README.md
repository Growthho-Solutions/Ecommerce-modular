# 🖥️ Growthho E-commerce Admin Panel (`ecomm-admin`)

This application is the central administrative core of the **Growthho E-commerce Platform**. It serves as a unified workspace for both **Growthho Superadmins** (platform owners) and **Store Managers** (tenant store owners).

Views, metrics, and actions are rendered dynamically based on the authenticated user's assigned role.

---

## ✨ Features

*   **Role-Based Dynamic Access Control:**
    *   **Growthho Superadmin:** High-level platform-wide views to create new stores, create and assign manager accounts, and check platform aggregate telemetry.
    *   **Store Manager:** Scoped dashboard restricted to a specific store ID. Managers can create and update products, set variant prices/SKUs, view local sales, and manage orders.
*   **Database Tenancy Isolation:** Integrates directly with Supabase, enforcing tenant separation at the database layer using Row-Level Security (RLS) policies based on a mandatory `store_id` foreign key.
*   **Next.js 16+ App Router Architecture:** High-speed edge rendering utilizing server components, optimized server actions, and custom route handlers.
*   **Modern Premium UI Design:** Built with React 19, Tailwind CSS, and shadcn/ui components. Features interactive light/dark mode theme switching, glassmorphism elements, and smooth transition animations.
*   **Supabase SSR Auth Session Cookies:** Uses `@supabase/ssr` to securely maintain authentication sessions inside cookie headers, ensuring dynamic verification across both client and server boundaries.

---

## 🏗️ Technical Architecture Details

### 🔑 Dynamic Layout Routing
To secure the admin panel, protected routes are structured under the `(authenticated)` route group:
*   [ecomm-admin/app/(authenticated)/layout.tsx](file:///home/xaxh/git/growthho/ecomm-admin/app/(authenticated)/layout.tsx) checks user status on every request using `getCurrentUserRole()`.
*   If an unauthenticated request lands on these routes, they are redirected immediately to `/login`.
*   **Dynamic Enforcement:** To align with cookie session queries, this entire layout is configured with `export const dynamic = "force-dynamic"`, disabling static prerendering crashes during production compilation.

### 🛡️ Network Gateway (Proxy)
The core infrastructure routing, header injection, and initial session verification are performed inside [ecomm-admin/proxy.ts](file:///home/xaxh/git/growthho/ecomm-admin/proxy.ts). It enforces security headers:
*   `X-Frame-Options: DENY` (prevents clickjacking)
*   `X-Content-Type-Options: nosniff` (prevents mime sniffing)
*   `Referrer-Policy: strict-origin-when-cross-origin`

---

## 🚀 Getting Started

### 1. Environment Requirements
Ensure the following variables are configured inside your `ecomm-admin/.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key # Required for Superadmin database bypass
```

### 2. Run Local Development
You can run this application specifically from the monorepo root:
```bash
# Start ecomm-admin only
pnpm --filter @growthho/admin dev
```
Or run both applications at once using:
```bash
make dev
```

### 3. Production Compilation
To compile and build the admin application, run:
```bash
pnpm --filter @growthho/admin build
```
*(Ensure `cacheComponents` is disabled or commented out in your `next.config.ts` to prevent conflicts with the dynamic authenticated layout.)*
