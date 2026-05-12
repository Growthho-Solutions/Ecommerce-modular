export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  items: { productId: string; quantity: number; price: number }[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: number;
}

export const categories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics' },
  { id: '2', name: 'Clothing', slug: 'clothing' },
  { id: '3', name: 'Home & Kitchen', slug: 'home-kitchen' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation.',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    category: 'electronics',
    stock: 50,
  },
  {
    id: '2',
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt in various colors.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80',
    category: 'clothing',
    stock: 200,
  },
  {
    id: '3',
    name: 'Smart Watch',
    description: 'Feature-rich smart watch with fitness tracking.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    category: 'electronics',
    stock: 30,
  },
  {
    id: '4',
    name: 'Coffee Maker',
    description: 'Brew the perfect cup of coffee every morning.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1544787210-2827255ee972?w=500&q=80',
    category: 'home-kitchen',
    stock: 15,
  },
];

export const orders: Order[] = [
  {
    id: 'ORD001',
    customerName: 'John Doe',
    date: '2026-05-10',
    total: 119.98,
    status: 'delivered',
    items: [
      { productId: '1', quantity: 1, price: 99.99 },
      { productId: '2', quantity: 1, price: 19.99 },
    ],
  },
  {
    id: 'ORD002',
    customerName: 'Jane Smith',
    date: '2026-05-11',
    total: 149.99,
    status: 'shipped',
    items: [{ productId: '3', quantity: 1, price: 149.99 }],
  },
];

export const customers: Customer[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', orders: 5, totalSpent: 450.00 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', orders: 2, totalSpent: 149.99 },
];
