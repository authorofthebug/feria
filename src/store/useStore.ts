import { create } from 'zustand';
import { User, Product, Message, Favorite } from '@/data/mockData';

interface AppState {
  // User state
  currentUser: User | null;
  profileType: 'seller' | 'buyer';
  
  // Products state
  products: Product[];
  filteredProducts: Product[];
  selectedProduct: Product | null;
  
  // Favorites state
  favorites: Favorite[];
  
  // Messages state
  messages: Message[];
  
  // UI state
  isLoading: boolean;
  searchQuery: string;
  selectedCategory: string;
  priceRange: [number, number];
  
  // Actions
  setCurrentUser: (user: User | null) => void;
  toggleProfileType: () => void;
  setProducts: (products: Product[]) => void;
  setSelectedProduct: (product: Product | null) => void;
  addToFavorites: (productId: string) => void;
  removeFromFavorites: (productId: string) => void;
  addMessage: (message: Message) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setPriceRange: (range: [number, number]) => void;
  filterProducts: () => void;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  currentUser: null,
  profileType: 'buyer',
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  favorites: [],
  messages: [],
  isLoading: false,
  searchQuery: '',
  selectedCategory: '',
  priceRange: [0, 5000],

  // Actions
  setCurrentUser: (user) => set({ currentUser: user }),
  
  toggleProfileType: () => set((state) => ({
    profileType: state.profileType === 'buyer' ? 'seller' : 'buyer'
  })),
  
  setProducts: (products) => set({ products, filteredProducts: products }),
  
  setSelectedProduct: (product) => set({ selectedProduct: product }),
  
  addToFavorites: (productId) => {
    const { currentUser, favorites } = get();
    if (!currentUser) return;
    
    const newFavorite: Favorite = {
      id: Date.now().toString(),
      userId: currentUser.id,
      productId,
      addedAt: new Date().toISOString()
    };
    
    set({ favorites: [...favorites, newFavorite] });
  },
  
  removeFromFavorites: (productId) => {
    const { favorites } = get();
    set({ 
      favorites: favorites.filter(fav => fav.productId !== productId) 
    });
  },
  
  addMessage: (message) => {
    const { messages } = get();
    set({ messages: [...messages, message] });
  },
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  setPriceRange: (range) => set({ priceRange: range }),
  
  filterProducts: () => {
    const { products, searchQuery, selectedCategory, priceRange } = get();
    
    let filtered = products;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    set({ filteredProducts: filtered });
  },
  
  setLoading: (loading) => set({ isLoading: loading })
})); 