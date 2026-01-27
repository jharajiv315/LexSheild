import { ArrowLeft, Bell, Shield, Globe, Moon, Smartphone, Database, Key, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface SettingsProps {
  user: any;
  onBack: () => void;
}

export function Settings({ user, onBack }: SettingsProps) {
  const [settings, setSettings] = useState({
    notifications: {
      emergency: true,
      orderUpdates: true,
      pharmacy: true,
      sms: true,
      email: false
    },
    privacy: {
      shareLocation: true,
      analytics: true,
      contactSync: false
    },
    app: {
      darkMode: true,
      language: 'en',
      autoUpdate: true
    }
  });

  const handleToggle = (category: string, key: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...(prev as any)[category],
        [key]: !(prev as any)[category][key]
      }
    }));
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-400">Manage your preferences and account</p>
          </div>
        </div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#12161D] border border-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Bell className="text-blue-400" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Notifications</h3>
              <p className="text-sm text-gray-400">Manage your notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <div>
                <p className="font-medium">Emergency Alerts</p>
                <p className="text-sm text-gray-400">Get notified about emergency requests</p>
              </div>
              <button
                onClick={() => handleToggle('notifications', 'emergency')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.notifications.emergency ? 'bg-green-500' : 'bg-gray-700'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.notifications.emergency ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <div>
                <p className="font-medium">Order Updates</p>
                <p className="text-sm text-gray-400">Updates about your order status</p>
              </div>
              <button
                onClick={() => handleToggle('notifications', 'orderUpdates')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.notifications.orderUpdates ? 'bg-green-500' : 'bg-gray-700'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.notifications.orderUpdates ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <div>
                <p className="font-medium">Pharmacy Notifications</p>
                <p className="text-sm text-gray-400">New pharmacies and offers</p>
              </div>
              <button
                onClick={() => handleToggle('notifications', 'pharmacy')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.notifications.pharmacy ? 'bg-green-500' : 'bg-gray-700'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.notifications.pharmacy ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <div>
                <p className="font-medium">SMS Alerts</p>
                <p className="text-sm text-gray-400">Receive SMS notifications</p>
              </div>
              <button
                onClick={() => handleToggle('notifications', 'sms')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.notifications.sms ? 'bg-green-500' : 'bg-gray-700'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.notifications.sms ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Email Updates</p>
                <p className="text-sm text-gray-400">Receive email notifications</p>
              </div>
              <button
                onClick={() => handleToggle('notifications', 'email')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.notifications.email ? 'bg-green-500' : 'bg-gray-700'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.notifications.email ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Privacy & Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#12161D] border border-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Shield className="text-green-400" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Privacy & Security</h3>
              <p className="text-sm text-gray-400">Control your data and security</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <div>
                <p className="font-medium">Share Location</p>
                <p className="text-sm text-gray-400">Allow pharmacies to see your location</p>
              </div>
              <button
                onClick={() => handleToggle('privacy', 'shareLocation')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.privacy.shareLocation ? 'bg-green-500' : 'bg-gray-700'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.privacy.shareLocation ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <div>
                <p className="font-medium">Analytics</p>
                <p className="text-sm text-gray-400">Help improve the app with usage data</p>
              </div>
              <button
                onClick={() => handleToggle('privacy', 'analytics')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.privacy.analytics ? 'bg-green-500' : 'bg-gray-700'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.privacy.analytics ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Contact Sync</p>
                <p className="text-sm text-gray-400">Sync emergency contacts</p>
              </div>
              <button
                onClick={() => handleToggle('privacy', 'contactSync')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.privacy.contactSync ? 'bg-green-500' : 'bg-gray-700'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.privacy.contactSync ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <button className="w-full px-4 py-3 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <Key size={18} />
              Change Password
            </button>
          </div>
        </motion.div>

        {/* App Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#12161D] border border-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Smartphone className="text-purple-400" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold">App Preferences</h3>
              <p className="text-sm text-gray-400">Customize your experience</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-800">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-gray-400">Use dark theme</p>
              </div>
              <button
                onClick={() => handleToggle('app', 'darkMode')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.app.darkMode ? 'bg-green-500' : 'bg-gray-700'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.app.darkMode ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>

            <div className="py-3 border-b border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium">Language</p>
                  <p className="text-sm text-gray-400">Select your preferred language</p>
                </div>
                <Globe className="text-gray-400" size={20} />
              </div>
              <select
                value={settings.app.language}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  app: { ...prev.app, language: e.target.value }
                }))}
                className="w-full px-4 py-3 bg-[#1A1F28] border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Auto Update</p>
                <p className="text-sm text-gray-400">Automatically update the app</p>
              </div>
              <button
                onClick={() => handleToggle('app', 'autoUpdate')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.app.autoUpdate ? 'bg-green-500' : 'bg-gray-700'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.app.autoUpdate ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Data Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#12161D] border border-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Database className="text-yellow-400" size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Data Management</h3>
              <p className="text-sm text-gray-400">Manage your data</p>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 text-blue-400 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <Download size={18} />
              Download My Data
            </button>
            <button className="w-full px-4 py-3 bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-500/20 text-yellow-400 rounded-lg font-medium transition-colors">
              Clear Cache
            </button>
            <button className="w-full px-4 py-3 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 rounded-lg font-medium transition-colors">
              Delete Account
            </button>
          </div>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#12161D] border border-gray-800 rounded-xl p-6 text-center"
        >
          <p className="text-sm text-gray-400 mb-2">Med Connect</p>
          <p className="text-xs text-gray-500">Version 1.0.0 • Made with ❤️ in India</p>
        </motion.div>
      </div>
    </div>
  );
}