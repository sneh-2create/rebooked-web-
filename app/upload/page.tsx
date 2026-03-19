
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ChatBot from '../../components/ChatBot';
import BookUploadForm from './BookUploadForm';
import { bookDecorBackground } from '../../lib/decorBg';

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative py-16 bg-cover bg-center"
        style={{
          ...bookDecorBackground('upload'),
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Share Your Books</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Add your finished books to our community library. Help other readers discover amazing stories while finding your next great read.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-camera-line text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">1. Add Photos & PDF</h3>
              <p className="text-blue-100">Upload photos and digital files</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-file-text-line text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">2. Book Details</h3>
              <p className="text-blue-100">Provide book information and condition</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-share-line text-2xl"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">3. Start Sharing</h3>
              <p className="text-blue-100">Connect with readers and start exchanging</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <BookUploadForm />
      </div>

      <Footer />
      <ChatBot />
    </div>
  );
}
