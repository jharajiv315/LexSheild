import { ArrowLeft, Search, MapPin, Star, Clock, Phone, Navigation } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

interface PharmacyLocatorProps {
  user: any;
  onBack: () => void;
}

export function PharmacyLocator({ user, onBack }: PharmacyLocatorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState<any>(null);

  const pharmacies = [
    {
      id: 1,
      name: 'Apollo Pharmacy',
      address: 'Shop 12, Andheri West, Mumbai',
      distance: 1.2,
      rating: 4.5,
      reviews: 245,
      isOpen: true,
      phone: '+91 22 1234 5678',
      services: ['24/7', 'Home Delivery', 'Prescription'],
      medicines: ['Insulin', 'Antibiotics', 'Pain Relief']
    },
    {
      id: 2,
      name: 'MedPlus',
      address: 'Plot 45, Bandra East, Mumbai',
      distance: 2.3,
      rating: 4.3,
      reviews: 189,
      isOpen: true,
      phone: '+91 22 9876 5432',
      services: ['Home Delivery', 'Prescription'],
      medicines: ['Diabetes Care', 'Heart Medicines']
    },
    {
      id: 3,
      name: 'Wellness Forever',
      address: 'Building A, Malad West, Mumbai',
      distance: 3.5,
      rating: 4.7,
      reviews: 312,
      isOpen: false,
      phone: '+91 22 5555 6666',
      services: ['24/7', 'Home Delivery'],
      medicines: ['General Medicines', 'Baby Care']
    },
    {
      id: 4,
      name: 'Netmeds Pharmacy',
      address: 'Shop 8, Borivali, Mumbai',
      distance: 4.2,
      rating: 4.4,
      reviews: 198,
      isOpen: true,
      phone: '+91 22 7777 8888',
      services: ['Home Delivery', 'Online Orders'],
      medicines: ['COVID Care', 'Vitamins']
    }
  ];

  const filteredPharmacies = pharmacies.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Find Nearby Pharmacy</h1>
            <p className="text-gray-400">निकटतम फार्मेसी खोजें</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pharmacy List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pharmacy or location..."
                className="w-full pl-12 pr-4 py-3 bg-[#12161D] border border-gray-800 rounded-xl focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Pharmacy Cards */}
            {filteredPharmacies.map((pharmacy, index) => (
              <motion.div
                key={pharmacy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedPharmacy(pharmacy)}
                className={`bg-[#12161D] border rounded-xl p-6 cursor-pointer transition-all hover:scale-[1.02] ${
                  selectedPharmacy?.id === pharmacy.id
                    ? 'border-green-500 shadow-lg shadow-green-500/20'
                    : 'border-gray-800 hover:border-green-500/50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{pharmacy.name}</h3>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <MapPin size={14} />
                      {pharmacy.address}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    pharmacy.isOpen
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {pharmacy.isOpen ? 'Open' : 'Closed'}
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Navigation size={14} className="text-blue-400" />
                    {pharmacy.distance} km
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400" fill="currentColor" />
                    {pharmacy.rating} ({pharmacy.reviews})
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {pharmacy.services.map((service) => (
                    <span
                      key={service}
                      className="px-2 py-1 bg-[#1A1F28] rounded text-xs"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <a
                    href={`tel:${pharmacy.phone}`}
                    className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium text-center flex items-center justify-center gap-2 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone size={18} />
                    Call Now
                  </a>
                  <button
                    className="flex-1 px-4 py-2 border border-gray-700 hover:bg-gray-800 rounded-lg font-medium transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('Opening directions in maps...');
                    }}
                  >
                    Directions
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Details Panel */}
          <div className="lg:sticky lg:top-24 h-fit">
            {selectedPharmacy ? (
              <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6 space-y-6">
                <div>
                  <h3 className="font-bold text-xl mb-2">{selectedPharmacy.name}</h3>
                  <p className="text-sm text-gray-400">{selectedPharmacy.address}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Available Medicines</h4>
                  <div className="space-y-2">
                    {selectedPharmacy.medicines.map((med: string) => (
                      <div key={med} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        {med}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Contact</h4>
                  <a
                    href={`tel:${selectedPharmacy.phone}`}
                    className="text-green-400 hover:text-green-300"
                  >
                    {selectedPharmacy.phone}
                  </a>
                </div>

                <button className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg font-semibold transition-all">
                  Save to Favorites
                </button>
              </div>
            ) : (
              <div className="bg-[#12161D] border border-gray-800 rounded-xl p-12 text-center">
                <MapPin className="text-gray-600 mx-auto mb-4" size={48} />
                <p className="text-gray-400">
                  Select a pharmacy to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
