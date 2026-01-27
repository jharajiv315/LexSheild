import { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage, languages } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLanguage = languages.find(l => l.code === language);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-2 px-4 py-2.5
          bg-white/5 hover:bg-white/10
          border border-white/10 hover:border-blue-500/50
          rounded-lg transition-all duration-300
          text-white text-sm font-medium
          group
        "
      >
        <Globe className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
        <span className="hidden md:inline">{currentLanguage?.nativeName}</span>
        <span className="md:hidden">{currentLanguage?.flag}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="
              absolute right-0 mt-2 w-64
              bg-[#1F2937] border border-white/10
              rounded-xl shadow-2xl overflow-hidden
              z-50
            "
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <Globe className="w-4 h-4 text-blue-400" />
                <span>Select Language</span>
              </div>
            </div>

            {/* Language List */}
            <div className="max-h-96 overflow-y-auto custom-scrollbar">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between gap-3 px-4 py-3
                    hover:bg-white/10 transition-colors
                    ${language === lang.code ? 'bg-blue-500/20' : ''}
                  `}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="text-left">
                      <div className="text-sm font-medium text-white">
                        {lang.nativeName}
                      </div>
                      <div className="text-xs text-gray-400">
                        {lang.name}
                      </div>
                    </div>
                  </div>
                  {language === lang.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      <Check className="w-5 h-5 text-blue-400" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>

            {/* Footer Info */}
            <div className="px-4 py-3 border-t border-white/10 bg-white/5">
              <p className="text-xs text-gray-400 text-center">
                More languages coming soon!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
