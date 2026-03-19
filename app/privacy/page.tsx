'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ChatBot from '../../components/ChatBot';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600 mb-6">Privacy policy for this project.</p>
          <div className="space-y-4 text-gray-700 text-sm">
            <p>We don’t store sensitive information on a server.</p>
            <p>Sign-in uses your browser storage to keep you logged in locally.</p>
            <p>For production, connect real auth and backend storage.</p>
          </div>
        </div>
      </div>
      <Footer />
      <ChatBot />
    </div>
  );
}

