import { X, AlertTriangle, Phone, MessageCircle, Mail } from 'lucide-react';

interface EscalationModalProps {
  onClose: () => void;
}

export function EscalationModal({ onClose }: EscalationModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-slide-in">
      <div className="bg-[#12161D] border border-red-500 rounded-2xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-red-500" size={20} />
            </div>
            <div>
              <h2 className="font-bold text-lg">Emergency Escalation</h2>
              <p className="text-sm text-gray-400">एमरजेंसी एस्केलेशन</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <p className="text-sm text-red-400">
              No pharmacy has confirmed availability within the timeout period.
              Choose an escalation option below.
            </p>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center gap-4 p-4 bg-[#1A1F28] hover:bg-[#212731] border border-gray-700 hover:border-red-500/50 rounded-xl transition-all group">
              <div className="w-12 h-12 bg-red-500/20 group-hover:bg-red-500/30 rounded-lg flex items-center justify-center">
                <Phone className="text-red-400" size={24} />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold">Call Emergency Services</p>
                <p className="text-sm text-gray-400">Dial 108 / 102 immediately</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-4 p-4 bg-[#1A1F28] hover:bg-[#212731] border border-gray-700 hover:border-green-500/50 rounded-xl transition-all group">
              <div className="w-12 h-12 bg-green-500/20 group-hover:bg-green-500/30 rounded-lg flex items-center justify-center">
                <MessageCircle className="text-green-400" size={24} />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold">Broadcast to All Pharmacies</p>
                <p className="text-sm text-gray-400">Send urgent WhatsApp to all</p>
              </div>
            </button>

            <button className="w-full flex items-center gap-4 p-4 bg-[#1A1F28] hover:bg-[#212731] border border-gray-700 hover:border-yellow-500/50 rounded-xl transition-all group">
              <div className="w-12 h-12 bg-yellow-500/20 group-hover:bg-yellow-500/30 rounded-lg flex items-center justify-center">
                <Mail className="text-yellow-400" size={24} />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold">Contact Hospital Network</p>
                <p className="text-sm text-gray-400">Alert nearby hospitals</p>
              </div>
            </button>
          </div>

          {/* Auto-escalation info */}
          <div className="pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-500 text-center">
              Emergency services will be automatically contacted in 30 seconds
              if no action is taken. आपातकालीन सेवाओं को स्वचालित रूप से सूचित किया जाएगा।
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-800">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-700 hover:bg-gray-800 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors">
            Call 108 Now
          </button>
        </div>
      </div>
    </div>
  );
}
