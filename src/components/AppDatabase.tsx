import { Shield, AlertTriangle, Search, Filter, ChevronRight, Users, Globe, TrendingUp, Sparkles } from 'lucide-react';
import { useState, useMemo, useCallback } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface App {
  name: string;
  category: string;
  score: number;
  grade: string;
  users: string;
  logo: string;
  risks: string[];
  topRisk: string;
  popularity: number;
}

interface AppDatabaseProps {
  onAnalyzeApp: (app: App) => void;
  onBack: () => void;
}

export function AppDatabase({ onAnalyzeApp, onBack }: AppDatabaseProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'score' | 'popularity'>('popularity');

  // Comprehensive Indian & Global App Database
  const apps: App[] = useMemo(() => [
    {
      name: 'WhatsApp',
      category: 'Messaging',
      score: 62,
      grade: 'C',
      users: '2.5B+ users',
      logo: '💚',
      risks: ['Shares metadata with Facebook', 'Forced arbitration', 'Can ban accounts without appeal', 'Limited data portability'],
      topRisk: 'Data sharing with Meta',
      popularity: 100
    },
    {
      name: 'Instagram',
      category: 'Social Media',
      score: 45,
      grade: 'D',
      users: '2B+ users',
      logo: '📷',
      risks: ['Photos used in ads', 'Perpetual content license', 'Third-party data sharing', 'No liability for content theft'],
      topRisk: 'Content ownership transfer',
      popularity: 98
    },
    {
      name: 'Facebook',
      category: 'Social Media',
      score: 38,
      grade: 'F',
      users: '3B+ users',
      logo: '👤',
      risks: ['Extensive data collection', 'Sells data to advertisers', 'Tracks across web', 'Face recognition without consent'],
      topRisk: 'Mass surveillance & data selling',
      popularity: 95
    },
    {
      name: 'TikTok',
      category: 'Social Media',
      score: 35,
      grade: 'F',
      users: '1.5B+ users',
      logo: '🎵',
      risks: ['ByteDance data access', 'Content ownership claims', 'Minor safety concerns', 'China server storage'],
      topRisk: 'Foreign government data access',
      popularity: 97
    },
    {
      name: 'YouTube',
      category: 'Video',
      score: 58,
      grade: 'C',
      users: '2.5B+ users',
      logo: '▶️',
      risks: ['Ad personalization tracking', 'Watch history profiling', 'Auto-renewal subscriptions', 'Kids data collection'],
      topRisk: 'Behavioral tracking',
      popularity: 99
    },
    {
      name: 'Google Pay',
      category: 'Payment',
      score: 71,
      grade: 'B',
      users: '150M+ users in India',
      logo: '💳',
      risks: ['Transaction tracking', 'Third-party data sharing', 'No liability for unauthorized transactions'],
      topRisk: 'Financial data sharing',
      popularity: 92
    },
    {
      name: 'PhonePe',
      category: 'Payment',
      score: 68,
      grade: 'B',
      users: '500M+ users',
      logo: '💰',
      risks: ['Transaction data retention', 'Third-party app integration', 'Dispute resolution limitations'],
      topRisk: 'Data retention policies',
      popularity: 93
    },
    {
      name: 'Paytm',
      category: 'Payment',
      score: 64,
      grade: 'C',
      users: '350M+ users',
      logo: '🪙',
      risks: ['Extensive KYC data collection', 'Loan partner data sharing', 'Marketing consent auto-enabled'],
      topRisk: 'Financial profiling',
      popularity: 88
    },
    {
      name: 'Snapchat',
      category: 'Social Media',
      score: 52,
      grade: 'C',
      users: '750M+ users',
      logo: '👻',
      risks: ['Real-time location tracking', 'Snap Map privacy issues', 'Content moderation gaps', 'Teen safety concerns'],
      topRisk: 'Real-time location exposure',
      popularity: 85
    },
    {
      name: 'Twitter/X',
      category: 'Social Media',
      score: 48,
      grade: 'D',
      users: '550M+ users',
      logo: '𝕏',
      risks: ['Public posts by default', 'Bot account issues', 'Data scraping permitted', 'Verification confusion'],
      topRisk: 'Public data exposure',
      popularity: 86
    },
    {
      name: 'Telegram',
      category: 'Messaging',
      score: 75,
      grade: 'B',
      users: '900M+ users',
      logo: '✈️',
      risks: ['Secret chats not default', 'Content moderation weak', 'Group chats unencrypted'],
      topRisk: 'Encryption not automatic',
      popularity: 82
    },
    {
      name: 'LinkedIn',
      category: 'Professional',
      score: 66,
      grade: 'C',
      users: '950M+ users',
      logo: '💼',
      risks: ['Profile data scraping', 'Job scam vulnerability', 'Third-party app access', 'Premium auto-renewal'],
      topRisk: 'Professional data scraping',
      popularity: 78
    },
    {
      name: 'Netflix',
      category: 'Entertainment',
      score: 72,
      grade: 'B',
      users: '250M+ subscribers',
      logo: '🎬',
      risks: ['Auto-renewal without warning', 'No refunds policy', 'Price changes with 30 days notice', 'Region content restrictions'],
      topRisk: 'Subscription lock-in',
      popularity: 90
    },
    {
      name: 'Spotify',
      category: 'Entertainment',
      score: 69,
      grade: 'B',
      users: '550M+ users',
      logo: '🎧',
      risks: ['Listening habits tracking', 'Auto-renewal subscriptions', 'Regional content limitations', 'No refund policy'],
      topRisk: 'Music taste profiling',
      popularity: 84
    },
    {
      name: 'Amazon',
      category: 'E-commerce',
      score: 61,
      grade: 'C',
      users: '310M+ users',
      logo: '📦',
      risks: ['Purchase history tracking', 'Alexa voice recordings', 'Third-party seller issues', 'Restrictive return policies'],
      topRisk: 'Shopping behavior tracking',
      popularity: 94
    },
    {
      name: 'Flipkart',
      category: 'E-commerce',
      score: 59,
      grade: 'C',
      users: '400M+ users',
      logo: '🛒',
      risks: ['Data sharing with Walmart', 'Seller dispute handling', 'Limited return windows', 'Dynamic pricing'],
      topRisk: 'Seller accountability gaps',
      popularity: 89
    },
    {
      name: 'Swiggy',
      category: 'Food Delivery',
      score: 63,
      grade: 'C',
      users: '250M+ users',
      logo: '🍔',
      risks: ['Continuous location tracking', 'Restaurant data sharing', 'Limited refund policies', 'Surge pricing algorithms'],
      topRisk: 'Continuous location access',
      popularity: 87
    },
    {
      name: 'Zomato',
      category: 'Food Delivery',
      score: 65,
      grade: 'C',
      users: '230M+ users',
      logo: '🍕',
      risks: ['Food preference profiling', 'Third-party restaurant issues', 'Dynamic pricing', 'Limited refund windows'],
      topRisk: 'Dietary habit profiling',
      popularity: 86
    },
    {
      name: 'Uber',
      category: 'Transportation',
      score: 57,
      grade: 'C',
      users: '130M+ users',
      logo: '🚗',
      risks: ['Real-time location tracking', 'Driver contractor status', 'Surge pricing', 'Forced arbitration clauses'],
      topRisk: 'No liability for accidents',
      popularity: 83
    },
    {
      name: 'Ola',
      category: 'Transportation',
      score: 60,
      grade: 'C',
      users: '250M+ users',
      logo: '🚕',
      risks: ['Trip data retention', 'Driver background verification gaps', 'High cancellation fees', 'Data sharing practices'],
      topRisk: 'Safety incident liability',
      popularity: 81
    },
    {
      name: 'Hotstar',
      category: 'Entertainment',
      score: 70,
      grade: 'B',
      users: '300M+ users',
      logo: '⭐',
      risks: ['Viewing habit tracking', 'Auto-renewal subscriptions', 'Content region locks', 'Disney+ data merger'],
      topRisk: 'Watch history profiling',
      popularity: 85
    },
    {
      name: 'Truecaller',
      category: 'Utility',
      score: 42,
      grade: 'D',
      users: '300M+ users',
      logo: '📞',
      risks: ['Contacts uploaded to cloud', 'Call logs access', 'SMS reading permissions', 'Alleged data selling'],
      topRisk: 'Mass contact harvesting',
      popularity: 79
    },
    {
      name: 'ShareChat',
      category: 'Social Media',
      score: 55,
      grade: 'C',
      users: '325M+ users',
      logo: '💬',
      risks: ['Content moderation issues', 'Regional language gaps', 'Misinformation spread', 'Teen safety concerns'],
      topRisk: 'Unmoderated content',
      popularity: 75
    },
    {
      name: 'Moj',
      category: 'Social Media',
      score: 53,
      grade: 'C',
      users: '160M+ users',
      logo: '🎭',
      risks: ['Video content ownership unclear', 'Minor protection gaps', 'Data sharing with ShareChat', 'Addictive design patterns'],
      topRisk: 'Content ownership unclear',
      popularity: 72
    },
    {
      name: 'CRED',
      category: 'Finance',
      score: 73,
      grade: 'B',
      users: '75M+ users',
      logo: '💎',
      risks: ['Credit card data access', 'Third-party offers integration', 'Rewards terms manipulation', 'Elite-only access'],
      topRisk: 'Financial data aggregation',
      popularity: 70
    },
    {
      name: 'Dream11',
      category: 'Gaming',
      score: 44,
      grade: 'D',
      users: '160M+ users',
      logo: '🏏',
      risks: ['Gambling addiction risks', 'Money loss no refunds', 'Legal grey area in India', 'Match-fixing concerns'],
      topRisk: 'Gambling-like mechanics',
      popularity: 77
    },
    {
      name: 'MPL',
      category: 'Gaming',
      score: 46,
      grade: 'D',
      users: '90M+ users',
      logo: '🎮',
      risks: ['Real money gaming risks', 'Withdrawal limitations', 'Age verification weak', 'Addiction pattern design'],
      topRisk: 'Gambling concerns',
      popularity: 71
    },
    {
      name: 'Signal',
      category: 'Messaging',
      score: 92,
      grade: 'A',
      users: '40M+ users',
      logo: '🔒',
      risks: ['Phone number required for signup', 'Limited cloud backup options', 'Smaller user base'],
      topRisk: 'Phone number exposure',
      popularity: 65
    },
    {
      name: 'Discord',
      category: 'Communication',
      score: 67,
      grade: 'C',
      users: '150M+ users',
      logo: '🎙️',
      risks: ['Server moderation gaps', 'DM privacy concerns', 'Nitro auto-renewal', 'Teen safety issues'],
      topRisk: 'Unmoderated communities',
      popularity: 73
    },
    {
      name: 'Reddit',
      category: 'Social Media',
      score: 63,
      grade: 'C',
      users: '430M+ users',
      logo: '🤖',
      risks: ['Pseudonymity limitations', 'Subreddit moderation issues', 'User data selling', 'Content ownership claims'],
      topRisk: 'User-generated content risks',
      popularity: 74
    }
  ], []);

  const categories = useMemo(() => ['All', 'Social Media', 'Messaging', 'Payment', 'Entertainment', 'E-commerce', 'Food Delivery', 'Transportation', 'Finance', 'Gaming', 'Utility', 'Professional', 'Communication', 'Video'], []);

  const getGradeColor = useCallback((grade: string) => {
    const colors: Record<string, string> = {
      'A': 'text-green-400 bg-green-500/20 border-green-500/30',
      'B': 'text-blue-400 bg-blue-500/20 border-blue-500/30',
      'C': 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
      'D': 'text-orange-400 bg-orange-500/20 border-orange-500/30',
      'F': 'text-red-400 bg-red-500/20 border-red-500/30'
    };
    return colors[grade] || colors['D'];
  }, []);

  const getRiskColor = useCallback((score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-blue-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-red-400';
  }, []);

  // Optimized filter and sort with useMemo
  const filteredApps = useMemo(() => {
    return apps
      .filter(app => {
        const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             app.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'score') return b.score - a.score;
        return b.popularity - a.popularity;
      });
  }, [apps, searchQuery, selectedCategory, sortBy]);

  // Statistics with useMemo
  const stats = useMemo(() => ({
    avgScore: Math.round(apps.reduce((sum, app) => sum + app.score, 0) / apps.length),
    safeApps: apps.filter(app => app.score >= 70).length,
    riskyApps: apps.filter(app => app.score < 50).length
  }), [apps]);

  // Optimized handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleSortChange = useCallback((sort: 'score' | 'popularity') => {
    setSortBy(sort);
  }, []);

  const handleAppClick = useCallback((app: App) => {
    onAnalyzeApp(app);
  }, [onAnalyzeApp]);

  return (
    <section className="py-12 px-6 bg-[#0A0E1A] min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full mb-4">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">🇮🇳 Popular Apps in India & Worldwide</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            App Safety Database
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-6">
            Pre-analyzed safety scores for {apps.length}+ popular apps
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
            >
              <div className="text-3xl font-bold text-blue-400">{apps.length}</div>
              <div className="text-sm text-gray-400">Total Apps</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
            >
              <div className="text-3xl font-bold text-yellow-400">{stats.avgScore}</div>
              <div className="text-sm text-gray-400">Avg Score</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
            >
              <div className="text-3xl font-bold text-green-400">{stats.safeApps}</div>
              <div className="text-sm text-gray-400">Safe (70+)</div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
            >
              <div className="text-3xl font-bold text-red-400">{stats.riskyApps}</div>
              <div className="text-sm text-gray-400">Risky (&lt;50)</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search apps by name or category..."
              className="w-full bg-[#111827] border border-white/10 rounded-xl pl-12 pr-6 py-4 text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
            />
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-4 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Filter size={18} className="text-gray-500" />
              <span className="text-sm text-gray-400">Category:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Sort by:</span>
            <button
              onClick={() => handleSortChange('popularity')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                sortBy === 'popularity'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
              }`}
            >
              <TrendingUp size={16} />
              Popularity
            </button>
            <button
              onClick={() => handleSortChange('score')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                sortBy === 'score'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
              }`}
            >
              <Shield size={16} />
              Safety Score
            </button>
          </div>
        </motion.div>

        {/* Results Count */}
        {searchQuery && (
          <div className="mb-4 text-sm text-gray-400">
            Found {filteredApps.length} app{filteredApps.length !== 1 ? 's' : ''}
          </div>
        )}

        {/* App Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app, index) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.03, 0.5) }}
              className="bg-[#111827] border border-white/10 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all cursor-pointer group"
              onClick={() => handleAppClick(app)}
            >
              {/* App Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{app.logo}</div>
                  <div>
                    <h3 className="font-bold text-white text-lg group-hover:text-blue-400 transition-colors">
                      {app.name}
                    </h3>
                    <p className="text-sm text-gray-500">{app.category}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-lg border text-sm font-bold ${getGradeColor(app.grade)}`}>
                  {app.grade}
                </div>
              </div>

              {/* Safety Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Safety Score</span>
                  <span className={`text-2xl font-bold ${getRiskColor(app.score)}`}>
                    {app.score}/100
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${app.score}%` }}
                    transition={{ delay: Math.min(index * 0.03 + 0.2, 0.7), duration: 0.5 }}
                    className={`h-full rounded-full ${
                      app.score >= 80 ? 'bg-green-500' :
                      app.score >= 60 ? 'bg-blue-500' :
                      app.score >= 40 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                  />
                </div>
              </div>

              {/* Users */}
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                <Users size={14} />
                <span>{app.users}</span>
              </div>

              {/* Top Risk */}
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-red-400 font-semibold mb-1">Top Risk:</p>
                    <p className="text-xs text-gray-300">{app.topRisk}</p>
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <button
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 hover:border-blue-500/50 transition-all flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:border-transparent"
              >
                <Sparkles size={16} />
                View Full Analysis
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredApps.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-400 text-lg mb-2">No apps found matching your search.</p>
            <p className="text-gray-500 text-sm">Try different keywords or categories</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Back Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 hover:border-blue-500/50 transition-all"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </section>
  );
}
