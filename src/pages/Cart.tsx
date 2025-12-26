import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const Cart = () => {
  const { items, removeItem, updateQuantity, cartTotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setDiscount(cartTotal * 0.1);
      toast.success('Promo code applied!', {
        description: '10% discount has been applied to your order.',
      });
    } else {
      toast.error('Invalid promo code');
    }
  };

  const shipping = cartTotal > 75 ? 0 : 7.99;
  const total = cartTotal - discount + shipping;

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Shopping Bag | LittleOnes</title>
        </Helmet>
        <Layout>
          <div className="container py-20 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="font-display text-2xl font-bold mb-3">Your bag is empty</h1>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added anything to your bag yet.
              </p>
              <Button size="lg" className="rounded-full" asChild>
                <Link to="/catalog">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Shopping Bag ({items.length}) | LittleOnes</title>
      </Helmet>
      <Layout>
        <div className="container py-8">
          <h1 className="font-display text-3xl font-bold mb-8">Shopping Bag</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-4 p-4 bg-card rounded-2xl border border-border"
                >
                  {/* Image */}
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-muted shrink-0"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <span className="text-4xl">👕</span>
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="font-medium hover:text-primary transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 h-8 w-8 -mt-1 -mr-1"
                        onClick={() => removeItem(item.product.id, item.size, item.color)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Size: {item.size} • Color: {item.color}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="font-semibold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="ghost" className="text-muted-foreground" onClick={clearCart}>
                Clear all items
              </Button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Button variant="outline" onClick={handleApplyPromo}>
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Try "WELCOME10" for 10% off</p>
                </div>

                {/* Totals */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-secondary">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Add ${(75 - cartTotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                  <div className="border-t border-border pt-3 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button size="lg" className="w-full mt-6 rounded-full" asChild>
                  <Link to="/checkout">
                    Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  Secure checkout • 30-day returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Cart;
