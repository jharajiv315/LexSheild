import { Star, MapPin, Clock, Check, Phone } from 'lucide-react';

interface PharmacyCardProps {
  name: string;
  distance: number;
  rating: number;
  isOpen: boolean;
  responseTime: string;
  availability: string;
  onContact?: () => void;
}

export function PharmacyCard({
  name,
  distance,
  rating,
  isOpen,
  responseTime,
  availability,
  onContact
}: PharmacyCardProps) {
  return (
    <div className="bg-[#12161D] border border-gray-800 rounded-xl p-4 hover:border-green-500/50 transition-all hover:shadow-lg">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{name}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {distance} km
            </span>
            <span className="flex items-center gap-1">
              <Star size={14} className="text-yellow-500" fill="currentColor" />
              {rating}
            </span>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          isOpen 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-red-500/20 text-red-400'
        }`}>
          {isOpen ? 'Open • खुला' : 'Closed • बंद'}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400 flex items-center gap-2">
            <Clock size={16} />
            Response Time
          </span>
          <span className="font-medium">{responseTime}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400 flex items-center gap-2">
            <Check size={16} />
            Availability
          </span>
          <span className={`font-medium ${
            availability === 'In Stock' ? 'text-green-400' : 'text-yellow-400'
          }`}>
            {availability}
          </span>
        </div>
      </div>

      <button
        onClick={onContact}
        className="w-full px-4 py-2.5 bg-green-500 hover:bg-green-600 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-[#12161D]"
      >
        <Phone size={18} />
        Contact Pharmacy
      </button>
    </div>
  );
}
