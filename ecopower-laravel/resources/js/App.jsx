import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { HomePage } from './pages/HomePage';
import { ParticuliersPage } from './pages/ParticuliersPage';
import { ProfessionnelsPage } from './pages/ProfessionnelsPage';
import { ShopPage } from './pages/ShopPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { SavingsCalculator } from './components/SavingsCalculator';
import { ReferencesCarousel } from './components/ReferencesCarousel';
import { MessageCircle } from 'lucide-react';

function getTabFromUrl() {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  const hash = window.location.hash.replace(/^#+/, '').toLowerCase();
  const candidate = path || hash;
  if (['admin', 'particuliers', 'professionnels', 'shop', 'tracking', 'calculator', 'references'].includes(candidate)) {
    return candidate;
  }
  return 'home';
}

function WhatsAppButton({ currentTab }) {
  const { language, cart } = useCart();

  // Sur la boutique (mobile), la barre du panier occupe le bas de l'écran :
  // on remonte le bouton WhatsApp juste au-dessus quand elle est visible.
  const hasItems = Array.isArray(cart) && cart.length > 0;
  const lift = currentTab === 'shop' && hasItems;

  return (
    <a
      href="https://wa.me/21655348109?text=Bonjour%20EcoPower%20Tunisie%2C%20je%20souhaite%20des%20informations%20sur%20vos%20produits%20hydro-%C3%A9conomes."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter EcoPower sur WhatsApp"
      title="Contacter sur WhatsApp"
     className={`fixed right-4 sm:right-6 z-50 p-3.5 sm:px-4 sm:py-3 bg-[#25D366] hover:bg-[#1ebe5a] text-white rounded-full flex items-center gap-2 shadow-xl shadow-[#25D366]/40 hover:scale-105 transition-all duration-300 no-print border border-white/30 font-bold text-xs sm:bottom-6 ${
  lift
    ? 'bottom-[calc(env(safe-area-inset-bottom,0px)+6rem)]'
    : 'bottom-6'
}`}
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" aria-hidden="true">
  <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5c-1.77 0-3.5-.48-5.01-1.37l-.36-.21-3.72.98 1-3.63-.24-.37a9.43 9.43 0 0 1-1.44-5.03c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.9.98 6.68 2.77a9.37 9.37 0 0 1 2.76 6.68c0 5.2-4.24 9.62-9.12 9.62zM12.04 0C5.5 0 .19 5.31.19 11.85c0 2.09.55 4.13 1.59 5.93L0 24l6.4-1.68a11.84 11.84 0 0 0 5.64 1.44h.01c6.54 0 11.85-5.31 11.85-11.85 0-3.17-1.23-6.15-3.47-8.39A11.77 11.77 0 0 0 12.04 0z"/>
</svg>
      <span className="hidden sm:inline">
        {language === 'ar' ? 'كلّم مستشار' : 'Conseiller en Ligne'}
      </span>
    </a>
  );
}

function AppContent() {
  const [currentTab, setCurrentTabState] = useState(getTabFromUrl);
  const [trackingQuery, setTrackingQuery] = useState('');

  const setCurrentTab = (tab) => {
    setCurrentTabState(tab);
    const newPath = tab === 'home' ? '/' : `/${tab}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentTabState(getTabFromUrl());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  // Si on est dans l'espace administration, afficher UNIQUEMENT le dashboard admin indépendant (sans navbar client, ni bannière, ni footer)
  if (currentTab === 'admin') {
    return <AdminDashboard onExit={() => setCurrentTab('home')} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 font-sans">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main className="flex-1">
        {currentTab === 'home' && <HomePage setCurrentTab={setCurrentTab} />}
        {currentTab === 'particuliers' && <ParticuliersPage setCurrentTab={setCurrentTab} />}
        {currentTab === 'professionnels' && <ProfessionnelsPage setCurrentTab={setCurrentTab} />}
        {currentTab === 'shop' && <ShopPage />}
        {currentTab === 'tracking' && <OrderTrackingPage initialQuery={trackingQuery} />}
        {currentTab === 'calculator' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Outil d'Aide à la Décision</span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-serif mt-1">
                Calculateur d'Économies d'Eau &amp; d'Énergie
              </h1>
              <p className="text-slate-600 text-sm mt-2">
                Simulez vos gains réels en Dinars Tunisiens (DT) selon votre logement ou votre établissement.
              </p>
            </div>
            <SavingsCalculator onSelectPack={() => setCurrentTab('shop')} onRequestAudit={() => setCurrentTab('professionnels')} />
          </div>
        )}
        {currentTab === 'references' && (
          <div className="py-12 space-y-12">
            <ReferencesCarousel />
          </div>
        )}
      </main>

      <CartDrawer />
      <CheckoutModal
        onTrackOrder={(orderId) => {
          setTrackingQuery(orderId);
          setCurrentTab('tracking');
        }}
      />

      <Footer setCurrentTab={setCurrentTab} />

      {/* Floating WhatsApp Action Button - Pure Blue and White */}
      <WhatsAppButton currentTab={currentTab} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
