'use client';

import { useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  owner: string;
  location: string;
  type: string;
}

interface ExchangeRequestModalProps {
  book: Book;
  onClose: () => void;
}

export default function ExchangeRequestModal({ book, onClose }: ExchangeRequestModalProps) {
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const [exchangeType, setExchangeType] = useState('physical');
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);

  const myBooks = [
    { id: 1, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", condition: "Good" },
    { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald", condition: "Like New" },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", condition: "Excellent" },
    { id: 4, title: "1984", author: "George Orwell", condition: "Good" }
  ];

  const handleBookSelect = (bookId: number) => {
    setSelectedBooks(prev => 
      prev.includes(bookId) 
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleSubmitRequest = () => {
    setStep(3);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {step === 1 ? 'Request Exchange' : 
               step === 2 ? 'Review Request' : 
               'Request Sent!'}
            </h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          
          <div className="flex items-center mt-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>1</div>
            <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>2</div>
            <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 3 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>3</div>
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Book You Want</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">{book.title}</h4>
                  <p className="text-gray-600">by {book.author}</p>
                  <p className="text-sm text-gray-500">Owner: {book.owner}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Exchange Type</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setExchangeType('physical')}
                    className={`p-4 rounded-lg border-2 text-left transition-colors cursor-pointer ${
                      exchangeType === 'physical' 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <i className="ri-book-line text-xl mr-2"></i>
                      <span className="font-medium">Physical Exchange</span>
                    </div>
                    <p className="text-sm text-gray-600">Meet locally to exchange physical books</p>
                  </button>
                  
                  <button
                    onClick={() => setExchangeType('digital')}
                    className={`p-4 rounded-lg border-2 text-left transition-colors cursor-pointer ${
                      exchangeType === 'digital' 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <i className="ri-smartphone-line text-xl mr-2"></i>
                      <span className="font-medium">Digital Share</span>
                    </div>
                    <p className="text-sm text-gray-600">Share digital copies online</p>
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Books to Offer</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {myBooks.map((myBook) => (
                    <div 
                      key={myBook.id}
                      onClick={() => handleBookSelect(myBook.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedBooks.includes(myBook.id)
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                          selectedBooks.includes(myBook.id)
                            ? 'border-blue-600 bg-blue-600'
                            : 'border-gray-300'
                        }`}>
                          {selectedBooks.includes(myBook.id) && (
                            <i className="ri-check-line text-white text-sm"></i>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{myBook.title}</h4>
                          <p className="text-sm text-gray-600">{myBook.author}</p>
                          <p className="text-xs text-gray-500">Condition: {myBook.condition}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Message to Owner (Optional)
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                  placeholder="Hi! I'd love to exchange books with you. I think you might enjoy the books I'm offering..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 resize-none h-24"
                  maxLength={500}
                />
                <p className="text-sm text-gray-500 mt-1">{message.length}/500 characters</p>
              </div>

              <div className="flex space-x-4">
                <button 
                  onClick={onClose}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setStep(2)}
                  disabled={selectedBooks.length === 0}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Exchange Summary</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">You will receive:</h4>
                        <p className="text-sm text-gray-600">{book.title} by {book.author}</p>
                      </div>
                      <i className="ri-arrow-right-line text-2xl text-blue-600"></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">You will offer:</h4>
                      {selectedBooks.map(bookId => {
                        const selectedBook = myBooks.find(b => b.id === bookId);
                        return (
                          <p key={bookId} className="text-sm text-gray-600">
                            {selectedBook?.title} by {selectedBook?.author}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Exchange Type:</h4>
                  <p className="text-gray-600 capitalize">{exchangeType} Exchange</p>
                </div>

                {message && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Your Message:</h4>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg text-sm">{message}</p>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button 
                  onClick={handleSubmitRequest}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Send Request
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line text-3xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Request Sent Successfully!</h3>
              <p className="text-gray-600 mb-4">
                {book.owner} will receive your exchange request and respond within 24 hours.
              </p>
              <p className="text-sm text-gray-500">
                You'll get a notification when they respond. This window will close automatically.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}