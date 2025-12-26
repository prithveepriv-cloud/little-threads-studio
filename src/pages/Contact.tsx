import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(255),
  phone: z.string().optional(),
  orderId: z.string().optional(),
  message: z.string().trim().min(1, 'Message is required').max(1000),
});

const Contact = () => {
  const containerRef = useScrollReveal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderId: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Contact form submitted - would send to OWNER_EMAIL');

    toast.success('Message sent!', {
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: '', email: '', phone: '', orderId: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | LittleOnes Kids Clothing</title>
        <meta name="description" content="Get in touch with LittleOnes. We're here to help with orders, sizing questions, or just to say hello. Contact us by email, phone, or visit our store." />
      </Helmet>

      <Layout>
        <div ref={containerRef}>
          {/* Hero */}
          <section className="py-16 bg-gradient-to-br from-accent via-background to-muted">
            <div className="container">
              <div className="max-w-2xl mx-auto text-center reveal">
                <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
                  We'd Love to Hear From You
                </h1>
                <p className="text-xl text-muted-foreground">
                  Questions, feedback, or just want to say hi? We're all ears.
                </p>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="py-16">
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="reveal">
                  <div className="bg-card rounded-3xl border border-border p-8">
                    <h2 className="font-display text-2xl font-semibold mb-6">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className={errors.name ? 'border-destructive' : ''}
                          />
                          {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className={errors.email ? 'border-destructive' : ''}
                          />
                          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone (optional)</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                        <div>
                          <Label htmlFor="orderId">Order ID (optional)</Label>
                          <Input
                            id="orderId"
                            name="orderId"
                            value={formData.orderId}
                            onChange={handleChange}
                            placeholder="LO-12345"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="How can we help?"
                          rows={5}
                          className={errors.message ? 'border-destructive' : ''}
                        />
                        {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                      </div>

                      <Button type="submit" size="lg" className="w-full rounded-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          'Sending...'
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-6 reveal" style={{ transitionDelay: '100ms' }}>
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-6">Get in Touch</h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-card rounded-2xl border border-border">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Email</h3>
                          <a href="mailto:hello@littleones.com" className="text-muted-foreground hover:text-primary transition-colors">
                            hello@littleones.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-card rounded-2xl border border-border">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Phone</h3>
                          <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary transition-colors">
                            +1 (555) 123-4567
                          </a>
                          <p className="text-sm text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-card rounded-2xl border border-border">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Visit Us</h3>
                          <p className="text-muted-foreground">
                            123 Kids Lane<br />
                            Happy Town, CA 90210
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-card rounded-2xl border border-border">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Response Time</h3>
                          <p className="text-muted-foreground">
                            We typically respond within 24 hours
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FAQ Link */}
                  <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center shrink-0">
                        <MessageCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Need Quick Answers?</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Check our FAQ for instant answers to common questions about orders, shipping, and returns.
                        </p>
                        <Button variant="outline" size="sm" className="rounded-full">
                          View FAQ
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Map Placeholder */}
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Google Map<br />Integration Area</p>
                        <p className="text-xs mt-2">(Add MAP_API_KEY)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
};

export default Contact;
