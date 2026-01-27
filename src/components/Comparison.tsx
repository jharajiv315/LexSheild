import { ArrowLeft, Shield, TrendingDown, TrendingUp, AlertTriangle, CheckCircle, Crown } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface ComparisonProps {
  onBack: () => void;
}

export function Comparison({ onBack }: ComparisonProps) {
  const { t } = useLanguage();
  const services = [
    {
      name: 'Instagram',
      score: 45,
      grade: 'D',
      highRisks: 12,
      mediumRisks: 8,
      safeTerms: 23,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Signal',
      score: 92,
      grade: 'A',
      highRisks: 1,
      mediumRisks: 3,
      safeTerms: 45,
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'WhatsApp',
      score: 65,
      grade: 'C',
      highRisks: 5,
      mediumRisks: 12,
      safeTerms: 31,
      color: 'from-green-400 to-teal-500'
    },
    {
      name: 'TikTok',
      score: 38,
      grade: 'F',
      highRisks: 18,
      mediumRisks: 9,
      safeTerms: 15,
      color: 'from-pink-500 to-red-500'
    }
  ];

  const winner = services.reduce((prev, current) => 
    current.score > prev.score ? current : prev
  );

  return (
    <section className="py-12 px-6 bg-[#0A0E1A] min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          {t('comparison.back')}
        </button>

        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-white mb-4"
          >
            Service Comparison
          </motion.h2>
          <p className="text-xl text-gray-400">
            Compare privacy and safety across popular services
          </p>
        </div>

        {/* Winner Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`bg-gradient-to-r ${winner.color} rounded-2xl p-1 mb-8 shadow-2xl`}
        >
          <div className="bg-[#111827] rounded-2xl p-8 text-center">
            <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-2">Best Choice: {winner.name}</h3>
            <p className="text-gray-400">
              Highest safety score with minimal high-risk clauses
            </p>
          </div>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#111827] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
            >
              {/* Service Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                {service.name === winner.name && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-semibold rounded-full">
                    <Crown size={12} />
                    Best Choice
                  </div>
                )}
              </div>

              {/* Score Circle */}
              <div className="flex justify-center mb-6">
                <div className="relative w-32 h-32">
                  <svg className="transform -rotate-90 w-full h-full">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke={`url(#gradient-${idx})`}
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 56}`}
                      strokeDashoffset={`${2 * Math.PI * 56 * (1 - service.score / 100)}`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id={`gradient-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={service.score >= 70 ? '#10B981' : service.score >= 50 ? '#F59E0B' : '#EF4444'} />
                        <stop offset="100%" stopColor={service.score >= 70 ? '#34D399' : service.score >= 50 ? '#FBBF24' : '#F97316'} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-3xl font-bold text-white">{service.score}</div>
                    <div className="text-sm text-gray-400">Grade {service.grade}</div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <TrendingDown className="w-4 h-4 text-red-400" />
                    High Risk
                  </div>
                  <div className="text-lg font-bold text-red-400">{service.highRisks}</div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    Medium Risk
                  </div>
                  <div className="text-lg font-bold text-yellow-400">{service.mediumRisks}</div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Safe Terms
                  </div>
                  <div className="text-lg font-bold text-green-400">{service.safeTerms}</div>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full mt-6 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm font-medium text-white hover:bg-white/10 transition-all">
                View Full Analysis
              </button>
            </motion.div>
          ))}
        </div>

        {/* Industry Benchmarks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-[#111827] border border-white/10 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Industry Benchmarks</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/5 rounded-xl">
              <div className="text-4xl font-bold text-white mb-2">58</div>
              <div className="text-sm text-gray-400">Social Media Average</div>
              <div className="mt-4 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 w-[58%]"></div>
              </div>
            </div>

            <div className="text-center p-6 bg-white/5 rounded-xl">
              <div className="text-4xl font-bold text-white mb-2">74</div>
              <div className="text-sm text-gray-400">Messaging Apps Average</div>
              <div className="mt-4 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-500 to-green-500 w-[74%]"></div>
              </div>
            </div>

            <div className="text-center p-6 bg-white/5 rounded-xl">
              <div className="text-4xl font-bold text-white mb-2">42</div>
              <div className="text-sm text-gray-400">E-commerce Average</div>
              <div className="mt-4 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 w-[42%]"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}