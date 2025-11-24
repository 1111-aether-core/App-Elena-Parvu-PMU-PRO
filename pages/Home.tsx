import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const allProducts = await api.getProducts();
        setFeaturedProducts(allProducts.slice(0, 3));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-obsidian pt-16 md:pt-0">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-obsidian">
        
        {/* Static Background Image */}
        <div className="absolute inset-0 z-0">
             {/* Abstract Gold & Black Fluid Texture */}
             <img 
               src="https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=2070&auto=format&fit=crop" 
               alt="Luxury Gold Abstract" 
               className="w-full h-full object-cover opacity-50"
             />
             <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-black/40 to-obsidian"></div>
        </div>

        {/* Text Content */}
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-gold-500 tracking-[0.4em] text-sm md:text-base mb-4 uppercase font-bold drop-shadow-md">
              Luxury PMU & Body Art
            </h2>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-white mb-6 drop-shadow-2xl tracking-tight">
              ELENA PARVU
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light mb-10 leading-relaxed drop-shadow-md">
              Vivi l'apice dell'eccellenza estetica. 
              Precisione ed eleganza in ogni dettaglio.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <Link to="/shop">
                <button className="group relative px-8 py-3 bg-gold-900/80 overflow-hidden border border-gold-500 text-gold-400 transition-all hover:text-black backdrop-blur-sm shadow-lg">
                  <span className="absolute inset-0 w-0 bg-gold-500 transition-all duration-[250ms] ease-out group-hover:w-full"></span>
                  <span className="relative flex items-center gap-2 font-serif tracking-widest uppercase text-sm">
                    Acquista <ArrowRight size={16} />
                  </span>
                </button>
              </Link>
              <Link to="/services">
                <button className="px-8 py-3 border border-gray-600 bg-black/60 backdrop-blur-md text-gray-200 hover:text-gold-300 hover:border-gold-500/50 font-serif tracking-widest uppercase text-sm transition-all shadow-lg">
                  Scopri i Servizi
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Scroll Indicator */}
        <div className="absolute bottom-10 left-0 w-full flex justify-center animate-bounce z-10">
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold-500 to-transparent"></div>
        </div>
      </section>

      {/* Introduction / Vibe */}
      <section className="py-24 bg-black relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-gold-900 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Star className="w-6 h-6 text-gold-500 mx-auto mb-6" />
          <h3 className="font-serif text-3xl md:text-4xl text-gold-100 mb-8">
            "Arte intrecciata con fili d'oro"
          </h3>
          <p className="text-gray-400 leading-loose text-lg font-light">
            Siamo specializzati in prodotti PMU di alta gamma, attrezzature di precisione per tatuaggi e gioielli per piercing squisiti.
            I nostri servizi definiscono il lusso, offrendo trattamenti che esaltano la tua bellezza naturale con il tocco del bagliore dorato e la profondità dell'ossidiana.
          </p>
        </div>
      </section>

      {/* Featured Collection Preview */}
      <section className="py-20 bg-obsidian relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="font-serif text-3xl text-white mb-2">Selezione Curata</h2>
                <div className="h-1 w-20 bg-gold-500"></div>
              </div>
              <Link to="/shop" className="text-gold-400 text-sm tracking-widest hover:text-gold-200 transition-colors uppercase">
                Vedi Tutto
              </Link>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {loading ? (
                // Simple skeletons for Home
                [1, 2, 3].map(n => (
                   <div key={n} className="bg-gray-900/20 border border-gray-900 h-[400px] animate-pulse"></div>
                ))
             ) : (
               featuredProducts.map(product => (
                 <ProductCard key={product.id} product={product} />
               ))
             )}
           </div>
        </div>
      </section>
    </div>
  );
};