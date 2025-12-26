import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Pause } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useParallax } from '@/hooks/useScrollReveal';

export const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const parallaxRef = useParallax(0.3);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" ref={parallaxRef}>
        <div 
          className="absolute inset-0 bg-gradient-to-br from-accent via-background to-muted"
        />
        {/* Decorative shapes */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl animate-float stagger-2" />
        <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-sunny/20 blur-2xl animate-pulse-soft" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-up">
                New Collection 2024
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight animate-fade-up stagger-1">
                Where <span className="text-gradient">Joy</span> Meets{' '}
                <span className="text-gradient">Comfort</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 animate-fade-up stagger-2">
                Thoughtfully designed clothing for the little ones who mean everything to you. 
                Soft fabrics, vibrant colors, endless adventures.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 animate-fade-up stagger-3">
              <Button size="lg" className="rounded-full shadow-glow" asChild>
                <Link to="/catalog">
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <Link to="/about">
                  Our Story
                </Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4 text-sm text-muted-foreground animate-fade-up stagger-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                100% Organic Cotton
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Free Returns
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sunny" />
                Safe Materials
              </div>
            </div>
          </div>

          {/* Right - Image/Video Area */}
          <div className="relative aspect-[4/5] lg:aspect-square animate-fade-up stagger-2">
            {/* Main featured image area */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-large">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent to-secondary/20 flex items-center justify-center">
                <div className="text-center space-y-4 p-8">
                  <div className="w-32 h-32 mx-auto rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-soft">
                    <span className="font-display text-4xl">👶</span>
                  </div>
                  <p className="text-lg font-medium text-foreground">Happy Kids Collection</p>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 bg-card rounded-2xl p-4 shadow-medium animate-float">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">4.9 Rating</p>
                  <p className="text-xs text-muted-foreground">5000+ Reviews</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-4 shadow-medium animate-float stagger-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <span className="text-2xl">🌿</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Eco-Friendly</p>
                  <p className="text-xs text-muted-foreground">Sustainable Fashion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50 animate-pulse-soft" />
        </div>
      </div>
    </section>
  );
};
