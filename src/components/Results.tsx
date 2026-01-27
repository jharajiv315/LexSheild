import { Shield, AlertTriangle, CheckCircle, XCircle, Download, Share2, ArrowLeft, MessageSquare, GitCompare, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface ResultsProps {
  results: any;
  onBack: () => void;
  onCompare: () => void;
  onChat: () => void;
}

export function Results({ results, onBack, onCompare, onChat }: ResultsProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'high' | 'medium' | 'safe'>('high');

  // Normalize the results data structure
  const highRisks = [...(results.risks?.critical || []), ...(results.risks?.high || [])];
  const mediumRisks = results.risks?.medium || [];
  const safeTerms = results.positives || [];
  const score = results.safetyScore || results.score || 0;

  const getGradeColor = (grade: string) => {
    const colors: any = {
      'A': 'from-green-500 to-emerald-500',
      'B': 'from-blue-500 to-cyan-500',
      'C': 'from-yellow-500 to-orange-500',
      'D': 'from-orange-500 to-red-500',
      'F': 'from-red-500 to-rose-500'
    };
    return colors[grade] || colors['D'];
  };

  const getGradeBg = (grade: string) => {
    const colors: any = {
      'A': 'bg-green-500/10 border-green-500/30',
      'B': 'bg-blue-500/10 border-blue-500/30',
      'C': 'bg-yellow-500/10 border-yellow-500/30',
      'D': 'bg-orange-500/10 border-orange-500/30',
      'F': 'bg-red-500/10 border-red-500/30'
    };
    return colors[grade] || colors['D'];
  };

  const getVerdict = (score: number) => {
    if (score >= 80) return { title: 'Safe to Use', desc: 'This service has fair and transparent terms.' };
    if (score >= 60) return { title: 'Acceptable with Caution', desc: 'Some concerns, but generally reasonable terms.' };
    if (score >= 40) return { title: 'Proceed with Caution', desc: 'Multiple high-risk clauses that may compromise your rights.' };
    return { title: 'High Risk - Avoid', desc: 'Numerous problematic terms. Consider alternatives.' };
  };

  const verdict = getVerdict(score);

  return (
    <section className="py-12 px-6 bg-[#0A0E1A] min-h-screen">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          New Analysis
        </button>

        {/* Overall Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`
            bg-gradient-to-br ${getGradeColor(results.grade)} 
            rounded-3xl p-1 mb-8 shadow-2xl
          `}
        >
          <div className="bg-[#111827] rounded-3xl p-8 md:p-12">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-white" />
                  <h2 className="text-3xl font-bold text-white">Safety Analysis Complete</h2>
                </div>
                <p className="text-gray-400 text-lg">{results.serviceName}</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onCompare}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <GitCompare size={16} />
                  Compare
                </button>
                <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-all flex items-center gap-2">
                  <Share2 size={16} />
                  Share
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white transition-all flex items-center gap-2">
                  <Download size={16} />
                  Download Report
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Score Circle */}
              <div className="flex items-center justify-center">
                <div className="relative">
                  {/* Outer Ring */}
                  <svg className="transform -rotate-90 w-64 h-64">
                    <circle
                      cx="128"
                      cy="128"
                      r="110"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="16"
                      fill="none"
                    />
                    <motion.circle
                      initial={{ strokeDashoffset: 2 * Math.PI * 110 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 110 * (1 - score / 100) }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      cx="128"
                      cy="128"
                      r="110"
                      stroke="url(#gradient)"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 110}`}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={score >= 60 ? '#10B981' : '#EF4444'} />
                        <stop offset="100%" stopColor={score >= 60 ? '#34D399' : '#F97316'} />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Center Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                      className="text-7xl font-bold text-white mb-2"
                    >
                      {score}
                    </motion.div>
                    <div className="text-2xl text-gray-400">/100</div>
                  </div>
                </div>
              </div>

              {/* Grade & Verdict */}
              <div className="flex flex-col justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: 'spring' }}
                  className={`
                    inline-flex items-center justify-center w-32 h-32 
                    ${getGradeBg(results.grade)} border-2 rounded-3xl mb-6
                  `}
                >
                  <span className="text-6xl font-extrabold text-white">{results.grade}</span>
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="text-4xl font-bold text-white mb-4"
                >
                  {verdict.title}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="text-xl text-gray-400 leading-relaxed mb-6"
                >
                  {verdict.desc}
                </motion.p>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingDown className="w-4 h-4 text-red-400" />
                      <div className="text-2xl font-bold text-red-400">{highRisks.length}</div>
                    </div>
                    <div className="text-xs text-gray-500">High Risk</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      <div className="text-2xl font-bold text-yellow-400">{mediumRisks.length}</div>
                    </div>
                    <div className="text-xs text-gray-500">Medium</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <div className="text-2xl font-bold text-green-400">{safeTerms.length}</div>
                    </div>
                    <div className="text-xs text-gray-500">Safe</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('high')}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
              ${activeTab === 'high'
                ? 'bg-red-600 text-white shadow-lg shadow-red-500/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }
            `}
          >
            <XCircle size={18} />
            High Risk ({highRisks.length})
          </button>
          
          <button
            onClick={() => setActiveTab('medium')}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
              ${activeTab === 'medium'
                ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-500/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }
            `}
          >
            <AlertTriangle size={18} />
            Medium Risk ({mediumRisks.length})
          </button>
          
          <button
            onClick={() => setActiveTab('safe')}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
              ${activeTab === 'safe'
                ? 'bg-green-600 text-white shadow-lg shadow-green-500/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }
            `}
          >
            <CheckCircle size={18} />
            Fair Terms ({safeTerms.length})
          </button>
        </div>

        {/* Risk Cards */}
        <div className="space-y-4">
          {activeTab === 'high' && highRisks.map((risk: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#111827] border border-red-500/20 rounded-xl p-6 hover:bg-white/5 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-lg group-hover:text-red-400 transition-colors mb-2">
                      {risk.title}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed mb-3">
                      {risk.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded">
                        {risk.severity || risk.impact || 'HIGH'}
                      </span>
                      {risk.section && (
                        <span className="text-gray-500">
                          {risk.section}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {activeTab === 'medium' && mediumRisks.map((risk: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#111827] border border-yellow-500/20 rounded-xl p-6 hover:bg-white/5 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-lg group-hover:text-yellow-400 transition-colors mb-2">
                    {risk.title}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed mb-3">
                    {risk.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">
                      {risk.severity || risk.impact || 'MEDIUM'}
                    </span>
                    {risk.section && (
                      <span className="text-gray-500">
                        {risk.section}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {activeTab === 'safe' && safeTerms.map((term: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#111827] border border-green-500/20 rounded-xl p-6 hover:bg-white/5 transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-lg group-hover:text-green-400 transition-colors mb-2">
                    {term.title}
                  </h4>
                  <p className="text-sm text-gray-400 leading-relaxed mb-3">
                    {term.description}
                  </p>
                  {term.section && (
                    <span className="text-xs text-gray-500">
                      {term.section}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Chat CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8 text-center"
        >
          <MessageSquare className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Have Questions?</h3>
          <p className="text-gray-400 mb-6">
            Ask our AI assistant anything about these terms
          </p>
          <button 
            onClick={onChat}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white hover:shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105"
          >
            Chat with AI Assistant
          </button>
        </motion.div>

        {/* Legal Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
            <div className="text-sm">
              <h4 className="text-yellow-400 font-bold mb-2">⚖️ Legal Disclaimer</h4>
              <p className="text-gray-300 leading-relaxed">
                <strong>We display rationale and a disclaimer: not legal advice; the tool aids triage, not legal counsel.</strong> This analysis is for informational purposes only. LexShield provides automated risk detection to help you understand Terms of Service, but it does not constitute legal advice. For specific legal questions or concerns, please consult a qualified attorney.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}