import { ArrowLeft, Package, MapPin, Clock, CheckCircle, Truck, Phone, Star, Upload, MessageSquare, Download, Share2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface OrderTrackingProps {
  user: any;
  onBack: () => void;
}

export function OrderTracking({ user, onBack }: OrderTrackingProps) {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'delivered' | 'cancelled'>('all');

  useEffect(() => {
    const saved = localStorage.getItem('medconnect_orders');
    if (saved) {
      setOrders(JSON.parse(saved));
    }
  }, []);

  const getStatusSteps = (status: string) => {
    const steps = [
      { id: 'ordered', label: 'Order Placed', icon: Package },
      { id: 'confirmed', label: 'Confirmed', icon: CheckCircle },
      { id: 'preparing', label: 'Preparing', icon: Clock },
      { id: 'dispatched', label: 'Dispatched', icon: Truck },
      { id: 'delivered', label: 'Delivered', icon: MapPin }
    ];

    const statusMap: any = {
      'active': 2,
      'dispatched': 3,
      'delivered': 4
    };

    return steps.map((step, index) => ({
      ...step,
      completed: index <= (statusMap[status] || 0)
    }));
  };

  const handleRateOrder = () => {
    if (selectedOrder && rating > 0) {
      alert(`Thanks for rating! ${rating} stars`);
      setShowRating(false);
      setRating(0);
      setReview('');
    }
  };

  const handleShareOrder = () => {
    if (selectedOrder) {
      alert(`Sharing order #${selectedOrder.id} details...`);
    }
  };

  const handleDownloadInvoice = () => {
    if (selectedOrder) {
      alert(`Downloading invoice for order #${selectedOrder.id}...`);
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

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
            <h1 className="text-3xl font-bold">Track Your Orders</h1>
            <p className="text-gray-400">अपने ऑर्डर ट्रैक करें • तुमचे ऑर्डर ट्रॅक करा</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              filter === 'all' ? 'bg-green-500 text-white' : 'bg-[#12161D] border border-gray-800 hover:border-green-500'
            }`}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              filter === 'active' ? 'bg-yellow-500 text-white' : 'bg-[#12161D] border border-gray-800 hover:border-yellow-500'
            }`}
          >
            Active ({orders.filter(o => o.status === 'active').length})
          </button>
          <button
            onClick={() => setFilter('delivered')}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              filter === 'delivered' ? 'bg-green-500 text-white' : 'bg-[#12161D] border border-gray-800 hover:border-green-500'
            }`}
          >
            Delivered ({orders.filter(o => o.status === 'delivered').length})
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              filter === 'cancelled' ? 'bg-red-500 text-white' : 'bg-[#12161D] border border-gray-800 hover:border-red-500'
            }`}
          >
            Cancelled ({orders.filter(o => o.status === 'cancelled').length})
          </button>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Orders List */}
            <div className="lg:col-span-1 space-y-3">
              {filteredOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedOrder(order)}
                  className={`bg-[#12161D] border rounded-xl p-4 cursor-pointer transition-all ${
                    selectedOrder?.id === order.id
                      ? 'border-green-500 shadow-lg shadow-green-500/20'
                      : 'border-gray-800 hover:border-green-500/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{order.medicine}</h3>
                      <p className="text-sm text-gray-400">{order.pharmacy}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                      order.status === 'active' ? 'bg-yellow-500/20 text-yellow-400' :
                      order.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{order.time}</p>
                </motion.div>
              ))}
            </div>

            {/* Tracking Details */}
            <div className="lg:col-span-2">
              {selectedOrder ? (
                <motion.div
                  key={selectedOrder.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Order Info */}
                  <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold mb-2">{selectedOrder.medicine}</h2>
                        <p className="text-gray-400">{selectedOrder.pharmacy}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">{selectedOrder.price}</p>
                        <p className="text-sm text-gray-400">Total Amount</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-[#1A1F28] rounded-lg p-4">
                        <p className="text-sm text-gray-400 mb-1">Order ID</p>
                        <p className="font-mono text-sm">#{selectedOrder.id}</p>
                      </div>
                      <div className="bg-[#1A1F28] rounded-lg p-4">
                        <p className="text-sm text-gray-400 mb-1">Estimated Delivery</p>
                        <p className="font-semibold">{selectedOrder.estimatedDelivery}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={handleShareOrder}
                        className="px-3 py-2 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 text-blue-400 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                      >
                        <Share2 size={16} />
                        Share
                      </button>
                      <button
                        onClick={handleDownloadInvoice}
                        className="px-3 py-2 bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 text-purple-400 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                      >
                        <Download size={16} />
                        Invoice
                      </button>
                      {selectedOrder.status === 'delivered' && (
                        <button
                          onClick={() => setShowRating(true)}
                          className="px-3 py-2 bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-500/20 text-yellow-400 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                          <Star size={16} />
                          Rate
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Tracking Steps */}
                  <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-6">Order Status</h3>
                    <div className="space-y-6">
                      {getStatusSteps(selectedOrder.status).map((step, index) => {
                        const Icon = step.icon;
                        return (
                          <div key={step.id} className="flex items-start gap-4">
                            <div className="relative">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                step.completed
                                  ? 'bg-green-500/20 border-2 border-green-500'
                                  : 'bg-gray-700/20 border-2 border-gray-700'
                              }`}>
                                <Icon size={20} className={step.completed ? 'text-green-400' : 'text-gray-500'} />
                              </div>
                              {index < getStatusSteps(selectedOrder.status).length - 1 && (
                                <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-0.5 h-10 ${
                                  step.completed ? 'bg-green-500' : 'bg-gray-700'
                                }`} />
                              )}
                            </div>
                            <div className="flex-1 pt-2">
                              <p className={`font-semibold ${step.completed ? 'text-white' : 'text-gray-500'}`}>
                                {step.label}
                              </p>
                              {step.completed && (
                                <p className="text-sm text-gray-400 mt-1">
                                  {index === 0 && 'Your order has been placed successfully'}
                                  {index === 1 && 'Pharmacy confirmed your order'}
                                  {index === 2 && 'Medicine is being prepared'}
                                  {index === 3 && 'Out for delivery'}
                                  {index === 4 && 'Order delivered successfully'}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live Location */}
                  {selectedOrder.status === 'active' && (
                    <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
                      <h3 className="font-bold text-lg mb-4">Live Tracking</h3>
                      <div className="bg-[#1A1F28] rounded-lg p-12 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5"></div>
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <MapPin className="text-green-400 mx-auto mb-4" size={48} />
                        </motion.div>
                        <p className="text-gray-300 mb-2 font-semibold">Delivery partner is on the way</p>
                        <p className="text-sm text-gray-500 mb-4">ETA: 8 minutes</p>
                        <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          Live tracking active
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Prescription Upload */}
                  <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Upload size={20} className="text-blue-400" />
                      Prescription
                    </h3>
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
                      <Upload className="text-gray-500 mx-auto mb-3" size={32} />
                      <p className="text-sm text-gray-400 mb-2">Upload prescription image</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                    </div>
                  </div>

                  {/* Contact & Support */}
                  <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">Need Help?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <a
                        href="tel:+919876543210"
                        className="px-4 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-medium text-center flex items-center justify-center gap-2 transition-colors"
                      >
                        <Phone size={18} />
                        Call Pharmacy
                      </a>
                      <button className="px-4 py-3 border border-gray-700 hover:bg-gray-800 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors">
                        <MessageSquare size={18} />
                        Chat Support
                      </button>
                    </div>
                    <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-3">
                      <AlertCircle className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <p className="text-sm font-semibold text-yellow-400 mb-1">Emergency Support</p>
                        <p className="text-xs text-gray-400">For urgent issues, call 108 or contact emergency services</p>
                      </div>
                    </div>
                  </div>

                  {/* Rating Modal */}
                  {showRating && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
                    >
                      <div className="bg-[#12161D] border border-gray-800 rounded-2xl p-6 max-w-md w-full">
                        <h3 className="text-xl font-bold mb-4">Rate Your Experience</h3>
                        
                        {/* Star Rating */}
                        <div className="flex items-center justify-center gap-2 mb-6">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              onClick={() => setRating(star)}
                              className="transition-transform hover:scale-110"
                            >
                              <Star
                                size={32}
                                className={star <= rating ? 'text-yellow-400' : 'text-gray-600'}
                                fill={star <= rating ? 'currentColor' : 'none'}
                              />
                            </button>
                          ))}
                        </div>

                        {/* Review Text */}
                        <textarea
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                          placeholder="Share your experience (optional)"
                          rows={4}
                          className="w-full px-4 py-3 bg-[#1A1F28] border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 resize-none mb-4"
                        />

                        {/* Buttons */}
                        <div className="flex gap-3">
                          <button
                            onClick={() => setShowRating(false)}
                            className="flex-1 px-4 py-3 border border-gray-700 hover:bg-gray-800 rounded-lg font-medium transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleRateOrder}
                            disabled={rating === 0}
                            className="flex-1 px-4 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <div className="bg-[#12161D] border border-gray-800 rounded-xl p-12 text-center">
                  <Package className="text-gray-600 mx-auto mb-4" size={48} />
                  <p className="text-gray-400">Select an order to view tracking details</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-[#12161D] border border-gray-800 rounded-xl p-12 text-center">
            <Package className="text-gray-600 mx-auto mb-4" size={64} />
            <h2 className="text-xl font-bold mb-2">No Orders Yet</h2>
            <p className="text-gray-400 mb-6">
              You haven't placed any orders. Create an emergency request to get started.
            </p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
