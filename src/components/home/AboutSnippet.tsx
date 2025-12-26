import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export const AboutSnippet = () => {
  const containerRef = useScrollReveal();

  return (
    <section className="py-20 bg-accent/30" ref={containerRef}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4 reveal">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden shadow-soft">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl">👧</span>
                </div>
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-sunny/20 to-blush/20 overflow-hidden shadow-soft">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl">🧸</span>
                </div>
              </div>
            </div>
            <div className="pt-8 space-y-4">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-mint/20 to-sky/20 overflow-hidden shadow-soft">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-4xl">🌈</span>
                </div>
              </div>
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-blush/20 to-primary/20 overflow-hidden shadow-soft">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl">👦</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 reveal" style={{ transitionDelay: '200ms' }}>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Our Story
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Made with Love, <br/>
              <span className="text-gradient">Worn with Joy</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At LittleOnes, we believe every child deserves clothing that's as 
              special as they are. Our designs combine timeless style with playful 
              comfort, using only the softest organic materials.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From our family to yours, each piece is crafted with care, ensuring 
              your little ones look adorable while staying comfortable during all 
              their adventures.
            </p>
            <Button className="rounded-full" size="lg" asChild>
              <Link to="/about">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
