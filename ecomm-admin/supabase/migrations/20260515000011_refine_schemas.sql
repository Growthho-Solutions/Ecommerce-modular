-- Migration: Refine schemas for consistency and soft deletes

-- 1. Customers refinement
alter table public.customers rename column encrypted_password to password_hash;
alter table public.customers add column if not exists name text;

-- Update name from first/last if they exist
update public.customers set name = trim(coalesce(first_name, '') || ' ' || coalesce(last_name, '')) where name is null;

-- 2. Orders soft delete
alter table public.orders add column if not exists deleted_at timestamp with time zone;

-- 3. Variants soft delete consistency
alter table public.product_variants add column if not exists deleted_at timestamp with time zone;

-- 4. Customer Addresses RLS (Basic)
alter table public.customer_addresses enable row level security;
-- Note: Service role will handle most operations, but we can add a basic check for managers
create policy "Managers can view their store customer addresses"
  on public.customer_addresses for select
  using (exists (
    select 1 from public.customers c 
    where c.id = customer_addresses.customer_id 
    and c.store_id = (select store_id from public.user_roles where user_id = auth.uid())
  ));
