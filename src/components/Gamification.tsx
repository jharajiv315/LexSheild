import { Trophy, Zap, Target, Award, TrendingUp, ArrowLeft, Star, Crown, Flame, Shield as ShieldIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface GamificationProps {
  user: any;
  onBack: () => void;
}

export function Gamification({ user, onBack }: GamificationProps) {
  const { t } = useLanguage();
  const xpForNextLevel = user.level * 2000;
  const xpProgress = user.xp - ((user.level - 1) * 2000);
  const xpNeeded = xpForNextLevel - user.xp;
  const progressPercent = (xpProgress / 2000) * 100;

  const badges = [
    { id: 'first_shield', name: t('gamification.badges.firstShield'), icon: '🛡️', unlocked: true, desc: t('gamification.badges.firstShieldDesc') },
    { id: 'week_warrior', name: t('gamification.badges.weekWarrior'), icon: '🔥', unlocked: true, desc: t('gamification.badges.weekWarriorDesc') },
    { id: 'risk_hunter', name: t('gamification.badges.riskHunter'), icon: '🎯', unlocked: true, desc: t('gamification.badges.riskHunterDesc') },
    { id: 'social_guardian', name: t('gamification.badges.socialGuardian'), icon: '🤝', unlocked: false, desc: t('gamification.badges.socialGuardianDesc') },
    { id: 'elite_protector', name: t('gamification.badges.eliteProtector'), icon: '👑', unlocked: false, desc: t('gamification.badges.eliteProtectorDesc') },
    { id: 'privacy_hawk', name: t('gamification.badges.privacyHawk'), icon: '🦅', unlocked: false, desc: t('gamification.badges.privacyHawkDesc') },
  ];

  const leaderboard = [
    { rank: 1, name: '@privacy_hawk', analyses: 542, level: 12, badge: '👑' },
    { rank: 2, name: '@shield_master', analyses: 489, level: 11, badge: '🥈' },
    { rank: 3, name: '@guardian_pro', analyses: 431, level: 10, badge: '🥉' },
    { rank: 4, name: 'You', analyses: user.totalAnalyses, level: user.level, badge: '⭐', highlight: true },
    { rank: 5, name: '@legal_ninja', analyses: 98, level: 5, badge: '🎯' },
  ];

  const recentActivity = [
    { action: 'Analyzed Instagram ToS', xp: 50, time: '2 hours ago', icon: ShieldIcon },
    { action: 'Found Critical Risk', xp: 100, time: '5 hours ago', icon: Target },
    { action: '7-Day Streak Bonus', xp: 25, time: '1 day ago', icon: Flame },
  ];

  return (
    <section className="py-12 px-6 bg-[#0A0E1A] min-h-screen">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-4"
          >
            Your Guardian Profile
          </motion.h2>
          <p className="text-xl text-gray-400">
            Level up by protecting your rights!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Level Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-1 shadow-2xl"
          >
            <div className="bg-[#111827] rounded-2xl p-8 h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Current Level</div>
                  <div className="text-5xl font-bold text-white">{user.level}</div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* XP Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">XP Progress</span>
                  <span className="text-white font-semibold">{xpProgress} / 2,000</span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-400">
                {xpNeeded} XP until Level {user.level + 1}: <span className="text-purple-400 font-semibold">Guardian Elite</span>
              </p>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-[#111827] border border-white/10 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{user.totalAnalyses}</div>
                <div className="text-sm text-gray-400">ToS Analyzed</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400">+12 this week</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-[#111827] border border-white/10 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <div className="text-3xl font-bold text-white">{user.risksFound}</div>
                <div className="text-sm text-gray-400">Risks Found</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Avg 3.4 per ToS</span>
            </div>
          </motion.div>
        </div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#111827] border border-white/10 rounded-2xl p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Award className="w-6 h-6 text-yellow-400" />
            Achievement Badges
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {badges.map((badge, idx) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className={`
                  bg-white/5 border rounded-xl p-6 text-center transition-all cursor-pointer group
                  ${badge.unlocked
                    ? 'border-yellow-500/30 hover:bg-white/10 hover:scale-105'
                    : 'border-white/10 opacity-50 grayscale'
                  }
                `}
              >
                <div className="text-4xl mb-3">{badge.icon}</div>
                <div className="text-sm font-medium text-white mb-1">{badge.name}</div>
                <div className="text-xs text-gray-500">{badge.desc}</div>
                {badge.unlocked && (
                  <div className="text-xs text-yellow-400 mt-2 font-semibold">✓ Unlocked!</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard & Activity */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Leaderboard */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#111827] border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-400" />
              Community Leaderboard
            </h3>

            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`
                    flex items-center justify-between p-4 rounded-xl transition-all
                    ${entry.highlight
                      ? 'bg-blue-500/10 border border-blue-500/30'
                      : 'bg-white/5 hover:bg-white/10'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{entry.badge}</div>
                    <div>
                      <div className={`font-semibold ${entry.highlight ? 'text-blue-400' : 'text-white'}`}>
                        {entry.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {entry.analyses} analyses • Level {entry.level}
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-600">#{entry.rank}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#111827] border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-blue-400" />
              Recent Activity
            </h3>

            <div className="space-y-4">
              {recentActivity.map((activity, idx) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                  >
                    <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white mb-1">{activity.action}</div>
                      <div className="text-sm text-gray-400">{activity.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-400">+{activity.xp}</div>
                      <div className="text-xs text-gray-500">XP</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}