import React from 'react';

export const Ticker: React.FC = () => {
  const items = [
    "NUOVI ARRIVI DISPONIBILI ORA",
    "SPEDIZIONE GRATUITA SU ORDINI SUPERIORI A €200",
    "ISCRIVITI ALLA NEWSLETTER: -20% SUL PRIMO ORDINE",
    "MASTERCLASS PMU: POSTI LIMITATI",
    "ELENA PARVU LUXURY AESTHETICS"
  ];

  return (
    <div className="bg-black border-b border-gold-900/50 overflow-hidden h-8 flex items-center relative z-50">
      <div className="animate-marquee whitespace-nowrap flex gap-8 items-center">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
             <span className="text-[10px] font-bold tracking-[0.2em] text-gold-400 uppercase font-sans">
               {item}
             </span>
             <div className="w-1 h-1 rounded-full bg-gold-600"></div>
          </div>
        ))}
      </div>
    </div>
  );
};