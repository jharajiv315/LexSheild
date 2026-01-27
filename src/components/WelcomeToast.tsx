import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, TrendingUp, Shield } from 'lucide-react';

interface WelcomeToastProps {
  isVisible: boolean;
  userName: string;
  onClose: () => void;
}

export function WelcomeToast({ isVisible, userName, onClose }: WelcomeToastProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -100, scale: 0.95 }}
          className="fixed top-24 right-6 z-50 w-full max-w-md"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 shadow-2xl border border-white/20">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Icon */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-7 h-7 text-white" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Welcome, {userName}! 🎉
                </h3>
                <p className="text-white/90 text-sm mb-4 leading-relaxed">
                  Your account is ready! Start analyzing Terms of Service to earn XP, unlock badges, and climb the leaderboard.
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-white" />
                      <span className="text-xs text-white/80">Level</span>
                    </div>
                    <div className="text-2xl font-bold text-white">1</div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-white" />
                      <span className="text-xs text-white/80">XP to Earn</span>
                    </div>
                    <div className="text-2xl font-bold text-white">50</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
