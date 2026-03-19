'use client';

interface SearchFiltersProps {
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

export default function SearchFilters({
  selectedGenre,
  setSelectedGenre,
  selectedType,
  setSelectedType,
  selectedLocation,
  setSelectedLocation
}: SearchFiltersProps) {
  const genres = ['all', 'Fiction', 'Non-Fiction', 'Romance', 'Thriller', 'Sci-Fi', 'Biography', 'Self-Help', 'Mystery', 'Fantasy'];
  const types = ['all', 'Physical', 'Digital'];
  const locations = ['all', 'New York', 'California', 'Texas', 'Florida', 'Illinois', 'Washington', 'Massachusetts'];

  return (
    <div className="lg:w-80">
      <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Filter Books</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Genre</label>
            <div className="space-y-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm cursor-pointer ${
                    selectedGenre === genre
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {genre === 'all' ? 'All Genres' : genre}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Exchange Type</label>
            <div className="space-y-2">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm cursor-pointer ${
                    selectedType === type
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {type === 'all' ? 'All Types' : `${type} Exchange`}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Location</label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {locations.map((location) => (
                <button
                  key={location}
                  onClick={() => setSelectedLocation(location)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm cursor-pointer ${
                    selectedLocation === location
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {location === 'all' ? 'All Locations' : location}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => {
              setSelectedGenre('all');
              setSelectedType('all');
              setSelectedLocation('all');
            }}
            className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
}