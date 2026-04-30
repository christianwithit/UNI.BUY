// Search and filter utility for listings
// Pure function - easy to test and swap for API later

export interface FilterOptions {
  query?: string;
  category?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface Listing {
  id: number;
  title: string;
  price: number;
  condition: string;
  category: string;
  description: string;
  [key: string]: any;
}

/**
 * Filter listings based on search query and filter options
 * @param listings - Array of listings to filter
 * @param options - Filter options (query, category, condition, price range)
 * @returns Filtered array of listings
 */
export function filterListings(
  listings: Listing[],
  options: FilterOptions = {}
): Listing[] {
  const { query, category, condition, minPrice, maxPrice } = options;

  return listings.filter((listing) => {
    // Text search - search in title and description
    if (query && query.trim()) {
      const searchTerm = query.toLowerCase().trim();
      const titleMatch = listing.title.toLowerCase().includes(searchTerm);
      const descMatch = listing.description.toLowerCase().includes(searchTerm);
      
      if (!titleMatch && !descMatch) {
        return false;
      }
    }

    // Category filter
    if (category && category !== 'All') {
      if (listing.category.toLowerCase() !== category.toLowerCase()) {
        return false;
      }
    }

    // Condition filter
    if (condition && condition !== 'All') {
      if (listing.condition !== condition) {
        return false;
      }
    }

    // Price range filter
    if (minPrice !== undefined && listing.price < minPrice) {
      return false;
    }

    if (maxPrice !== undefined && listing.price > maxPrice) {
      return false;
    }

    return true;
  });
}

/**
 * Get unique categories from listings
 */
export function getUniqueCategories(listings: Listing[]): string[] {
  const categories = new Set(listings.map(l => l.category));
  return ['All', ...Array.from(categories)];
}

/**
 * Get unique conditions from listings
 */
export function getUniqueConditions(listings: Listing[]): string[] {
  const conditions = new Set(listings.map(l => l.condition));
  return ['All', ...Array.from(conditions)];
}

/**
 * Get price range from listings
 */
export function getPriceRange(listings: Listing[]): { min: number; max: number } {
  if (listings.length === 0) {
    return { min: 0, max: 0 };
  }

  const prices = listings.map(l => l.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}
