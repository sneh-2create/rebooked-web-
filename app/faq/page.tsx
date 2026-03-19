'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ChatBot from '../../components/ChatBot';
import Link from 'next/link';

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">FAQ</h1>
          <p className="text-gray-600 mb-8">Quick answers to common questions.</p>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Is this a real backend?</h2>
              <p className="text-gray-600 text-sm">
                Covers and book listings are loaded from public book providers. Your sign-in details are stored locally in your browser for now.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">How do book images work?</h2>
              <p className="text-gray-600 text-sm">
                Covers are loaded from the image service URLs inside the app components.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">How can I contact support?</h2>
              <p className="text-gray-600 text-sm">
                Visit <Link href="/contact" className="text-blue-600 hover:text-blue-700 transition-colors">Contact Us</Link>.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/safety"
              className="inline-block bg-gray-100 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-200 transition-colors font-semibold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Safety Guidelines
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <ChatBot />
    </div>
  );
}

