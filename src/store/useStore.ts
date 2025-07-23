import { create } from 'zustand';
import { User, Product, Message, Favorite } from '@/data/mockData';
import { NotificationType } from '@/components/ui/Notification';

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
  
  // Auth state
  isAuthModalOpen: boolean;
  
  // Notifications state
  notifications: Array<{
    id: string;
    type: NotificationType;
    title: string;
    message: string;
  }>;
  
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
  openAuthModal: () => void;
  closeAuthModal: () => void;
  
  // Notification actions
  showNotification: (type: NotificationType, title: string, message: string) => void;
  removeNotification: (id: string) => void;
  showSuccess: (title: string, message: string) => void;
  showError: (title: string, message: string) => void;
  showWarning: (title: string, message: string) => void;
  showInfo: (title: string, message: string) => void;
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
  isAuthModalOpen: false,
  notifications: [],

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
    const { favorites, currentUser } = get();
    if (!currentUser) return;
    
    set({ 
      favorites: favorites.filter(fav => !(fav.productId === productId && fav.userId === currentUser.id))
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
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
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
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  openAuthModal: () => set({ isAuthModalOpen: true }),
  
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  
  // Notification actions
  showNotification: (type, title, message) => {
    const id = Date.now().toString();
    // Add a small delay to prevent overlap with modals
    setTimeout(() => {
      set((state) => ({
        notifications: [...state.notifications, { id, type, title, message }]
      }));
    }, 100);
  },
  
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(notification => notification.id !== id)
    }));
  },
  
  showSuccess: (title, message) => {
    get().showNotification('success', title, message);
  },
  
  showError: (title, message) => {
    get().showNotification('error', title, message);
  },
  
  showWarning: (title, message) => {
    get().showNotification('warning', title, message);
  },
  
  showInfo: (title, message) => {
    get().showNotification('info', title, message);
  }
})); 