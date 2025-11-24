import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UIContextType {
  isChatOpen: boolean;
  setChatOpen: (isOpen: boolean) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <UIContext.Provider value={{ 
      isChatOpen, 
      setChatOpen,
      isMobileMenuOpen,
      setMobileMenuOpen
    }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};