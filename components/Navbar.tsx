
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Ticker } from './Ticker';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { cartCount, cartTotal } = useCart();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Prodotti', path: '/shop' },
    { name: 'Servizi', path: '/services' },
    { name: 'Corsi', path: '/courses' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const formatPrice = (price: number) => {
    return price.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
  };

  return (
    <div className="fixed top-0 w-full z-40">
      <nav className="bg-obsidian/95 backdrop-blur-xl border-b border-gold-500/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 md:h-20">
            
            {/* Branding - Text Only */}
            <div className="flex-1 flex justify-center md:justify-start">
              <Link to="/" className="group flex flex-col items-center md:items-start py-2">
                <span className="font-cursive text-4xl md:text-3xl text-white group-hover:text-gold-200 transition-colors duration-500 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Elena Parvu
                </span>
                <span className="text-[0.65rem] md:text-[0.6rem] tracking-[0.5em] font-bold uppercase mt-1 gold-gradient-text pl-1 group-hover:tracking-[0.6em] transition-all duration-500">
                  Luxury Aesthetics
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex items-baseline space-x-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative px-1 py-2 text-xs font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${
                      isActive(link.path) ? 'text-gold-400' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-0 right-0 bottom-0 h-[1px] bg-gold-400 shadow-gold-glow"
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex flex-1 justify-end items-center gap-6">
               <Link to={isAuthenticated ? "/account" : "/login"} className="text-gray-400 hover:text-gold-100 transition-colors">
                 <User size={20} />
               </Link>
               
               <Link to="/cart" className="flex items-center gap-3 text-gold-400 hover:text-gold-100 transition-colors group">
                  {cartTotal > 0 && (
                    <motion.span 
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="font-serif text-sm tracking-wide hidden lg:block text-gold-200"
                    >
                      {formatPrice(cartTotal)}
                    </motion.span>
                  )}
                  
                  <div className="relative">
                    <ShoppingBag size={20} />
                    {cartCount > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-gold-500 text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </div>
               </Link>
            </div>
          </div>
        </div>
        <Ticker />
      </nav>
    </div>
  );
};
