'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ChatBot from '../../components/ChatBot';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">How BookSwap Works</h1>
          <p className="text-gray-600 mb-8">
            Three simple steps to share books and discover your next favorite read.
          </p>

          <div className="space-y-6">
            <div className="p-5 rounded-xl bg-blue-50">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">1. Upload your books</h2>
              <p className="text-gray-700 text-sm">
                Add photos and details. Choose physical exchange, digital sharing, or both.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-green-50">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">2. Discover & request</h2>
              <p className="text-gray-700 text-sm">
                Browse books in Explore, filter by genre/type/location, and request an exchange.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-purple-50">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">3. Exchange & enjoy</h2>
              <p className="text-gray-700 text-sm">
                Coordinate with other readers and enjoy your new book. Rate your experience.
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              href="/explore"
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors font-semibold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Explore Books
            </Link>
            <Link
              href="/upload"
              className="bg-gray-100 text-gray-800 px-5 py-2 rounded-full hover:bg-gray-200 transition-colors font-semibold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Upload a Book
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <ChatBot />
    </div>
  );
}

