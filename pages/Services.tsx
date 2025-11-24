import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Service } from '../types';
import { Clock, ShieldCheck } from 'lucide-react';

export const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await api.getServices();
      setServices(data);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-black pt-32">
      {/* Hero Header */}
      <div className="relative py-20 px-4 text-center border-b border-gray-900 bg-obsidian">
        <div className="max-w-4xl mx-auto">
           <span className="block text-gold-500 text-sm tracking-[0.3em] mb-4 uppercase">Trattamenti Esclusivi</span>
           <h1 className="font-serif text-5xl text-white mb-6">Menu Servizi</h1>
           <p className="text-gray-400 font-light text-lg">
             Dove la tecnologia incontra l'arte. I nostri servizi di lusso sono eseguiti con i più alti standard di igiene e precisione.
           </p>
        </div>
      </div>

      {/* Service List */}
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-24">
        {loading ? (
           // Skeleton Loader
           [1, 2].map(n => (
             <div key={n} className="flex flex-col md:flex-row gap-12 items-center animate-pulse">
                <div className="w-full md:w-1/2 aspect-[4/3] bg-gray-900 rounded"></div>
                <div className="w-full md:w-1/2 space-y-6">
                   <div className="h-8 bg-gray-900 w-3/4 rounded"></div>
                   <div className="h-4 bg-gray-900 w-full rounded"></div>
                   <div className="h-4 bg-gray-900 w-5/6 rounded"></div>
                </div>
             </div>
           ))
        ) : (
          services.map((service, index) => (
            <div 
              key={service.id} 
              className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute inset-0 border border-gold-500/30 transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="font-serif text-3xl text-gold-100">{service.name}</h2>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
                
                <div className="flex gap-8 border-t border-gray-900 pt-6">
                  <div className="flex items-center gap-2 text-gold-400">
                      <Clock size={18} />
                      <span className="text-sm tracking-widest uppercase">{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gold-400">
                      <ShieldCheck size={18} />
                      <span className="text-sm tracking-widest uppercase">{service.price}</span>
                  </div>
                </div>

                <button className="mt-4 px-8 py-3 bg-gold-500 text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-colors">
                  Prenota Appuntamento
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};