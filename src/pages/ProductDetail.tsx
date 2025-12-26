import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ui/ProductCard';
import { getProductBySlug, products } from '@/lib/products';
import { useCart } from '@/contexts/CartContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';
import {
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  Star,
  Truck,
  RefreshCw,
  Shield,
  ChevronRight,
  Ruler,
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const ProductDetail = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug || '');
  const { addItem, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const containerRef = useScrollReveal();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Product not found</h1>
          <Button asChild>
            <Link to="/catalog">Back to Shop</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      return;
    }
    addItem(product, quantity, selectedSize, selectedColor || product.colors[0].name);
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.id,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <Helmet>
        <title>{product.name} | LittleOnes Kids Clothing</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:type" content="product" />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      </Helmet>

      <Layout>
        <div className="container py-8" ref={containerRef}>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 reveal">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/catalog" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <div className="reveal space-y-4">
              {/* Main Image */}
              <div className="aspect-square rounded-3xl overflow-hidden bg-muted">
                <div className="w-full h-full bg-gradient-to-br from-primary/10 via-accent to-secondary/10 flex items-center justify-center">
                  <span className="text-8xl">👕</span>
                </div>
              </div>
              
              {/* Thumbnails */}
              <div className="flex gap-3">
                {(product.images || [product.image]).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'w-20 h-20 rounded-xl overflow-hidden bg-muted transition-all duration-200',
                      selectedImage === index ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                    )}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
                      <span className="text-2xl">👕</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="reveal" style={{ transitionDelay: '100ms' }}>
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {product.isNew && <Badge className="bg-secondary">New Arrival</Badge>}
                {product.isSale && <Badge className="bg-destructive">Sale</Badge>}
              </div>

              {/* Title & Price */}
              <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'h-4 w-4',
                        i < Math.floor(product.rating) ? 'fill-sunny text-sunny' : 'text-muted'
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                )}
                {product.isSale && product.originalPrice && (
                  <Badge variant="outline" className="text-destructive border-destructive">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Color: {selectedColor || product.colors[0].name}</span>
                </div>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={cn(
                        'w-10 h-10 rounded-full border-2 transition-all duration-200',
                        (selectedColor || product.colors[0].name) === color.name
                          ? 'border-foreground scale-110'
                          : 'border-transparent hover:scale-105'
                      )}
                      style={{ background: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">Size</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link" size="sm" className="p-0 h-auto">
                        <Ruler className="h-4 w-4 mr-1" />
                        Size Guide
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Size Guide</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Size</th>
                              <th className="text-left py-2">Age</th>
                              <th className="text-left py-2">Height</th>
                              <th className="text-left py-2">Weight</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2">2T</td>
                              <td className="py-2">2 years</td>
                              <td className="py-2">33-36"</td>
                              <td className="py-2">28-32 lbs</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">3T</td>
                              <td className="py-2">3 years</td>
                              <td className="py-2">36-39"</td>
                              <td className="py-2">32-35 lbs</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">4T</td>
                              <td className="py-2">4 years</td>
                              <td className="py-2">39-42"</td>
                              <td className="py-2">35-39 lbs</td>
                            </tr>
                            <tr>
                              <td className="py-2">5</td>
                              <td className="py-2">5 years</td>
                              <td className="py-2">42-45"</td>
                              <td className="py-2">39-45 lbs</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      className="min-w-[60px]"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-sm text-destructive mt-2">Please select a size</p>
                )}
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <span className="font-medium mb-3 block">Quantity</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart & Wishlist */}
              <div className="flex gap-3 mb-8">
                <Button
                  size="lg"
                  className="flex-1 rounded-full"
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Bag
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={cn('rounded-full', inWishlist && 'bg-primary/10')}
                  onClick={handleWishlist}
                >
                  <Heart className={cn('h-5 w-5', inWishlist && 'fill-primary text-primary')} />
                </Button>
              </div>

              {/* Trust Features */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-2xl">
                <div className="text-center">
                  <Truck className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RefreshCw className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs">Easy Returns</p>
                </div>
                <div className="text-center">
                  <Shield className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs">Safe Materials</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="description" className="mt-16 reveal">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-8">
              <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-4">
                Description
              </TabsTrigger>
              <TabsTrigger value="materials" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-4">
                Materials & Care
              </TabsTrigger>
              <TabsTrigger value="shipping" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-4">
                Shipping & Returns
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary pb-4">
                Reviews ({product.reviewCount})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <p className="text-muted-foreground leading-relaxed max-w-3xl">{product.description}</p>
            </TabsContent>
            <TabsContent value="materials" className="pt-6">
              <div className="space-y-4 max-w-3xl">
                <div>
                  <h4 className="font-medium mb-2">Materials</h4>
                  <p className="text-muted-foreground">{product.materials || '100% Organic Cotton'}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Care Instructions</h4>
                  <p className="text-muted-foreground">{product.careInstructions || 'Machine wash cold, tumble dry low'}</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-6">
              <div className="space-y-4 max-w-3xl text-muted-foreground">
                <p><strong className="text-foreground">Free Standard Shipping</strong> on orders over $75</p>
                <p><strong className="text-foreground">Express Shipping</strong> available for $9.99</p>
                <p><strong className="text-foreground">Returns</strong>: Free returns within 30 days. Items must be unworn with tags attached.</p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <p className="text-muted-foreground">Reviews coming soon...</p>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-20 reveal">
              <h2 className="font-display text-2xl font-bold mb-8">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {relatedProducts.map((p, index) => (
                  <div key={p.id} className="reveal" style={{ transitionDelay: `${index * 100}ms` }}>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </Layout>
    </>
  );
};

export default ProductDetail;
