import { Shield, Menu, X, User, Trophy, GitCompare, MessageSquare, FileText, BarChart3, Grid, Bell, LogOut, LogIn } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  user: any | null;
  currentView: string;
  onNavigate: (view: any) => void;
  onAuthClick: () => void;
  onSignOut: () => void;
}

export function Navbar({ user, currentView, onNavigate, onAuthClick, onSignOut }: NavbarProps) {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navItems = [
    { id: 'analyzer', label: t('navbar.analyzer'), icon: FileText },
    { id: 'apps', label: 'Browse Apps', icon: Grid },
    { id: 'tracking', label: 'Clause Tracker', icon: Bell },
    { id: 'analytics', label: t('navbar.analytics'), icon: BarChart3 },
    { id: 'gamification', label: t('navbar.dashboard'), icon: Trophy },
    { id: 'comparison', label: t('navbar.compare'), icon: GitCompare },
    { id: 'chatbot', label: t('navbar.chat'), icon: MessageSquare },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0A0E1A]/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('hero')}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                LexShield
              </span>
              <div className="text-xs text-gray-500">AI Legal Guardian</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                    ${currentView === item.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <Icon size={18} />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Side - Language + Profile */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector />
            
            {user ? (
              <div className="relative">
                {/* Profile Button */}
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                >
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-blue-400" />
                    <span className="text-sm font-medium text-white">{user.name || user.username}</span>
                  </div>
                  <div className="px-2 py-0.5 bg-blue-600 rounded text-xs font-bold text-white">
                    Lv {user.level}
                  </div>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-[#0F1419] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                    >
                      <button
                        onClick={() => {
                          onNavigate('profile');
                          setShowProfileMenu(false);
                        }}
                        className="w-full px-4 py-3 text-left text-white hover:bg-white/5 transition-colors flex items-center gap-3"
                      >
                        <User size={16} className="text-blue-400" />
                        View Profile
                      </button>
                      <div className="border-t border-white/10"></div>
                      <button
                        onClick={() => {
                          onSignOut();
                          setShowProfileMenu(false);
                        }}
                        className="w-full px-4 py-3 text-left text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-semibold transition-all"
              >
                <LogIn size={18} />
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 border-t border-white/10 pt-4"
            >
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        setIsMenuOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
                        ${currentView === item.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }
                      `}
                    >
                      <Icon size={20} />
                      {item.label}
                    </button>
                  );
                })}
                
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        onNavigate('profile');
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                    >
                      <User size={20} />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        onSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <LogOut size={20} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      onAuthClick();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all"
                  >
                    <LogIn size={20} />
                    Sign In
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
