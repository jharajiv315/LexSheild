import { Bell, BellOff, Clock, AlertTriangle, CheckCircle, Search, Filter, TrendingUp, Plus, X, ChevronRight, History, Eye, Shield } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface TrackedApp {
  id: string;
  name: string;
  category: string;
  logo: string;
  notificationsEnabled: boolean;
  lastChecked: string;
  changesDetected: number;
}

interface ClauseChange {
  id: string;
  appName: string;
  appLogo: string;
  clauseType: 'TOS' | 'TOC';
  changeType: 'added' | 'modified' | 'removed';
  oldText: string;
  newText: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  detectedDate: string;
  description: string;
}

interface ClauseTrackingProps {
  onBack: () => void;
}

export function ClauseTracking({ onBack }: ClauseTrackingProps) {
  const { t } = useLanguage();
  const [trackedApps, setTrackedApps] = useState<TrackedApp[]>([]);
  const [clauseChanges, setClauseChanges] = useState<ClauseChange[]>([]);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [unreadCount, setUnreadCount] = useState(0);

  // Available apps to track
  const availableApps = useMemo(() => [
    { id: 'whatsapp', name: 'WhatsApp', category: 'Messaging', logo: '💚' },
    { id: 'instagram', name: 'Instagram', category: 'Social Media', logo: '📷' },
    { id: 'facebook', name: 'Facebook', category: 'Social Media', logo: '📘' },
    { id: 'twitter', name: 'X (Twitter)', category: 'Social Media', logo: '🐦' },
    { id: 'tiktok', name: 'TikTok', category: 'Video', logo: '🎵' },
    { id: 'snapchat', name: 'Snapchat', category: 'Messaging', logo: '👻' },
    { id: 'telegram', name: 'Telegram', category: 'Messaging', logo: '✈️' },
    { id: 'linkedin', name: 'LinkedIn', category: 'Professional', logo: '💼' },
    { id: 'youtube', name: 'YouTube', category: 'Video', logo: '▶️' },
    { id: 'spotify', name: 'Spotify', category: 'Music', logo: '🎧' },
    { id: 'netflix', name: 'Netflix', category: 'Entertainment', logo: '🎬' },
    { id: 'amazon', name: 'Amazon', category: 'E-Commerce', logo: '📦' },
    { id: 'google', name: 'Google', category: 'Technology', logo: '🔍' },
    { id: 'microsoft', name: 'Microsoft', category: 'Technology', logo: '🪟' },
    { id: 'apple', name: 'Apple', category: 'Technology', logo: '🍎' },
  ], []);

  // Load from localStorage
  useEffect(() => {
    const savedTracked = localStorage.getItem('guardianTrackedApps');
    const savedChanges = localStorage.getItem('guardianClauseChanges');
    
    if (savedTracked) {
      setTrackedApps(JSON.parse(savedTracked));
    } else {
      // Initialize with some demo data
      const demoTracked: TrackedApp[] = [
        {
          id: 'whatsapp',
          name: 'WhatsApp',
          category: 'Messaging',
          logo: '💚',
          notificationsEnabled: true,
          lastChecked: new Date(Date.now() - 3600000).toISOString(),
          changesDetected: 2
        },
        {
          id: 'instagram',
          name: 'Instagram',
          category: 'Social Media',
          logo: '📷',
          notificationsEnabled: true,
          lastChecked: new Date(Date.now() - 7200000).toISOString(),
          changesDetected: 1
        }
      ];
      setTrackedApps(demoTracked);
      localStorage.setItem('guardianTrackedApps', JSON.stringify(demoTracked));
    }

    if (savedChanges) {
      setClauseChanges(JSON.parse(savedChanges));
    } else {
      // Initialize with demo changes
      const demoChanges: ClauseChange[] = [
        {
          id: 'change-1',
          appName: 'WhatsApp',
          appLogo: '💚',
          clauseType: 'TOS',
          changeType: 'modified',
          oldText: 'We may share your information with Facebook and other Meta companies.',
          newText: 'We share your information with Meta Platforms, Inc. and subsidiaries including Facebook, Instagram, and Threads for advertising, analytics, and service improvement.',
          severity: 'critical',
          detectedDate: new Date(Date.now() - 86400000).toISOString(),
          description: 'Data sharing scope expanded to include more Meta platforms'
        },
        {
          id: 'change-2',
          appName: 'WhatsApp',
          appLogo: '💚',
          clauseType: 'TOC',
          changeType: 'added',
          oldText: '',
          newText: 'You agree to binding arbitration for all disputes exceeding $10,000 and waive your right to participate in class action lawsuits.',
          severity: 'high',
          detectedDate: new Date(Date.now() - 172800000).toISOString(),
          description: 'New arbitration clause limits legal options'
        },
        {
          id: 'change-3',
          appName: 'Instagram',
          appLogo: '📷',
          clauseType: 'TOS',
          changeType: 'modified',
          oldText: 'Content you share may be used for promotional purposes.',
          newText: 'Content you share grants us a worldwide, royalty-free license to use, modify, distribute, and create derivative works for any purpose including AI training.',
          severity: 'critical',
          detectedDate: new Date(Date.now() - 259200000).toISOString(),
          description: 'Content usage expanded to include AI training data'
        },
        {
          id: 'change-4',
          appName: 'TikTok',
          appLogo: '🎵',
          clauseType: 'TOS',
          changeType: 'modified',
          oldText: 'We collect device information and usage data.',
          newText: 'We collect device information, usage data, biometric identifiers, voice recordings, and keystroke patterns.',
          severity: 'high',
          detectedDate: new Date(Date.now() - 432000000).toISOString(),
          description: 'Expanded data collection to include biometric data'
        }
      ];
      setClauseChanges(demoChanges);
      localStorage.setItem('guardianClauseChanges', JSON.stringify(demoChanges));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('guardianTrackedApps', JSON.stringify(trackedApps));
  }, [trackedApps]);

  useEffect(() => {
    localStorage.setItem('guardianClauseChanges', JSON.stringify(clauseChanges));
  }, [clauseChanges]);

  // Calculate unread count
  useEffect(() => {
    const trackedAppIds = trackedApps.map(app => app.id);
    const unread = clauseChanges.filter(change => {
      const appId = availableApps.find(app => app.name === change.appName)?.id;
      return appId && trackedAppIds.includes(appId);
    }).length;
    setUnreadCount(unread);
  }, [clauseChanges, trackedApps, availableApps]);

  const addTrackedApp = (app: typeof availableApps[0]) => {
    const newTracked: TrackedApp = {
      id: app.id,
      name: app.name,
      category: app.category,
      logo: app.logo,
      notificationsEnabled: true,
      lastChecked: new Date().toISOString(),
      changesDetected: 0
    };
    setTrackedApps([...trackedApps, newTracked]);
    setShowAddModal(false);
  };

  const removeTrackedApp = (appId: string) => {
    setTrackedApps(trackedApps.filter(app => app.id !== appId));
  };

  const toggleNotifications = (appId: string) => {
    setTrackedApps(trackedApps.map(app =>
      app.id === appId ? { ...app, notificationsEnabled: !app.notificationsEnabled } : app
    ));
  };

  // Filter changes
  const filteredChanges = useMemo(() => {
    let filtered = clauseChanges;

    // Filter by selected app
    if (selectedApp) {
      filtered = filtered.filter(change => change.appName === selectedApp);
    }

    // Filter by tracked apps only
    const trackedAppNames = trackedApps.map(app => app.name);
    filtered = filtered.filter(change => trackedAppNames.includes(change.appName));

    // Filter by severity
    if (filterSeverity !== 'all') {
      filtered = filtered.filter(change => change.severity === filterSeverity);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(change =>
        change.appName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        change.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        change.newText.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [clauseChanges, selectedApp, filterSeverity, searchQuery, trackedApps]);

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'from-red-500 to-pink-600';
      case 'high': return 'from-orange-500 to-red-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getChangeTypeIcon = (type: string) => {
    switch (type) {
      case 'added': return <Plus className="text-green-400" size={16} />;
      case 'modified': return <TrendingUp className="text-yellow-400" size={16} />;
      case 'removed': return <X className="text-red-400" size={16} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={onBack}
            className="mb-4 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            ← Back
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Clause Mutation Tracker
              </h1>
              <p className="text-gray-400">
                Monitor Terms of Service and Terms & Conditions changes in real-time
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Bell className="text-blue-400" size={18} />
                  <span className="text-sm font-medium text-blue-400">
                    {unreadCount} New Changes
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg font-medium flex items-center gap-2 transition-all"
              >
                <Plus size={18} />
                Track App
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Eye className="text-blue-400" size={24} />
              <div className="text-2xl font-bold text-white">{trackedApps.length}</div>
            </div>
            <div className="text-sm text-gray-400">Apps Tracked</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <History className="text-purple-400" size={24} />
              <div className="text-2xl font-bold text-white">{clauseChanges.length}</div>
            </div>
            <div className="text-sm text-gray-400">Total Changes</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="text-red-400" size={24} />
              <div className="text-2xl font-bold text-white">
                {clauseChanges.filter(c => c.severity === 'critical').length}
              </div>
            </div>
            <div className="text-sm text-gray-400">Critical Changes</div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <Bell className="text-green-400" size={24} />
              <div className="text-2xl font-bold text-white">
                {trackedApps.filter(app => app.notificationsEnabled).length}
              </div>
            </div>
            <div className="text-sm text-gray-400">Active Alerts</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tracked Apps Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="text-blue-400" size={20} />
                Monitored Apps
              </h2>

              {trackedApps.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="mx-auto mb-3 text-gray-600" size={48} />
                  <p className="text-gray-400 mb-4">No apps tracked yet</p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-all"
                  >
                    Add First App
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {trackedApps.map((app) => (
                    <div
                      key={app.id}
                      className={`p-4 rounded-lg border transition-all cursor-pointer ${
                        selectedApp === app.name
                          ? 'bg-blue-600/20 border-blue-500/50'
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                      onClick={() => setSelectedApp(selectedApp === app.name ? null : app.name)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{app.logo}</div>
                          <div>
                            <div className="font-medium text-white">{app.name}</div>
                            <div className="text-xs text-gray-400">{app.category}</div>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleNotifications(app.id);
                          }}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {app.notificationsEnabled ? (
                            <Bell size={18} className="text-blue-400" />
                          ) : (
                            <BellOff size={18} />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-gray-400">
                          <Clock size={12} />
                          {getTimeAgo(app.lastChecked)}
                        </div>
                        {app.changesDetected > 0 && (
                          <div className="px-2 py-0.5 bg-red-500/20 border border-red-500/30 rounded text-red-400 font-medium">
                            {app.changesDetected} changes
                          </div>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTrackedApp(app.id);
                        }}
                        className="mt-3 w-full py-1.5 text-xs text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-500/50 rounded transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Changes Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <History className="text-purple-400" size={20} />
                  Clause Changes
                  {selectedApp && ` - ${selectedApp}`}
                </h2>

                <div className="flex items-center gap-2">
                  <select
                    value={filterSeverity}
                    onChange={(e) => setFilterSeverity(e.target.value)}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="all">All Severity</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search changes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Changes List */}
              {filteredChanges.length === 0 ? (
                <div className="text-center py-12">
                  <History className="mx-auto mb-3 text-gray-600" size={48} />
                  <p className="text-gray-400">
                    {trackedApps.length === 0
                      ? 'Start tracking apps to see clause changes'
                      : 'No changes detected yet'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                  {filteredChanges.map((change) => (
                    <motion.div
                      key={change.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-all"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{change.appLogo}</div>
                          <div>
                            <div className="font-medium text-white flex items-center gap-2">
                              {change.appName}
                              <span className={`px-2 py-0.5 rounded text-xs font-bold bg-gradient-to-r ${getSeverityColor(change.severity)} text-white`}>
                                {change.severity.toUpperCase()}
                              </span>
                            </div>
                            <div className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                              <span className={`px-2 py-0.5 rounded ${
                                change.clauseType === 'TOS'
                                  ? 'bg-blue-500/20 text-blue-400'
                                  : 'bg-purple-500/20 text-purple-400'
                              }`}>
                                {change.clauseType}
                              </span>
                              <span className="flex items-center gap-1">
                                {getChangeTypeIcon(change.changeType)}
                                {change.changeType}
                              </span>
                              <span>•</span>
                              <Clock size={12} />
                              {getTimeAgo(change.detectedDate)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="text-yellow-400 mt-0.5" size={16} />
                          <p className="text-sm text-yellow-200">{change.description}</p>
                        </div>
                      </div>

                      {/* Changes Comparison */}
                      <div className="space-y-3">
                        {change.oldText && (
                          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <div className="text-xs font-medium text-red-400 mb-2 flex items-center gap-1">
                              <X size={12} />
                              Previous Version
                            </div>
                            <p className="text-sm text-gray-300 line-through">{change.oldText}</p>
                          </div>
                        )}

                        {change.newText && (
                          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                            <div className="text-xs font-medium text-green-400 mb-2 flex items-center gap-1">
                              <CheckCircle size={12} />
                              Current Version
                            </div>
                            <p className="text-sm text-gray-300">{change.newText}</p>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-4 flex items-center gap-2">
                        <button className="flex-1 py-2 text-xs bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-400 rounded-lg transition-all font-medium">
                          View Full Document
                        </button>
                        <button className="flex-1 py-2 text-xs bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-400 rounded-lg transition-all font-medium">
                          Get AI Analysis
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add App Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0A0E1A] border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Add App to Track</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableApps
                  .filter(app => !trackedApps.find(t => t.id === app.id))
                  .map((app) => (
                    <button
                      key={app.id}
                      onClick={() => addTrackedApp(app)}
                      className="p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-xl transition-all group"
                    >
                      <div className="text-3xl mb-2">{app.logo}</div>
                      <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                        {app.name}
                      </div>
                      <div className="text-xs text-gray-400">{app.category}</div>
                    </button>
                  ))}
              </div>

              {availableApps.filter(app => !trackedApps.find(t => t.id === app.id)).length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto mb-3 text-green-400" size={48} />
                  <p className="text-gray-400">You're tracking all available apps!</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  );
}
