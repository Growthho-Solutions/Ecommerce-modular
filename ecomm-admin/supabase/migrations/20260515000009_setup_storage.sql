-- Create a storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up access policies for the bucket
-- Allow public read access to product images
CREATE POLICY "Public Read Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-images');

-- Allow authenticated users to upload product images
CREATE POLICY "Authenticated Upload Access" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'product-images' AND 
    auth.role() = 'authenticated'
  );

-- Allow users to delete their own store's images (prefix matching store_id)
-- For now, keep it simple for MVP: allow authenticated delete
CREATE POLICY "Authenticated Delete Access" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'product-images' AND 
    auth.role() = 'authenticated'
  );
