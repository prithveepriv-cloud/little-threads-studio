import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const categories = [
  {
    name: 'Baby',
    age: '0-24 months',
    emoji: '👶',
    gradient: 'from-blush/30 to-primary/20',
    slug: 'baby',
  },
  {
    name: 'Toddler',
    age: '2-5 years',
    emoji: '🧒',
    gradient: 'from-sunny/30 to-mint/20',
    slug: 'toddler',
  },
  {
    name: 'Kids',
    age: '6-10 years',
    emoji: '🧑',
    gradient: 'from-sky/30 to-secondary/20',
    slug: 'kids',
  },
];

export const CategoryGrid = () => {
  const containerRef = useScrollReveal();

  return (
    <section className="py-20 bg-background" ref={containerRef}>
      <div className="container">
        <div className="text-center mb-12 reveal">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
            Shop by Age
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Find the perfect fit for every stage of their adventure
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={`/catalog?age=${category.slug}`}
              className={`reveal group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${category.gradient} aspect-[4/3] flex flex-col justify-end hover:shadow-large transition-all duration-500`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Background emoji */}
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] opacity-20 group-hover:scale-110 transition-transform duration-500">
                {category.emoji}
              </span>
              
              {/* Content */}
              <div className="relative z-10">
                <span className="text-5xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                  {category.emoji}
                </span>
                <h3 className="font-display text-2xl font-bold mb-1">{category.name}</h3>
                <p className="text-muted-foreground mb-4">{category.age}</p>
                <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all duration-300">
                  Shop Now
                  <ArrowRight className="h-4 w-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
