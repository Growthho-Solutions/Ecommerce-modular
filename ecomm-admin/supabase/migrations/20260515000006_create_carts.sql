-- Create carts table
create table if not exists public.carts (
  id uuid default gen_random_uuid() primary key,
  store_id uuid references public.stores(id) on delete cascade not null,
  customer_id uuid references public.customers(id) on delete cascade,
  session_id text, -- For guest checkouts
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create cart_items table
create table if not exists public.cart_items (
  id uuid default gen_random_uuid() primary key,
  cart_id uuid references public.carts(id) on delete cascade not null,
  product_variant_id uuid references public.product_variants(id) on delete cascade not null,
  quantity integer default 1 not null check (quantity > 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(cart_id, product_variant_id) -- A variant should only appear once per cart
);

-- Enable Row Level Security
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;

-- Note: Cart RLS will be entirely managed via backend API logic 
-- because they may belong to guests (session_id) or custom-auth customers.
-- Supabase service_role key will be used to safely access these tables.
