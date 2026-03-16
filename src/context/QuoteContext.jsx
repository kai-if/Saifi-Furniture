import React, { createContext, useContext, useState, useEffect } from 'react';

const QuoteContext = createContext();

export const useQuote = () => useContext(QuoteContext);

export const QuoteProvider = ({ children }) => {
  const [quoteItems, setQuoteItems] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('saifi-quote-items');
    if (saved) {
      try {
        setQuoteItems(JSON.parse(saved));
      } catch (e) {
        console.error("Could not parse quote items");
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('saifi-quote-items', JSON.stringify(quoteItems));
  }, [quoteItems]);

  const addItemToQuote = (item) => {
    // Check if item already exists
    if (!quoteItems.find(qItem => qItem.id === item.id)) {
      setQuoteItems(prev => [...prev, item]);
    }
    // Automatically open drawer when item is added
    setIsDrawerOpen(true);
  };

  const removeItemFromQuote = (id) => {
    setQuoteItems(prev => prev.filter(item => item.id !== id));
  };

  const clearQuote = () => {
    setQuoteItems([]);
  };

  return (
    <QuoteContext.Provider value={{ 
      quoteItems, 
      addItemToQuote, 
      removeItemFromQuote, 
      clearQuote,
      isDrawerOpen,
      setIsDrawerOpen
    }}>
      {children}
    </QuoteContext.Provider>
  );
};
