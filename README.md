# Growthho E-commerce Monorepo

This monorepo contains the following applications:
- `ecomm-starter`: The customer-facing storefront.
- `ecomm-admin`: The administrative dashboard.

## Deployment to Vercel

To deploy the latest changes to production on Vercel, use the following commands:

### Option 1: Git Push (Recommended)
Pushing to the main branch will automatically trigger a production build on Vercel.

```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

### Option 2: Vercel CLI
If you have the [Vercel CLI](https://vercel.com/docs/cli) installed, you can deploy directly from your terminal:

```bash
vercel --prod
```

## Local Development

To run all applications locally:

```bash
pnpm dev
```

Or run a specific application:

```bash
pnpm --filter @growthho/starter dev
pnpm --filter @growthho/admin dev
```
