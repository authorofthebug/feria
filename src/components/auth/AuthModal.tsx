'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useStore } from '@/store/useStore';

type AuthMode = 'login' | 'register' | 'forgot-password';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { setCurrentUser, showSuccess, showError, showInfo } = useStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    profileType: 'buyer' as 'buyer' | 'seller'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      switch (mode) {
        case 'login':
          if (!formData.email || !formData.password) {
            showError('Campos incompletos', 'Por favor, completa todos los campos requeridos.');
            return;
          }
          
          // Simulate login validation
          if (formData.email === 'demo@example.com' && formData.password === 'password') {
            const mockUser = {
              id: 'demo-user',
              name: 'Usuario Demo',
              email: formData.email,
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
              profileType: 'buyer' as const,
              location: 'Madrid, España',
              rating: 4.5,
              joinDate: new Date().toISOString()
            };
            setCurrentUser(mockUser);
            showSuccess('¡Bienvenido de vuelta!', 'Has iniciado sesión correctamente.');
            onClose();
          } else {
            showError('Credenciales incorrectas', 'El email o la contraseña no son correctos. Inténtalo de nuevo.');
          }
          break;

        case 'register':
          if (!formData.email || !formData.password || !formData.name) {
            showError('Campos incompletos', 'Por favor, completa todos los campos requeridos.');
            return;
          }
          
          if (formData.password !== formData.confirmPassword) {
            showError('Contraseñas no coinciden', 'Las contraseñas deben ser iguales.');
            return;
          }
          
          if (formData.password.length < 6) {
            showError('Contraseña muy corta', 'La contraseña debe tener al menos 6 caracteres.');
            return;
          }

          // Simulate registration
          const newUser = {
            id: Date.now().toString(),
            name: formData.name,
            email: formData.email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random`,
            profileType: formData.profileType,
            location: 'Madrid, España',
            rating: 5.0,
            joinDate: new Date().toISOString()
          };
          
          setCurrentUser(newUser);
          showSuccess('¡Cuenta creada exitosamente!', `Bienvenido a Feria, ${formData.name}.`);
          onClose();
          break;

        case 'forgot-password':
          if (!formData.email) {
            showError('Email requerido', 'Por favor, ingresa tu dirección de email.');
            return;
          }
          
          showInfo('Email enviado', 'Si el email existe en nuestra base de datos, recibirás instrucciones para restablecer tu contraseña.');
          setMode('login');
          break;
      }
    } catch (error) {
      showError('Error', 'Ha ocurrido un error. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      profileType: 'buyer'
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleModeChange = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {mode === 'login' && 'Iniciar Sesión'}
                  {mode === 'register' && 'Crear Cuenta'}
                  {mode === 'forgot-password' && 'Recuperar Contraseña'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {mode === 'login' && 'Accede a tu cuenta de Feria'}
                  {mode === 'register' && 'Únete a nuestra comunidad'}
                  {mode === 'forgot-password' && 'Te ayudaremos a recuperar tu cuenta'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name field for register */}
              {mode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                </div>
              )}

              {/* Email field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              {/* Password fields */}
              {mode !== 'forgot-password' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tu contraseña"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm password for register */}
                  {mode === 'register' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirmar contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Confirma tu contraseña"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Profile type for register */}
                  {mode === 'register' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tipo de cuenta
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleInputChange('profileType', 'buyer')}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            formData.profileType === 'buyer'
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-lg mb-1">🛒</div>
                            <div className="text-sm font-medium">Comprador</div>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleInputChange('profileType', 'seller')}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            formData.profileType === 'seller'
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-lg mb-1">🏪</div>
                            <div className="text-sm font-medium">Vendedor</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Procesando...</span>
                  </div>
                ) : (
                  <>
                    {mode === 'login' && 'Iniciar Sesión'}
                    {mode === 'register' && 'Crear Cuenta'}
                    {mode === 'forgot-password' && 'Enviar Email'}
                  </>
                )}
              </motion.button>
            </form>

            {/* Mode switching */}
            <div className="mt-6 text-center">
              {mode === 'login' && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    ¿No tienes cuenta?{' '}
                    <button
                      onClick={() => handleModeChange('register')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Regístrate aquí
                    </button>
                  </p>
                  <p className="text-sm text-gray-600">
                    ¿Olvidaste tu contraseña?{' '}
                    <button
                      onClick={() => handleModeChange('forgot-password')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Recupérala aquí
                    </button>
                  </p>
                </div>
              )}

              {mode === 'register' && (
                <p className="text-sm text-gray-600">
                  ¿Ya tienes cuenta?{' '}
                  <button
                    onClick={() => handleModeChange('login')}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Inicia sesión aquí
                  </button>
                </p>
              )}

              {mode === 'forgot-password' && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    ¿Recordaste tu contraseña?{' '}
                    <button
                      onClick={() => handleModeChange('login')}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Inicia sesión aquí
                    </button>
                  </p>
                </div>
              )}
            </div>

            {/* Demo credentials */}
            {mode === 'login' && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 text-center">
                  <strong>Demo:</strong> demo@example.com / password
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 