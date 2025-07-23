'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Heart, 
  MessageCircle, 
  User, 
  Store, 
  ShoppingBag,
  Menu,
  X
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import AuthModal from '@/components/auth/AuthModal';

export default function Header() {
  const { 
    currentUser, 
    profileType, 
    toggleProfileType, 
    setCurrentUser,
    searchQuery,
    setSearchQuery,
    filterProducts,
    favorites,
    messages,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    showInfo
  } = useStore();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close user menu when user changes
  useEffect(() => {
    setIsUserMenuOpen(false);
  }, [currentUser]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterProducts();
  };

  const handleProfileToggle = () => {
    if (!currentUser) {
      showInfo('Inicia sesión', 'Debes iniciar sesión para cambiar entre modos de comprador y vendedor.');
      return;
    }
    toggleProfileType();
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    if (currentUser) {
      setIsUserMenuOpen(!isUserMenuOpen);
    } else {
      openAuthModal();
    }
  };

  // Get user-specific data
  const userFavorites = favorites.filter(fav => fav.userId === currentUser?.id);
  const userMessages = messages.filter(msg => 
    msg.receiverId === currentUser?.id || msg.senderId === currentUser?.id
  );
  const unreadMessages = userMessages.filter(msg => !msg.isRead && msg.receiverId === currentUser?.id);

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Feria
                </h1>
              </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div 
              className="hidden md:flex flex-1 max-w-lg mx-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>
            </motion.div>

            {/* Navigation */}
            <motion.nav 
              className="hidden md:flex items-center space-x-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Profile Type Toggle */}
              <motion.button
                onClick={handleProfileToggle}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  profileType === 'buyer' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-green-100 text-green-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {profileType === 'buyer' ? (
                  <>
                    <ShoppingBag className="h-5 w-5" />
                    <span>Comprador</span>
                  </>
                ) : (
                  <>
                    <Store className="h-5 w-5" />
                    <span>Vendedor</span>
                  </>
                )}
              </motion.button>

              {/* Favorites */}
              <motion.button
                className="relative p-2 text-gray-600 hover:text-red-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (!currentUser) {
                    showInfo('Inicia sesión', 'Debes iniciar sesión para ver tus productos favoritos.');
                  } else {
                    showInfo('Favoritos', `Tienes ${userFavorites.length} productos en tu lista de favoritos.`);
                  }
                }}
              >
                <Heart className="h-6 w-6" />
                {userFavorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {userFavorites.length}
                  </span>
                )}
              </motion.button>

              {/* Messages */}
              <motion.button
                className="relative p-2 text-gray-600 hover:text-blue-500 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (!currentUser) {
                    showInfo('Inicia sesión', 'Debes iniciar sesión para ver tus mensajes.');
                  } else {
                    showInfo('Mensajes', `Tienes ${userMessages.length} mensajes (${unreadMessages.length} sin leer).`);
                  }
                }}
              >
                <MessageCircle className="h-6 w-6" />
                {unreadMessages.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadMessages.length}
                  </span>
                )}
              </motion.button>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <motion.button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentUser ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-gray-600" />
                  )}
                </motion.button>

                {/* User dropdown menu */}
                <AnimatePresence>
                  {isUserMenuOpen && currentUser && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                    >
                      <div className="px-4 py-2">
                        <p className="font-medium text-gray-900">{currentUser.name}</p>
                        <p className="text-sm text-gray-500">{currentUser.email}</p>
                        <div className="mt-2 text-sm text-gray-600">
                          <p>Favoritos: {userFavorites.length}</p>
                          <p>Mensajes: {userMessages.length}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="mt-2 text-sm text-red-600 hover:text-red-700"
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.nav>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-200 py-4"
              >
                <div className="space-y-4">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </form>

                  {/* Mobile Navigation */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handleProfileToggle}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                        profileType === 'buyer' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {profileType === 'buyer' ? (
                        <>
                          <ShoppingBag className="h-5 w-5" />
                          <span>Comprador</span>
                        </>
                      ) : (
                        <>
                          <Store className="h-5 w-5" />
                          <span>Vendedor</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center space-x-4">
                      <button className="relative p-2 text-gray-600">
                        <Heart className="h-6 w-6" />
                        {userFavorites.length > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {userFavorites.length}
                          </span>
                        )}
                      </button>

                      <button className="relative p-2 text-gray-600">
                        <MessageCircle className="h-6 w-6" />
                        {unreadMessages.length > 0 && (
                          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {unreadMessages.length}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Mobile Auth */}
                  {!currentUser && (
                    <button
                      onClick={openAuthModal}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Iniciar Sesión
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </>
  );
} 