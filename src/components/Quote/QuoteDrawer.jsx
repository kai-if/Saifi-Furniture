import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, MessageCircle, Mail } from 'lucide-react';
import { useQuote } from '../../context/QuoteContext';

const QuoteDrawer = () => {
  const { quoteItems, isDrawerOpen, setIsDrawerOpen, removeItemFromQuote, clearQuote } = useQuote();

  React.useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  const handleRequestQuoteWhatsApp = () => {
    if (quoteItems.length === 0) return;

    // Formatting the message
    const intro = "Hello Saifi Furniture! I'm interested in getting quotes for the following items I saw on your website:%0A%0A";
    const itemsList = quoteItems.map((item, index) => `${index + 1}. ${item.title} (Category: ${item.category})`).join('%0A');
    const outro = "%0A%0ACould you please provide me with more details or an estimated pricing quote for these? Thank you!";

    const message = intro + itemsList + outro;

    // Using a placeholder WhatsApp Number (Update with actual client number)
    const phone = import.meta.env.VITE_WHATSAPP_PHONE;
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handleRequestQuoteEmail = () => {
    if (quoteItems.length === 0) return;

    // Formatting the email body
    const intro = "Hello Saifi Furniture,\n\nI am interested in getting quotes for the following items found on your gallery:\n\n";
    const itemsList = quoteItems.map((item, index) => `${index + 1}. ${item.title} (${item.category})`).join('\n');
    const outro = "\n\nPlease let me know the availability, customization options, and approximate pricing.\n\nThank you!";

    const subject = "Website Quote Inquiry";
    // Using a placeholder email (Update with actual client email)
    const to = import.meta.env.VITE_SUPPORT_EMAIL;

    window.open(`mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(intro + itemsList + outro)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[400px] bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <h2 className="text-xl font-serif font-bold dark:text-white">Your Quote List</h2>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors dark:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {quoteItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 space-y-4 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shrink-0">
                    <MessageCircle size={32} className="opacity-50" />
                  </div>
                  <p>Your quote list is empty.</p>
                  <p className="text-sm">Browse the gallery and add items you'd like pricing for.</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {quoteItems.length} item{quoteItems.length !== 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={clearQuote}
                      className="text-sm text-red-500 hover:text-red-600 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                  {quoteItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50"
                    >
                      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-200 dark:bg-gray-700">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1">{item.title}</h4>
                          <span className="text-xs text-blue-600 dark:text-blue-400">{item.category}</span>
                        </div>
                        <button
                          onClick={() => removeItemFromQuote(item.id)}
                          className="self-start text-xs flex items-center gap-1 text-gray-500 hover:text-red-500 mt-2 transition-colors"
                        >
                          <Trash2 size={12} /> Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>

            {/* Footer / Actions */}
            {quoteItems.length > 0 && (
              <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 space-y-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-4">
                  Requesting a quote is completely free and non-binding. We'll get back to you with details.
                </p>
                <button
                  onClick={handleRequestQuoteWhatsApp}
                  className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle size={18} fill="currentColor" className="text-white" />
                  Request Quote via WhatsApp
                </button>
                <button
                  onClick={handleRequestQuoteEmail}
                  className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail size={18} />
                  Request Quote via Email
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default QuoteDrawer;
