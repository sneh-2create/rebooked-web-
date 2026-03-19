'use client';

import { useState } from 'react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your BookSwap assistant. How can I help you today?", isBot: true }
  ]);
  const [inputText, setInputText] = useState('');

  const quickReplies = [
    "How to swap books?",
    "Find nearby readers",
    "Upload my book",
    "Safety guidelines"
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    setMessages(prev => [...prev, { text: inputText, isBot: false }]);
    
    setTimeout(() => {
      let botResponse = "I'm here to help! ";
      if (inputText.toLowerCase().includes('swap')) {
        botResponse = "To swap books, browse available books, click 'Request Exchange', and specify if you want physical delivery or digital copy. The owner will respond with their preferences!";
      } else if (inputText.toLowerCase().includes('nearby')) {
        botResponse = "Use our 'Nearby Swaps' feature to find readers in your area. You can filter by distance and book genres to find perfect matches!";
      } else if (inputText.toLowerCase().includes('upload')) {
        botResponse = "Click 'Upload Book' in the menu, add book details, photos, and specify if you want physical exchange, digital sharing, or both options available.";
      } else {
        botResponse = "Thanks for your question! You can explore books, upload your collection, find nearby readers, or contact our support team for detailed assistance.";
      }
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 1000);
    
    setInputText('');
  };

  const handleQuickReply = (reply: string) => {
    setInputText(reply);
    handleSendMessage();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50 flex items-center justify-center cursor-pointer"
      >
        <i className={`ri-${isOpen ? 'close' : 'chat-3'}-line text-xl`}></i>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border z-50 flex flex-col">
          <div className="bg-blue-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <i className="ri-robot-line text-sm"></i>
              </div>
              <div>
                <h3 className="font-semibold">BookSwap Assistant</h3>
                <p className="text-xs text-blue-100">Online now</p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  message.isBot 
                    ? 'bg-gray-100 text-gray-800' 
                    : 'bg-blue-600 text-white'
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
            
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">Quick replies:</p>
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className="block w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-600 text-sm"
              />
              <button
                onClick={handleSendMessage}
                className="w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center cursor-pointer"
              >
                <i className="ri-send-plane-line text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}