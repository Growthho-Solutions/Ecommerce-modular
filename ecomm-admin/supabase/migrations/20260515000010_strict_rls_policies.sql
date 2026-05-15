-- Create a helper function to get the current user's store_id
create or replace function public.get_auth_store_id()
returns uuid as $$
  select store_id from public.user_roles where user_id = auth.uid();
$$ language sql stable security definer;

-- Create a helper function to check if user is a superadmin
create or replace function public.is_superadmin()
returns boolean as $$
  select exists (
    select 1 from public.user_roles 
    where user_id = auth.uid() 
    and role = 'superadmin'
  );
$$ language sql stable security definer;

-- Products RLS
create policy "Managers can manage their store products"
  on public.products for all
  using (is_superadmin() or store_id = get_auth_store_id());

-- Variants RLS
create policy "Managers can manage their store variants"
  on public.product_variants for all
  using (
    is_superadmin() or 
    exists (
      select 1 from public.products p 
      where p.id = product_variants.product_id 
      and p.store_id = get_auth_store_id()
    )
  );

-- Tags RLS
create policy "Managers can manage their store tags"
  on public.tags for all
  using (is_superadmin() or store_id = get_auth_store_id());

-- Orders RLS
create policy "Managers can manage their store orders"
  on public.orders for all
  using (is_superadmin() or store_id = get_auth_store_id());

-- Discounts RLS
create policy "Managers can manage their store discounts"
  on public.discounts for all
  using (is_superadmin() or store_id = get_auth_store_id());

-- Customers RLS
create policy "Managers can view their store customers"
  on public.customers for select
  using (is_superadmin() or store_id = get_auth_store_id());
