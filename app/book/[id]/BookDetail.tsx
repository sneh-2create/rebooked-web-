'use client';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ChatBot from '../../../components/ChatBot';
import ExchangeRequestModal from './ExchangeRequestModal';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import BookCoverImage from '../../../components/BookCoverImage';
import { readUploadedBooks, type RebookedBook } from '../../../lib/rebookedStore';

interface BookDetailProps {
  bookId: string;
}

export default function BookDetail({ bookId }: BookDetailProps) {
  const [showExchangeModal, setShowExchangeModal] = useState(false);

  const [uploadedBooks, setUploadedBooks] = useState<RebookedBook[]>([]);

  useEffect(() => {
    setUploadedBooks(readUploadedBooks());
  }, []);

  const demoBooks: RebookedBook[] = [
    {
      id: 1,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      owner: 'Sarah Johnson',
      location: 'New York, NY',
      condition: 'Like New',
      type: 'Physical & Digital',
      genre: 'Fiction',
      description:
        'A magical novel about infinite possibilities and second chances. Between life and death there is a library...',
      uploadDate: '2 days ago',
      rating: 4.8,
      swapCount: 12,
      pages: 288,
      language: 'English',
      isbn: '9781786892737',
      publisher: 'Canongate Books',
      yearPublished: 2020,
      ownerRating: 4.8,
      ownerSwaps: 12,
      joinedDate: 'March 2023',
    },
    {
      id: 2,
      title: 'The Summer I Turned Pretty',
      author: 'Jenny Han',
      owner: 'Emma Wilson',
      location: 'Los Angeles, CA',
      condition: 'Excellent',
      type: 'Physical Only',
      genre: 'Romance',
      description:
        'A captivating coming-of-age summer romance about first love and growing up.',
      uploadDate: '1 day ago',
      rating: 4.7,
      swapCount: 18,
      pages: 320,
      language: 'English',
      isbn: 'N/A',
      publisher: 'Unknown',
      yearPublished: 0,
      ownerRating: 4.7,
      ownerSwaps: 18,
      joinedDate: 'March 2023',
    },
    {
      id: 3,
      title: 'We Were Liars',
      author: 'E. Lockhart',
      owner: 'Madison Clark',
      location: 'Miami, FL',
      condition: 'Good',
      type: 'Digital Only',
      genre: 'Young Adult',
      description: 'A thrilling mystery about a wealthy family with dark secrets.',
      uploadDate: '3 days ago',
      rating: 4.6,
      swapCount: 14,
      pages: 300,
      language: 'English',
      isbn: 'N/A',
      publisher: 'Unknown',
      yearPublished: 0,
      ownerRating: 4.6,
      ownerSwaps: 14,
      joinedDate: 'March 2023',
    },
    {
      id: 4,
      title: 'The Vampire Diaries',
      author: 'L.J. Smith',
      owner: 'Ashley Rodriguez',
      location: 'Austin, TX',
      condition: 'Like New',
      type: 'Physical & Digital',
      genre: 'Paranormal',
      description:
        'Epic supernatural romance series about vampires, love, and destiny.',
      uploadDate: '2 days ago',
      rating: 4.5,
      swapCount: 22,
      pages: 360,
      language: 'English',
      isbn: 'N/A',
      publisher: 'Unknown',
      yearPublished: 0,
      ownerRating: 4.5,
      ownerSwaps: 22,
      joinedDate: 'March 2023',
    },
    {
      id: 5,
      title: 'The Originals',
      author: 'Julie Plec',
      owner: 'Jessica Martinez',
      location: 'Chicago, IL',
      condition: 'Excellent',
      type: 'Physical Only',
      genre: 'Supernatural',
      description:
        'The story of the original vampire family and their eternal struggle.',
      uploadDate: '4 days ago',
      rating: 4.4,
      swapCount: 16,
      pages: 330,
      language: 'English',
      isbn: 'N/A',
      publisher: 'Unknown',
      yearPublished: 0,
      ownerRating: 4.4,
      ownerSwaps: 16,
      joinedDate: 'March 2023',
    },
    {
      id: 6,
      title: 'Supernatural Chronicles',
      author: 'Eric Kripke',
      owner: 'Tyler Anderson',
      location: 'Denver, CO',
      condition: 'Good',
      type: 'Digital Only',
      genre: 'Fantasy',
      description: 'Two brothers hunting supernatural creatures across America.',
      uploadDate: '5 days ago',
      rating: 4.8,
      swapCount: 25,
      pages: 350,
      language: 'English',
      isbn: 'N/A',
      publisher: 'Unknown',
      yearPublished: 0,
      ownerRating: 4.8,
      ownerSwaps: 25,
      joinedDate: 'March 2023',
    },
    {
      id: 7,
      title: 'Reign',
      author: 'Stephanie Meyer',
      owner: 'Olivia Davis',
      location: 'Portland, OR',
      condition: 'Like New',
      type: 'Physical & Digital',
      genre: 'Historical Fiction',
      description: 'Political intrigue and romance in the royal court of Scotland.',
      uploadDate: '1 week ago',
      rating: 4.3,
      swapCount: 11,
      pages: 310,
      language: 'English',
      isbn: 'N/A',
      publisher: 'Unknown',
      yearPublished: 0,
      ownerRating: 4.3,
      ownerSwaps: 11,
      joinedDate: 'March 2023',
    },
    {
      id: 8,
      title: 'My Lady Jane',
      author: 'Cynthia Hand',
      owner: 'Sophie Thompson',
      location: 'Boston, MA',
      condition: 'Excellent',
      type: 'Physical Only',
      genre: 'Historical Romance',
      description:
        "A witty reimagining of Lady Jane Grey's story with magic and humor.",
      uploadDate: '3 days ago',
      rating: 4.9,
      swapCount: 20,
      pages: 340,
      language: 'English',
      isbn: 'N/A',
      publisher: 'Unknown',
      yearPublished: 0,
      ownerRating: 4.9,
      ownerSwaps: 20,
      joinedDate: 'March 2023',
    },
    {
      id: 9,
      title: 'Anna and the French Kiss',
      author: 'Stephanie Perkins',
      owner: 'Grace Kim',
      location: 'San Francisco, CA',
      condition: 'Like New',
      type: 'Physical & Digital',
      genre: 'Romance',
      description: 'A charming story about finding love in the most unexpected places.',
      uploadDate: '2 days ago',
      rating: 4.6,
      swapCount: 13,
      pages: 300,
      language: 'English',
      isbn: 'N/A',
      publisher: 'Unknown',
      yearPublished: 0,
      ownerRating: 4.6,
      ownerSwaps: 13,
      joinedDate: 'March 2023',
    },
    {
      id: 10,
      title: "To All the Boys I've Loved Before",
      author: 'Jenny Han',
      owner: 'Isabella Cruz',
      location: 'Miami, FL',
      condition: 'Good',
      type: 'Digital Only',
      genre: 'Young Adult',
      description: 'What happens when love letters you never meant to send get delivered.',
      uploadDate: '1 week ago',
      rating: 4.7,
      swapCount: 19,
      pages: 310,
      language: 'English',
      isbn: 'N/A',
      publisher: 'Unknown',
      yearPublished: 0,
      ownerRating: 4.7,
      ownerSwaps: 19,
      joinedDate: 'March 2023',
    },
    {
      id: 11,
      title: 'The Selection',
      author: 'Kiera Cass',
      owner: 'Hannah White',
      location: 'Dallas, TX',
      condition: 'Excellent',
      type: 'Physical Only',
      genre: 'Dystopian',
      description:
        "A competition to win the prince's heart in a divided society.",
      uploadDate: '4 days ago',
      rating: 4.4,
      swapCount: 15,
      pages: 330,
      language: 'English',
      isbn: 'N/A',
      publisher: 'Unknown',
      yearPublished: 0,
      ownerRating: 4.4,
      ownerSwaps: 15,
      joinedDate: 'March 2023',
    },
    {
      id: 12,
      title: 'Red Queen',
      author: 'Victoria Aveyard',
      owner: 'Zoe Parker',
      location: 'Seattle, WA',
      condition: 'Like New',
      type: 'Physical & Digital',
      genre: 'Fantasy',
      description: 'In a world divided by blood, one girl discovers she has a deadly power.',
      uploadDate: '5 days ago',
      rating: 4.5,
      swapCount: 17,
      pages: 350,
      language: 'English',
      isbn: 'N/A',
      publisher: 'Unknown',
      yearPublished: 0,
      ownerRating: 4.5,
      ownerSwaps: 17,
      joinedDate: 'March 2023',
    },
  ];

  const book = (() => {
    const byId: Record<string, RebookedBook> = {};
    for (const b of demoBooks) byId[String(b.id)] = b;
    for (const b of uploadedBooks) byId[String(b.id)] = b;
    return byId[bookId] ?? byId['1'];
  })();

  const relatedBooks = [
    {
      id: 2,
      title: 'The Summer I Turned Pretty',
      author: 'Jenny Han',
      owner: 'Emma Wilson',
    },
    {
      id: 3,
      title: 'We Were Liars',
      author: 'E. Lockhart',
      owner: 'Madison Clark',
    },
    {
      id: 4,
      title: 'The Vampire Diaries',
      author: 'L.J. Smith',
      owner: 'Ashley Rodriguez',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-80 h-96 bg-gradient-to-br from-blue-400 to-purple-500 relative">
                  <BookCoverImage
                    title={book.title}
                    author={book.author}
                    genre={book.genre}
                    isbn={book.isbn}
                    width={400}
                    height={600}
                    seq={book.coverSeq ?? `bookdetail${book.id}`}
                    alt={book.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      book.type === 'Physical & Digital' ? 'bg-purple-100 text-purple-800' :
                      book.type === 'Physical Only' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {book.type}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                      <p className="text-xl text-gray-600 mb-2">by {book.author}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <i className="ri-star-fill text-yellow-400 mr-1"></i>
                          <span>{book.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <i className="ri-exchange-line mr-1"></i>
                          <span>{book.swapCount} swaps</span>
                        </div>
                        <span className="bg-gray-100 px-2 py-1 rounded">{book.genre}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                      <span className="text-gray-500">Condition:</span>
                      <span className="ml-2 font-medium">{book.condition}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Pages:</span>
                      <span className="ml-2 font-medium">{book.pages}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Language:</span>
                      <span className="ml-2 font-medium">{book.language}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Year:</span>
                      <span className="ml-2 font-medium">{book.yearPublished}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed mb-6">{book.description}</p>
                  
                  <button 
                    onClick={() => setShowExchangeModal(true)}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Request Exchange
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Publication Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Publisher:</span>
                      <span>{book.publisher}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">ISBN:</span>
                      <span>{book.isbn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Year Published:</span>
                      <span>{book.yearPublished}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Exchange Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Available Types:</span>
                      <span>{book.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Upload Date:</span>
                      <span>{book.uploadDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Swaps:</span>
                      <span>{book.swapCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Book Owner</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <i className="ri-user-3-fill text-white text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{book.owner}</h4>
                  <p className="text-sm text-gray-500">Member since {book.joinedDate}</p>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Rating:</span>
                  <div className="flex items-center">
                    <i className="ri-star-fill text-yellow-400 mr-1"></i>
                    <span>{book.ownerRating} (24 reviews)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Total Swaps:</span>
                  <span>{book.ownerSwaps}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Location:</span>
                  <span>{book.location}</span>
                </div>
              </div>
              <Link
                href="/profile"
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                View Profile
              </Link>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Related Books</h3>
              <div className="space-y-4">
                {relatedBooks.map((relatedBook) => (
                  <Link 
                    key={relatedBook.id}
                    href={`/book/${relatedBook.id}`}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="w-12 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{relatedBook.title}</h4>
                      <p className="text-xs text-gray-500">{relatedBook.author}</p>
                      <p className="text-xs text-gray-400">by {relatedBook.owner}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showExchangeModal && (
        <ExchangeRequestModal 
          book={book}
          onClose={() => setShowExchangeModal(false)}
        />
      )}

      <Footer />
      <ChatBot />
    </div>
  );
}