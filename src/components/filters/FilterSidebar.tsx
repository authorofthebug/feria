'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { mockCategories } from '@/data/mockData';

export default function FilterSidebar() {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    priceRange, 
    setPriceRange,
    filterProducts 
  } = useStore();
  
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    condition: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
    setTimeout(() => filterProducts(), 100);
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    setTimeout(() => filterProducts(), 100);
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 5000]);
    setTimeout(() => filterProducts(), 100);
  };

  return (
    <>
      {/* Mobile Filter Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-blue-600 text-white p-4 rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Filter className="h-6 w-6" />
      </motion.button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="lg:hidden fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Filtros</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FilterContent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:block w-80 bg-white rounded-lg shadow-lg p-6 h-fit sticky top-24"
      >
        <h2 className="text-xl font-semibold mb-6">Filtros</h2>
        <FilterContent />
      </motion.div>
    </>
  );

  function FilterContent() {
    return (
      <div className="space-y-6">
        {/* Categories */}
        <div className="border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full mb-3"
          >
            <h3 className="font-medium text-gray-900">Categorías</h3>
            {expandedSections.category ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          
          <AnimatePresence>
            {expandedSections.category && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-2"
              >
                {mockCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.name)}
                    className={`flex items-center space-x-3 w-full p-2 rounded-lg transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="text-sm">{category.name}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Range */}
        <div className="border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full mb-3"
          >
            <h3 className="font-medium text-gray-900">Rango de Precio</h3>
            {expandedSections.price ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          
          <AnimatePresence>
            {expandedSections.price && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>€{priceRange[0]}</span>
                    <span>€{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(priceRange[0], parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {[100, 250, 500, 1000].map((price) => (
                    <motion.button
                      key={price}
                      onClick={() => handlePriceChange(0, price)}
                      className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Hasta €{price}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Condition */}
        <div className="border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleSection('condition')}
            className="flex items-center justify-between w-full mb-3"
          >
            <h3 className="font-medium text-gray-900">Estado</h3>
            {expandedSections.condition ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          
          <AnimatePresence>
            {expandedSections.condition && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="space-y-2"
              >
                {[
                  { value: 'new', label: 'Nuevo', color: 'bg-green-100 text-green-800' },
                  { value: 'like-new', label: 'Como nuevo', color: 'bg-blue-100 text-blue-800' },
                  { value: 'good', label: 'Bueno', color: 'bg-yellow-100 text-yellow-800' },
                  { value: 'fair', label: 'Aceptable', color: 'bg-orange-100 text-orange-800' },
                  { value: 'poor', label: 'Usado', color: 'bg-red-100 text-red-800' }
                ].map((condition) => (
                  <motion.button
                    key={condition.value}
                    className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-3 h-3 rounded-full ${condition.color.split(' ')[0]}`} />
                    <span className="text-sm">{condition.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Clear Filters */}
        <motion.button
          onClick={clearFilters}
          className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Limpiar filtros
        </motion.button>
      </div>
    );
  }
} 