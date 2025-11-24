
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';

export const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      navigate('/account');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center pt-24 pb-12 px-4">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-gold-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl text-white mb-2">
            {isLogin ? 'Bentornato' : 'Unisciti all\'Élite'}
          </h1>
          <p className="text-gold-400 text-sm uppercase tracking-widest">
            Elena Parvu Luxury Aesthetics
          </p>
        </div>

        {/* Card */}
        <div className="bg-black border border-gray-800 p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="relative group">
                    <User className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-gold-500 transition-colors" size={18} />
                    <input
                      type="text"
                      placeholder="Nome Completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={!isLogin}
                      className="w-full bg-gray-900/50 border border-gray-800 text-white pl-12 pr-4 py-3 focus:border-gold-500 outline-none transition-colors placeholder-gray-600"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-gold-500 transition-colors" size={18} />
              <input
                type="email"
                placeholder="Indirizzo Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-900/50 border border-gray-800 text-white pl-12 pr-4 py-3 focus:border-gold-500 outline-none transition-colors placeholder-gray-600"
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-gold-500 transition-colors" size={18} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-900/50 border border-gray-800 text-white pl-12 pr-4 py-3 focus:border-gold-500 outline-none transition-colors placeholder-gray-600"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gold-500 text-black font-bold uppercase tracking-widest text-xs py-4 hover:bg-white transition-all flex justify-center items-center gap-2 group"
            >
              {isSubmitting ? 'Elaborazione...' : (isLogin ? 'Accedi' : 'Crea Account')}
              {!isSubmitting && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-8 text-center pt-6 border-t border-gray-900">
            <p className="text-gray-500 text-sm mb-3">
              {isLogin ? 'Non hai un account?' : 'Hai già un account?'}
            </p>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-gold-400 hover:text-gold-200 text-sm uppercase tracking-wider border-b border-gold-500/30 hover:border-gold-500 pb-1 transition-all"
            >
              {isLogin ? 'Registrati Ora' : 'Accedi al tuo profilo'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
