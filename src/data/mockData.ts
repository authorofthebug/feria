export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  profileType: 'seller' | 'buyer';
  location: string;
  rating: number;
  joinDate: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  condition: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  images: string[];
  sellerId: string;
  location: string;
  createdAt: string;
  isActive: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  productId?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Favorite {
  id: string;
  userId: string;
  productId: string;
  addedAt: string;
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'María González',
    email: 'maria@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    profileType: 'seller',
    location: 'Madrid, España',
    rating: 4.8,
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Carlos Rodríguez',
    email: 'carlos@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    profileType: 'buyer',
    location: 'Barcelona, España',
    rating: 4.5,
    joinDate: '2023-03-20'
  },
  {
    id: '3',
    name: 'Ana Martínez',
    email: 'ana@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    profileType: 'seller',
    location: 'Valencia, España',
    rating: 4.9,
    joinDate: '2022-11-10'
  }
];

// Mock Categories
export const mockCategories: Category[] = [
  { id: '1', name: 'Electrónica', icon: '📱', color: 'bg-blue-500' },
  { id: '2', name: 'Ropa', icon: '👕', color: 'bg-green-500' },
  { id: '3', name: 'Hogar', icon: '🏠', color: 'bg-yellow-500' },
  { id: '4', name: 'Deportes', icon: '⚽', color: 'bg-red-500' },
  { id: '5', name: 'Libros', icon: '📚', color: 'bg-purple-500' },
  { id: '6', name: 'Coches', icon: '🚗', color: 'bg-gray-500' },
  { id: '7', name: 'Música', icon: '🎵', color: 'bg-pink-500' },
  { id: '8', name: 'Juguetes', icon: '🧸', color: 'bg-indigo-500' }
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'iPhone 13 Pro - Como nuevo',
    description: 'iPhone 13 Pro en perfecto estado, solo 6 meses de uso. Incluye cargador original y funda de regalo.',
    price: 799,
    currency: 'EUR',
    category: 'Electrónica',
    condition: 'like-new',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop'
    ],
    sellerId: '1',
    location: 'Madrid, España',
    createdAt: '2024-01-15T10:30:00Z',
    isActive: true,
    tags: ['apple', 'smartphone', 'tecnología']
  },
  {
    id: '2',
    title: 'Nike Air Max 270 - Talla 42',
    description: 'Zapatillas Nike Air Max 270 en color blanco, muy cómodas para running. Solo usadas 3 veces.',
    price: 89,
    currency: 'EUR',
    category: 'Deportes',
    condition: 'good',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop'
    ],
    sellerId: '3',
    location: 'Valencia, España',
    createdAt: '2024-01-10T14:20:00Z',
    isActive: true,
    tags: ['nike', 'running', 'zapatillas']
  },
  {
    id: '3',
    title: 'Sofá Chesterfield Vintage',
    description: 'Hermoso sofá Chesterfield vintage en cuero marrón. Perfecto estado, ideal para salón elegante.',
    price: 1200,
    currency: 'EUR',
    category: 'Hogar',
    condition: 'good',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=300&fit=crop'
    ],
    sellerId: '1',
    location: 'Madrid, España',
    createdAt: '2024-01-08T09:15:00Z',
    isActive: true,
    tags: ['vintage', 'cuero', 'elegante']
  },
  {
    id: '4',
    title: 'Guitarra Acústica Yamaha',
    description: 'Guitarra acústica Yamaha FG800 en excelente estado. Incluye funda rígida y afinador.',
    price: 250,
    currency: 'EUR',
    category: 'Música',
    condition: 'like-new',
    images: [
      'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    ],
    sellerId: '3',
    location: 'Valencia, España',
    createdAt: '2024-01-12T16:45:00Z',
    isActive: true,
    tags: ['guitarra', 'acústica', 'yamaha']
  },
  {
    id: '5',
    title: 'Colección Harry Potter Completa',
    description: 'Colección completa de Harry Potter en tapa dura, edición especial. Como nueva.',
    price: 75,
    currency: 'EUR',
    category: 'Libros',
    condition: 'new',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
    ],
    sellerId: '1',
    location: 'Madrid, España',
    createdAt: '2024-01-14T11:30:00Z',
    isActive: true,
    tags: ['harry potter', 'fantasía', 'colección']
  },
  {
    id: '6',
    title: 'Chaqueta Bomber Vintage',
    description: 'Chaqueta bomber vintage de los 90s en perfecto estado. Color negro, talla M.',
    price: 45,
    currency: 'EUR',
    category: 'Ropa',
    condition: 'good',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop'
    ],
    sellerId: '3',
    location: 'Valencia, España',
    createdAt: '2024-01-13T13:20:00Z',
    isActive: true,
    tags: ['vintage', 'bomber', 'negro']
  }
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: '1',
    senderId: '2',
    receiverId: '1',
    productId: '1',
    content: 'Hola! ¿El iPhone sigue disponible?',
    timestamp: '2024-01-15T15:30:00Z',
    isRead: false
  },
  {
    id: '2',
    senderId: '1',
    receiverId: '2',
    productId: '1',
    content: '¡Hola! Sí, aún está disponible. ¿Te interesa?',
    timestamp: '2024-01-15T15:35:00Z',
    isRead: true
  },
  {
    id: '3',
    senderId: '2',
    receiverId: '1',
    productId: '1',
    content: 'Perfecto! ¿Podríamos quedar mañana para verlo?',
    timestamp: '2024-01-15T15:40:00Z',
    isRead: false
  }
];

// Mock Favorites
export const mockFavorites: Favorite[] = [
  {
    id: '1',
    userId: '2',
    productId: '1',
    addedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    userId: '2',
    productId: '3',
    addedAt: '2024-01-14T16:30:00Z'
  }
]; 