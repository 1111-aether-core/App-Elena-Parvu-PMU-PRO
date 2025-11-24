
import React, { useState, useEffect } from 'react';
import { Package, User as UserIcon, MapPin, LogOut, Settings, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'address'>('orders');
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading || !user) return null; // Or a loading spinner

  // Mock Data
  const mockOrders = [
    { id: '#EP-9021', date: '12 Ott 2023', status: 'Consegnato', total: '€145.00', items: ['Cartucce Golden Needle', 'Balsamo Curativo Velvet'] },
    { id: '#EP-8832', date: '05 Set 2023', status: 'In Elaborazione', total: '€450.00', items: ['Macchinetta Rotativa Royal'] }
  ];

  const TabButton = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-4 text-sm tracking-widest uppercase transition-all ${
        activeTab === id 
          ? 'bg-gold-900/20 text-gold-400 border-r-2 border-gold-500' 
          : 'text-gray-500 hover:text-gray-300 hover:bg-gray-900'
      }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-obsidian pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end mb-12 border-b border-gray-800 pb-6">
          <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center border border-gold-500 text-gold-500 text-3xl font-serif mr-6">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-serif text-3xl text-white">Area Personale</h1>
            <p className="text-gray-500 text-sm mt-1">Livello {user.memberLevel} • {user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="bg-black border border-gray-900 py-4">
              <TabButton id="orders" label="Miei Ordini" icon={Package} />
              <TabButton id="profile" label="Profilo" icon={UserIcon} />
              <TabButton id="address" label="Indirizzi" icon={MapPin} />
              <div className="h-px bg-gray-900 my-2"></div>
              <button 
                onClick={() => { logout(); navigate('/login'); }}
                className="w-full flex items-center gap-3 px-4 py-4 text-sm tracking-widest uppercase text-red-900 hover:text-red-700 transition-colors"
              >
                <LogOut size={18} />
                Esci
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-black border border-gray-900 p-8 min-h-[500px]"
            >
              {activeTab === 'orders' && (
                <div>
                  <h2 className="font-serif text-xl text-gold-100 mb-6">Storico Ordini</h2>
                  <div className="space-y-4">
                    {mockOrders.map(order => (
                      <div key={order.id} className="border border-gray-800 p-6 hover:border-gold-500/30 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="text-gold-500 font-mono text-sm">{order.id}</span>
                            <p className="text-gray-500 text-xs mt-1">{order.date}</p>
                          </div>
                          <span className={`px-3 py-1 text-xs border ${
                            order.status === 'Consegnato' ? 'border-green-900 text-green-500' : 'border-blue-900 text-blue-500'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="text-gray-300 text-sm mb-4">
                          {order.items.join(", ")}
                        </div>
                        <div className="flex justify-end border-t border-gray-900 pt-4">
                          <span className="text-gold-100 font-serif">{order.total}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'profile' && (
                <div>
                  <h2 className="font-serif text-xl text-gold-100 mb-6">Informazioni Personali</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                    <div>
                      <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Nome Completo</label>
                      <input type="text" value={user.name} readOnly className="w-full bg-gray-900/50 border border-gray-800 p-3 text-gray-300 focus:border-gold-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">Email</label>
                      <input type="text" value={user.email} readOnly className="w-full bg-gray-900/50 border border-gray-800 p-3 text-gray-300 focus:border-gold-500 outline-none" />
                    </div>
                  </div>
                  <button className="mt-8 px-6 py-2 border border-gold-500 text-gold-400 text-xs uppercase tracking-widest hover:bg-gold-500 hover:text-black transition-colors">
                    Richiedi Modifica
                  </button>
                </div>
              )}

              {activeTab === 'address' && (
                <div>
                  <h2 className="font-serif text-xl text-gold-100 mb-6">Indirizzi Salvati</h2>
                  <div className="border border-dashed border-gray-700 p-8 flex flex-col items-center justify-center text-gray-500 hover:text-gold-400 hover:border-gold-500 transition-colors cursor-pointer">
                     <Plus size={24} />
                     <span className="mt-2 text-xs uppercase tracking-widest">Aggiungi Nuovo Indirizzo</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
