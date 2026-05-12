import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight, CreditCard, Truck, MapPin } from "lucide-react";

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Forms */}
          <div className="lg:col-span-2 space-y-10">
            {/* Shipping Address */}
            <section className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" className="rounded-xl" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip Code</Label>
                  <Input id="zip" placeholder="10001" className="rounded-xl" />
                </div>
              </div>
            </section>

            {/* Delivery Method */}
            <section className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Delivery Method</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center justify-between p-4 border border-primary bg-primary/5 rounded-2xl cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="h-5 w-5 rounded-full border-4 border-primary" />
                    <div>
                      <p className="font-semibold text-sm">Standard Shipping</p>
                      <p className="text-xs text-muted-foreground">3-5 business days</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold">Free</span>
                </label>
                <label className="flex items-center justify-between p-4 border border-border/50 rounded-2xl cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-5 w-5 rounded-full border border-border" />
                    <div>
                      <p className="font-semibold text-sm">Express Shipping</p>
                      <p className="text-xs text-muted-foreground">1-2 business days</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold">$15.00</span>
                </label>
              </div>
            </section>

            {/* Payment Method */}
            <section className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold">Payment Method</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="0000 0000 0000 0000" className="rounded-xl" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" className="rounded-xl" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>$139.97</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxes</span>
                  <span>$11.20</span>
                </div>
                <div className="pt-4 border-t border-border/50 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>$151.17</span>
                </div>
              </div>

              <Button className="w-full h-14 rounded-full text-base font-semibold shadow-lg shadow-primary/20">
                Complete Purchase
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-center text-xs text-muted-foreground mt-6">
                By clicking "Complete Purchase", you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
