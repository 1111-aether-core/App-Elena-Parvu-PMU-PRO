
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, CreditCard, Truck, FileText, CheckCircle, Shield, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type PaymentMethod = 'card' | 'paypal' | 'klarna';

export const Checkout: React.FC = () => {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Details, 2: Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [needsInvoice, setNeedsInvoice] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    // Invoice Data
    companyName: '',
    vatNumber: '', // P.IVA
    taxId: '', // Codice Fiscale
    sdiCode: '', // Codice Univoco
    pec: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulation of Payment Gateway Handshake
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      navigate('/account'); 
    }, 3000);
  };

  // Calculate Klarna installments
  const installmentPrice = (cartTotal / 3).toFixed(2);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-obsidian pt-32 text-center flex flex-col items-center">
        <p className="text-gold-100 font-serif text-xl mb-4">Il tuo carrello è vuoto.</p>
        <button onClick={() => navigate('/shop')} className="text-gray-400 hover:text-white underline">
          Torna allo shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-7">
          <div className="mb-8">
            <h1 className="font-serif text-3xl text-white mb-2">Checkout Sicuro</h1>
            <div className="flex items-center gap-2 text-sm text-gold-500 uppercase tracking-widest">
               <Lock size={14} /> Crittografia SSL a 256-bit
            </div>
          </div>
          
          <form onSubmit={handlePayment} className="space-y-8">
            
            {/* SECTION 1: SPEDIZIONE & FATTURAZIONE */}
            <div className="bg-black border border-gray-800 p-6 md:p-8 rounded-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-gold-500"></div>
               
               <h3 className="text-lg font-serif text-white mb-6 flex items-center gap-3">
                 <span className="bg-gold-900/40 text-gold-400 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-gold-500/30">1</span>
                 Dettagli Spedizione
               </h3>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                 <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Nome</label>
                    <input required name="firstName" onChange={handleInputChange} type="text" autoComplete="given-name" className="w-full bg-gray-900/30 border border-gray-700 p-3 text-white focus:border-gold-500 outline-none transition-colors" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Cognome</label>
                    <input required name="lastName" onChange={handleInputChange} type="text" autoComplete="family-name" className="w-full bg-gray-900/30 border border-gray-700 p-3 text-white focus:border-gold-500 outline-none transition-colors" />
                 </div>
               </div>

               <div className="space-y-2 mb-6">
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Email per ricevuta</label>
                  <input required name="email" onChange={handleInputChange} type="email" autoComplete="email" className="w-full bg-gray-900/30 border border-gray-700 p-3 text-white focus:border-gold-500 outline-none transition-colors" />
               </div>

               <div className="space-y-2 mb-6">
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Indirizzo</label>
                  <input required name="address" onChange={handleInputChange} type="text" autoComplete="street-address" placeholder="Via / Piazza e Numero Civico" className="w-full bg-gray-900/30 border border-gray-700 p-3 text-white focus:border-gold-500 outline-none transition-colors" />
               </div>

               <div className="grid grid-cols-2 gap-6 mb-6">
                 <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">CAP</label>
                    <input required name="postalCode" onChange={handleInputChange} type="text" autoComplete="postal-code" className="w-full bg-gray-900/30 border border-gray-700 p-3 text-white focus:border-gold-500 outline-none transition-colors" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Città</label>
                    <input required name="city" onChange={handleInputChange} type="text" autoComplete="address-level2" className="w-full bg-gray-900/30 border border-gray-700 p-3 text-white focus:border-gold-500 outline-none transition-colors" />
                 </div>
               </div>

               {/* INVOICE TOGGLE */}
               <div className="border-t border-gray-800 pt-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${needsInvoice ? 'bg-gold-500 border-gold-500 text-black' : 'border-gray-600 bg-transparent'}`}>
                       {needsInvoice && <CheckCircle size={14} />}
                    </div>
                    <input type="checkbox" className="hidden" checked={needsInvoice} onChange={() => setNeedsInvoice(!needsInvoice)} />
                    <span className="text-sm text-gold-100 group-hover:text-white transition-colors">Richiedi Fattura Elettronica</span>
                  </label>

                  <AnimatePresence>
                    {needsInvoice && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 gap-6 mt-6 bg-gray-900/20 p-4 border border-gold-500/20">
                           <div className="space-y-2">
                              <label className="text-xs text-gray-500 uppercase tracking-wider">Ragione Sociale / Intestatario</label>
                              <input type="text" name="companyName" onChange={handleInputChange} className="w-full bg-black border border-gray-700 p-3 text-white focus:border-gold-500 outline-none" />
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                  <label className="text-xs text-gray-500 uppercase tracking-wider">Partita IVA</label>
                                  <input type="text" name="vatNumber" onChange={handleInputChange} placeholder="IT..." className="w-full bg-black border border-gray-700 p-3 text-white focus:border-gold-500 outline-none" />
                              </div>
                              <div className="space-y-2">
                                  <label className="text-xs text-gray-500 uppercase tracking-wider">Codice Fiscale</label>
                                  <input type="text" name="taxId" onChange={handleInputChange} className="w-full bg-black border border-gray-700 p-3 text-white focus:border-gold-500 outline-none" />
                              </div>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                  <label className="text-xs text-gray-500 uppercase tracking-wider">Codice SDI (Destinatario)</label>
                                  <input type="text" name="sdiCode" onChange={handleInputChange} maxLength={7} placeholder="0000000" className="w-full bg-black border border-gray-700 p-3 text-white focus:border-gold-500 outline-none" />
                              </div>
                              <div className="space-y-2">
                                  <label className="text-xs text-gray-500 uppercase tracking-wider">PEC (Opzionale)</label>
                                  <input type="email" name="pec" onChange={handleInputChange} className="w-full bg-black border border-gray-700 p-3 text-white focus:border-gold-500 outline-none" />
                              </div>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </div>

            {/* SECTION 2: PAGAMENTO */}
            <div className="bg-black border border-gray-800 p-6 md:p-8 rounded-sm relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-gold-500"></div>
               
               <h3 className="text-lg font-serif text-white mb-6 flex items-center gap-3">
                 <span className="bg-gold-900/40 text-gold-400 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border border-gold-500/30">2</span>
                 Metodo di Pagamento
               </h3>

               {/* Payment Tabs */}
               <div className="flex gap-4 mb-8 border-b border-gray-800 pb-1 overflow-x-auto">
                 <button 
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`pb-3 px-2 text-sm uppercase tracking-wider transition-colors whitespace-nowrap ${paymentMethod === 'card' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-gray-500 hover:text-gray-300'}`}
                 >
                   Carta di Credito
                 </button>
                 <button 
                    type="button"
                    onClick={() => setPaymentMethod('klarna')}
                    className={`pb-3 px-2 text-sm uppercase tracking-wider transition-colors whitespace-nowrap ${paymentMethod === 'klarna' ? 'text-[#FFB3C7] border-b-2 border-[#FFB3C7]' : 'text-gray-500 hover:text-gray-300'}`}
                 >
                   Klarna (3 Rate)
                 </button>
                 <button 
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`pb-3 px-2 text-sm uppercase tracking-wider transition-colors whitespace-nowrap ${paymentMethod === 'paypal' ? 'text-[#0070BA] border-b-2 border-[#0070BA]' : 'text-gray-500 hover:text-gray-300'}`}
                 >
                   PayPal
                 </button>
               </div>

               {/* Credit Card UI */}
               {paymentMethod === 'card' && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="bg-gray-900/30 border border-gray-700 p-6 rounded-xl mb-4">
                       <div className="flex justify-between items-center mb-4">
                          <span className="text-white font-mono">CARD NUMBER</span>
                          <div className="flex gap-2">
                            <div className="w-8 h-5 bg-white/10 rounded"></div>
                            <div className="w-8 h-5 bg-white/10 rounded"></div>
                          </div>
                       </div>
                       <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-transparent text-white text-xl font-mono outline-none mb-6 placeholder-gray-600" />
                       <div className="grid grid-cols-2 gap-8">
                          <div>
                             <span className="block text-xs text-gray-500 mb-1">SCADENZA</span>
                             <input required type="text" placeholder="MM/YY" className="bg-transparent text-white font-mono outline-none placeholder-gray-600 w-full" />
                          </div>
                          <div>
                             <span className="block text-xs text-gray-500 mb-1">CVC</span>
                             <input required type="text" placeholder="123" className="bg-transparent text-white font-mono outline-none placeholder-gray-600 w-full" />
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                       <Shield size={12} className="text-green-500" />
                       Transazione protetta da Stripe. Nessun dato della carta viene salvato sui nostri server.
                    </div>
                 </motion.div>
               )}

               {/* Klarna UI */}
               {paymentMethod === 'klarna' && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="bg-[#FFB3C7]/10 border border-[#FFB3C7]/30 p-6 rounded-lg flex items-center justify-between">
                       <div>
                         <h4 className="text-[#FFB3C7] font-bold text-lg">Paga in 3 rate da €{installmentPrice}</h4>
                         <p className="text-gray-400 text-sm mt-1">Senza interessi. Prima rata oggi, le altre ogni 30 giorni.</p>
                       </div>
                       <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Klarna_Logo_black.svg/2560px-Klarna_Logo_black.svg.png" alt="Klarna" className="h-6 invert brightness-0 opacity-80" />
                    </div>
                    <ul className="space-y-3 mt-4">
                       <li className="flex items-center gap-3 text-sm text-gray-400">
                          <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-[#FFB3C7] font-bold">1</div>
                          <span>Pagamento oggi: <span className="text-white">€{installmentPrice}</span></span>
                       </li>
                       <li className="flex items-center gap-3 text-sm text-gray-400">
                          <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-gray-500 font-bold">2</div>
                          <span>Tra 30 giorni: €{installmentPrice}</span>
                       </li>
                       <li className="flex items-center gap-3 text-sm text-gray-400">
                          <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-gray-500 font-bold">3</div>
                          <span>Tra 60 giorni: €{installmentPrice}</span>
                       </li>
                    </ul>
                 </motion.div>
               )}

               {/* PayPal UI */}
               {paymentMethod === 'paypal' && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-6">
                    <div className="w-full bg-[#0070BA] hover:bg-[#003087] transition-colors p-4 rounded cursor-pointer flex items-center justify-center gap-2">
                       <span className="text-white font-bold italic text-lg">PayPal</span>
                       <span className="text-white text-sm opacity-90">Check out</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-4">
                       Verrai reindirizzato al sito sicuro di PayPal per completare l'acquisto.
                    </p>
                 </motion.div>
               )}

               <button 
                 type="submit" 
                 disabled={isProcessing}
                 className="w-full mt-8 py-4 bg-gold-500 text-black font-bold tracking-[0.2em] uppercase text-sm hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
               >
                 {isProcessing ? (
                   <>
                     <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                     Elaborazione in corso...
                   </>
                 ) : (
                   <>
                     {paymentMethod === 'klarna' ? 'Paga con Klarna' : paymentMethod === 'paypal' ? 'Procedi su PayPal' : `Conferma Ordine €${cartTotal.toFixed(2)}`}
                     <Lock size={16} />
                   </>
                 )}
               </button>
            </div>
          </form>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-5">
          <div className="bg-black p-8 border border-gold-500/20 sticky top-32">
             <h3 className="font-serif text-xl text-white mb-6 flex justify-between items-center">
               Riepilogo Ordine
               <span className="text-sm text-gray-500 font-sans tracking-wide">{items.length} Articoli</span>
             </h3>
             
             <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 relative flex-shrink-0 border border-gray-800">
                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                       <span className="absolute -top-2 -right-2 bg-gray-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                         {item.quantity}
                       </span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm text-gold-100 font-serif">{item.name}</h4>
                      <p className="text-[10px] text-gray-500 uppercase mt-1">{item.category}</p>
                      <p className="text-sm text-white mt-2">€{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
             </div>

             <div className="border-t border-gray-800 pt-6 space-y-3">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotale</span>
                  <span>€{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span className="flex items-center gap-2">Spedizione <Info size={12} /></span>
                  <span className="text-green-400">Gratuita</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Tasse (22% IVA inclusa)</span>
                  <span>€{(cartTotal * 0.22).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-2xl text-gold-400 font-serif pt-6 border-t border-gray-800 mt-4">
                  <span>Totale</span>
                  <span>€{cartTotal.toFixed(2)}</span>
                </div>
             </div>

             <div className="mt-8 flex items-center gap-4 justify-center text-gray-600">
                {/* Payment Logos Mock */}
                <div className="h-6 w-10 bg-gray-800 rounded"></div>
                <div className="h-6 w-10 bg-gray-800 rounded"></div>
                <div className="h-6 w-10 bg-gray-800 rounded"></div>
                <div className="h-6 w-10 bg-gray-800 rounded"></div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};
