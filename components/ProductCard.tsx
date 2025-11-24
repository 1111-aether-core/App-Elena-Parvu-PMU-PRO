import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative bg-black border border-gray-900 hover:border-gold-500/50 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
        />
        {product.isNew && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-gold-500 text-black text-xs font-bold tracking-wider uppercase">
            Nuovo Arrivo
          </div>
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
           <button 
             onClick={handleAdd}
             className="px-6 py-2 bg-black/80 border border-gold-500 text-gold-400 uppercase text-xs tracking-widest hover:bg-gold-500 hover:text-black transition-all"
           >
             Aggiungi
           </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-6">
        <div className="text-xs text-gold-600 mb-2 uppercase tracking-wider">{product.category}</div>
        <h3 className="font-serif text-lg text-white group-hover:text-gold-200 transition-colors mb-2">
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 font-light">€{product.price.toFixed(2)}</span>
          <button 
            onClick={handleAdd}
            className={`w-8 h-8 flex items-center justify-center border rounded-full transition-all ${
              isAdded 
              ? 'bg-gold-500 text-black border-gold-500'
              : 'border-gray-800 text-gold-500 hover:bg-gold-500 hover:text-black hover:border-gold-500'
            }`}
          >
            {isAdded ? <Check size={14} /> : <Plus size={14} />}
          </button>
        </div>
      </div>
      
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 pointer-events-none border border-transparent group-hover:border-gold-500/20 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500"></div>
    </motion.div>
  );
};