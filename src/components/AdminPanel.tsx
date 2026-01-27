import { ArrowLeft, Users, Package, DollarSign, TrendingUp, Search, MoreVertical, Check, X, Eye, Edit, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface AdminPanelProps {
  user: any;
  onBack: () => void;
}

export function AdminPanel({ user, onBack }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'pharmacies' | 'users'>('orders');
  const [searchQuery, setSearchQuery] = useState('');

  const ordersData = [
    { id: 'ORD-2547', user: 'Rajesh Kumar', medicine: 'Insulin 100IU', pharmacy: 'Apollo Pharmacy', status: 'delivered', amount: '₹450', date: '2024-01-23', time: '14:30' },
    { id: 'ORD-2546', user: 'Priya Sharma', medicine: 'Aspirin 75mg', pharmacy: 'MedPlus', status: 'active', amount: '₹120', date: '2024-01-23', time: '14:15' },
    { id: 'ORD-2545', user: 'Amit Patel', medicine: 'Paracetamol 500mg', pharmacy: 'Wellness Forever', status: 'cancelled', amount: '₹80', date: '2024-01-23', time: '13:45' },
    { id: 'ORD-2544', user: 'Sneha Desai', medicine: 'Azithromycin 500mg', pharmacy: 'Apollo Pharmacy', status: 'delivered', amount: '₹280', date: '2024-01-23', time: '12:30' },
    { id: 'ORD-2543', user: 'Vikram Singh', medicine: 'Omeprazole 20mg', pharmacy: 'NetMeds', status: 'active', amount: '₹150', date: '2024-01-23', time: '11:20' }
  ];

  const pharmaciesData = [
    { id: '1', name: 'Apollo Pharmacy', location: 'Andheri West, Mumbai', orders: 245, rating: 4.5, status: 'active', verified: true },
    { id: '2', name: 'MedPlus', location: 'Bandra East, Mumbai', orders: 189, rating: 4.3, status: 'active', verified: true },
    { id: '3', name: 'Wellness Forever', location: 'Malad West, Mumbai', orders: 134, rating: 4.7, status: 'inactive', verified: true },
    { id: '4', name: 'NetMeds Pharmacy', location: 'Borivali, Mumbai', orders: 98, rating: 4.4, status: 'active', verified: false },
    { id: '5', name: 'HealthPlus', location: 'Goregaon, Mumbai', orders: 156, rating: 4.6, status: 'active', verified: true }
  ];

  const usersData = [
    { id: '1', name: 'Rajesh Kumar', email: 'rajesh@email.com', phone: '+91 98765 43210', orders: 12, joined: '2023-08-15', status: 'active' },
    { id: '2', name: 'Priya Sharma', email: 'priya@email.com', phone: '+91 98765 43211', orders: 8, joined: '2023-09-20', status: 'active' },
    { id: '3', name: 'Amit Patel', email: 'amit@email.com', phone: '+91 98765 43212', orders: 15, joined: '2023-07-10', status: 'active' },
    { id: '4', name: 'Sneha Desai', email: 'sneha@email.com', phone: '+91 98765 43213', orders: 5, joined: '2023-11-05', status: 'inactive' },
    { id: '5', name: 'Vikram Singh', email: 'vikram@email.com', phone: '+91 98765 43214', orders: 20, joined: '2023-06-01', status: 'active' }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
              <p className="text-gray-400">Manage orders, pharmacies, and users</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#12161D] border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Package className="text-blue-400" size={24} />
              <TrendingUp className="text-green-400" size={16} />
            </div>
            <p className="text-3xl font-bold">2,547</p>
            <p className="text-sm text-gray-400">Total Orders</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#12161D] border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Users className="text-green-400" size={24} />
              <TrendingUp className="text-green-400" size={16} />
            </div>
            <p className="text-3xl font-bold">1,834</p>
            <p className="text-sm text-gray-400">Active Users</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#12161D] border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <Package className="text-yellow-400" size={24} />
            </div>
            <p className="text-3xl font-bold">127</p>
            <p className="text-sm text-gray-400">Active Pharmacies</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#12161D] border border-gray-800 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="text-purple-400" size={24} />
              <TrendingUp className="text-green-400" size={16} />
            </div>
            <p className="text-3xl font-bold">₹92.4K</p>
            <p className="text-sm text-gray-400">Today's Revenue</p>
          </motion.div>
        </div>

        {/* Tabs & Content */}
        <div className="bg-[#12161D] border border-gray-800 rounded-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-800">
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'orders'
                  ? 'bg-green-500/10 text-green-400 border-b-2 border-green-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Orders Management
            </button>
            <button
              onClick={() => setActiveTab('pharmacies')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'pharmacies'
                  ? 'bg-green-500/10 text-green-400 border-b-2 border-green-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Pharmacies
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'users'
                  ? 'bg-green-500/10 text-green-400 border-b-2 border-green-500'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Users
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b border-gray-800">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab}...`}
                className="w-full pl-11 pr-4 py-3 bg-[#1A1F28] border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>
          </div>

          {/* Orders Table */}
          {activeTab === 'orders' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1A1F28]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Order ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">User</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Medicine</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Pharmacy</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ordersData.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-800 hover:bg-[#1A1F28] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm">{order.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">{order.user}</p>
                          <p className="text-xs text-gray-400">{order.date} {order.time}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{order.medicine}</td>
                      <td className="px-6 py-4 text-sm">{order.pharmacy}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                          order.status === 'active' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {order.status === 'delivered' && <Check size={12} />}
                          {order.status === 'cancelled' && <X size={12} />}
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold">{order.amount}</td>
                      <td className="px-6 py-4">
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pharmacies Table */}
          {activeTab === 'pharmacies' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1A1F28]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Pharmacy Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Orders</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Rating</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pharmaciesData.map((pharmacy, index) => (
                    <motion.tr
                      key={pharmacy.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-800 hover:bg-[#1A1F28] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{pharmacy.name}</span>
                          {pharmacy.verified && (
                            <span className="text-green-400" title="Verified">✓</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">{pharmacy.location}</td>
                      <td className="px-6 py-4 font-semibold">{pharmacy.orders}</td>
                      <td className="px-6 py-4">
                        <span className="text-yellow-400">★ {pharmacy.rating}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          pharmacy.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {pharmacy.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-blue-500/10 text-blue-400 rounded-lg transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 hover:bg-green-500/10 text-green-400 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Users Table */}
          {activeTab === 'users' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1A1F28]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Orders</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Joined</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {usersData.map((userData, index) => (
                    <motion.tr
                      key={userData.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-800 hover:bg-[#1A1F28] transition-colors"
                    >
                      <td className="px-6 py-4 font-medium">{userData.name}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <p className="text-gray-400">{userData.email}</p>
                          <p className="text-gray-500">{userData.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold">{userData.orders}</td>
                      <td className="px-6 py-4 text-sm text-gray-400">{userData.joined}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          userData.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {userData.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-blue-500/10 text-blue-400 rounded-lg transition-colors">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 hover:bg-green-500/10 text-green-400 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
