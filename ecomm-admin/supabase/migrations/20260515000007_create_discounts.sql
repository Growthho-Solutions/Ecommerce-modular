-- Create discount_type enum
create type public.discount_type as enum ('percentage', 'fixed');

-- Create discounts table
create table if not exists public.discounts (
  id uuid default gen_random_uuid() primary key,
  store_id uuid references public.stores(id) on delete cascade not null,
  code text not null,
  type public.discount_type not null,
  value integer not null check (value > 0), -- either cents (fixed) or 1-100 (percentage)
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(store_id, code) -- A discount code must be unique per store
);

-- Enable Row Level Security
alter table public.discounts enable row level security;

-- Note: Discount RLS will be entirely managed via backend API logic 
-- because customers shouldn't be able to just "list" all active discount codes.
-- They submit a code to an API route, which uses service_role to check validity.
