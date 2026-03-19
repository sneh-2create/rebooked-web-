'use client';

import Link from 'next/link';
import BookCoverImage from '../../components/BookCoverImage';
import { motion } from 'framer-motion';

interface Book {
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
}

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl group"
      initial={{ opacity: 1, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
        <BookCoverImage
          title={book.title}
          author={book.author}
          genre={book.genre}
          isbn={undefined}
          width={300}
          height={400}
          seq={book.coverSeq ?? `bookcover${book.id}`}
          alt={book.title}
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            book.type === 'Physical & Digital' ? 'bg-purple-100 text-purple-800' :
            book.type === 'Physical Only' ? 'bg-blue-100 text-blue-800' :
            'bg-green-100 text-green-800'
          }`}>
            {book.type}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center bg-white/90 px-2 py-1 rounded-full">
          <i className="ri-star-fill text-yellow-400 text-xs mr-1"></i>
          <span className="text-xs font-semibold">{book.rating}</span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-bold text-lg mb-1 line-clamp-1">{book.title}</h3>
          <p className="text-gray-600 text-sm">by {book.author}</p>
        </div>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{book.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <i className="ri-user-3-line w-4 h-4 mr-2 flex items-center justify-center"></i>
            <span>{book.owner}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <i className="ri-map-pin-line w-4 h-4 mr-2 flex items-center justify-center"></i>
            <span>{book.location}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <i className="ri-checkbox-circle-line w-4 h-4 mr-2 flex items-center justify-center"></i>
              <span>{book.condition}</span>
            </div>
            <div className="flex items-center">
              <i className="ri-exchange-line w-4 h-4 mr-1 flex items-center justify-center"></i>
              <span>{book.swapCount} swaps</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <i className="ri-time-line w-4 h-4 mr-2 flex items-center justify-center"></i>
            <span>Uploaded {book.uploadDate}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
            {book.genre}
          </span>
          <Link 
            href={`/book/${book.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm font-semibold whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}