'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, MapPin, Star } from 'lucide-react';
import { Product } from '@/data/mockData';
import { useStore } from '@/store/useStore';
import { mockUsers } from '@/data/mockData';

interface ProductCardProps {
  product: Product;
  index: number;
}

const conditionLabels = {
  'new': 'Nuevo',
  'like-new': 'Como nuevo',
  'good': 'Bueno',
  'fair': 'Aceptable',
  'poor': 'Usado'
};

const conditionColors = {
  'new': 'bg-green-100 text-green-800',
  'like-new': 'bg-blue-100 text-blue-800',
  'good': 'bg-yellow-100 text-yellow-800',
  'fair': 'bg-orange-100 text-orange-800',
  'poor': 'bg-red-100 text-red-800'
};

export default function ProductCard({ product, index }: ProductCardProps) {
  const { currentUser, favorites, addToFavorites, removeFromFavorites, setSelectedProduct } = useStore();
  const [imageIndex, setImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(
    favorites.some(fav => fav.productId === product.id && fav.userId === currentUser?.id)
  );

  const seller = mockUsers.find(user => user.id === product.sellerId);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUser) return;
    
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    setSelectedProduct(product);
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.images[imageIndex]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Image Navigation */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setImageIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === imageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Favorite Button */}
        <motion.button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </motion.button>

        {/* Condition Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${conditionColors[product.condition]}`}>
            {conditionLabels[product.condition]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Price */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price, product.currency)}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{seller?.rating || 4.5}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Location and Seller */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{product.location}</span>
          </div>
          <span>{seller?.name}</span>
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                +{product.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            // Handle message action
          }}
          className="w-full mt-3 flex items-center justify-center space-x-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MessageCircle className="h-4 w-4" />
          <span>Contactar</span>
        </motion.button>
      </div>
    </motion.div>
  );
} 