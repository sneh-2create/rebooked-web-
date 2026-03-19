
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ChatBot from '../../components/ChatBot';
import BookCard from './BookCard';
import SearchFilters from './SearchFilters';
import { useEffect, useState } from 'react';
import { readUploadedBooks, type RebookedBook } from '../../lib/rebookedStore';
import { bookDecorBackground } from '../../lib/decorBg';
import { motion } from 'framer-motion';

type CardBook = {
  id: number;
  title: string;
  author: string;
  owner: string;
  location: string;
  condition: string;
  type: string;
  genre: string;
  description: string;
  uploadDate: string;
  rating: number;
  swapCount: number;
  coverSeq?: string;
};

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const [uploadedBooks, setUploadedBooks] = useState<RebookedBook[]>([]);

  useEffect(() => {
    setUploadedBooks(readUploadedBooks());
  }, []);

  const demoBooks: CardBook[] = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      owner: "Sarah Johnson",
      location: "New York, NY",
      condition: "Like New",
      type: "Physical & Digital",
      genre: "Fiction",
      description: "A magical novel about infinite possibilities and second chances",
      uploadDate: "2 days ago",
      rating: 4.8,
      swapCount: 12
    },
    {
      id: 2,
      title: "The Summer I Turned Pretty",
      author: "Jenny Han",
      owner: "Emma Wilson",
      location: "Los Angeles, CA",
      condition: "Excellent",
      type: "Physical Only",
      genre: "Romance",
      description: "A captivating coming-of-age summer romance about first love and growing up",
      uploadDate: "1 day ago",
      rating: 4.7,
      swapCount: 18
    },
    {
      id: 3,
      title: "We Were Liars",
      author: "E. Lockhart",
      owner: "Madison Clark",
      location: "Miami, FL",
      condition: "Good",
      type: "Digital Only",
      genre: "Young Adult",
      description: "A thrilling mystery about a wealthy family with dark secrets",
      uploadDate: "3 days ago",
      rating: 4.6,
      swapCount: 14
    },
    {
      id: 4,
      title: "The Vampire Diaries",
      author: "L.J. Smith",
      owner: "Ashley Rodriguez",
      location: "Austin, TX",
      condition: "Like New",
      type: "Physical & Digital",
      genre: "Paranormal",
      description: "Epic supernatural romance series about vampires, love, and destiny",
      uploadDate: "2 days ago",
      rating: 4.5,
      swapCount: 22
    },
    {
      id: 5,
      title: "The Originals",
      author: "Julie Plec",
      owner: "Jessica Martinez",
      location: "Chicago, IL",
      condition: "Excellent",
      type: "Physical Only",
      genre: "Supernatural",
      description: "The story of the original vampire family and their eternal struggle",
      uploadDate: "4 days ago",
      rating: 4.4,
      swapCount: 16
    },
    {
      id: 6,
      title: "Supernatural Chronicles",
      author: "Eric Kripke",
      owner: "Tyler Anderson",
      location: "Denver, CO",
      condition: "Good",
      type: "Digital Only",
      genre: "Fantasy",
      description: "Two brothers hunting supernatural creatures across America",
      uploadDate: "5 days ago",
      rating: 4.8,
      swapCount: 25
    },
    {
      id: 7,
      title: "Reign",
      author: "Stephanie Meyer",
      owner: "Olivia Davis",
      location: "Portland, OR",
      condition: "Like New",
      type: "Physical & Digital",
      genre: "Historical Fiction",
      description: "Political intrigue and romance in the royal court of Scotland",
      uploadDate: "1 week ago",
      rating: 4.3,
      swapCount: 11
    },
    {
      id: 8,
      title: "My Lady Jane",
      author: "Cynthia Hand",
      owner: "Sophie Thompson",
      location: "Boston, MA",
      condition: "Excellent",
      type: "Physical Only",
      genre: "Historical Romance",
      description: "A witty reimagining of Lady Jane Grey's story with magic and humor",
      uploadDate: "3 days ago",
      rating: 4.9,
      swapCount: 20
    },
    {
      id: 9,
      title: "Anna and the French Kiss",
      author: "Stephanie Perkins",
      owner: "Grace Kim",
      location: "San Francisco, CA",
      condition: "Like New",
      type: "Physical & Digital",
      genre: "Romance",
      description: "A charming story about finding love in the most unexpected places",
      uploadDate: "2 days ago",
      rating: 4.6,
      swapCount: 13
    },
    {
      id: 10,
      title: "To All the Boys I've Loved Before",
      author: "Jenny Han",
      owner: "Isabella Cruz",
      location: "Miami, FL",
      condition: "Good",
      type: "Digital Only",
      genre: "Young Adult",
      description: "What happens when love letters you never meant to send get delivered",
      uploadDate: "1 week ago",
      rating: 4.7,
      swapCount: 19
    },
    {
      id: 11,
      title: "The Selection",
      author: "Kiera Cass",
      owner: "Hannah White",
      location: "Dallas, TX",
      condition: "Excellent",
      type: "Physical Only",
      genre: "Dystopian",
      description: "A competition to win the prince's heart in a divided society",
      uploadDate: "4 days ago",
      rating: 4.4,
      swapCount: 15
    },
    {
      id: 12,
      title: "Red Queen",
      author: "Victoria Aveyard",
      owner: "Zoe Parker",
      location: "Seattle, WA",
      condition: "Like New",
      type: "Physical & Digital",
      genre: "Fantasy",
      description: "In a world divided by blood, one girl discovers she has a deadly power",
      uploadDate: "5 days ago",
      rating: 4.5,
      swapCount: 17
    }
  ];

  const allBooks: CardBook[] = [
    ...uploadedBooks.map((b) => ({
      id: b.id,
      title: b.title,
      author: b.author,
      owner: b.owner,
      location: b.location,
      condition: b.condition,
      type: b.type,
      genre: b.genre,
      description: b.description,
      uploadDate: b.uploadDate,
      rating: b.rating,
      swapCount: b.swapCount,
      coverSeq: b.coverSeq,
    })),
    ...demoBooks,
  ];

  const filteredBooks = allBooks.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    const matchesType = selectedType === 'all' || book.type.includes(selectedType);
    const matchesLocation = selectedLocation === 'all' || book.location.includes(selectedLocation);
    
    return matchesSearch && matchesGenre && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section 
        className="relative py-20 bg-cover bg-center"
        style={{
          ...bookDecorBackground('explore'),
        }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 1, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl font-bold mb-4"
          >
            Explore Amazing Books
          </motion.h1>
          <motion.p
            initial={{ opacity: 1, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Discover thousands of books available for exchange. Find your next favorite read from fellow book lovers worldwide.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="max-w-md mx-auto"
          >
            <div className="flex bg-white rounded-full overflow-hidden shadow-lg">
              <input
                type="text"
                placeholder="Search books or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-6 py-4 text-gray-900 focus:outline-none"
              />
              <button className="bg-blue-600 px-6 py-4 hover:bg-blue-700 transition-colors cursor-pointer">
                <i className="ri-search-line text-white text-xl"></i>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <SearchFilters 
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Books ({filteredBooks.length})
              </h2>
              <div className="flex items-center space-x-4">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 pr-8">
                  <option>Sort by Newest</option>
                  <option>Sort by Rating</option>
                  <option>Sort by Distance</option>
                  <option>Sort by Most Swapped</option>
                </select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
            
            {filteredBooks.length === 0 && (
              <div className="text-center py-12">
                <i className="ri-book-open-line text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
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
