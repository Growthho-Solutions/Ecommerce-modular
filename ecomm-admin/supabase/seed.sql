-- supabase/seed.sql

-- 1. Create a Test Store
insert into public.stores (id, name, logo_url, support_email, base_currency)
values (
  '11111111-1111-1111-1111-111111111111',
  'Growthho Demo Store',
  'https://placeholder.com/logo.png',
  'support@growthho.com',
  'USD'
) on conflict (id) do nothing;

-- 2. Create Users (We mock them in auth.users for local dev)
-- Note: In a real environment, you use the Supabase Auth API to sign up users.
insert into auth.users (
  id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
) values
(
  '22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'superadmin@growthho.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', ''
),
(
  '33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'manager@growthho.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{}', now(), now(), '', '', '', ''
) on conflict (id) do nothing;

-- 3. Assign Roles
insert into public.user_roles (user_id, role, store_id)
values
  ('22222222-2222-2222-2222-222222222222', 'superadmin', null),
  ('33333333-3333-3333-3333-333333333333', 'manager', '11111111-1111-1111-1111-111111111111')
on conflict (user_id) do nothing;

-- 4. Create a Product
insert into public.products (id, store_id, name, description, is_active)
values (
  '44444444-4444-4444-4444-444444444444',
  '11111111-1111-1111-1111-111111111111',
  'Premium T-Shirt',
  'A high-quality cotton t-shirt.',
  true
) on conflict (id) do nothing;

-- 5. Create Product Variants
insert into public.product_variants (product_id, sku, price, stock_quantity, is_active)
values 
  ('44444444-4444-4444-4444-444444444444', 'TSHIRT-S', 2500, 100, true),
  ('44444444-4444-4444-4444-444444444444', 'TSHIRT-M', 2500, 150, true),
  ('44444444-4444-4444-4444-444444444444', 'TSHIRT-L', 2500, 200, true);

-- 6. Create Tags
insert into public.tags (id, store_id, name)
values 
  ('55555555-5555-5555-5555-555555555555', '11111111-1111-1111-1111-111111111111', 'Apparel');

-- 7. Link Tags
insert into public.product_tags (product_id, tag_id)
values 
  ('44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555')
on conflict do nothing;

-- 8. Create a Discount Code
insert into public.discounts (store_id, code, type, value, is_active)
values 
  ('11111111-1111-1111-1111-111111111111', 'WELCOME20', 'percentage', 20, true);
