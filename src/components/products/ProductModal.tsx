'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageCircle, MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { mockUsers } from '@/data/mockData';

export default function ProductModal() {
  const { selectedProduct, setSelectedProduct, currentUser, favorites, addToFavorites, removeFromFavorites } = useStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [messageText, setMessageText] = useState('');

  if (!selectedProduct) return null;

  const seller = mockUsers.find(user => user.id === selectedProduct.sellerId);
  const isFavorite = favorites.some(fav => fav.productId === selectedProduct.id && fav.userId === currentUser?.id);

  const handleFavoriteToggle = () => {
    if (!currentUser) return;
    
    if (isFavorite) {
      removeFromFavorites(selectedProduct.id);
    } else {
      addToFavorites(selectedProduct.id);
    }
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !currentUser) return;
    
    // Here you would typically send the message to the backend
    console.log('Sending message:', messageText);
    setMessageText('');
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedProduct.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedProduct.images.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={() => setSelectedProduct(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Detalles del producto</h2>
            <button
              onClick={() => setSelectedProduct(null)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="relative">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <img
                    src={selectedProduct.images[currentImageIndex]}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  {selectedProduct.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail Navigation */}
                {selectedProduct.images.length > 1 && (
                  <div className="flex space-x-2 mt-4">
                    {selectedProduct.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${selectedProduct.title} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(selectedProduct.price, selectedProduct.currency)}
                  </span>
                  <div className="flex space-x-2">
                    <motion.button
                      onClick={handleFavoriteToggle}
                      className={`p-3 rounded-full transition-colors ${
                        isFavorite ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </motion.button>
                  </div>
                </div>

                {/* Title and Condition */}
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    {selectedProduct.title}
                  </h1>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {selectedProduct.condition === 'new' ? 'Nuevo' : 
                     selectedProduct.condition === 'like-new' ? 'Como nuevo' :
                     selectedProduct.condition === 'good' ? 'Bueno' :
                     selectedProduct.condition === 'fair' ? 'Aceptable' : 'Usado'}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Descripción</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Seller Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={seller?.avatar}
                      alt={seller?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">{seller?.name}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{seller?.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{selectedProduct.location}</span>
                  </div>
                </div>

                {/* Tags */}
                {selectedProduct.tags.length > 0 && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Etiquetas</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message Form */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-medium text-gray-900 mb-3">Contactar al vendedor</h3>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Escribe tu mensaje..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <motion.button
                      onClick={handleSendMessage}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Enviar</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 