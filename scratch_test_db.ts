import { createClient } from './lib/supabase/server';

async function testConnection() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('products').select('*').limit(1);
    if (error) {
      console.error('Error fetching products:', error);
      if (error.code === 'PGRST116') {
        console.log('Table "products" does not exist.');
      }
    } else {
      console.log('Successfully connected to Supabase DB.');
      console.log('Products:', data);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

testConnection();
