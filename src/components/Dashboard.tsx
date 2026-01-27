import { AlertCircle, Heart, MapPin, Package, TrendingUp, Clock, Star, Zap, Phone, Shield, Activity, Pill, Bell, Users, Wallet, Award, Smartphone, Mic, Home, Thermometer, Wind, Droplets, AlertTriangle, Plus, Search, ArrowRight, ChevronRight, Calendar, Timer } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

interface DashboardProps {
  user: any;
  onNavigate: (view: string) => void;
}

export function Dashboard({ user, onNavigate }: DashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [voiceActive, setVoiceActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [healthScore, setHealthScore] = useState(85);
  const [showSOSConfirm, setShowSOSConfirm] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sample data
  const todaysMedicines = [
    { name: 'Aspirin 100mg', time: '09:00 AM', taken: true, icon: '💊' },
    { name: 'Vitamin D3', time: '02:00 PM', taken: false, icon: '🌟' },
    { name: 'Metformin 500mg', time: '08:00 PM', taken: false, icon: '💊' },
  ];

  const familyMembers = [
    { name: 'Mother', age: 58, condition: 'Diabetes', avatar: '👩' },
    { name: 'Father', age: 62, condition: 'BP', avatar: '👨' },
    { name: 'Sister', age: 25, condition: 'Healthy', avatar: '👧' },
  ];

  const nearbyHospitals = [
    { name: 'Apollo Hospital', distance: '2.3 km', emergency: true, rating: 4.8 },
    { name: 'Fortis Healthcare', distance: '3.7 km', emergency: true, rating: 4.6 },
    { name: 'Lilavati Hospital', distance: '5.1 km', emergency: true, rating: 4.9 },
  ];

  const trendingMedicines = [
    { name: 'Paracetamol', demand: '+45%', category: 'Fever' },
    { name: 'Azithromycin', demand: '+32%', category: 'Antibiotic' },
    { name: 'Omeprazole', demand: '+28%', category: 'Acidity' },
  ];

  const recentActivity = [
    { action: 'Ordered Aspirin 100mg', time: '2 hours ago', status: 'delivered', icon: Package },
    { action: 'Emergency request sent', time: '1 day ago', status: 'completed', icon: AlertCircle },
    { action: 'Pharmacy rating given', time: '2 days ago', status: 'completed', icon: Star },
  ];

  const healthMetrics = [
    { label: 'Heart Rate', value: '72', unit: 'bpm', icon: Heart, color: 'red', status: 'normal' },
    { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', icon: Activity, color: 'blue', status: 'normal' },
    { label: 'Temperature', value: '98.6', unit: '°F', icon: Thermometer, color: 'orange', status: 'normal' },
    { label: 'Oxygen', value: '98', unit: '%', icon: Wind, color: 'cyan', status: 'normal' },
  ];

  const quickActions = [
    { label: 'Voice Search', icon: Mic, action: () => setVoiceActive(!voiceActive), color: 'purple' },
    { label: 'Ambulance', icon: AlertTriangle, action: () => window.open('tel:108'), color: 'red' },
    { label: 'First Aid', icon: Heart, action: () => alert('First Aid Guide'), color: 'pink' },
    { label: 'Find Doctor', icon: Users, action: () => alert('Doctor Directory'), color: 'blue' },
  ];

  const handleVoiceSearch = () => {
    setVoiceActive(true);
    setTimeout(() => {
      setSearchQuery('Paracetamol');
      setVoiceActive(false);
      alert('Voice command: Search for Paracetamol');
    }, 2000);
  };

  const handleSOS = () => {
    setShowSOSConfirm(true);
    setTimeout(() => {
      alert('🚨 SOS Alert sent to emergency contacts and nearby hospitals!');
      setShowSOSConfirm(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Time & Weather */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'User'}! 👋</h1>
              <p className="text-gray-400 mt-1">
                {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold">{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
              <div className="flex items-center justify-end gap-2 mt-1">
                <Droplets size={16} className="text-blue-400" />
                <span className="text-sm text-gray-400">28°C • Clear</span>
              </div>
            </div>
          </div>

          {/* Health Score Banner */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Your Health Score</p>
                <div className="flex items-center gap-3">
                  <p className="text-5xl font-bold text-green-400">{healthScore}</p>
                  <div>
                    <p className="text-sm text-green-400">Excellent ✨</p>
                    <p className="text-xs text-gray-500">+5 from last week</p>
                  </div>
                </div>
              </div>
              <div className="w-24 h-24 relative">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#1f2937"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeDasharray={`${healthScore * 2.51} 251`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-green-400" size={32} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Smart Search with Voice */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medicines, pharmacies, or hospitals..."
              className="w-full pl-12 pr-24 py-4 bg-[#12161D] border border-gray-800 rounded-xl focus:outline-none focus:border-green-500 text-white"
            />
            <button
              onClick={handleVoiceSearch}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-lg transition-all ${
                voiceActive ? 'bg-red-500 animate-pulse' : 'bg-purple-500 hover:bg-purple-600'
              }`}
            >
              <Mic size={18} className="text-white" />
            </button>
          </div>
          {voiceActive && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-2 text-purple-400 text-sm"
            >
              🎤 Listening... Speak now
            </motion.p>
          )}
        </div>

        {/* Emergency SOS Button */}
        <motion.button
          onClick={handleSOS}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mb-6 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-2xl p-6 shadow-xl shadow-red-500/25"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <AlertTriangle size={32} className="text-white animate-pulse" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">SOS Emergency</p>
                <p className="text-red-100 text-sm">Tap to send instant alert • Hold for 3s to cancel</p>
              </div>
            </div>
            <Zap size={32} className="text-white" />
          </div>
        </motion.button>

        {showSOSConfirm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
          >
            <div className="bg-red-500 rounded-3xl p-8 text-center max-w-md">
              <AlertTriangle size={64} className="text-white mx-auto mb-4 animate-pulse" />
              <h2 className="text-3xl font-bold text-white mb-2">🚨 SOS Alert Sending...</h2>
              <p className="text-red-100 text-lg">Emergency services and contacts are being notified!</p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate('emergency')}
                className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-6 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-red-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <AlertCircle className="text-red-400" size={28} />
                  </div>
                  <span className="px-3 py-1 bg-red-500/20 text-red-400 text-xs font-bold rounded-full animate-pulse">
                    URGENT
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">Emergency Request</h3>
                <p className="text-sm text-gray-400 mb-4">Need medicine urgently? Send instant alert to nearby pharmacies</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Avg response: 2 mins</span>
                  <ArrowRight className="text-red-400 group-hover:translate-x-2 transition-transform" size={20} />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate('pharmacy')}
                className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6 cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-green-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="text-green-400" size={28} />
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">
                    2.5K+ ACTIVE
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">Find Pharmacy</h3>
                <p className="text-sm text-gray-400 mb-4">Browse and search nearby pharmacies with live availability</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Within 5km radius</span>
                  <ArrowRight className="text-green-400 group-hover:translate-x-2 transition-transform" size={20} />
                </div>
              </motion.div>
            </div>

            {/* Quick Actions Grid */}
            <div className="bg-[#12161D] border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Zap className="text-yellow-400" size={20} />
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={action.action}
                      className={`p-4 bg-${action.color}-500/10 border border-${action.color}-500/30 rounded-xl hover:bg-${action.color}-500/20 transition-all text-center`}
                    >
                      <Icon className={`text-${action.color}-400 mx-auto mb-2`} size={24} />
                      <p className="text-xs font-medium">{action.label}</p>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Health Metrics */}
            <div className="bg-[#12161D] border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Activity className="text-blue-400" size={20} />
                  Health Vitals
                </h3>
                <button className="text-sm text-green-400 hover:underline">Update</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {healthMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[#1A1F28] rounded-xl p-4 text-center"
                    >
                      <Icon className={`text-${metric.color}-400 mx-auto mb-2`} size={24} />
                      <p className="text-2xl font-bold mb-1">{metric.value}</p>
                      <p className="text-xs text-gray-500 mb-1">{metric.unit}</p>
                      <p className="text-xs text-gray-400">{metric.label}</p>
                      <span className={`inline-block mt-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] rounded-full`}>
                        {metric.status}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Today's Medicines */}
            <div className="bg-[#12161D] border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Pill className="text-purple-400" size={20} />
                  Today's Medicines
                </h3>
                <button className="text-sm text-green-400 hover:underline">Set Reminder</button>
              </div>
              <div className="space-y-3">
                {todaysMedicines.map((med, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                      med.taken
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-yellow-500/10 border-yellow-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{med.icon}</span>
                      <div>
                        <p className="font-semibold">{med.name}</p>
                        <p className="text-sm text-gray-400 flex items-center gap-1">
                          <Clock size={14} /> {med.time}
                        </p>
                      </div>
                    </div>
                    <button className={`px-4 py-2 rounded-lg font-medium text-sm ${
                      med.taken
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-500 hover:bg-yellow-600 text-black'
                    }`}>
                      {med.taken ? '✓ Taken' : 'Mark as Taken'}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trending Medicines */}
            <div className="bg-[#12161D] border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="text-orange-400" size={20} />
                Trending in Your Area
              </h3>
              <div className="space-y-3">
                {trendingMedicines.map((medicine, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-[#1A1F28] rounded-lg hover:bg-[#1F2631] transition-colors"
                  >
                    <div>
                      <p className="font-semibold">{medicine.name}</p>
                      <p className="text-sm text-gray-400">{medicine.category}</p>
                    </div>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-sm font-bold rounded-full">
                      {medicine.demand}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#12161D] border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="text-green-400" size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-400">{activity.time}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                        {activity.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4"
              >
                <Package className="text-blue-400 mb-2" size={24} />
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-gray-400">Total Orders</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4"
              >
                <Clock className="text-yellow-400 mb-2" size={24} />
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-gray-400">Active Orders</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4"
              >
                <Star className="text-green-400 mb-2" size={24} />
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-gray-400">Saved Pharmacies</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-4"
              >
                <Zap className="text-purple-400 mb-2" size={24} />
                <p className="text-2xl font-bold">{'<'}5m</p>
                <p className="text-sm text-gray-400">Avg Response</p>
              </motion.div>
            </div>

            {/* Wallet */}
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Wallet className="text-green-400" size={20} />
                  Med Wallet
                </h3>
                <Plus className="text-green-400 cursor-pointer" size={20} />
              </div>
              <p className="text-4xl font-bold mb-2">₹2,450</p>
              <p className="text-sm text-gray-400 mb-4">Available Balance</p>
              <button className="w-full py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors">
                Add Money
              </button>
            </div>

            {/* Family Members */}
            <div className="bg-[#12161D] border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Users className="text-blue-400" size={20} />
                  Family
                </h3>
                <Plus className="text-green-400 cursor-pointer" size={20} />
              </div>
              <div className="space-y-3">
                {familyMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-[#1A1F28] rounded-lg hover:bg-[#1F2631] transition-colors cursor-pointer">
                    <span className="text-3xl">{member.avatar}</span>
                    <div className="flex-1">
                      <p className="font-semibold">{member.name}</p>
                      <p className="text-xs text-gray-400">{member.age} yrs • {member.condition}</p>
                    </div>
                    <ChevronRight className="text-gray-600" size={18} />
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Hospitals */}
            <div className="bg-[#12161D] border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Home className="text-red-400" size={20} />
                Nearby Hospitals
              </h3>
              <div className="space-y-3">
                {nearbyHospitals.map((hospital, index) => (
                  <div key={index} className="p-3 border border-gray-800 rounded-lg hover:border-green-500 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-sm">{hospital.name}</p>
                      {hospital.emergency && (
                        <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[10px] font-bold rounded-full">
                          24/7
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin size={12} /> {hospital.distance}
                      </span>
                      <span className="text-xs text-yellow-400 flex items-center gap-1">
                        <Star size={12} fill="currentColor" /> {hospital.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Phone className="text-red-400" size={20} />
                Emergency Contacts
              </h3>
              <div className="space-y-3">
                <a href="tel:108" className="flex items-center justify-between p-3 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors">
                  <div>
                    <p className="font-semibold">🚑 Ambulance</p>
                    <p className="text-sm text-gray-400">108</p>
                  </div>
                  <Phone className="text-red-400" size={20} />
                </a>
                <a href="tel:102" className="flex items-center justify-between p-3 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors">
                  <div>
                    <p className="font-semibold">🏥 Medical Helpline</p>
                    <p className="text-sm text-gray-400">102</p>
                  </div>
                  <Phone className="text-red-400" size={20} />
                </a>
              </div>
            </div>

            {/* Rewards */}
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6">
              <Award className="text-yellow-400 mb-3" size={32} />
              <h3 className="text-lg font-bold mb-2">Rewards Program</h3>
              <p className="text-sm text-gray-400 mb-4">You have 450 points!</p>
              <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
              <p className="text-xs text-gray-500">550 points to next reward</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}