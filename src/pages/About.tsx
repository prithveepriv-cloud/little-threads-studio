import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Heart, Leaf, Shield, Sparkles } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Every stitch, every design choice is made with your child in mind.',
  },
  {
    icon: Leaf,
    title: 'Sustainable',
    description: 'We use organic, recycled, and eco-friendly materials whenever possible.',
  },
  {
    icon: Shield,
    title: 'Safe & Tested',
    description: 'All fabrics are certified non-toxic and safe for sensitive skin.',
  },
  {
    icon: Sparkles,
    title: 'Joy in Every Piece',
    description: 'Clothes that spark imagination and let kids be kids.',
  },
];

const About = () => {
  const containerRef = useScrollReveal();

  return (
    <>
      <Helmet>
        <title>Our Story | LittleOnes Kids Clothing</title>
        <meta name="description" content="Learn about LittleOnes - our mission to create sustainable, safe, and joyful clothing for children. Discover our story, values, and commitment to quality." />
      </Helmet>

      <Layout>
        <div ref={containerRef}>
          {/* Hero */}
          <section className="relative py-20 lg:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent via-background to-muted" />
            <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" />

            <div className="container relative">
              <div className="max-w-3xl mx-auto text-center reveal">
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  Our Story
                </span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                  Where Every Outfit <br />
                  <span className="text-gradient">Tells a Story</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Founded by parents, for parents. LittleOnes was born from a simple belief: 
                  children deserve clothing that's as wonderful as they are.
                </p>
              </div>
            </div>
          </section>

          {/* Story */}
          <section className="py-20">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="reveal">
                  <div className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-primary/20 via-accent to-secondary/20 flex items-center justify-center">
                    <span className="text-9xl">👨‍👩‍👧‍👦</span>
                  </div>
                </div>
                <div className="space-y-6 reveal" style={{ transitionDelay: '100ms' }}>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold">
                    It Started with a Question
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    When our founders became parents, they started asking questions about the 
                    clothes their children wore. Where did they come from? What were they made of? 
                    Were they safe?
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    The answers weren't always satisfying. So in 2018, we set out to create 
                    something better: clothing that parents could trust completely, made with 
                    materials we'd be proud to put on our own kids.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Today, LittleOnes is more than a brand—it's a community of families who 
                    believe that childhood should be filled with comfort, joy, and countless 
                    adventures.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-20 bg-accent/30">
            <div className="container">
              <div className="text-center mb-12 reveal">
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                  What We Stand For
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our values guide everything we do, from design to delivery.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <div
                    key={value.title}
                    className="reveal bg-card rounded-2xl p-6 text-center hover:shadow-medium transition-shadow"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Sustainability */}
          <section className="py-20">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 space-y-6 reveal">
                  <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                    Sustainability
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold">
                    Gentle on Kids, <br />Kind to Earth
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We believe the planet our children inherit matters as much as the clothes 
                    they wear today. That's why we're committed to sustainable practices at 
                    every step.
                  </p>
                  <ul className="space-y-3">
                    {[
                      '100% organic cotton in our core collection',
                      'Recycled packaging and plastic-free shipping',
                      'Water-saving dyeing processes',
                      'Fair wages and safe working conditions',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-secondary" />
                        </span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-1 lg:order-2 reveal" style={{ transitionDelay: '100ms' }}>
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-secondary/20 via-mint/20 to-sky/20 flex items-center justify-center">
                    <span className="text-9xl">🌍</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="py-20 bg-card">
            <div className="container">
              <div className="text-center mb-12 reveal">
                <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                  Meet the Team
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A small team with big hearts, dedicated to making childhood a little more magical.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { name: 'Sarah Chen', role: 'Founder & CEO', emoji: '👩‍💼' },
                  { name: 'Marcus Johnson', role: 'Head of Design', emoji: '👨‍🎨' },
                  { name: 'Emily Rivera', role: 'Production Lead', emoji: '👩‍🔧' },
                  { name: 'David Kim', role: 'Customer Love', emoji: '👨‍💻' },
                ].map((member, index) => (
                  <div
                    key={member.name}
                    className="reveal text-center"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">{member.emoji}</span>
                    </div>
                    <h3 className="font-display font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default About;
