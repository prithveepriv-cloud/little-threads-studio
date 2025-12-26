import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import { ChevronLeft, CreditCard, Truck, Check, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

type Step = 'shipping' | 'payment' | 'review';

const Checkout = () => {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const shipping = shippingMethod === 'express' ? 12.99 : cartTotal > 75 ? 0 : 7.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate webhook call for order notification
    console.log('Order placed - would trigger webhook to OWNER_EMAIL');

    toast.success('Order placed successfully!', {
      description: 'You will receive a confirmation email shortly.',
    });

    clearCart();
    navigate('/');
    setIsProcessing(false);
  };

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Checkout | LittleOnes</title>
        </Helmet>
        <Layout>
          <div className="container py-20 text-center">
            <h1 className="font-display text-2xl font-bold mb-4">Your cart is empty</h1>
            <Button asChild>
              <Link to="/catalog">Continue Shopping</Link>
            </Button>
          </div>
        </Layout>
      </>
    );
  }

  const steps = [
    { id: 'shipping', label: 'Shipping', icon: Truck },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'review', label: 'Review', icon: Check },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);

  return (
    <>
      <Helmet>
        <title>Checkout | LittleOnes</title>
      </Helmet>
      <Layout>
        <div className="container py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/cart">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="font-display text-2xl font-bold">Checkout</h1>
          </div>

          {/* Progress */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {steps.map((s, index) => (
                <div key={s.id} className="flex items-center">
                  <div
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-full transition-colors',
                      index <= currentStepIndex
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <s.icon className="h-4 w-4" />
                    <span className="hidden sm:inline text-sm font-medium">{s.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'w-8 sm:w-16 h-0.5 mx-2',
                        index < currentStepIndex ? 'bg-primary' : 'bg-muted'
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              {step === 'shipping' && (
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h2 className="font-display text-lg font-semibold mb-4">Contact Information</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h2 className="font-display text-lg font-semibold mb-4">Shipping Address</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          required
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          required
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          required
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          required
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            required
                            value={shippingInfo.state}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="zip">ZIP</Label>
                          <Input
                            id="zip"
                            required
                            value={shippingInfo.zip}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h2 className="font-display text-lg font-semibold mb-4">Shipping Method</h2>
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary transition-colors">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="cursor-pointer">
                            <span className="font-medium">Standard Shipping</span>
                            <span className="block text-sm text-muted-foreground">5-7 business days</span>
                          </Label>
                        </div>
                        <span className="font-medium">{cartTotal > 75 ? 'Free' : '$7.99'}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary transition-colors mt-2">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="cursor-pointer">
                            <span className="font-medium">Express Shipping</span>
                            <span className="block text-sm text-muted-foreground">2-3 business days</span>
                          </Label>
                        </div>
                        <span className="font-medium">$12.99</span>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" size="lg" className="w-full rounded-full">
                    Continue to Payment
                  </Button>
                </form>
              )}

              {step === 'payment' && (
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h2 className="font-display text-lg font-semibold mb-4">Payment Method</h2>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary transition-colors">
                        <div className="flex items-center gap-3">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="cursor-pointer flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            <span className="font-medium">Credit / Debit Card</span>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'card' && (
                      <div className="mt-6 space-y-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" required />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" required />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="flex-1 rounded-full"
                      onClick={() => setStep('shipping')}
                    >
                      Back
                    </Button>
                    <Button type="submit" size="lg" className="flex-1 rounded-full">
                      Review Order
                    </Button>
                  </div>
                </form>
              )}

              {step === 'review' && (
                <div className="space-y-6">
                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h2 className="font-display text-lg font-semibold mb-4">Shipping To</h2>
                    <p className="text-muted-foreground">
                      {shippingInfo.firstName} {shippingInfo.lastName}<br />
                      {shippingInfo.address}<br />
                      {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}<br />
                      {shippingInfo.email}
                    </p>
                    <Button
                      variant="link"
                      className="p-0 h-auto mt-2"
                      onClick={() => setStep('shipping')}
                    >
                      Edit
                    </Button>
                  </div>

                  <div className="bg-card rounded-2xl border border-border p-6">
                    <h2 className="font-display text-lg font-semibold mb-4">Order Items</h2>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div
                          key={`${item.product.id}-${item.size}-${item.color}`}
                          className="flex gap-4"
                        >
                          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                            <span className="text-2xl">👕</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Size: {item.size} • Qty: {item.quantity}
                            </p>
                          </div>
                          <span className="font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="flex-1 rounded-full"
                      onClick={() => setStep('payment')}
                    >
                      Back
                    </Button>
                    <Button
                      size="lg"
                      className="flex-1 rounded-full"
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        'Processing...'
                      ) : (
                        <>
                          <Lock className="h-4 w-4 mr-2" />
                          Place Order • ${total.toFixed(2)}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
                <h2 className="font-display text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {items.slice(0, 3).map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-3"
                    >
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center relative">
                        <span className="text-xl">👕</span>
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-muted-foreground text-background text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">{item.size}</p>
                      </div>
                      <span className="text-sm font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <p className="text-sm text-muted-foreground">
                      +{items.length - 3} more items
                    </p>
                  )}
                </div>

                <div className="space-y-2 text-sm border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Checkout;
