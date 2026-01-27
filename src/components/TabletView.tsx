import { useState } from 'react';
import { EmergencyToggle } from './ui/EmergencyToggle';
import { SearchBar } from './ui/SearchBar';
import { PharmacyCard } from './ui/PharmacyCard';
import { CountdownTimer } from './ui/CountdownTimer';
import { WhatsAppResponseCard } from './ui/WhatsAppResponseCard';
import { AdminTable } from './ui/AdminTable';
import { Bell, Menu, Settings, MapPin } from 'lucide-react';

export function TabletView() {
  const [isEmergency, setIsEmergency] = useState(false);

  const mockPharmacies = [
    {
      name: 'Apollo Pharmacy',
      distance: 1.2,
      rating: 4.5,
      isOpen: true,
      responseTime: '2-5 min',
      availability: 'In Stock'
    },
    {
      name: 'MedPlus',
      distance: 2.1,
      rating: 4.3,
      isOpen: true,
      responseTime: '5-10 min',
      availability: 'In Stock'
    },
    {
      name: 'Wellness Forever',
      distance: 3.5,
      rating: 4.7,
      isOpen: false,
      responseTime: '10-15 min',
      availability: 'Out of Stock'
    },
    {
      name: 'Netmeds Pharmacy',
      distance: 4.2,
      rating: 4.4,
      isOpen: true,
      responseTime: '15-20 min',
      availability: 'In Stock'
    }
  ];

  const mockResponses = [
    {
      pharmacyName: 'Apollo Pharmacy',
      message: 'हां, दवा स्टॉक में है। 10 मिनट में डिलीवर कर सकते हैं।',
      timestamp: '1 min ago',
      status: 'confirmed' as const
    },
    {
      pharmacyName: 'MedPlus',
      message: 'Medicine available. Can deliver in 15 minutes.',
      timestamp: '2 min ago',
      status: 'confirmed' as const
    },
    {
      pharmacyName: 'Wellness Forever',
      message: 'Currently out of stock. Alternative available.',
      timestamp: '4 min ago',
      status: 'declined' as const
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F14] p-6">
      {/* Tablet Frame */}
      <div className="max-w-[768px] mx-auto bg-[#0B0F14] min-h-screen border border-gray-800 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-[#0B0F14]/95 backdrop-blur-sm border-b border-gray-800">
          <div className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Menu size={24} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center font-bold">
                  MC
                </div>
                <div>
                  <h1 className="font-bold text-lg">Med Connect</h1>
                  <p className="text-xs text-gray-400">Emergency Response System</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Settings size={24} />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative">
                <Bell size={24} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Content - Two Column Layout */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Emergency Toggle */}
              <div className="bg-[#12161D] border border-gray-800 rounded-xl p-4">
                <EmergencyToggle onChange={setIsEmergency} />
              </div>

              {/* Search */}
              <SearchBar placeholder="Search medicines, pharmacies..." />

              {/* Timer - Only show if emergency */}
              {isEmergency && (
                <CountdownTimer initialSeconds={300} />
              )}

              {/* Map Placeholder */}
              <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="text-gray-600 mx-auto mb-3" size={48} />
                  <p className="text-gray-400">Interactive Map View</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Real-time pharmacy locations
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#12161D] border border-gray-800 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-green-400">12</p>
                  <p className="text-xs text-gray-400 mt-1">Nearby</p>
                </div>
                <div className="bg-[#12161D] border border-gray-800 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-yellow-400">3</p>
                  <p className="text-xs text-gray-400 mt-1">Responding</p>
                </div>
                <div className="bg-[#12161D] border border-gray-800 rounded-xl p-4 text-center">
                  <p className="text-2xl font-bold text-red-400">5 min</p>
                  <p className="text-xs text-gray-400 mt-1">Avg Time</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Nearby Pharmacies */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg">Nearby Pharmacies</h2>
                  <span className="text-sm text-gray-400">{mockPharmacies.length} found</span>
                </div>
                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                  {mockPharmacies.map((pharmacy, index) => (
                    <PharmacyCard key={index} {...pharmacy} />
                  ))}
                </div>
              </div>

              {/* WhatsApp Responses */}
              {isEmergency && (
                <div>
                  <h2 className="font-semibold text-lg mb-4">Live Responses</h2>
                  <div className="space-y-3">
                    {mockResponses.map((response, index) => (
                      <WhatsAppResponseCard key={index} {...response} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="text-center text-gray-500 text-sm mt-8">
        <p>Tablet View (768px) • iPad & Android Tablet Optimized</p>
      </div>
    </div>
  );
}
