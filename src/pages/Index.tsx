import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { AboutSnippet } from '@/components/home/AboutSnippet';
import { TrustBar } from '@/components/home/TrustBar';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { Newsletter } from '@/components/home/Newsletter';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>LittleOnes | Premium Kids Clothing | Soft, Sustainable, Stylish</title>
        <meta name="description" content="Discover LittleOnes - premium kids clothing made with love. Organic cotton, sustainable fabrics, and playful designs for babies, toddlers, and kids. Free shipping on orders over $75." />
        <meta property="og:title" content="LittleOnes | Premium Kids Clothing" />
        <meta property="og:description" content="Soft on skin. Tough on play. Premium kids clothing made with organic cotton and sustainable materials." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://littleones.com" />
      </Helmet>
      
      <Layout>
        <HeroSection />
        <TrustBar />
        <FeaturedProducts />
        <CategoryGrid />
        <AboutSnippet />
        <Newsletter />
      </Layout>
    </>
  );
};

export default Index;
