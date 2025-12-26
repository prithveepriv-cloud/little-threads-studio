import { Product } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Cozy Cloud Sweater',
    slug: 'cozy-cloud-sweater',
    price: 45,
    originalPrice: 55,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'tops',
    ageGroup: 'kids',
    sizes: ['2T', '3T', '4T', '5', '6', '7'],
    colors: [
      { name: 'Cream', value: 'hsl(40, 30%, 95%)' },
      { name: 'Blush', value: 'hsl(340, 70%, 85%)' },
      { name: 'Sky', value: 'hsl(200, 85%, 75%)' },
    ],
    description: 'The softest sweater your little one will ever own. Made from premium organic cotton with a cloud-like texture.',
    materials: '100% Organic Cotton',
    careInstructions: 'Machine wash cold, tumble dry low',
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    isNew: true,
  },
  {
    id: '2',
    name: 'Adventure Denim Overalls',
    slug: 'adventure-denim-overalls',
    price: 58,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'bottoms',
    ageGroup: 'toddler',
    sizes: ['12M', '18M', '24M', '2T', '3T'],
    colors: [
      { name: 'Classic Blue', value: 'hsl(210, 60%, 45%)' },
      { name: 'Light Wash', value: 'hsl(210, 40%, 70%)' },
    ],
    description: 'Built for play! These durable overalls feature adjustable straps and reinforced knees for all-day adventures.',
    materials: '98% Cotton, 2% Elastane',
    careInstructions: 'Machine wash cold, hang dry',
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
  },
  {
    id: '3',
    name: 'Rainbow Dreams Dress',
    slug: 'rainbow-dreams-dress',
    price: 52,
    originalPrice: 65,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'dresses',
    ageGroup: 'kids',
    sizes: ['3T', '4T', '5', '6', '7', '8'],
    colors: [
      { name: 'Rainbow', value: 'linear-gradient(90deg, hsl(0, 80%, 70%), hsl(45, 90%, 60%), hsl(120, 60%, 50%), hsl(200, 85%, 65%), hsl(280, 70%, 60%))' },
    ],
    description: 'Twirl-worthy magic! This flowing dress features subtle rainbow gradients that shimmer with every spin.',
    materials: '100% Recycled Polyester',
    careInstructions: 'Machine wash cold, lay flat to dry',
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    isSale: true,
  },
  {
    id: '4',
    name: 'Sunny Day Romper',
    slug: 'sunny-day-romper',
    price: 38,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'bottoms',
    ageGroup: 'baby',
    sizes: ['0-3M', '3-6M', '6-12M', '12-18M'],
    colors: [
      { name: 'Sunshine', value: 'hsl(45, 95%, 60%)' },
      { name: 'Mint', value: 'hsl(165, 50%, 70%)' },
      { name: 'Coral', value: 'hsl(15, 90%, 65%)' },
    ],
    description: 'Breezy and easy for warm days. Features snap closures for quick changes and soft elastic at the legs.',
    materials: '100% Organic Cotton',
    careInstructions: 'Machine wash gentle, tumble dry low',
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    isNew: true,
  },
  {
    id: '5',
    name: 'Explorer Puffer Jacket',
    slug: 'explorer-puffer-jacket',
    price: 85,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'outerwear',
    ageGroup: 'kids',
    sizes: ['4', '5', '6', '7', '8', '10'],
    colors: [
      { name: 'Forest', value: 'hsl(150, 40%, 35%)' },
      { name: 'Berry', value: 'hsl(340, 60%, 45%)' },
      { name: 'Navy', value: 'hsl(220, 50%, 30%)' },
    ],
    description: 'Water-resistant warmth for outdoor adventures. Features a detachable hood and reflective details for visibility.',
    materials: 'Shell: 100% Recycled Nylon, Fill: Synthetic Down',
    careInstructions: 'Machine wash cold, tumble dry low with tennis balls',
    rating: 4.8,
    reviewCount: 67,
    inStock: true,
  },
  {
    id: '6',
    name: 'Comfort Stretch Leggings',
    slug: 'comfort-stretch-leggings',
    price: 28,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'bottoms',
    ageGroup: 'kids',
    sizes: ['2T', '3T', '4T', '5', '6', '7', '8'],
    colors: [
      { name: 'Black', value: 'hsl(0, 0%, 15%)' },
      { name: 'Navy', value: 'hsl(220, 50%, 25%)' },
      { name: 'Berry', value: 'hsl(340, 65%, 55%)' },
      { name: 'Sage', value: 'hsl(150, 25%, 55%)' },
    ],
    description: 'Super stretchy and stays put! Perfect for active play with a soft, breathable fabric that moves with them.',
    materials: '92% Organic Cotton, 8% Elastane',
    careInstructions: 'Machine wash cold, tumble dry low',
    rating: 4.6,
    reviewCount: 312,
    inStock: true,
  },
  {
    id: '7',
    name: 'Starlight Pajama Set',
    slug: 'starlight-pajama-set',
    price: 42,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'tops',
    ageGroup: 'toddler',
    sizes: ['18M', '24M', '2T', '3T', '4T', '5'],
    colors: [
      { name: 'Lavender Stars', value: 'hsl(270, 50%, 80%)' },
      { name: 'Blue Moons', value: 'hsl(200, 60%, 70%)' },
    ],
    description: 'Sweet dreams start here. This cozy pajama set features glow-in-the-dark stars and a snug, flame-resistant fit.',
    materials: '100% Organic Cotton, Snug Fit',
    careInstructions: 'Machine wash warm, tumble dry medium',
    rating: 4.9,
    reviewCount: 178,
    inStock: true,
  },
  {
    id: '8',
    name: 'Adventure Bucket Hat',
    slug: 'adventure-bucket-hat',
    price: 22,
    image: '/placeholder.svg',
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    category: 'accessories',
    ageGroup: 'kids',
    sizes: ['S (2-4Y)', 'M (4-6Y)', 'L (6-8Y)'],
    colors: [
      { name: 'Khaki', value: 'hsl(45, 30%, 65%)' },
      { name: 'Sage', value: 'hsl(150, 25%, 55%)' },
      { name: 'Coral', value: 'hsl(15, 85%, 70%)' },
    ],
    description: 'Sun protection with style! UPF 50+ fabric with a chin strap to keep it on during adventures.',
    materials: '100% Recycled Polyester, UPF 50+',
    careInstructions: 'Hand wash, air dry',
    rating: 4.7,
    reviewCount: 94,
    inStock: true,
    isNew: true,
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 4);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(p => p.isNew);
};

export const getSaleProducts = (): Product[] => {
  return products.filter(p => p.isSale);
};
