'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ChatBot from '../../components/ChatBot';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Help Center</h1>
          <p className="text-gray-600 mb-8">Get answers about swapping, uploads, and your account.</p>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-gray-50">
              <h2 className="font-semibold text-gray-900 mb-1">How to request a swap?</h2>
              <p className="text-gray-600 text-sm">
                Go to <Link href="/explore" className="text-blue-600 hover:text-blue-700 transition-colors">Explore</Link>, open a book, and click <span className="font-medium">Request Exchange</span>.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gray-50">
              <h2 className="font-semibold text-gray-900 mb-1">How to upload a book?</h2>
              <p className="text-gray-600 text-sm">
                Use <Link href="/upload" className="text-blue-600 hover:text-blue-700 transition-colors">Upload Book</Link> and follow the steps.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-gray-50">
              <h2 className="font-semibold text-gray-900 mb-1">Where can I see my swaps?</h2>
              <p className="text-gray-600 text-sm">
                Open <Link href="/profile" className="text-blue-600 hover:text-blue-700 transition-colors">My Profile</Link>.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/faq"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-semibold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Read FAQs
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <ChatBot />
    </div>
  );
}

