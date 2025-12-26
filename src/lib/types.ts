export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  ageGroup: string;
  sizes: string[];
  colors: { name: string; value: string }[];
  description: string;
  materials?: string;
  careInstructions?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface WishlistItem {
  product: Product;
}

export type Category = 'all' | 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'accessories';
export type AgeGroup = 'all' | 'baby' | 'toddler' | 'kids';
export type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';
