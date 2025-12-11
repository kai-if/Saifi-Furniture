import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const Chatbot = () => {
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello! How can I help you today?" }]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      const responses = [
        "Thank you for your message! Our team will get back to you shortly.",
        "I can help you with product inquiries, custom orders, or scheduling a showroom visit.",
        "Would you like to speak with our design consultant?"
      ];
      setMessages(prev => [...prev, { sender: "bot", text: responses[Math.floor(Math.random() * responses.length)] }]);
    }, 800);
  };

  return (
    <>
      <button onClick={() => setShow(!show)} className="fixed bottom-6 right-6 bg-amber-900 text-white p-4 rounded-full shadow-lg hover:bg-amber-800 transition-all duration-300 hover:scale-110 z-50" aria-label="Open chat">
        <MessageCircle size={24} />
      </button>

      {show && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-lg shadow-2xl z-50 animate-fadeInUp">
          <div className="bg-amber-900 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat with Us</h3>
            <button onClick={() => setShow(false)} aria-label="Close chat">
              <X size={20} />
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === "user" ? "bg-amber-900 text-white" : "bg-gray-100 text-gray-800"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex space-x-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} placeholder="Type a message..." className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-900" />
            <button onClick={handleSend} className="bg-amber-900 text-white p-2 rounded-md hover:bg-amber-800 transition-colors" aria-label="Send">
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
