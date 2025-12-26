import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { products } from '@/lib/products';
import { Category, AgeGroup, SortOption } from '@/lib/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ChevronDown,
  Grid3X3,
  LayoutGrid
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All Products' },
  { value: 'tops', label: 'Tops' },
  { value: 'bottoms', label: 'Bottoms' },
  { value: 'dresses', label: 'Dresses' },
  { value: 'outerwear', label: 'Outerwear' },
  { value: 'accessories', label: 'Accessories' },
];

const ageGroups: { value: AgeGroup; label: string }[] = [
  { value: 'all', label: 'All Ages' },
  { value: 'baby', label: 'Baby (0-24M)' },
  { value: 'toddler', label: 'Toddler (2-5Y)' },
  { value: 'kids', label: 'Kids (6-10Y)' },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [gridSize, setGridSize] = useState<'small' | 'large'>('large');
  
  const category = (searchParams.get('category') as Category) || 'all';
  const ageGroup = (searchParams.get('age') as AgeGroup) || 'all';
  const sort = (searchParams.get('sort') as SortOption) || 'featured';
  
  const containerRef = useScrollReveal();

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value === 'all') {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchQuery('');
    setPriceRange([0, 100]);
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (category !== 'all') count++;
    if (ageGroup !== 'all') count++;
    if (searchQuery) count++;
    if (priceRange[0] > 0 || priceRange[1] < 100) count++;
    return count;
  }, [category, ageGroup, searchQuery, priceRange]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Category
    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    // Age group
    if (ageGroup !== 'all') {
      result = result.filter(p => p.ageGroup === ageGroup);
    }

    // Price range
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sort) {
      case 'newest':
        result = result.filter(p => p.isNew).concat(result.filter(p => !p.isNew));
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [searchQuery, category, ageGroup, priceRange, sort]);

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="font-medium mb-3">Category</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <Button
              key={cat.value}
              variant={category === cat.value ? 'default' : 'outline'}
              size="sm"
              className="rounded-full"
              onClick={() => updateFilter('category', cat.value)}
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Age Groups */}
      <div>
        <h4 className="font-medium mb-3">Age Group</h4>
        <div className="flex flex-wrap gap-2">
          {ageGroups.map(age => (
            <Button
              key={age.value}
              variant={ageGroup === age.value ? 'default' : 'outline'}
              size="sm"
              className="rounded-full"
              onClick={() => updateFilter('age', age.value)}
            >
              {age.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={100}
          step={5}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}+</span>
        </div>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          className="w-full"
          onClick={clearFilters}
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Shop Kids Clothing | LittleOnes</title>
        <meta name="description" content="Browse our collection of premium kids clothing. Filter by age, category, and price. Free shipping on orders over $75." />
      </Helmet>

      <Layout>
        <div className="container py-8" ref={containerRef}>
          {/* Header */}
          <div className="mb-8 reveal">
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Shop All</h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-4 mb-8 reveal" style={{ transitionDelay: '100ms' }}>
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full"
              />
            </div>

            {/* Filter Button (Mobile) */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden rounded-full">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-2">{activeFiltersCount}</Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort */}
            <Select value={sort} onValueChange={(val) => updateFilter('sort', val)}>
              <SelectTrigger className="w-[180px] rounded-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Grid Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-muted rounded-full p-1">
              <Button
                variant={gridSize === 'large' ? 'default' : 'ghost'}
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setGridSize('large')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={gridSize === 'small' ? 'default' : 'ghost'}
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setGridSize('small')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6 reveal" style={{ transitionDelay: '150ms' }}>
              {category !== 'all' && (
                <Badge variant="secondary" className="gap-1 pl-3">
                  {categories.find(c => c.value === category)?.label}
                  <button onClick={() => updateFilter('category', 'all')} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {ageGroup !== 'all' && (
                <Badge variant="secondary" className="gap-1 pl-3">
                  {ageGroups.find(a => a.value === ageGroup)?.label}
                  <button onClick={() => updateFilter('age', 'all')} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="gap-1 pl-3">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="ml-1">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          <div className="flex gap-8">
            {/* Sidebar Filters (Desktop) */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 reveal" style={{ transitionDelay: '100ms' }}>
                <FilterContent />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 reveal">
                  <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                  <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <div className={cn(
                  'grid gap-4 sm:gap-6',
                  gridSize === 'large' 
                    ? 'grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
                )}>
                  {filteredProducts.map((product, index) => (
                    <div 
                      key={product.id}
                      className="reveal"
                      style={{ transitionDelay: `${Math.min(index * 50, 500)}ms` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Catalog;
