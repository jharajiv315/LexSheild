import { useState } from 'react';
import { EmergencyToggle } from './ui/EmergencyToggle';
import { SearchBar } from './ui/SearchBar';
import { PharmacyCard } from './ui/PharmacyCard';
import { CountdownTimer } from './ui/CountdownTimer';
import { WhatsAppResponseCard } from './ui/WhatsAppResponseCard';
import { EscalationModal } from './ui/EscalationModal';
import { Bell, Menu, Settings, User } from 'lucide-react';

export function MobileView() {
  const [showEscalation, setShowEscalation] = useState(false);
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
      availability: 'Checking...'
    },
    {
      name: 'Wellness Forever',
      distance: 3.5,
      rating: 4.7,
      isOpen: false,
      responseTime: '10-15 min',
      availability: 'Out of Stock'
    }
  ];

  const mockResponses = [
    {
      pharmacyName: 'Apollo Pharmacy',
      message: 'हां, दवा स्टॉक में है। 10 मिनट में डिलीवर कर सकते हैं। Yes, medicine in stock. Can deliver in 10 minutes.',
      timestamp: '1 min ago',
      status: 'confirmed' as const
    },
    {
      pharmacyName: 'MedPlus',
      message: 'Checking availability. Will confirm in 2 minutes.',
      timestamp: '3 min ago',
      status: 'read' as const
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F14] pb-20">
      {/* Mobile Frame */}
      <div className="max-w-[375px] mx-auto bg-[#0B0F14] min-h-screen border-x border-gray-800">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-[#0B0F14]/95 backdrop-blur-sm border-b border-gray-800">
          <div className="flex items-center justify-between p-4">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Menu size={24} />
            </button>
            <h1 className="font-bold text-lg">Med Connect</h1>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative">
              <Bell size={24} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Emergency Toggle */}
          <div className="bg-[#12161D] border border-gray-800 rounded-xl p-4">
            <EmergencyToggle onChange={setIsEmergency} />
          </div>

          {/* Search */}
          <SearchBar placeholder="दवा खोजें / Search medicine..." />

          {/* Emergency Timer - Only show if emergency mode */}
          {isEmergency && (
            <CountdownTimer 
              initialSeconds={300} 
              onComplete={() => setShowEscalation(true)}
            />
          )}

          {/* Quick Actions */}
          <div>
            <h2 className="font-semibold mb-3">Quick Actions • त्वरित कार्य</h2>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-[#12161D] border border-gray-800 rounded-xl hover:border-green-500/50 transition-colors">
                <div className="text-2xl mb-2">💊</div>
                <p className="text-sm font-medium">Find Medicine</p>
              </button>
              <button className="p-4 bg-[#12161D] border border-gray-800 rounded-xl hover:border-green-500/50 transition-colors">
                <div className="text-2xl mb-2">🏥</div>
                <p className="text-sm font-medium">Nearby Pharmacy</p>
              </button>
              <button className="p-4 bg-[#12161D] border border-gray-800 rounded-xl hover:border-green-500/50 transition-colors">
                <div className="text-2xl mb-2">📱</div>
                <p className="text-sm font-medium">Call Emergency</p>
              </button>
              <button className="p-4 bg-[#12161D] border border-gray-800 rounded-xl hover:border-green-500/50 transition-colors">
                <div className="text-2xl mb-2">📍</div>
                <p className="text-sm font-medium">Track Order</p>
              </button>
            </div>
          </div>

          {/* Nearby Pharmacies */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Nearby Pharmacies</h2>
              <span className="text-sm text-gray-400">{mockPharmacies.length} found</span>
            </div>
            <div className="space-y-3">
              {mockPharmacies.map((pharmacy, index) => (
                <PharmacyCard key={index} {...pharmacy} />
              ))}
            </div>
          </div>

          {/* WhatsApp Responses */}
          {isEmergency && (
            <div>
              <h2 className="font-semibold mb-3">Live Responses • प्रत्युत्तर</h2>
              <div className="space-y-3">
                {mockResponses.map((response, index) => (
                  <WhatsAppResponseCard key={index} {...response} />
                ))}
              </div>
            </div>
          )}

          {/* Offline Mode Indicator */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <p className="text-sm text-yellow-400">
              <span className="font-semibold">🔌 Offline Mode Available</span>
              <br />
              App works without internet. Data syncs when online.
            </p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#12161D] border-t border-gray-800">
          <div className="max-w-[375px] mx-auto flex items-center justify-around py-3">
            <button className="flex flex-col items-center gap-1 text-green-500">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-xl">🏠</span>
              </div>
              <span className="text-xs">Home</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white">
              <div className="w-8 h-8 hover:bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-xl">📋</span>
              </div>
              <span className="text-xs">Orders</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white">
              <Settings size={20} />
              <span className="text-xs">Settings</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white">
              <User size={20} />
              <span className="text-xs">Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Escalation Modal */}
      {showEscalation && (
        <EscalationModal onClose={() => setShowEscalation(false)} />
      )}

      {/* Info */}
      <div className="text-center text-gray-500 text-sm mt-8 px-4">
        <p>Mobile View (375px) • iOS & Android Compatible</p>
      </div>
    </div>
  );
}
