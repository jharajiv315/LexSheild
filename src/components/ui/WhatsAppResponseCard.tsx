import { MessageCircle, Check, CheckCheck, Clock } from 'lucide-react';

interface WhatsAppResponseCardProps {
  pharmacyName: string;
  message: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'confirmed' | 'declined';
}

export function WhatsAppResponseCard({
  pharmacyName,
  message,
  timestamp,
  status
}: WhatsAppResponseCardProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'sent':
        return <Check size={14} className="text-gray-400" />;
      case 'delivered':
        return <CheckCheck size={14} className="text-gray-400" />;
      case 'read':
        return <CheckCheck size={14} className="text-blue-400" />;
      case 'confirmed':
        return <CheckCheck size={14} className="text-green-400" />;
      case 'declined':
        return <Clock size={14} className="text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'confirmed':
        return 'border-green-500/50 bg-green-500/5';
      case 'declined':
        return 'border-red-500/50 bg-red-500/5';
      default:
        return 'border-gray-800';
    }
  };

  return (
    <div className={`bg-[#12161D] border rounded-xl p-4 ${getStatusColor()}`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-[#25D366]/20 rounded-full flex items-center justify-center flex-shrink-0">
          <MessageCircle className="text-[#25D366]" size={20} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-semibold">{pharmacyName}</h4>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                <span>via WhatsApp</span>
                {getStatusIcon()}
              </p>
            </div>
            
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {timestamp}
            </span>
          </div>

          <p className="text-sm text-gray-300 mb-3">
            {message}
          </p>

          {status === 'confirmed' && (
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                <Check size={12} />
                Confirmed
              </span>
            </div>
          )}

          {status === 'declined' && (
            <div className="flex gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-medium">
                Not Available
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
