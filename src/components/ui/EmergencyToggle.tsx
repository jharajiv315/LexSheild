import { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface EmergencyToggleProps {
  onChange?: (isEmergency: boolean) => void;
}

export function EmergencyToggle({ onChange }: EmergencyToggleProps) {
  const [isEmergency, setIsEmergency] = useState(false);

  const handleToggle = () => {
    const newValue = !isEmergency;
    setIsEmergency(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isEmergency ? (
            <AlertCircle className="text-red-500" size={24} />
          ) : (
            <CheckCircle className="text-gray-500" size={24} />
          )}
          <div>
            <p className="font-medium">
              {isEmergency ? 'Emergency Mode Active' : 'Normal Mode'}
            </p>
            <p className="text-sm text-gray-400">
              {isEmergency 
                ? 'High priority response enabled • एमरजेंसी मोड सक्रिय'
                : 'Standard response time • सामान्य मोड'}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleToggle}
          role="switch"
          aria-checked={isEmergency}
          aria-label={isEmergency ? 'Deactivate emergency mode' : 'Activate emergency mode'}
          className={`relative w-16 h-8 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B0F14] ${
            isEmergency 
              ? 'bg-red-500 focus:ring-red-500' 
              : 'bg-gray-700 focus:ring-gray-500'
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
              isEmergency ? 'translate-x-8' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {isEmergency && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 animate-slide-in">
          <p className="text-sm text-red-400">
            <span className="font-semibold">Emergency protocols activated:</span>
            <br />
            • Immediate broadcast to all nearby pharmacies
            <br />
            • Automatic escalation after 5 minutes
            <br />
            • Real-time WhatsApp notifications
          </p>
        </div>
      )}
    </div>
  );
}
