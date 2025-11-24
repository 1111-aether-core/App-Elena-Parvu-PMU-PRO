import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory, Product } from '../types';
import { api } from '../services/api';

export const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ProductCategory | 'Tutti'>('Tutti');

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Errore caricamento prodotti", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredProducts = filter === 'Tutti' 
    ? products 
    : products.filter(p => p.category === filter);

  const categories = ['Tutti', ...Object.values(ProductCategory)];

  return (
    <div className="min-h-screen bg-obsidian pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-4">
            La Collezione
          </h1>
          <p className="text-gold-400 tracking-widest uppercase text-sm">
            Attrezzatura • Pigmenti • Gioielli
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              disabled={loading}
              className={`px-6 py-2 text-sm tracking-widest uppercase border transition-all duration-300 ${
                filter === cat 
                  ? 'border-gold-500 text-gold-500 bg-gold-900/10 shadow-gold-glow' 
                  : 'border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State or Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-black border border-gray-900 h-[400px] animate-pulse">
                <div className="h-[300px] bg-gray-900/50 w-full"></div>
                <div className="p-6 space-y-3">
                   <div className="h-3 bg-gray-800 w-1/3 rounded"></div>
                   <div className="h-4 bg-gray-800 w-2/3 rounded"></div>
                   <div className="h-4 bg-gray-800 w-1/4 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            Nessun prodotto trovato in questa categoria.
          </div>
        )}
      </div>
    </div>
  );
};