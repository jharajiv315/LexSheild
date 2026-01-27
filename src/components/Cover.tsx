import { Heart, Zap, Shield, Globe } from 'lucide-react';

export function Cover() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#0B0F14] via-[#12161D] to-[#0B0F14]">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-xl">
              <Heart size={64} className="text-white" fill="white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
            Med Connect
          </h1>
          <p className="text-xl md:text-2xl text-gray-400">
            Emergency Medical Response System
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Connecting patients, pharmacies, and emergency responders in real-time
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-colors">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Zap className="text-green-400" size={24} />
            </div>
            <h3 className="font-semibold mb-2">Real-time Response</h3>
            <p className="text-sm text-gray-400">
              Instant emergency alerts with WebSocket-powered live updates
            </p>
          </div>

          <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6 hover:border-yellow-500/50 transition-colors">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Shield className="text-yellow-400" size={24} />
            </div>
            <h3 className="font-semibold mb-2">Smart Escalation</h3>
            <p className="text-sm text-gray-400">
              Automatic escalation protocols with countdown timers
            </p>
          </div>

          <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6 hover:border-red-500/50 transition-colors">
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Globe className="text-red-400" size={24} />
            </div>
            <h3 className="font-semibold mb-2">Multi-language</h3>
            <p className="text-sm text-gray-400">
              English, Hindi, and Marathi support for wider accessibility
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-sm text-gray-500 mb-4">Built with</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'FastAPI', 'MongoDB', 'Redis', 'WebSocket', 'PWA'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-[#12161D] border border-gray-800 rounded-lg text-sm text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Version & Date */}
        <div className="mt-8 text-sm text-gray-600">
          <p>Version 1.0.0 • Production Ready • January 2026</p>
        </div>
      </div>
    </div>
  );
}
