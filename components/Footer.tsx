import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gold-900 pt-12 pb-8 mb-[80px] md:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Brand */}
          <div className="space-y-4">
             <h3 className="font-serif text-xl text-gold-400 tracking-widest">ELENA PARVU</h3>
             <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
               Dove la precisione incontra il lusso. Prodotti PMU di alto livello e servizi artistici per l'élite.
             </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm text-gold-500 tracking-widest uppercase">Esplora</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-gold-300 transition-colors">Acquista Collezione</a></li>
              <li><a href="#" className="hover:text-gold-300 transition-colors">Prenota Servizio</a></li>
              <li><a href="#" className="hover:text-gold-300 transition-colors">Accademia Online</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
             <h4 className="font-serif text-sm text-gold-500 tracking-widest uppercase">Connettiti</h4>
             <div className="flex justify-center md:justify-start space-x-6">
                <a href="#" className="text-gray-500 hover:text-gold-400 transition-transform transform hover:scale-110">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-gold-400 transition-transform transform hover:scale-110">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-500 hover:text-gold-400 transition-transform transform hover:scale-110">
                  <Mail size={20} />
                </a>
             </div>
             <p className="text-gray-600 text-xs mt-4">
               © {new Date().getFullYear()} Elena Parvu. Tutti i diritti riservati.
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
};