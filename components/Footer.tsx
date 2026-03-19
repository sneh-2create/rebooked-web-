
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <i className="ri-book-open-line text-white text-lg"></i>
              </div>
              <span className="text-2xl font-bold" style={{fontFamily: 'Pacifico, serif'}}>ReBooked</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connect book lovers worldwide. Share, exchange, and discover your next favorite read through our amazing community platform.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <i className="ri-facebook-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <i className="ri-twitter-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <i className="ri-instagram-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <i className="ri-linkedin-fill text-lg"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Link href="/explore" className="block text-gray-400 hover:text-white transition-colors">Explore Books</Link>
              <Link href="/upload" className="block text-gray-400 hover:text-white transition-colors">Upload Book</Link>
              <Link href="/nearby" className="block text-gray-400 hover:text-white transition-colors">Nearby Swaps</Link>
              <Link href="/how-it-works" className="block text-gray-400 hover:text-white transition-colors">How It Works</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <div className="space-y-3">
              <Link href="/help" className="block text-gray-400 hover:text-white transition-colors">Help Center</Link>
              <Link href="/faq" className="block text-gray-400 hover:text-white transition-colors">FAQ</Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact Us</Link>
              <Link href="/safety" className="block text-gray-400 hover:text-white transition-colors">Safety Guidelines</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Get updates on new books and exchange opportunities</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-purple-600 text-sm"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-send-plane-line"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm"> 2024 ReBooked. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
