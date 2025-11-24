import React from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUI } from '../context/UIContext';

export const WhatsAppButton: React.FC = () => {
  const { setChatOpen } = useUI();

  return (
    <motion.button
      onClick={() => setChatOpen(true)}
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-24 left-4 md:bottom-8 md:left-8 z-40 group cursor-pointer focus:outline-none"
    >
      {/* Spinning Gold Thread Ring */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-dashed border-gold-400/60 w-full h-full"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-1 rounded-full border border-dotted border-gold-200/40 w-[calc(100%+8px)] h-[calc(100%+8px)]"
      />
      
      {/* Main Button */}
      <div className="relative w-12 h-12 md:w-14 md:h-14 bg-black/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-gold-500 shadow-gold-glow overflow-hidden">
        <div className="absolute inset-0 bg-gold-500/10 group-hover:bg-gold-500/20 transition-colors duration-300"></div>
        
        {/* Icon - Switching between Sparkles and Chat to indicate AI */}
        <div className="relative">
            <MessageCircle size={24} className="text-gold-400 group-hover:text-gold-100 transition-colors md:w-7 md:h-7" />
            <motion.div 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 text-gold-200"
            >
                <Sparkles size={10} />
            </motion.div>
        </div>
        
        {/* Shine effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
      </div>
      
      {/* Tooltip Label (Desktop Only) */}
      <motion.span 
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="hidden md:block absolute left-16 top-1/2 -translate-y-1/2 bg-black border border-gold-500/30 text-gold-100 text-xs px-3 py-1 rounded whitespace-nowrap pointer-events-none shadow-xl"
      >
        AI Concierge & Appuntamenti
      </motion.span>
    </motion.button>
  );
};