import { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface CountdownTimerProps {
  initialSeconds: number;
  onComplete?: () => void;
  showWarning?: boolean;
}

export function CountdownTimer({ 
  initialSeconds, 
  onComplete,
  showWarning = true 
}: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning || seconds <= 0) {
      if (seconds <= 0) {
        onComplete?.();
      }
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, seconds, onComplete]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const percentage = (seconds / initialSeconds) * 100;
  const isWarning = seconds <= 60 && showWarning;
  const isCritical = seconds <= 30 && showWarning;

  return (
    <div className={`bg-[#12161D] border rounded-xl p-6 ${
      isCritical ? 'border-red-500 animate-pulse-glow' : 
      isWarning ? 'border-yellow-500' : 
      'border-gray-800'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {isCritical ? (
            <AlertTriangle className="text-red-500" size={20} />
          ) : (
            <Clock className={isWarning ? 'text-yellow-500' : 'text-gray-400'} size={20} />
          )}
          <span className="font-medium">
            {isCritical ? 'Critical - Escalating Soon' : 
             isWarning ? 'Warning - Time Running Out' : 
             'Response Timer'}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
          >
            {isRunning ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={() => {
              setSeconds(initialSeconds);
              setIsRunning(true);
            }}
            className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="text-center mb-4">
        <div className={`text-5xl font-bold tabular-nums ${
          isCritical ? 'text-red-500' : 
          isWarning ? 'text-yellow-500' : 
          'text-green-500'
        }`}>
          {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
        </div>
        <p className="text-sm text-gray-400 mt-2">
          {seconds === 0 ? 'Escalating to emergency services' : 'Until automatic escalation'}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`absolute top-0 left-0 h-full transition-all duration-1000 ${
            isCritical ? 'bg-red-500' : 
            isWarning ? 'bg-yellow-500' : 
            'bg-green-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {isWarning && (
        <div className={`mt-4 p-3 rounded-lg ${
          isCritical ? 'bg-red-500/10 border border-red-500/30' : 'bg-yellow-500/10 border border-yellow-500/30'
        }`}>
          <p className={`text-sm ${isCritical ? 'text-red-400' : 'text-yellow-400'}`}>
            {isCritical 
              ? '⚠️ Less than 30 seconds remaining. Emergency services will be contacted automatically.'
              : '⏰ Less than 1 minute remaining. Please respond or escalate manually.'}
          </p>
        </div>
      )}
    </div>
  );
}
