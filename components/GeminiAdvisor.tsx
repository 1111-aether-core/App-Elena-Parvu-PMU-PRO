import React, { useState, useEffect, useRef } from 'react';
import { geminiService } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Send, Sparkles, Minimize2, User, Bot, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Chat } from '@google/genai';
import { useUI } from '../context/UIContext';

// Helper component to render text with clickable links
const MessageContent: React.FC<{ text: string }> = ({ text }) => {
  // Simple regex to detect URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return (
    <span>
      {parts.map((part, i) => {
        if (part.match(urlRegex)) {
          // Check if it's a WhatsApp link to style it specifically
          const isWhatsApp = part.includes('wa.me');
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded mx-1 transition-colors ${
                isWhatsApp 
                  ? 'bg-green-900/40 text-green-400 border border-green-700 hover:bg-green-900/60' 
                  : 'text-gold-400 underline hover:text-gold-200'
              }`}
            >
              {isWhatsApp ? 'Apri WhatsApp' : 'Link'} <ExternalLink size={10} />
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

export const GeminiAdvisor: React.FC = () => {
  const { isChatOpen, setChatOpen } = useUI();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Benvenuto. Sono Aurea. Posso assisterti con informazioni sui prodotti o prenotare un appuntamento per te?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
        setTimeout(scrollToBottom, 100);
    }
  }, [messages, isChatOpen]);

  // Initialize Chat session once
  useEffect(() => {
    if (!chatSessionRef.current) {
      chatSessionRef.current = geminiService.createChat();
    }
  }, []);

  const handleSend = async () => {
    // If chatSession is null (API Key missing), show error
    if (!chatSessionRef.current) {
         setMessages(prev => [...prev, { role: 'user', text: input }]);
         setInput('');
         setTimeout(() => {
            setMessages(prev => [...prev, { role: 'model', text: "Mi dispiace, al momento non sono connessa ai servizi cognitivi (API Key mancante)." }]);
         }, 500);
         return;
    }

    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      setMessages(prev => [...prev, { role: 'model', text: '', isStreaming: true }]);
      
      const stream = await geminiService.sendMessageStream(chatSessionRef.current, userMsg);
      let fullResponse = '';
      
      for await (const textChunk of stream) {
        fullResponse += textChunk;
        setMessages(prev => {
          const newMsgs = [...prev];
          const lastMsg = newMsgs[newMsgs.length - 1];
          if (lastMsg.role === 'model' && lastMsg.isStreaming) {
            lastMsg.text = fullResponse;
          }
          return newMsgs;
        });
      }

      setMessages(prev => {
         const newMsgs = [...prev];
         const lastMsg = newMsgs[newMsgs.length - 1];
         lastMsg.isStreaming = false;
         return newMsgs;
      });

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Le mie scuse, la connessione sembra interrotta. Per favore riprova." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isChatOpen && (
        <>
            {/* Mobile Full Screen / Desktop Floating Card */}
            <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed inset-0 md:inset-auto md:bottom-24 md:right-6 z-[60] flex flex-col bg-obsidian md:w-[400px] md:h-[600px] md:rounded-2xl md:border md:border-gold-500/40 md:shadow-2xl overflow-hidden"
            >
            {/* Header */}
            <div className="p-4 bg-black border-b border-gold-500/20 flex justify-between items-center">
                <div className="flex items-center gap-3">
                <div className="p-1.5 bg-gold-900/30 rounded-full border border-gold-500/30">
                    <Sparkles size={16} className="text-gold-400" />
                </div>
                <div>
                    <h3 className="font-serif text-gold-100 tracking-wide text-sm">Aurea</h3>
                    <p className="text-[10px] text-gold-500 uppercase tracking-widest">Concierge AI & Appuntamenti</p>
                </div>
                </div>
                <button 
                onClick={() => setChatOpen(false)}
                className="p-2 text-gray-400 hover:text-gold-400 transition-colors rounded-full hover:bg-gray-900"
                >
                {window.innerWidth < 768 ? <X size={20} /> : <Minimize2 size={18} />}
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-gradient-to-b from-obsidian to-black">
                {messages.map((msg, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${msg.role === 'user' ? 'bg-gray-800 border-gray-600' : 'bg-black border-gold-500 shadow-gold-glow'}`}>
                    {msg.role === 'user' ? <User size={14} className="text-gray-300"/> : <Bot size={14} className="text-gold-400"/>}
                    </div>
                    <div className={`p-3.5 rounded-2xl text-sm max-w-[85%] leading-relaxed ${
                    msg.role === 'user' 
                        ? 'bg-gray-900 text-gray-100 border border-gray-800 rounded-tr-none' 
                        : 'bg-black text-gold-100 border border-gold-900 shadow-[0_0_10px_rgba(212,175,55,0.1)] rounded-tl-none'
                    }`}>
                    <MessageContent text={msg.text} />
                    {msg.isStreaming && <span className="animate-pulse ml-1 text-gold-500">▋</span>}
                    </div>
                </motion.div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-black border-t border-gold-500/20 pb-8 md:pb-4">
                <div className="flex items-center gap-2 bg-gray-900/50 rounded-full px-4 py-3 border border-gray-800 focus-within:border-gold-500/50 transition-colors">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Scrivi qui..."
                    className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder-gray-600"
                    disabled={isLoading}
                    autoFocus
                />
                <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="text-gold-500 hover:text-gold-300 disabled:text-gray-800 transition-colors p-1"
                >
                    <Send size={18} />
                </button>
                </div>
            </div>
            </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};