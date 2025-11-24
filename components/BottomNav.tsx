
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, ShoppingBag, Grid, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUI } from '../context/UIContext';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const { cartCount, cartTotal } = useCart();
  const { setChatOpen, setMobileMenuOpen } = useUI();

  const formatPriceShort = (price: number) => {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
  };

  const NavItem = ({ icon: Icon, label, path, onClick, isAction = false }: any) => {
    const isActive = path ? location.pathname === path : false;
    
    return (
      <div className="flex-1 flex flex-col items-center justify-center group">
        {path ? (
          <Link to={path} className="flex flex-col items-center justify-center w-full h-full p-2">
            <div className="relative">
               <Icon 
                 size={20} 
                 className={`transition-colors duration-300 ${isActive ? 'text-gold-400' : 'text-gray-500 group-hover:text-gray-300'}`} 
                 strokeWidth={isActive ? 2.5 : 1.5}
               />
               {/* Cart Badge - Only show if price is NOT shown, OR keep small badge for count */}
               {path === '/cart' && cartCount > 0 && (
                 <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
                   {cartCount}
                 </span>
               )}
            </div>
            <span className={`text-[9px] mt-1 tracking-wider uppercase truncate max-w-[60px] ${isActive ? 'text-gold-400' : 'text-gray-600'}`}>
              {label}
            </span>
          </Link>
        ) : (
          <button 
            onClick={onClick} 
            className="flex flex-col items-center justify-center w-full h-full p-2"
          >
            <div className={`relative ${isAction ? 'bg-gold-900/20 p-2 rounded-full border border-gold-500/30' : ''}`}>
              <Icon 
                size={isAction ? 20 : 20} 
                className={`transition-colors duration-300 ${isAction ? 'text-gold-400 animate-pulse' : 'text-gray-500 group-hover:text-white'}`}
                strokeWidth={1.5}
              />
            </div>
            <span className={`text-[9px] mt-1 tracking-wider uppercase ${isAction ? 'text-gold-400' : 'text-gray-600'}`}>
              {label}
            </span>
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-[80px] bg-obsidian/95 backdrop-blur-xl border-t border-gold-500/30 shadow-upwards pb-4 md:hidden">
      <div className="flex items-center justify-between h-full max-w-md mx-auto px-2">
        <NavItem icon={Home} label="Home" path="/" />
        <NavItem icon={User} label="Account" path="/account" />
        
        {/* Center Action Item (Gemini) */}
        <NavItem 
           icon={Sparkles} 
           label="Aurea" 
           onClick={() => setChatOpen(true)} 
           isAction={true} 
        />
        
        <NavItem 
          icon={ShoppingBag} 
          label={cartTotal > 0 ? formatPriceShort(cartTotal) : "Carrello"} 
          path="/cart" 
        />
        <NavItem icon={Grid} label="Menu" onClick={() => setMobileMenuOpen(true)} />
      </div>
    </div>
  );
};
