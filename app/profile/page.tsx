
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ChatBot from '../../components/ChatBot';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../../components/AuthProvider';
import { readUploadedBooks, type RebookedBook } from '../../lib/rebookedStore';
import BookCoverImage from '../../components/BookCoverImage';
import { bookDecorBackground } from '../../lib/decorBg';
import { motion } from 'framer-motion';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();
  const [uploadedBooks, setUploadedBooks] = useState<RebookedBook[]>([]);

  useEffect(() => {
    setUploadedBooks(readUploadedBooks());
  }, []);

  const userStats = {
    name: user?.name ?? "Guest Reader",
    email: user?.email ?? "Sign in to view your account details",
    location: "New York, NY",
    joinDate: "March 2023",
    rating: 4.9,
    totalSwaps: 45,
    booksShared: 28,
    booksReceived: 17,
    pendingRequests: 3,
    completedDeliveries: 22
  };

  const demoMyBooks = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      condition: "Like New",
      genre: 'Fiction',
      status: "Available",
      requests: 5,
      uploaded: "2 days ago"
    },
    {
      id: 2,
      title: "Educated",
      author: "Tara Westover",
      condition: "Excellent",
      genre: 'Non-Fiction',
      status: "In Exchange",
      requests: 8,
      uploaded: "1 week ago"
    },
    {
      id: 3,
      title: "Atomic Habits",
      author: "James Clear",
      condition: "Good",
      genre: 'Self-Help',
      status: "Available",
      requests: 12,
      uploaded: "2 weeks ago"
    }
  ];

  const myBooks = [
    ...uploadedBooks
      .filter((b) => {
        if (!user?.name) return b.owner === 'You';
        return b.owner === user.name;
      })
      .map((b) => ({
        id: b.id,
        title: b.title,
        author: b.author,
        condition: b.condition,
        genre: b.genre,
        status: 'Available',
        requests: 0,
        uploaded: b.uploadDate,
      })),
    ...demoMyBooks,
  ];

  const recentSwaps = [
    {
      id: 1,
      type: "Received",
      book: "The Seven Husbands of Evelyn Hugo",
      partner: "Emily Rodriguez",
      date: "3 days ago",
      method: "Delivery",
      status: "Completed"
    },
    {
      id: 2,
      type: "Shared",
      book: "Where the Crawdads Sing",
      partner: "Michael Chen",
      date: "1 week ago",
      method: "Local Pickup",
      status: "Completed"
    },
    {
      id: 3,
      type: "Pending",
      book: "The Alchemist",
      partner: "David Kumar",
      date: "2 days ago",
      method: "Delivery",
      status: "In Progress"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div 
            className="h-32 bg-cover bg-center relative"
            style={{
              backgroundImage: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          
          <div className="relative px-8 pb-8">
            <div className="flex items-start -mt-16 mb-6">
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <i className="ri-user-3-fill text-white text-3xl"></i>
              </div>
              <div className="ml-6 mt-12">
                <h1 className="text-3xl font-bold text-gray-900">{userStats.name}</h1>
                <p className="text-gray-600">{userStats.email}</p>
                <div className="flex items-center mt-2">
                  <i className="ri-map-pin-line text-gray-400 mr-1"></i>
                  <span className="text-gray-600">{userStats.location}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-600">Member since {userStats.joinDate}</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{userStats.rating}</div>
                <div className="text-sm text-gray-500">Rating</div>
                <div className="flex items-center justify-center mt-1">
                  {[1,2,3,4,5].map((star) => (
                    <i key={star} className="ri-star-fill text-yellow-400 text-sm"></i>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userStats.totalSwaps}</div>
                <div className="text-sm text-gray-500">Total Swaps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{userStats.booksShared}</div>
                <div className="text-sm text-gray-500">Books Shared</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{userStats.booksReceived}</div>
                <div className="text-sm text-gray-500">Books Received</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{userStats.pendingRequests}</div>
                <div className="text-sm text-gray-500">Pending Requests</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('mybooks')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'mybooks'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                My Books
              </button>
              <button
                onClick={() => setActiveTab('swaps')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'swaps'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Swap History
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'settings'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Settings
              </button>
            </nav>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Overview</h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <i className="ri-check-line text-green-600"></i>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Completed swap with Emily</p>
                              <p className="text-xs text-gray-500">3 days ago</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <i className="ri-upload-line text-blue-600"></i>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Added new book to library</p>
                              <p className="text-xs text-gray-500">1 week ago</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                              <i className="ri-exchange-line text-purple-600"></i>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Received 3 new requests</p>
                              <p className="text-xs text-gray-500">2 days ago</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              <i className="ri-medal-line text-yellow-600 text-xl"></i>
                            </div>
                            <p className="text-sm font-medium">Top Swapper</p>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                              <i className="ri-heart-line text-blue-600 text-xl"></i>
                            </div>
                            <p className="text-sm font-medium">Community Favorite</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <motion.div
                        className="relative overflow-hidden bg-white/80 border border-gray-100 p-6 rounded-xl"
                        initial={{ opacity: 1, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.55 }}
                      >
                        <div
                          aria-hidden
                          className="absolute inset-0 opacity-20 pointer-events-none"
                          style={bookDecorBackground('cta')}
                        />
                        <div className="relative">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Link
                              href="/upload"
                              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-all font-medium whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-sm hover:shadow-md active:scale-[0.99]"
                            >
                              <span className="inline-flex items-center justify-center gap-2">
                                <i className="ri-upload-2-line"></i>
                                Upload New Book
                              </span>
                            </Link>
                            <Link
                              href="/nearby"
                              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-all font-medium whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 shadow-sm hover:shadow-md active:scale-[0.99]"
                            >
                              <span className="inline-flex items-center justify-center gap-2">
                                <i className="ri-map-pin-line"></i>
                                Browse Nearby Books
                              </span>
                            </Link>
                            <button
                              onClick={() => setActiveTab('swaps')}
                              className="sm:col-span-2 w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-all font-medium whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 shadow-sm hover:shadow-md active:scale-[0.99]"
                            >
                              <span className="inline-flex items-center justify-center gap-2">
                                <i className="ri-time-line"></i>
                                View Pending Requests
                              </span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* My Books Tab */}
            {activeTab === 'mybooks' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">My Books</h2>
                  <Link
                    href="/upload"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Add New Book
                  </Link>
                </div>
                
                <div className="grid gap-6">
                  {myBooks.map((book) => (
                    <div key={book.id} className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex items-start justify-between">
                        <div className="flex">
                          <div className="w-16 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mr-4 flex-shrink-0">
                            <BookCoverImage
                              title={book.title}
                              author={book.author}
                              genre={book.genre}
                              isbn={undefined}
                              width={200}
                              height={300}
                              seq={`profilebook${book.id}`}
                              alt={book.title}
                              className="w-full h-full object-cover object-top rounded-lg"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">{book.title}</h3>
                            <p className="text-gray-600 mb-2">by {book.author}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>Condition: {book.condition}</span>
                              <span>{book.requests} requests</span>
                              <span>Uploaded {book.uploaded}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            book.status === 'Available' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {book.status}
                          </span>
                          <button className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
                            <i className="ri-more-2-line text-lg"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Swap History Tab */}
            {activeTab === 'swaps' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Swap History</h2>
                
                <div className="space-y-4">
                  {recentSwaps.map((swap) => (
                    <div key={swap.id} className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                            swap.type === 'Received' ? 'bg-green-100' :
                            swap.type === 'Shared' ? 'bg-blue-100' : 'bg-yellow-100'
                          }`}>
                            <i className={`text-xl ${
                              swap.type === 'Received' ? 'ri-download-line text-green-600' :
                              swap.type === 'Shared' ? 'ri-upload-line text-blue-600' : 
                              'ri-time-line text-yellow-600'
                            }`}></i>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{swap.type}: {swap.book}</h3>
                            <p className="text-sm text-gray-600">
                              With {swap.partner} • {swap.method} • {swap.date}
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          swap.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {swap.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                        <input 
                          type="text" 
                          value={userStats.name}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input 
                          type="email" 
                          value={userStats.email}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                        <input 
                          type="text" 
                          value={userStats.location}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input 
                          type="tel" 
                          placeholder="+1 (555) 123-4567"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Email Notifications</h4>
                          <p className="text-sm text-gray-600">Receive updates about swap requests and messages</p>
                        </div>
                        <button className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                          <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                          <p className="text-sm text-gray-600">Get text messages for urgent updates</p>
                        </div>
                        <button className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                          <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 transition-transform"></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Public Profile</h4>
                          <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                        </div>
                        <button className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                          <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 transition-transform"></div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap cursor-pointer">
                      Save Changes
                    </button>
                    <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold whitespace-nowrap cursor-pointer">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <ChatBot />
    </div>
  );
}
