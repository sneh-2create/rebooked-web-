'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ChatBot from '../../components/ChatBot';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Terms of service for this project.</p>
          <div className="space-y-4 text-gray-700 text-sm">
            <p>Use this project for exploration and testing.</p>
            <p>Don’t upload real sensitive documents in the upload flow.</p>
            <p>For production, connect proper auth, storage, and moderation.</p>
          </div>
        </div>
      </div>
      <Footer />
      <ChatBot />
    </div>
  );
}

