import { useState } from 'react';
import { EmergencyToggle } from './ui/EmergencyToggle';
import { SearchBar } from './ui/SearchBar';
import { PharmacyCard } from './ui/PharmacyCard';
import { CountdownTimer } from './ui/CountdownTimer';
import { WhatsAppResponseCard } from './ui/WhatsAppResponseCard';
import { AdminTable } from './ui/AdminTable';
import { HeatmapPanel } from './ui/HeatmapPanel';
import { Bell, Settings, User, BarChart3, MapPin, Activity, Clock } from 'lucide-react';

export function DesktopView() {
  const [isEmergency, setIsEmergency] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics'>('dashboard');

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
    }
  ];

  const mockResponses = [
    {
      pharmacyName: 'Apollo Pharmacy',
      message: 'हां, दवा स्टॉक में है। 10 मिनट में डिलीवर कर सकते हैं। Yes, available.',
      timestamp: '1 min ago',
      status: 'confirmed' as const
    },
    {
      pharmacyName: 'MedPlus',
      message: 'Medicine in stock. Can deliver immediately.',
      timestamp: '2 min ago',
      status: 'confirmed' as const
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F14]">
      <div className="max-w-[1440px] mx-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-40 bg-[#0B0F14]/95 backdrop-blur-sm border-b border-gray-800">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center font-bold text-lg">
                MC
              </div>
              <div>
                <h1 className="font-bold text-xl">Med Connect</h1>
                <p className="text-xs text-gray-400">Emergency Medical Response System</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-green-500/20 text-green-400'
                    : 'hover:bg-gray-800'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === 'analytics'
                    ? 'bg-green-500/20 text-green-400'
                    : 'hover:bg-gray-800'
                }`}
              >
                Analytics
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Settings size={22} />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative">
                <Bell size={22} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <User size={22} />
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'dashboard' ? (
          /* Dashboard View */
          <div className="p-8">
            {/* Top Stats */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Active Requests</span>
                  <Activity className="text-green-400" size={20} />
                </div>
                <p className="text-3xl font-bold">24</p>
                <p className="text-xs text-green-400 mt-1">+12% from yesterday</p>
              </div>

              <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Avg Response Time</span>
                  <Clock className="text-blue-400" size={20} />
                </div>
                <p className="text-3xl font-bold">4.2 min</p>
                <p className="text-xs text-blue-400 mt-1">-8% improvement</p>
              </div>

              <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Success Rate</span>
                  <BarChart3 className="text-yellow-400" size={20} />
                </div>
                <p className="text-3xl font-bold">92%</p>
                <p className="text-xs text-yellow-400 mt-1">Above target</p>
              </div>

              <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Pharmacies Online</span>
                  <MapPin className="text-red-400" size={20} />
                </div>
                <p className="text-3xl font-bold">156</p>
                <p className="text-xs text-red-400 mt-1">12 nearby</p>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Sidebar */}
              <div className="col-span-3 space-y-6">
                <div className="bg-[#12161D] border border-gray-800 rounded-xl p-4">
                  <EmergencyToggle onChange={setIsEmergency} />
                </div>

                <SearchBar placeholder="Search medicines..." />

                {isEmergency && (
                  <CountdownTimer initialSeconds={300} />
                )}

                <div>
                  <h3 className="font-semibold mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-3 bg-[#12161D] border border-gray-800 hover:border-green-500/50 rounded-lg text-left text-sm transition-colors">
                      📊 View Analytics
                    </button>
                    <button className="w-full px-4 py-3 bg-[#12161D] border border-gray-800 hover:border-green-500/50 rounded-lg text-left text-sm transition-colors">
                      📱 Send Broadcast
                    </button>
                    <button className="w-full px-4 py-3 bg-[#12161D] border border-gray-800 hover:border-green-500/50 rounded-lg text-left text-sm transition-colors">
                      🏥 Contact Hospital
                    </button>
                    <button className="w-full px-4 py-3 bg-[#12161D] border border-gray-800 hover:border-green-500/50 rounded-lg text-left text-sm transition-colors">
                      📞 Call Emergency
                    </button>
                  </div>
                </div>
              </div>

              {/* Center Content */}
              <div className="col-span-6 space-y-6">
                <AdminTable />

                {isEmergency && (
                  <div>
                    <h3 className="font-semibold mb-4">Live WhatsApp Responses</h3>
                    <div className="space-y-3">
                      {mockResponses.map((response, index) => (
                        <WhatsAppResponseCard key={index} {...response} />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="col-span-3 space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Nearby Pharmacies</h3>
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    {mockPharmacies.map((pharmacy, index) => (
                      <PharmacyCard key={index} {...pharmacy} />
                    ))}
                  </div>
                </div>

                {/* System Status */}
                <div className="bg-[#12161D] border border-gray-800 rounded-xl p-4">
                  <h3 className="font-semibold mb-3">System Status</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">API Status</span>
                      <span className="flex items-center gap-1 text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        Online
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">WebSocket</span>
                      <span className="flex items-center gap-1 text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        Connected
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Redis Cache</span>
                      <span className="flex items-center gap-1 text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        Active
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Database</span>
                      <span className="flex items-center gap-1 text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        Connected
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Analytics View */
          <div className="p-8">
            <HeatmapPanel />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="text-center text-gray-500 text-sm py-8">
        <p>Desktop View (1440px) • Full Admin Dashboard</p>
      </div>
    </div>
  );
}