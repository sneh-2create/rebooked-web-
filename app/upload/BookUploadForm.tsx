
'use client';

import { useState } from 'react';
import { useAuth } from '../../components/AuthProvider';
import BookCoverImage from '../../components/BookCoverImage';
import {
  pickNextUploadedBookId,
  readUploadedBooks,
  writeUploadedBooks,
  type RebookedBook,
} from '../../lib/rebookedStore';

export default function BookUploadForm() {
  const [step, setStep] = useState(1);

  type BookData = {
    title: string;
    author: string;
    isbn: string;
    genre: string;
    condition: string;
    description: string;
    exchangeType: string[];
    location: string;
    digitalFormat: string;
    notes: string;
  };

  const [bookData, setBookData] = useState<BookData>({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    condition: '',
    description: '',
    exchangeType: [],
    location: '',
    digitalFormat: '',
    notes: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const genres = [
    'Fiction', 'Non-Fiction', 'Romance', 'Thriller', 'Mystery', 'Sci-Fi', 'Fantasy',
    'Biography', 'History', 'Self-Help', 'Business', 'Health', 'Travel', 'Cooking',
    'Art', 'Poetry', 'Drama', 'Comedy', 'Adventure', 'Horror'
  ];

  const conditions = [
    { value: 'like-new', label: 'Like New', desc: 'Barely used, no visible wear' },
    { value: 'excellent', label: 'Excellent', desc: 'Minor shelf wear, great condition' },
    { value: 'good', label: 'Good', desc: 'Some wear but still in good shape' },
    { value: 'fair', label: 'Fair', desc: 'Noticeable wear but readable' }
  ];

  const handleInputChange = (field: keyof BookData, value: any) => {
    setBookData((prev) => ({ ...prev, [field]: value } as BookData));
  };

  const handleExchangeTypeChange = (type: string) => {
    setBookData(prev => ({
      ...prev,
      exchangeType: prev.exchangeType.includes(type)
        ? prev.exchangeType.filter(t => t !== type)
        : [...prev.exchangeType, type]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages(prev => [...prev, ...newImages].slice(0, 5));
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setPdfFile(file);
      } else {
        alert('Please select a PDF file');
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const removePdf = () => {
    setPdfFile(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const existing = readUploadedBooks();
        const reservedIds = Array.from({ length: 12 }, (_, i) => i + 1);
        const usedIds = [...existing.map((b) => b.id), ...reservedIds];
        const nextId = pickNextUploadedBookId(usedIds);

        if (nextId === null) {
          alert('Upload limit reached for this session. Please refresh and try again.');
          return;
        }

        const conditionLabel =
          conditions.find((c) => c.value === bookData.condition)?.label ?? 'Good';

        const hasPhysical = bookData.exchangeType.includes('physical');
        const hasDigital = bookData.exchangeType.includes('digital');
        const type =
          hasPhysical && hasDigital
            ? 'Physical & Digital'
            : hasPhysical
              ? 'Physical Only'
              : 'Digital Only';

        const location = hasPhysical ? bookData.location || 'Near you' : 'Online';
        const owner = user?.name ?? 'You';

        const newBook: RebookedBook = {
          id: nextId,
          title: bookData.title,
          author: bookData.author,
          owner,
          location,
          condition: conditionLabel,
          type,
          genre: bookData.genre,
          description: bookData.description,
          uploadDate: 'Just now',
          rating: 4.8,
          swapCount: 0,

          pages: 0,
          language: 'English',
          isbn: bookData.isbn || 'N/A',
          publisher: 'Unknown',
          yearPublished: 0,
          ownerRating: 4.9,
          ownerSwaps: 0,
          joinedDate: 'Just now',

          coverSeq: `userbook${nextId}`,
        };

        writeUploadedBooks([...existing, newBook]);
        setStep(4);

        setTimeout(() => {
          window.location.href = '/explore';
        }, 3000);
      } finally {
        setIsSubmitting(false);
      }
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= num ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {num}
              </div>
              {num < 3 && (
                <div className={`w-20 h-1 mx-2 ${step > num ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 space-x-16">
          <span className={`text-sm ${step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
            Book Info
          </span>
          <span className={`text-sm ${step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
            Photos & Files
          </span>
          <span className={`text-sm ${step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
            Exchange Options
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Step 1: Basic Book Information */}
        {step === 1 && (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Book Information</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-purple-50 border border-purple-100 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center">
                <BookCoverImage
                  title={bookData.title || 'Untitled'}
                  author={bookData.author || undefined}
                  genre={bookData.genre || undefined}
                  isbn={undefined}
                  width={220}
                  height={320}
                  seq="uploadpreview"
                  alt="Book cover preview"
                  className="w-32 h-44 object-cover rounded-xl shadow-md"
                />
                <div className="flex-1">
                  <div className="text-sm text-gray-600">Cover preview updates with your title</div>
                  <div className="text-lg font-semibold text-gray-900 mt-1 line-clamp-1">
                    {bookData.title || 'Your book title'}
                  </div>
                  <div className="text-gray-600 mt-1 line-clamp-1">
                    {bookData.author ? `by ${bookData.author}` : 'Author'}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    Genre: {bookData.genre || 'Not selected'}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Book Title *
                </label>
                <input
                  type="text"
                  value={bookData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter the book title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Author *
                </label>
                <input
                  type="text"
                  value={bookData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  placeholder="Enter the author name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ISBN (Optional)
                </label>
                <input
                  type="text"
                  value={bookData.isbn}
                  onChange={(e) => handleInputChange('isbn', e.target.value)}
                  placeholder="Enter ISBN if available"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Genre *
                </label>
                <select
                  value={bookData.genre}
                  onChange={(e) => handleInputChange('genre', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 pr-8"
                >
                  <option value="">Select a genre</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Book Description
              </label>
              <textarea
                value={bookData.description}
                onChange={(e) => handleInputChange('description', e.target.value.slice(0, 500))}
                placeholder="Describe the book, what you liked about it, or why others might enjoy it..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 resize-none h-24"
                maxLength={500}
              />
              <p className="text-sm text-gray-500 mt-1">{bookData.description.length}/500 characters</p>
            </div>
            
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setStep(2)}
                disabled={!bookData.title || !bookData.author || !bookData.genre}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Photos and Files */}
        {step === 2 && (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Photos & Digital Files</h2>
            
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Book Photos (Up to 5 photos)
              </label>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Book photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 cursor-pointer"
                    >
                      <i className="ri-close-line text-sm"></i>
                    </button>
                  </div>
                ))}
                
                {images.length < 5 && (
                  <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition-colors">
                    <i className="ri-camera-line text-2xl text-gray-400 mb-2"></i>
                    <span className="text-sm text-gray-500">Add Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              
              <p className="text-sm text-gray-500">
                Upload clear photos showing the book cover, spine, and any notable wear or damage.
              </p>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Digital Book File (PDF) - Optional
              </label>
              
              {!pdfFile ? (
                <label className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition-colors">
                  <i className="ri-file-pdf-line text-4xl text-gray-400 mb-3"></i>
                  <span className="text-lg font-medium text-gray-700 mb-1">Upload PDF File</span>
                  <span className="text-sm text-gray-500">Select a PDF file to share digitally</span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePdfUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between bg-gray-50">
                  <div className="flex items-center">
                    <i className="ri-file-pdf-fill text-2xl text-red-500 mr-3"></i>
                    <div>
                      <p className="font-medium text-gray-900">{pdfFile.name}</p>
                      <p className="text-sm text-gray-500">{(pdfFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    onClick={removePdf}
                    className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 cursor-pointer"
                  >
                    <i className="ri-close-line text-sm"></i>
                  </button>
                </div>
              )}
              
              <p className="text-sm text-gray-500 mt-2">
                Upload a PDF version if you want to share this book digitally with other readers.
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Book Condition *
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {conditions.map((condition) => (
                  <button
                    key={condition.value}
                    onClick={() => handleInputChange('condition', condition.value)}
                    className={`p-4 text-left border-2 rounded-lg transition-colors cursor-pointer ${
                      bookData.condition === condition.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900">{condition.label}</h3>
                    <p className="text-sm text-gray-600">{condition.desc}</p>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!bookData.condition}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Exchange Options */}
        {step === 3 && (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Exchange Options</h2>
            
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                How would you like to share this book? *
              </label>
              <div className="space-y-4">
                <button
                  onClick={() => handleExchangeTypeChange('physical')}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-colors cursor-pointer ${
                    bookData.exchangeType.includes('physical')
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                      bookData.exchangeType.includes('physical')
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}>
                      {bookData.exchangeType.includes('physical') && (
                        <i className="ri-check-line text-white text-sm"></i>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Physical Exchange</h3>
                      <p className="text-sm text-gray-600">Meet locally or use delivery service</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleExchangeTypeChange('digital')}
                  className={`w-full p-4 text-left border-2 rounded-lg transition-colors cursor-pointer ${
                    bookData.exchangeType.includes('digital')
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  disabled={!pdfFile}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                      bookData.exchangeType.includes('digital')
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}>
                      {bookData.exchangeType.includes('digital') && (
                        <i className="ri-check-line text-white text-sm"></i>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Digital Sharing</h3>
                      <p className="text-sm text-gray-600">
                        {pdfFile ? 'Share PDF with readers worldwide' : 'Upload PDF file to enable this option'}
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
            
            {bookData.exchangeType.includes('physical') && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Location *
                </label>
                <input
                  type="text"
                  value={bookData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, State or Country"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
            )}
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={bookData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value.slice(0, 300))}
                placeholder="Any special conditions, preferences, or additional information..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 resize-none h-20"
                maxLength={300}
              />
              <p className="text-sm text-gray-500 mt-1">{bookData.notes.length}/300 characters</p>
            </div>
            
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(2)}
                className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={bookData.exchangeType.length === 0 || (bookData.exchangeType.includes('physical') && !bookData.location) || isSubmitting}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Uploading...
                  </>
                ) : (
                  'Publish Book'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-check-line text-4xl text-green-600"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Book Successfully Added!</h2>
            <p className="text-gray-600 mb-6">
              Your book "{bookData.title}" is now available for exchange. Other readers can discover and request it from your library.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to explore books...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
