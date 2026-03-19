'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ChatBot from '../../components/ChatBot';
import BookCoverImage from '../../components/BookCoverImage';
import { useState } from 'react';
import { bookDecorBackground } from '../../lib/decorBg';

export default function NearbySwapsPage() {
  const [selectedDistance, setSelectedDistance] = useState('10');
  const [deliveryOption, setDeliveryOption] = useState('pickup');

  const nearbySwaps = [
    {
      id: 1,
      user: "Emily Rodriguez",
      book: "The Midnight Library",
      author: "Matt Haig",
      distance: "2.3 km",
      rating: 4.8,
      swaps: 12,
      condition: "Like New",
      availableFor: "Physical Exchange",
      deliveryPrice: 12,
      estimatedTime: "2-3 hours"
    },
    {
      id: 2,
      user: "Michael Chen",
      book: "The Summer I Turned Pretty",
      author: "Jenny Han",
      distance: "4.7 km",
      rating: 4.7,
      swaps: 18,
      condition: "Excellent",
      availableFor: "Physical Exchange",
      deliveryPrice: 15,
      estimatedTime: "3-4 hours"
    },
    {
      id: 3,
      user: "Sarah Williams",
      book: "We Were Liars",
      author: "E. Lockhart",
      distance: "6.1 km",
      rating: 4.6,
      swaps: 14,
      condition: "Good",
      availableFor: "Digital Share",
      deliveryPrice: 18,
      estimatedTime: "4-5 hours"
    },
    {
      id: 4,
      user: "David Kumar",
      book: "The Vampire Diaries",
      author: "L.J. Smith",
      distance: "8.2 km",
      rating: 4.5,
      swaps: 22,
      condition: "Like New",
      availableFor: "Physical Exchange",
      deliveryPrice: 20,
      estimatedTime: "5-6 hours"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative py-16 bg-cover bg-center"
        style={{
          ...bookDecorBackground('nearby'),
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nearby Book Swaps</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Discover amazing books from readers in your area. Meet locally or use our trusted delivery service for convenient exchanges.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-map-pin-line text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Local Discovery</h3>
              <p className="text-blue-100">Find books from readers nearby</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-truck-line text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Safe Delivery</h3>
              <p className="text-blue-100">Trusted agents handle exchanges</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-check-line text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Process</h3>
              <p className="text-blue-100">Protected transactions and reviews</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Books Near You</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Distance
              </label>
              <select
                value={selectedDistance}
                onChange={(e) => setSelectedDistance(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 pr-8"
              >
                <option value="5">Within 5 km</option>
                <option value="10">Within 10 km</option>
                <option value="25">Within 25 km</option>
                <option value="50">Within 50 km</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Exchange Method
              </label>
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setDeliveryOption('pickup')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    deliveryOption === 'pickup'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Local Pickup
                </button>
                <button
                  onClick={() => setDeliveryOption('delivery')}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    deliveryOption === 'delivery'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Delivery Service
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Book Genre
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 pr-8">
                <option value="">All Genres</option>
                <option value="fiction">Fiction</option>
                <option value="romance">Romance</option>
                <option value="thriller">Thriller</option>
                <option value="self-help">Self-Help</option>
                <option value="biography">Biography</option>
              </select>
            </div>
          </div>
        </div>

        {/* Available Books */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbySwaps.map((swap) => (
            <div key={swap.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-blue-500 relative">
                <BookCoverImage
                  title={swap.book}
                  author={swap.author}
                  genre={undefined}
                  isbn={undefined}
                  width={300}
                  height={400}
                  seq={`nearbybook${swap.id}`}
                  alt={swap.book}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-3 left-3 bg-white/90 px-2 py-1 rounded-full">
                  <span className="text-xs font-semibold text-gray-800">{swap.distance}</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1">{swap.book}</h3>
                <p className="text-gray-600 text-sm mb-3">by {swap.author}</p>
                
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <i className="ri-user-3-fill text-white text-sm"></i>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{swap.user}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <i className="ri-star-fill text-yellow-400 mr-1"></i>
                      <span>{swap.rating} ({swap.swaps} swaps)</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Condition:</span>
                    <span className="font-medium">{swap.condition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Available for:</span>
                    <span className="font-medium">{swap.availableFor}</span>
                  </div>
                  {deliveryOption === 'delivery' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Delivery Fee:</span>
                        <span className="font-medium text-green-600">${swap.deliveryPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Estimated Time:</span>
                        <span className="font-medium">{swap.estimatedTime}</span>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Link
                    href={`/book/${swap.id}`}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Request Exchange
                  </Link>
                  {deliveryOption === 'delivery' && (
                    <Link
                      href={`/book/${swap.id}`}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Order with Delivery (${swap.deliveryPrice})
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Info */}
        {deliveryOption === 'delivery' && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mt-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted Delivery Service</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our verified delivery agents ensure safe and secure book exchanges. Track your delivery in real-time and enjoy hassle-free swapping.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-shield-check-line text-2xl text-green-600"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Verified Agents</h3>
                <p className="text-sm text-gray-600">Background-checked delivery professionals</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-map-2-line text-2xl text-blue-600"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Real-Time Tracking</h3>
                <p className="text-sm text-gray-600">Monitor your delivery from pickup to drop-off</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-money-dollar-circle-line text-2xl text-purple-600"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Fair Pricing</h3>
                <p className="text-sm text-gray-600">Transparent fees based on distance and urgency</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-customer-service-2-line text-2xl text-orange-600"></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                <p className="text-sm text-gray-600">Customer service available around the clock</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
      <ChatBot />
    </div>
  );
}