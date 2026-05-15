-- Create order_status enum
create type public.order_status as enum (
  'pending', 'paid', 'failed', 'abandoned', 'processing', 'shipped', 'cancelled'
);

-- Create orders table
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  store_id uuid references public.stores(id) on delete cascade not null,
  customer_id uuid references public.customers(id) on delete set null,
  status public.order_status default 'pending' not null,
  total_amount integer not null check (total_amount >= 0), -- Total charged in cents
  discount_id uuid references public.discounts(id) on delete set null,
  discount_amount integer default 0 not null, -- Preserved historical discount in cents
  shipping_address jsonb, -- Storing snapshot of the address
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create order_items table
create table if not exists public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_variant_id uuid references public.product_variants(id) on delete set null,
  quantity integer not null check (quantity > 0),
  price_at_time integer not null check (price_at_time >= 0), -- Preserved historical price
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Note: Orders RLS will be heavily restricted. Customers will query their own orders 
-- via backend endpoints that verify their custom auth token or session. 
-- Managers will access orders via service_role bypassing RLS, or augmented policies.
