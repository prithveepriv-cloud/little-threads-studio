import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

export const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thanks for subscribing!', {
      description: "You'll receive our latest updates and offers.",
    });
  };

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold">LittleOnes</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Soft on skin. Tough on play. We create thoughtfully designed clothing 
              for the little ones who mean everything to you.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="rounded-full" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Shop</h4>
            <ul className="space-y-2">
              {['New Arrivals', 'Bestsellers', 'Sale', 'Baby (0-24M)', 'Toddler (2T-5)', 'Kids (6-10)'].map(item => (
                <li key={item}>
                  <Link 
                    to="/catalog" 
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Help</h4>
            <ul className="space-y-2">
              {[
                { label: 'Contact Us', href: '/contact' },
                { label: 'Size Guide', href: '#' },
                { label: 'Shipping & Returns', href: '#' },
                { label: 'FAQs', href: '#' },
                { label: 'Track Order', href: '#' },
              ].map(item => (
                <li key={item.label}>
                  <Link 
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold">Stay in Touch</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe for 10% off your first order plus updates on new arrivals and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                required
                className="flex-1"
              />
              <Button type="submit" size="sm">
                Join
              </Button>
            </form>
            <div className="pt-4 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@littleones.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>123 Kids Lane, Happy Town</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} LittleOnes. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-primary transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
