import { ArrowLeft, TrendingUp, TrendingDown, Shield, AlertTriangle, Users, Eye, Clock, Target, BarChart3, PieChart, Activity, Calendar } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RePieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

interface AnalyticsProps {
  onBack: () => void;
}

export function Analytics({ onBack }: AnalyticsProps) {
  const { t } = useLanguage();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'social' | 'messaging' | 'ecommerce'>('all');

  // Mock Analytics Data
  const kpiData = [
    {
      label: t('analytics.kpi.analyses'),
      value: '89,453',
      change: '+12.5%',
      trend: 'up',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-400'
    },
    {
      label: t('analytics.kpi.users'),
      value: '12,543',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-400'
    },
    {
      label: t('analytics.kpi.avgScore'),
      value: '58.3',
      change: '-2.1%',
      trend: 'down',
      icon: Shield,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-500/10',
      iconColor: 'text-yellow-400'
    },
    {
      label: t('analytics.kpi.risks'),
      value: '4,231',
      change: '+15.8%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-500/10',
      iconColor: 'text-red-400'
    }
  ];

  // Trend Data (Last 30 days)
  const trendData = [
    { date: 'Jan 1', analyses: 2400, users: 1200, avgScore: 62 },
    { date: 'Jan 5', analyses: 2800, users: 1398, avgScore: 58 },
    { date: 'Jan 10', analyses: 3200, users: 1680, avgScore: 56 },
    { date: 'Jan 15', analyses: 3800, users: 2100, avgScore: 59 },
    { date: 'Jan 20', analyses: 4200, users: 2400, avgScore: 57 },
    { date: 'Jan 25', analyses: 4800, users: 2800, avgScore: 58 },
    { date: 'Jan 30', analyses: 5400, users: 3200, avgScore: 60 },
  ];

  // Risk Distribution
  const riskDistribution = [
    { name: 'Critical', value: 1234, percentage: 22, color: '#EF4444' },
    { name: 'High', value: 2156, percentage: 38, color: '#F97316' },
    { name: 'Medium', value: 1423, percentage: 25, color: '#FBBF24' },
    { name: 'Low', value: 845, percentage: 15, color: '#10B981' },
  ];

  // Service Category Analysis
  const categoryData = [
    { category: 'Social Media', avgScore: 45, count: 2543, risk: 'high' },
    { category: 'Messaging', avgScore: 68, count: 1876, risk: 'medium' },
    { category: 'E-commerce', avgScore: 52, count: 3214, risk: 'high' },
    { category: 'Finance', avgScore: 72, count: 987, risk: 'low' },
    { category: 'Gaming', avgScore: 48, count: 1654, risk: 'high' },
    { category: 'Education', avgScore: 78, count: 543, risk: 'low' },
  ];

  // Top Services Analyzed
  const topServices = [
    { name: 'Instagram', analyses: 8932, avgScore: 42, trend: 'down', change: -3 },
    { name: 'WhatsApp', analyses: 7621, avgScore: 65, trend: 'up', change: +2 },
    { name: 'TikTok', analyses: 6543, avgScore: 38, trend: 'down', change: -5 },
    { name: 'Amazon', analyses: 5432, avgScore: 54, trend: 'up', change: +1 },
    { name: 'Netflix', analyses: 4321, avgScore: 71, trend: 'up', change: +4 },
  ];

  // Risk Type Breakdown
  const riskTypes = [
    { type: 'Data Sharing', count: 3421, percentage: 28 },
    { type: 'Arbitration', count: 2987, percentage: 24 },
    { type: 'Content Rights', count: 2134, percentage: 18 },
    { type: 'Auto-Renewal', count: 1876, percentage: 15 },
    { type: 'Liability', count: 1234, percentage: 10 },
    { type: 'Other', count: 606, percentage: 5 },
  ];

  // User Activity Heatmap Data
  const activityData = [
    { hour: '00:00', Monday: 45, Tuesday: 52, Wednesday: 48, Thursday: 61, Friday: 55, Saturday: 89, Sunday: 92 },
    { hour: '04:00', Monday: 23, Tuesday: 28, Wednesday: 31, Thursday: 35, Friday: 29, Saturday: 67, Sunday: 71 },
    { hour: '08:00', Monday: 134, Tuesday: 142, Wednesday: 138, Thursday: 145, Friday: 132, Saturday: 98, Sunday: 87 },
    { hour: '12:00', Monday: 187, Tuesday: 195, Wednesday: 201, Thursday: 198, Friday: 189, Saturday: 156, Sunday: 143 },
    { hour: '16:00', Monday: 165, Tuesday: 171, Wednesday: 168, Thursday: 175, Friday: 198, Saturday: 134, Sunday: 121 },
    { hour: '20:00', Monday: 203, Tuesday: 198, Wednesday: 205, Thursday: 212, Friday: 234, Saturday: 176, Sunday: 167 },
  ];

  // Privacy Score Comparison (Radar)
  const radarData = [
    { metric: 'Data Privacy', Instagram: 35, WhatsApp: 68, Signal: 95 },
    { metric: 'User Rights', Instagram: 42, WhatsApp: 65, Signal: 92 },
    { metric: 'Transparency', Instagram: 48, WhatsApp: 72, Signal: 88 },
    { metric: 'Security', Instagram: 65, WhatsApp: 78, Signal: 94 },
    { metric: 'Control', Instagram: 38, WhatsApp: 61, Signal: 90 },
    { metric: 'Fair Terms', Instagram: 41, WhatsApp: 58, Signal: 87 },
  ];

  const COLORS = ['#EF4444', '#F97316', '#FBBF24', '#10B981', '#3B82F6', '#8B5CF6'];

  return (
    <section className="py-12 px-6 bg-[#0A0E1A] min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-bold text-white mb-2"
              >
                Analytics Dashboard
              </motion.h1>
              <p className="text-gray-400 text-lg">Real-time insights and trends</p>
            </div>

            {/* Time Range Filter */}
            <div className="flex gap-2">
              {(['7d', '30d', '90d', '1y'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`
                    px-4 py-2 rounded-lg font-medium transition-all
                    ${timeRange === range
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }
                  `}
                >
                  {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : '1 Year'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#111827] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${kpi.bgColor} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${kpi.iconColor}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold ${
                    kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {kpi.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    {kpi.change}
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-1">{kpi.value}</div>
                <div className="text-sm text-gray-400">{kpi.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Main Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Trend Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#111827] border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                Analysis Trends
              </h3>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-gray-400">Analyses</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-gray-400">Users</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorAnalyses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Area type="monotone" dataKey="analyses" stroke="#3B82F6" fillOpacity={1} fill="url(#colorAnalyses)" />
                <Area type="monotone" dataKey="users" stroke="#8B5CF6" fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Risk Distribution Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#111827] border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-400" />
              Risk Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </RePieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {riskDistribution.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-400">{item.name}: </span>
                  <span className="text-white font-semibold">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Category Analysis & Top Services */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Category Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#111827] border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-400" />
              Category Safety Scores
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="category" stroke="#9CA3AF" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="avgScore" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Services Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-[#111827] border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-yellow-400" />
              Top Analyzed Services
            </h3>
            <div className="space-y-3">
              {topServices.map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-gray-600">#{idx + 1}</div>
                    <div>
                      <div className="font-semibold text-white">{service.name}</div>
                      <div className="text-sm text-gray-400">{service.analyses.toLocaleString()} analyses</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        service.avgScore >= 70 ? 'text-green-400' :
                        service.avgScore >= 50 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {service.avgScore}
                      </div>
                      <div className={`text-xs font-semibold ${
                        service.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {service.trend === 'up' ? '↑' : '↓'} {Math.abs(service.change)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Radar Chart & Risk Types */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Radar Comparison */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-[#111827] border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              Privacy Score Comparison
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="metric" stroke="#9CA3AF" />
                <PolarRadiusAxis stroke="#9CA3AF" />
                <Radar name="Instagram" dataKey="Instagram" stroke="#E11D48" fill="#E11D48" fillOpacity={0.3} />
                <Radar name="WhatsApp" dataKey="WhatsApp" stroke="#FBBF24" fill="#FBBF24" fillOpacity={0.3} />
                <Radar name="Signal" dataKey="Signal" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                <Legend />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Risk Types Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-[#111827] border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              Risk Type Breakdown
            </h3>
            <div className="space-y-4">
              {riskTypes.map((risk, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{risk.type}</span>
                    <span className="text-gray-400 text-sm">{risk.count.toLocaleString()} ({risk.percentage}%)</span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${risk.percentage}%` }}
                      transition={{ duration: 1, delay: 0.9 + idx * 0.1 }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${COLORS[idx % COLORS.length]}, ${COLORS[(idx + 1) % COLORS.length]})`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* User Activity Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-[#111827] border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-pink-400" />
            User Activity Heatmap
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-gray-400 text-sm pb-4 pr-4">Time</th>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <th key={day} className="text-center text-gray-400 text-sm pb-4 px-2">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activityData.map((row, idx) => (
                  <tr key={idx}>
                    <td className="text-gray-400 text-sm py-2 pr-4">{row.hour}</td>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => {
                      const value = row[day as keyof typeof row] as number;
                      const intensity = Math.min(value / 250, 1);
                      return (
                        <td key={day} className="px-2 py-2">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-xs font-semibold transition-all hover:scale-110 cursor-pointer"
                            style={{
                              backgroundColor: `rgba(59, 130, 246, ${intensity})`,
                              color: intensity > 0.5 ? '#fff' : '#9CA3AF'
                            }}
                            title={`${day} ${row.hour}: ${value} users`}
                          >
                            {value}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-400">
            <span>Less</span>
            <div className="flex gap-1">
              {[0.2, 0.4, 0.6, 0.8, 1].map((opacity, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: `rgba(59, 130, 246, ${opacity})` }}
                />
              ))}
            </div>
            <span>More</span>
          </div>
        </motion.div>

        {/* Real-time Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold">Live Analytics</span>
              <span className="text-gray-400 text-sm">Updated every 5 seconds</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-gray-400">Last updated: Just now</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-purple-400" />
                <span className="text-gray-400">234 users online</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}