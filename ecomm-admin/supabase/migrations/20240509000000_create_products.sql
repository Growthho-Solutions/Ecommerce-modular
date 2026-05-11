-- Create products table
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  price numeric(10, 2) not null,
  image_url text,
  category text,
  stock_quantity integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.products enable row level security;

-- Create policy to allow anyone to read products
-- Using a DO block to avoid error if policy already exists
do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'products' and policyname = 'Allow public read access'
  ) then
    create policy "Allow public read access"
      on public.products for select
      using (true);
  end if;
end
$$;

-- Seed data
insert into public.products (name, description, price, image_url, category, stock_quantity)
values
  ('Premium Wireless Headphones', 'High-quality noise-canceling headphones with 30-hour battery life.', 299.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', 'Electronics', 50),
  ('Ergonomic Office Chair', 'Breathable mesh back with adjustable lumbar support and armrests.', 199.50, 'https://images.unsplash.com/photo-1505843490701-5be5d0b19d58?w=800&q=80', 'Furniture', 20),
  ('Smart Fitness Watch', 'Track your workouts, heart rate, and sleep with this sleek smartwatch.', 149.00, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', 'Electronics', 100),
  ('Stainless Steel Water Bottle', 'Insulated 32oz bottle that keeps drinks cold for 24 hours.', 25.00, 'https://images.unsplash.com/photo-1602143307185-8c1c5585642c?w=800&q=80', 'Accessories', 200)
on conflict do nothing;
