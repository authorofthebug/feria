'use client';

import Header from '@/components/layout/Header';
import ProductGrid from '@/components/products/ProductGrid';
import FilterSidebar from '@/components/filters/FilterSidebar';
import SellerDashboard from '@/components/dashboard/SellerDashboard';
import { useStore } from '@/store/useStore';
import Notification from '@/components/ui/Notification';

export default function Home() {
  const { profileType, notifications, removeNotification } = useStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:items-start">
          {/* Sidebar - Always present to maintain layout stability */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <div className={`transition-all duration-300 ease-in-out ${profileType === 'seller' ? 'lg:opacity-0 lg:pointer-events-none lg:transform lg:translate-x-4' : 'lg:opacity-100 lg:pointer-events-auto lg:transform lg:translate-x-0'}`}>
              <FilterSidebar />
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-1">
            {profileType === 'seller' && <SellerDashboard />}
            <ProductGrid />
          </div>
        </div>
      </main>

      {/* Notifications - Fixed positioning to prevent layout shifts */}
      <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
        {notifications.map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <Notification
              type={notification.type}
              title={notification.title}
              message={notification.message}
              onClose={() => removeNotification(notification.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
