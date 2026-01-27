import { ArrowLeft, AlertTriangle, MapPin, Search, Send, Clock, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface EmergencyRequestProps {
  user: any;
  onBack: () => void;
}

export function EmergencyRequest({ user, onBack }: EmergencyRequestProps) {
  const [step, setStep] = useState<'form' | 'searching' | 'responses'>('form');
  const [formData, setFormData] = useState({
    medicine: '',
    quantity: '1',
    prescription: false,
    notes: ''
  });
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [responses, setResponses] = useState<any[]>([]);

  const commonMedicines = [
    'Insulin', 'Aspirin', 'Paracetamol', 'Amoxicillin', 'Ibuprofen',
    'Metformin', 'Omeprazole', 'Cetirizine', 'Azithromycin', 'Cough Syrup'
  ];

  useEffect(() => {
    if (step === 'searching') {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Simulate receiving responses
      setTimeout(() => {
        setResponses([
          {
            pharmacy: 'Apollo Pharmacy',
            distance: 1.2,
            available: true,
            estimatedTime: '5-10 min',
            price: '₹450',
            message: 'Medicine available. Can deliver immediately.'
          },
          {
            pharmacy: 'MedPlus',
            distance: 2.3,
            available: true,
            estimatedTime: '10-15 min',
            price: '₹425',
            message: 'हां, दवा उपलब्ध है। 15 मिनट में डिलीवर कर सकते हैं।'
          },
          {
            pharmacy: 'Wellness Forever',
            distance: 3.1,
            available: false,
            estimatedTime: '-',
            price: '-',
            message: 'Currently out of stock.'
          }
        ]);
        setStep('responses');
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [step]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('searching');
  };

  const handleAcceptPharmacy = (pharmacy: any) => {
    // Save order
    const order = {
      id: Date.now().toString(),
      medicine: formData.medicine,
      pharmacy: pharmacy.pharmacy,
      status: 'active',
      time: 'Just now',
      estimatedDelivery: pharmacy.estimatedTime,
      price: pharmacy.price,
      createdAt: new Date().toISOString()
    };

    const existingOrders = JSON.parse(localStorage.getItem('medconnect_orders') || '[]');
    localStorage.setItem('medconnect_orders', JSON.stringify([order, ...existingOrders]));

    alert(`Order confirmed with ${pharmacy.pharmacy}! Tracking your delivery now.`);
    onBack();
  };

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Emergency Medicine Request</h1>
            <p className="text-gray-400">आपातकालीन दवा अनुरोध</p>
          </div>
        </div>

        {step === 'form' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Alert Banner */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertTriangle className="text-red-400 flex-shrink-0 mt-1" size={20} />
              <div>
                <p className="font-semibold text-red-400 mb-1">Emergency Mode Active</p>
                <p className="text-sm text-gray-300">
                  Your request will be broadcast to all nearby pharmacies within 5km radius. 
                  You'll get responses within minutes.
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-[#12161D] border border-gray-800 rounded-xl p-8 space-y-6">
              <div>
                <label className="block font-semibold mb-3">Medicine Name *</label>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={formData.medicine}
                    onChange={(e) => setFormData({ ...formData, medicine: e.target.value })}
                    placeholder="Search or type medicine name..."
                    className="w-full pl-11 pr-4 py-3 bg-[#1A1F28] border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                    required
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {commonMedicines.map((med) => (
                    <button
                      key={med}
                      type="button"
                      onClick={() => setFormData({ ...formData, medicine: med })}
                      className="px-3 py-1.5 bg-[#1A1F28] hover:bg-[#212731] border border-gray-700 hover:border-green-500 rounded-lg text-sm transition-colors"
                    >
                      {med}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-3">Quantity</label>
                <select
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-4 py-3 bg-[#1A1F28] border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                >
                  <option value="1">1 Unit</option>
                  <option value="2">2 Units</option>
                  <option value="3">3 Units</option>
                  <option value="5">5 Units</option>
                  <option value="10">10 Units</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.prescription}
                    onChange={(e) => setFormData({ ...formData, prescription: e.target.checked })}
                    className="w-5 h-5 rounded"
                  />
                  <span className="font-medium">I have a prescription (if required)</span>
                </label>
              </div>

              <div>
                <label className="block font-semibold mb-3">Additional Notes (Optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any specific requirements or instructions..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#1A1F28] border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg shadow-red-500/25"
              >
                <Send size={20} />
                Send Emergency Request
              </button>
            </form>
          </motion.div>
        )}

        {step === 'searching' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="inline-block relative mb-8">
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
                <MapPin className="text-green-400" size={40} />
              </div>
              <div className="absolute inset-0 border-4 border-green-500/30 rounded-full animate-ping"></div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Broadcasting to Nearby Pharmacies...</h2>
            <p className="text-gray-400 mb-8">
              Searching for {formData.medicine} within 5km radius
            </p>
            
            {/* Countdown */}
            <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6 inline-block">
              <p className="text-sm text-gray-400 mb-2">Auto-escalation timer</p>
              <div className="text-4xl font-bold text-yellow-400">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
            </div>
          </motion.div>
        )}

        {step === 'responses' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
              <CheckCircle className="text-green-400" size={24} />
              <p className="font-semibold">
                {responses.filter(r => r.available).length} pharmacies responded with availability!
              </p>
            </div>

            <div className="space-y-4">
              {responses.map((response, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-[#12161D] border rounded-xl p-6 ${
                    response.available ? 'border-green-500/30' : 'border-gray-800'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{response.pharmacy}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {response.distance} km
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {response.estimatedTime}
                        </span>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-full font-semibold ${
                      response.available
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {response.available ? 'Available' : 'Out of Stock'}
                    </div>
                  </div>

                  <div className="bg-[#1A1F28] rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-300">{response.message}</p>
                  </div>

                  {response.available && (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400">Estimated Price</p>
                        <p className="text-2xl font-bold text-green-400">{response.price}</p>
                      </div>
                      <button
                        onClick={() => handleAcceptPharmacy(response)}
                        className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
                      >
                        Accept & Order
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
