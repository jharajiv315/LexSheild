import { ArrowLeft, User, Mail, Shield, Trophy, Target, Calendar, Edit2, Save } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

interface UserProfileProps {
  user: any;
  onUpdateUser: (user: any) => void;
  onBack: () => void;
}

export function UserProfile({ user, onUpdateUser, onBack }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    bio: 'Privacy advocate and ToS analyzer',
  });

  const handleSave = () => {
    onUpdateUser({ ...user, ...formData });
    setIsEditing(false);
  };

  const analysisHistory = [
    { service: 'Instagram', score: 45, grade: 'D', date: '2 days ago', risks: 12 },
    { service: 'WhatsApp', score: 65, grade: 'C', date: '3 days ago', risks: 5 },
    { service: 'Netflix', score: 78, grade: 'B', date: '5 days ago', risks: 3 },
    { service: 'Uber', score: 52, grade: 'D', date: '1 week ago', risks: 8 },
    { service: 'Amazon', score: 61, grade: 'C', date: '1 week ago', risks: 6 },
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

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#111827] border border-white/10 rounded-2xl p-8 sticky top-24"
            >
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center mb-4">
                  <User size={64} className="text-white" />
                </div>
                
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="text-2xl font-bold text-white bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-center w-full mb-2"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-white mb-2">{user.username}</h2>
                )}
                
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="text-gray-400 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-center w-full"
                  />
                ) : (
                  <p className="text-gray-400">{user.email}</p>
                )}
              </div>

              {/* Bio */}
              <div className="mb-6">
                <label className="text-sm text-gray-500 mb-2 block">Bio</label>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-gray-300 resize-none"
                  />
                ) : (
                  <p className="text-gray-300 text-sm">{formData.bio}</p>
                )}
              </div>

              {/* Edit Button */}
              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-sm text-white hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={16} />
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <Edit2 size={16} />
                  Edit Profile
                </button>
              )}

              {/* Stats */}
              <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Trophy size={18} className="text-purple-400" />
                    <span className="text-sm">Level</span>
                  </div>
                  <span className="text-white font-bold">{user.level}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Shield size={18} className="text-blue-400" />
                    <span className="text-sm">Analyses</span>
                  </div>
                  <span className="text-white font-bold">{user.totalAnalyses}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Target size={18} className="text-red-400" />
                    <span className="text-sm">Risks Found</span>
                  </div>
                  <span className="text-white font-bold">{user.risksFound}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={18} className="text-green-400" />
                    <span className="text-sm">Streak Days</span>
                  </div>
                  <span className="text-white font-bold">{user.streakDays}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Analysis History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111827] border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Analysis History</h3>
              
              <div className="space-y-3">
                {analysisHistory.map((analysis, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`
                          w-12 h-12 rounded-lg flex items-center justify-center font-bold text-xl
                          ${analysis.grade === 'A' ? 'bg-green-500/20 text-green-400' :
                            analysis.grade === 'B' ? 'bg-blue-500/20 text-blue-400' :
                            analysis.grade === 'C' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }
                        `}>
                          {analysis.grade}
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {analysis.service}
                          </h4>
                          <p className="text-sm text-gray-400">{analysis.date}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{analysis.score}</div>
                        <p className="text-xs text-gray-500">{analysis.risks} risks</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#111827] border border-white/10 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <div className="font-medium text-white">Email Notifications</div>
                    <div className="text-sm text-gray-400">Get notified about new features</div>
                  </div>
                  <label className="relative inline-block w-12 h-6">
                    <input type="checkbox" className="opacity-0 w-0 h-0 peer" defaultChecked />
                    <span className="absolute cursor-pointer inset-0 bg-gray-600 rounded-full transition-all peer-checked:bg-blue-600">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></span>
                    </span>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <div className="font-medium text-white">Privacy Mode</div>
                    <div className="text-sm text-gray-400">Hide profile from leaderboard</div>
                  </div>
                  <label className="relative inline-block w-12 h-6">
                    <input type="checkbox" className="opacity-0 w-0 h-0 peer" />
                    <span className="absolute cursor-pointer inset-0 bg-gray-600 rounded-full transition-all peer-checked:bg-blue-600">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></span>
                    </span>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <div className="font-medium text-white">Auto-Save Analyses</div>
                    <div className="text-sm text-gray-400">Automatically save all analyses</div>
                  </div>
                  <label className="relative inline-block w-12 h-6">
                    <input type="checkbox" className="opacity-0 w-0 h-0 peer" defaultChecked />
                    <span className="absolute cursor-pointer inset-0 bg-gray-600 rounded-full transition-all peer-checked:bg-blue-600">
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-6"></span>
                    </span>
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-red-400 mb-4">Danger Zone</h3>
              <p className="text-gray-400 mb-6">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-medium text-white transition-all">
                Delete Account
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
