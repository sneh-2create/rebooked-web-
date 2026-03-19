'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from './AuthProvider';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <i className="ri-book-open-line text-white text-lg"></i>
            </div>
            <span className="text-2xl font-bold text-blue-600" style={{fontFamily: 'Pacifico, serif'}}>ReBooked</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/explore" className="text-gray-700 hover:text-blue-600 transition-colors">Explore Books</Link>
            <Link href="/upload" className="text-gray-700 hover:text-blue-600 transition-colors">Upload Book</Link>
            <Link href="/nearby" className="text-gray-700 hover:text-blue-600 transition-colors">Nearby Swaps</Link>
            <Link href="/profile" className="text-gray-700 hover:text-blue-600 transition-colors">My Profile</Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <i className="ri-notification-3-line text-xl"></i>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            {user ? (
              <button
                onClick={signOut}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Sign In
              </Link>
            )}
          </div>

          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link href="/explore" className="text-gray-700 hover:text-blue-600 transition-colors">Explore Books</Link>
              <Link href="/upload" className="text-gray-700 hover:text-blue-600 transition-colors">Upload Book</Link>
              <Link href="/nearby" className="text-gray-700 hover:text-blue-600 transition-colors">Nearby Swaps</Link>
              <Link href="/profile" className="text-gray-700 hover:text-blue-600 transition-colors">My Profile</Link>
              {user ? (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    signOut();
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors text-center whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/login"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors text-center whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
