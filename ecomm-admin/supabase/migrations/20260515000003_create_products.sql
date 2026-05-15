-- Create products table
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  store_id uuid references public.stores(id) on delete cascade not null,
  name text not null,
  description text,
  is_active boolean default true not null,
  deleted_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create product_variants table
create table if not exists public.product_variants (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  sku text,
  price integer not null default 0, -- price in cents
  stock_quantity integer not null default 0,
  is_active boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create product_images table
create table if not exists public.product_images (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  image_url text not null,
  display_order integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_images enable row level security;

-- RLS Policies

-- Public read access for active, non-deleted products
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'products' and policyname = 'Public can view active products') then
    create policy "Public can view active products"
      on public.products for select
      using (is_active = true and deleted_at is null);
  end if;
end $$;

-- Public read access for active variants of non-deleted products
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'product_variants' and policyname = 'Public can view active variants') then
    create policy "Public can view active variants"
      on public.product_variants for select
      using (
        is_active = true and 
        exists (
          select 1 from public.products p 
          where p.id = product_variants.product_id 
          and p.is_active = true 
          and p.deleted_at is null
        )
      );
  end if;
end $$;

-- Public read access for product images
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'product_images' and policyname = 'Public can view product images') then
    create policy "Public can view product images"
      on public.product_images for select
      using (
        exists (
          select 1 from public.products p 
          where p.id = product_images.product_id 
          and p.is_active = true 
          and p.deleted_at is null
        )
      );
  end if;
end $$;

-- Note: Manager policies will be defined based on the auth context (matching store_id)
-- For now, Superadmins bypass RLS to manage everything.
