import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Heart, ArrowRight } from 'lucide-react';

const Wishlist = () => {
  const { wishlist } = useCart();

  if (wishlist.length === 0) {
    return (
      <>
        <Helmet>
          <title>Wishlist | LittleOnes</title>
        </Helmet>
        <Layout>
          <div className="container py-20 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="font-display text-2xl font-bold mb-3">Your wishlist is empty</h1>
              <p className="text-muted-foreground mb-8">
                Save your favorite items here to shop them later.
              </p>
              <Button size="lg" className="rounded-full" asChild>
                <Link to="/catalog">
                  Explore Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Wishlist ({wishlist.length}) | LittleOnes</title>
      </Helmet>
      <Layout>
        <div className="container py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold">Wishlist</h1>
              <p className="text-muted-foreground">{wishlist.length} saved items</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {wishlist.map((item) => (
              <ProductCard key={item.product.id} product={item.product} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Wishlist;
