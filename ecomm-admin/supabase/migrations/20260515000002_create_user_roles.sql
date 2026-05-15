-- Create enum type for roles
create type public.app_role as enum ('superadmin', 'manager');

-- Create user_roles table
create table if not exists public.user_roles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  store_id uuid references public.stores(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id) -- A user can only have one role mapping
);

-- Enable Row Level Security
alter table public.user_roles enable row level security;

-- RLS Policies

-- 1. Users can read their own role
do $$
begin
  if not exists (
    select 1 from pg_policies where tablename = 'user_roles' and policyname = 'Users can read their own role'
  ) then
    create policy "Users can read their own role"
      on public.user_roles for select
      using (auth.uid() = user_id);
  end if;
end
$$;

-- Note: Superadmins bypass RLS to manage all user_roles via the service_role key
