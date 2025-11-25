import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { GeminiAdvisor } from './components/GeminiAdvisor';
import { WhatsAppButton } from './components/WhatsAppButton';
import { MobileMenu } from './components/MobileMenu';
import { InstallPrompt } from './components/InstallPrompt';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Services } from './pages/Services';
import { Courses } from './pages/Courses';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Account } from './pages/Account';
import { Login } from './pages/Login';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { UIProvider } from './context/UIContext';
import { AuthProvider } from './context/AuthContext';

// Wrapper for scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <UIProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-obsidian text-gray-100 font-sans selection:bg-gold-500 selection:text-black relative">
              <Navbar />
              <MobileMenu />
              <main className="flex-grow pb-[80px] md:pb-0">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Home />} />
                  </Routes>
                </AnimatePresence>
              </main>
              <BottomNav />
              <WhatsAppButton />
              <GeminiAdvisor />
              <InstallPrompt />
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </UIProvider>
    </AuthProvider>
  );
};

export default App;