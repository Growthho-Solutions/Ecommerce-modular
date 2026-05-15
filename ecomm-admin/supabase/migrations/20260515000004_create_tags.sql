-- Create tags table
create table if not exists public.tags (
  id uuid default gen_random_uuid() primary key,
  store_id uuid references public.stores(id) on delete cascade not null,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create product_tags table
create table if not exists public.product_tags (
  product_id uuid references public.products(id) on delete cascade not null,
  tag_id uuid references public.tags(id) on delete cascade not null,
  primary key (product_id, tag_id)
);

-- Enable Row Level Security
alter table public.tags enable row level security;
alter table public.product_tags enable row level security;

-- RLS Policies

-- Public read access for tags
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'tags' and policyname = 'Public can view tags') then
    create policy "Public can view tags"
      on public.tags for select
      using (true);
  end if;
end $$;

-- Public read access for product_tags
do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'product_tags' and policyname = 'Public can view product_tags') then
    create policy "Public can view product_tags"
      on public.product_tags for select
      using (true);
  end if;
end $$;

-- Note: Manager policies will be defined based on the auth context (matching store_id)
-- For now, Superadmins bypass RLS to manage everything.
