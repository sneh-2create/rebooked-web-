
'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import Link from 'next/link';
import BookCoverImage from '../components/BookCoverImage';
import { bookDecorBackground } from '../lib/decorBg';
import { motion } from 'framer-motion';

export default function Home() {
  const featuredBooks = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      owner: "Sarah Johnson",
      location: "New York, NY",
      condition: "Like New",
      type: "Physical & Digital",
      genre: "Fiction"
    },
    {
      id: 2,
      title: "The Summer I Turned Pretty",
      author: "Jenny Han",
      owner: "Emma Wilson",
      location: "Los Angeles, CA", 
      condition: "Excellent",
      type: "Physical Only",
      genre: "Romance"
    },
    {
      id: 3,
      title: "We Were Liars",
      author: "E. Lockhart",
      owner: "Madison Clark",
      location: "Miami, FL",
      condition: "Good",
      type: "Digital Only",
      genre: "Young Adult"
    },
    {
      id: 4,
      title: "The Vampire Diaries",
      author: "L.J. Smith",
      owner: "Ashley Rodriguez",
      location: "Austin, TX",
      condition: "Like New",
      type: "Physical & Digital", 
      genre: "Paranormal"
    },
    {
      id: 5,
      title: "The Originals",
      author: "Julie Plec",
      owner: "Jessica Martinez",
      location: "Chicago, IL",
      condition: "Excellent",
      type: "Physical Only",
      genre: "Supernatural"
    },
    {
      id: 6,
      title: "Supernatural",
      author: "Eric Kripke",
      owner: "Tyler Anderson",
      location: "Denver, CO",
      condition: "Good",
      type: "Digital Only",
      genre: "Fantasy"
    },
    {
      id: 7,
      title: "Reign",
      author: "Stephanie Meyer",
      owner: "Olivia Davis",
      location: "Portland, OR",
      condition: "Like New",
      type: "Physical & Digital",
      genre: "Historical Fiction"
    },
    {
      id: 8,
      title: "My Lady Jane",
      author: "Cynthia Hand",
      owner: "Sophie Thompson",
      location: "Boston, MA",
      condition: "Excellent",
      type: "Physical Only",
      genre: "Historical Romance"
    }
  ];

  const stats = [
    { number: "125K+", label: "Books Available", icon: "ri-book-2-line" },
    { number: "45K+", label: "Active Readers", icon: "ri-user-3-line" },
    { number: "89K+", label: "Successful Swaps", icon: "ri-exchange-line" },
    { number: "150+", label: "Countries", icon: "ri-global-line" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          ...bookDecorBackground('hero'),
        }}
      >
        <div className="container mx-auto px-4 text-center text-white w-full">
          <motion.h1
            initial={{ opacity: 1, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Share Stories,<br />
            <span className="text-blue-400">Swap Adventures</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 1, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90"
          >
            Connect with fellow book lovers worldwide. Exchange physical books locally or share digital copies globally. Your next favorite read is just a swap away.
          </motion.p>
          <motion.div
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/explore" className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer">
              Explore Books
            </Link>
            <Link href="/upload" className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 whitespace-nowrap cursor-pointer">
              Upload Your Books
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 1, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${stat.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How BookSwap Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Simple steps to start your book swapping journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              className="text-center"
              initial={{ opacity: 1, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.02 }}
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-upload-cloud-2-line text-3xl text-blue-600"></i>
              </div>
              <h3 className="text-2xl font-semibold mb-4">1. Upload Your Books</h3>
              <p className="text-gray-600 leading-relaxed">Add books you've finished reading. Include photos, condition details, and specify if you offer physical exchange, digital sharing, or both options.</p>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 1, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-search-2-line text-3xl text-green-600"></i>
              </div>
              <h3 className="text-2xl font-semibold mb-4">2. Discover & Request</h3>
              <p className="text-gray-600 leading-relaxed">Browse thousands of available books. Use filters for genre, location, and exchange type. Send swap requests to book owners with your exchange preferences.</p>
            </motion.div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 1, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.22 }}
            >
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-exchange-line text-3xl text-purple-600"></i>
              </div>
              <h3 className="text-2xl font-semibold mb-4">3. Exchange & Enjoy</h3>
              <p className="text-gray-600 leading-relaxed">Coordinate with other readers for physical meetups locally or digital file sharing globally. Rate your experience and discover your next great read.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Books Available Now</h2>
            <p className="text-xl text-gray-600">Discover amazing books ready for exchange</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book) => (
              <motion.div
                key={book.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl"
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                  <BookCoverImage
                    title={book.title}
                    author={book.author}
                    genre={book.genre}
                    width={300}
                    height={400}
                    seq={`book${book.id}`}
                    alt={book.title}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      book.type === 'Physical & Digital' ? 'bg-purple-100 text-purple-800' :
                      book.type === 'Physical Only' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {book.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{book.title}</h3>
                  <p className="text-gray-600 mb-3">by {book.author}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <i className="ri-user-3-line w-4 h-4 mr-2"></i>
                      <span>{book.owner}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <i className="ri-map-pin-line w-4 h-4 mr-2"></i>
                      <span>{book.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <i className="ri-star-line w-4 h-4 mr-2"></i>
                      <span>{book.condition}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">{book.genre}</span>
                    <Link
                      href={`/book/${book.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm font-semibold whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Request Swap
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/explore" className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
              View All Books
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 bg-cover bg-center relative"
        style={{
          ...bookDecorBackground('cta'),
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <motion.h2
            initial={{ opacity: 1, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Join Our Reading Community Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 1, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
          >
            Start sharing your favorite books and discovering new stories. Connect with readers worldwide and build your personal library through amazing exchanges.
          </motion.p>
          <motion.div
            initial={{ opacity: 1, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/login" className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
              Sign Up Free
            </Link>
            <Link href="/how-it-works" className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer">
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
}
