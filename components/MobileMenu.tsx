import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronRight, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '../context/UIContext';

export const MobileMenu: React.FC = () => {
  const { isMobileMenuOpen, setMobileMenuOpen } = useUI();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
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
  };

  const links = [
    { name: 'Prodotti', path: '/shop', subtitle: 'Attrezzatura & Pigmenti' },
    { name: 'Servizi', path: '/services', subtitle: 'Trattamenti Esclusivi' },
    { name: 'Corsi Online', path: '/courses', subtitle: 'Accademia PMU' },
    { name: 'Il Mio Account', path: '/account', subtitle: 'Profilo & Ordini' },
  ];

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-lg flex flex-col"
        >
          {/* Header */}
          <div className="flex justify-end p-6">
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gold-400 border border-gold-500/30 rounded-full hover:bg-gold-900/20"
            >
              <X size={24} />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 flex flex-col justify-center px-8 space-y-8">
            <div className="text-center mb-8">
               <h2 className="font-cursive text-5xl text-white mb-2">Elena Parvu</h2>
               <p className="text-xs text-gold-500 tracking-[0.4em] uppercase">Menu di Lusso</p>
            </div>

            {links.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link 
                  to={link.path} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center justify-between border-b border-gray-900 pb-4 hover:border-gold-500/50 transition-colors"
                >
                  <div>
                    <span className="block font-serif text-2xl text-gray-200 group-hover:text-gold-200 transition-colors">
                      {link.name}
                    </span>
                    <span className="text-xs text-gray-600 uppercase tracking-wider">
                      {link.subtitle}
                    </span>
                  </div>
                  <ChevronRight className="text-gray-700 group-hover:text-gold-400 transition-colors" />
                </Link>
              </motion.div>
            ))}

            {/* Install App Button - Only shows if install is available */}
            {deferredPrompt && (
               <motion.button
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 onClick={handleInstallClick}
                 className="w-full py-4 mt-4 border border-gold-500 bg-gold-900/10 flex items-center justify-center gap-3 text-gold-400 uppercase tracking-widest text-sm hover:bg-gold-500 hover:text-black transition-all"
               >
                 <Download size={18} />
                 Scarica App
               </motion.button>
            )}
          </div>
          
          {/* Footer info */}
          <div className="p-8 text-center">
             <p className="text-gray-600 text-xs">© Elena Parvu Luxury Aesthetics</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};