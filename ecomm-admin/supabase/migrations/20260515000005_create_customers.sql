-- Create customers table (Custom Auth, isolated per store)
create table if not exists public.customers (
  id uuid default gen_random_uuid() primary key,
  store_id uuid references public.stores(id) on delete cascade not null,
  email text,
  phone text,
  first_name text,
  last_name text,
  encrypted_password text, -- Nullable for guest checkout "shadow accounts"
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(store_id, email) -- Enforce unique email PER STORE
);

-- Create customer_addresses table
create table if not exists public.customer_addresses (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid references public.customers(id) on delete cascade not null,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text,
  postal_code text not null,
  country text not null,
  is_default boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create password_reset_tokens table
create table if not exists public.password_reset_tokens (
  id uuid default gen_random_uuid() primary key,
  customer_id uuid references public.customers(id) on delete cascade not null,
  token text not null,
  expires_at timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.customers enable row level security;
alter table public.customer_addresses enable row level security;
alter table public.password_reset_tokens enable row level security;

-- Note: Customer RLS will be entirely managed via backend API logic 
-- because they use Custom Auth (not Supabase Auth).
-- Supabase service_role key will be used to safely access these tables.
