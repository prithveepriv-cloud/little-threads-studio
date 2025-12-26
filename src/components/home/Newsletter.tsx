import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useScrollReveal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Welcome to the family!', {
      description: 'Check your inbox for your 10% discount code.',
    });
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-accent to-secondary/10" ref={containerRef}>
      <div className="container">
        <div className="max-w-2xl mx-auto text-center reveal">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 mb-6">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Join the LittleOnes Family
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Subscribe to get 10% off your first order, plus exclusive access to new arrivals, 
            special offers, and parenting tips.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-12 h-12 rounded-full"
              />
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="rounded-full h-12 px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
