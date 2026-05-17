# 🌌 Growthho E-commerce Monorepo

Welcome to the **Growthho E-commerce Platform**, a premium, multi-tenant Software-as-a-Service (SaaS) architecture designed to run customizable standalone storefronts alongside a central control dashboard.

This monorepo manages all core platform layers, built on a unified technology stack leveraging modern frameworks, database isolation, and high-performance development tools.

---

## 🏗️ Repository Architecture

This workspace is organized using a **`pnpm` workspace monorepo** containing two key applications:

```text
growthho/
├── ecomm-admin/     # 🖥️ Central Admin Dashboard (Superadmins & Store Managers)
├── ecomm-starter/   # 🛍️ Customer-Facing Storefront Reference Template
├── biome.json       # 🛡️ Global Biome Code Quality Rules & Formatter Config
└── Makefile         # ⚡ Unified Developer Command Shortcuts
```

1.  **`ecomm-admin` (Central Control Panel):** A single dynamic dashboard used by both **Growthho Superadmins** (to manage stores and managers) and **Store Managers** (to manage specific inventory and orders). tenancy is enforced dynamically at the database level using Supabase Row-Level Security (RLS).
2.  **`ecomm-starter` (Customer Storefront):** An SEO-optimized, highly performant storefront reference application designed to connect to the database dynamically via a scoped `NEXT_PUBLIC_STORE_ID` environment variable.

---

## ⚡ Unified Developer Shortcuts (`Makefile`)

To streamline your daily coding tasks, a developer `Makefile` is configured at the root of the workspace. Use these commands to manage dependencies, formats, builds, and caches:

| Command | Action | Description |
| :--- | :--- | :--- |
| `make install` | `pnpm install` | Restores all workspace packages and workspace node_modules. |
| `make dev` | `pnpm run dev` | Runs both applications simultaneously in development mode. |
| `make format` | `biome check --write` | Auto-sorts imports, corrects template literals, and formats all code. |
| `make lint` | `biome check .` | Runs static lint verification scans across the entire codebase. |
| `make clean` | `rm -rf .next` | Deletes compiler caches inside both projects (prevents path resolution issues). |
| `make clean-all` | `rm -rf node_modules` | Deep-cleans next caches and deletes all local `node_modules` folders. |
| `make build` | `pnpm run build` | Builds both applications in production mode. |

---

## ⚙️ Environment Configuration

Before running the applications, create the necessary environment variable files.

### 💻 Admin Dashboard Configuration (`ecomm-admin/.env.local`)
Create `.env.local` in `ecomm-admin/` with these variables:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key # Required for Superadmin database overrides
```

### 🛍️ Customer Storefront Configuration (`ecomm-starter/.env.local`)
Create `.env.local` in `ecomm-starter/` with these variables:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
NEXT_PUBLIC_STORE_ID=your-scoped-store-uuid # Dynamically scopes this storefront to a tenant
JWT_SECRET=your-customer-auth-jwt-secret # Used for customer secure session cookies
```

---

## 🛡️ Code Quality & Conventions

We enforce strict formatting, import-sorting, and linter constraints using **Biome** (`biome.json`). 

*   Unused imports are raised as errors (`noUnusedImports`) to keep bundle sizes lean.
*   Next.js compilation folders (`.next`), packages (`node_modules`), and deployment caches (`.vercel`) are automatically excluded from scans to keep developers focused on custom code.
*   To clean and format your files prior to submitting commits, run:
    ```bash
    make format
    ```

---

## 🚀 Production Deployment

Deployment is optimized to run smoothly on edge servers (such as **Vercel**):

### Option 1: Git-Triggered Deployments (Recommended)
Pushing to your default branch triggers high-speed, automated production builds:
```bash
git add .
git commit -m "feat: enhance storefront theme"
git push origin main
```

### Option 2: Command Line Compilation
Clean Next.js compilation caches locally and verify builds cleanly:
```bash
make clean
make build
```
