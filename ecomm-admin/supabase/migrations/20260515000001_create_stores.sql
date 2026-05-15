-- Create stores table for multi-tenancy
create table if not exists public.stores (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  logo_url text,
  support_email text,
  base_currency text default 'USD'::text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.stores enable row level security;

-- Basic RLS Policy: Anyone can read stores (needed for storefronts)
do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'stores' and policyname = 'Allow public read access for stores'
  ) then
    create policy "Allow public read access for stores"
      on public.stores for select
      using (true);
  end if;
end
$$;

-- Note: Insert/Update/Delete policies will be enforced via service_role key 
-- for superadmins, or augmented later when user_roles are created.
