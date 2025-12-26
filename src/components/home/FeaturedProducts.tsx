import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/ProductCard';
import { getFeaturedProducts } from '@/lib/products';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const FeaturedProducts = () => {
  const products = getFeaturedProducts();
  const containerRef = useScrollReveal();

  return (
    <section className="py-20 bg-background" ref={containerRef}>
      <div className="container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12 reveal">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">
              New Arrivals
            </h2>
            <p className="text-muted-foreground">
              Fresh styles for your little adventurers
            </p>
          </div>
          <Button variant="outline" className="rounded-full group" asChild>
            <Link to="/catalog">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="reveal"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
          
          {/* View All Card */}
          <Link
            to="/catalog"
            className="reveal aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/10 via-accent to-secondary/10 flex flex-col items-center justify-center text-center p-6 group hover:shadow-medium transition-all duration-300"
            style={{ transitionDelay: `${products.length * 100}ms` }}
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <ArrowRight className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-1">View All</h3>
            <p className="text-sm text-muted-foreground">
              Explore 50+ styles
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};
