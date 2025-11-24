import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-serif text-3xl text-gold-100 mb-4">Il tuo Carrello è Vuoto</h2>
        <p className="text-gray-400 mb-8">I migliori prodotti di lusso attendono la tua selezione.</p>
        <Link to="/shop">
          <button className="px-8 py-3 bg-gold-500 text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-colors">
            Torna al Negozio
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-serif text-4xl text-white mb-12 border-b border-gray-800 pb-4">Carrello</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-6">
            {items.map((item) => (
              <motion.div 
                layout
                key={item.id}
                className="flex gap-6 p-4 bg-black border border-gray-900 hover:border-gold-500/30 transition-colors"
              >
                <div className="w-24 h-24 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-lg text-gold-100">{item.name}</h3>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">{item.category}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center border border-gray-800 bg-gray-900/50">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 text-gray-400 hover:text-white"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm text-gold-100">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 text-gray-400 hover:text-white"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-serif text-lg text-white">€{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:w-1/3">
            <div className="bg-black border border-gold-500/20 p-8 sticky top-32">
              <h3 className="font-serif text-xl text-gold-100 mb-6">Riepilogo Ordine</h3>
              
              <div className="space-y-4 mb-6 border-b border-gray-800 pb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotale</span>
                  <span>€{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Spedizione</span>
                  <span>Calcolata al checkout</span>
                </div>
              </div>

              <div className="flex justify-between text-lg text-white font-serif mb-8">
                <span>Totale</span>
                <span className="text-gold-400">€{cartTotal.toFixed(2)}</span>
              </div>

              <Link to="/checkout" className="block w-full">
                <button className="w-full py-4 bg-gold-500 text-black font-bold tracking-[0.2em] uppercase text-xs hover:bg-white transition-colors flex items-center justify-center gap-2">
                  Vai alla Cassa <ArrowRight size={16} />
                </button>
              </Link>
              
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-600">
                  Pagamento Sicuro • Packaging di Lusso Incluso
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};