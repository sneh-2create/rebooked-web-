'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ChatBot from '../../components/ChatBot';
import Link from 'next/link';

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Safety Guidelines</h1>
          <p className="text-gray-600 mb-8">
            Simple rules to keep exchanges safe and respectful.
          </p>

          <ul className="space-y-3 text-gray-700 text-sm list-disc pl-6">
            <li>Meet in public places for physical swaps.</li>
            <li>Use verified delivery options when available.</li>
            <li>Avoid sharing sensitive personal information.</li>
            <li>Report suspicious activity to support.</li>
          </ul>

          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              href="/help"
              className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-200 transition-colors font-semibold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Visit Help
            </Link>
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-semibold cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <ChatBot />
    </div>
  );
}

