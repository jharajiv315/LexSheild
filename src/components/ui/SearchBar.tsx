import { Search, MapPin } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  showLocationButton?: boolean;
}

export function SearchBar({ 
  placeholder = 'Search medicines, pharmacies...', 
  onSearch,
  showLocationButton = true 
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
            size={20} 
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label="Search"
            className="w-full pl-12 pr-4 py-3 bg-[#12161D] border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-colors"
          />
        </div>
        
        {showLocationButton && (
          <button
            type="button"
            aria-label="Use current location"
            className="p-3 bg-green-500 hover:bg-green-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-[#0B0F14]"
          >
            <MapPin size={20} />
          </button>
        )}
      </div>
    </form>
  );
}
