import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { products } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  // Mock cart items (using the first two products)
  const cartItems = [
    { ...products[0], quantity: 1 },
    { ...products[1], quantity: 2 },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping mock
  const total = subtotal + shipping;

  const formatPrice = (price: number) => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-6 p-6 bg-card border border-border/50 rounded-3xl shadow-sm">
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-2xl bg-muted">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <p className="font-bold">{formatPrice(item.price)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border/50 rounded-full p-1 bg-muted/30">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full px-3">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  <div className="pt-4 border-t border-border/50 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="block">
                  <Button className="w-full h-14 rounded-full text-base font-semibold shadow-lg shadow-primary/20">
                    Proceed to Checkout
                  </Button>
                </Link>

                <p className="text-center text-xs text-muted-foreground mt-6">
                  Shipping and taxes calculated at checkout.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Looks like you haven't added anything to your cart yet. Explore our collections to find something you love.
            </p>
            <Link href="/products">
              <Button size="lg" className="rounded-full px-8">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
