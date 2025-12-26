import { Truck, RefreshCw, Shield, Leaf } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const features = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $75',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: '30-day hassle-free returns',
  },
  {
    icon: Shield,
    title: 'Safe Materials',
    description: 'Certified non-toxic fabrics',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Sustainable production',
  },
];

export const TrustBar = () => {
  const containerRef = useScrollReveal();

  return (
    <section className="py-16 bg-card border-y border-border" ref={containerRef}>
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="reveal flex flex-col items-center text-center space-y-3"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
