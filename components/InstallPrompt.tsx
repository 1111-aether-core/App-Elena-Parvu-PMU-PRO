
import React, { useEffect, useState } from 'react';
import { Download, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Show the prompt after a slight delay to not annoy the user immediately
      setTimeout(() => setIsVisible(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-24 left-4 right-4 md:bottom-8 md:left-auto md:right-8 md:w-96 z-50"
      >
        <div className="bg-black/95 backdrop-blur-xl border border-gold-500/50 p-6 shadow-gold-glare relative overflow-hidden">
          {/* Decorative Gold Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>

          <div className="flex gap-4 items-start">
            <div className="bg-gold-900/20 p-3 rounded-full border border-gold-500/30">
               <Sparkles className="text-gold-400" size={24} />
            </div>
            <div>
               <h3 className="font-serif text-gold-100 text-lg mb-1">Esperienza Premium</h3>
               <p className="text-gray-400 text-xs leading-relaxed mb-4">
                 Installa l'App Elena Parvu per accedere a offerte esclusive, notifiche sugli ordini e un'esperienza di shopping più veloce.
               </p>
               <button 
                 onClick={handleInstallClick}
                 className="w-full py-2 bg-gold-500 text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors flex justify-center items-center gap-2"
               >
                 <Download size={14} />
                 Installa Applicazione
               </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
