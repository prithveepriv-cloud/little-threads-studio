import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Heart, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const { cartCount, wishlist } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-smooth',
          isScrolled 
            ? 'bg-card/95 backdrop-blur-lg shadow-soft py-3' 
            : 'bg-transparent py-5'
        )}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-display text-2xl font-bold tracking-tight transition-colors hover:text-primary"
          >
            LittleOnes
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'relative text-sm font-medium transition-colors hover:text-primary',
                  location.pathname === link.href ? 'text-primary' : 'text-foreground'
                )}
              >
                {link.label}
                {location.pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full animate-scale-in" />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              asChild
              className="hidden sm:flex relative"
            >
              <Link to="/wishlist" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              asChild
              className="relative"
            >
              <Link to="/cart" aria-label="Shopping cart">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-0 z-[100] md:hidden transition-all duration-300',
          isMobileMenuOpen ? 'visible' : 'invisible'
        )}
      >
        <div 
          className={cn(
            'absolute inset-0 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300',
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div 
          className={cn(
            'absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-card shadow-large transition-transform duration-500 ease-smooth',
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between p-6 border-b border-border">
            <span className="font-display text-xl font-bold">Menu</span>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="p-6">
            <ul className="space-y-4">
              {navLinks.map((link, index) => (
                <li 
                  key={link.href}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={cn(
                    'opacity-0',
                    isMobileMenuOpen && 'animate-fade-up'
                  )}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      'block py-2 text-lg font-medium transition-colors hover:text-primary',
                      location.pathname === link.href ? 'text-primary' : 'text-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-8 border-t border-border space-y-4">
              <Link
                to="/wishlist"
                className="flex items-center gap-3 py-2 text-lg font-medium transition-colors hover:text-primary"
              >
                <Heart className="h-5 w-5" />
                Wishlist
                {wishlist.length > 0 && (
                  <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link
                to="/account"
                className="flex items-center gap-3 py-2 text-lg font-medium transition-colors hover:text-primary"
              >
                <User className="h-5 w-5" />
                Account
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4"
          onClick={() => setIsSearchOpen(false)}
        >
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />
          <div 
            className="relative w-full max-w-2xl bg-card rounded-2xl shadow-large p-6 animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 border-b border-border pb-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 bg-transparent text-lg focus:outline-none"
                autoFocus
              />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Try searching for "sweater", "dress", or "baby"</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
