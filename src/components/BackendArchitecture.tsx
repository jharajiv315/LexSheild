import { Server, Database, Zap, Lock, Globe, Layers } from 'lucide-react';

export function BackendArchitecture() {
  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Backend Architecture</h1>
          <p className="text-gray-400">
            Scalable microservices architecture with FastAPI, Redis, and MongoDB
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-6">System Architecture</h2>
          
          <div className="space-y-8">
            {/* Client Layer */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="text-blue-400" />
                <h3 className="font-semibold">Client Layer</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-8">
                <div className="bg-[#1A1F28] border border-blue-500/30 rounded-lg p-4">
                  <p className="font-medium mb-1">Web App (PWA)</p>
                  <p className="text-sm text-gray-400">React + Tailwind CSS</p>
                  <p className="text-xs text-gray-500 mt-2">Responsive, Offline-first</p>
                </div>
                <div className="bg-[#1A1F28] border border-blue-500/30 rounded-lg p-4">
                  <p className="font-medium mb-1">Mobile Apps</p>
                  <p className="text-sm text-gray-400">iOS & Android</p>
                  <p className="text-xs text-gray-500 mt-2">Native notifications</p>
                </div>
                <div className="bg-[#1A1F28] border border-blue-500/30 rounded-lg p-4">
                  <p className="font-medium mb-1">Admin Dashboard</p>
                  <p className="text-sm text-gray-400">React Admin Panel</p>
                  <p className="text-xs text-gray-500 mt-2">Analytics & monitoring</p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-green-500"></div>
            </div>

            {/* API Gateway */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Server className="text-green-400" />
                <h3 className="font-semibold">API Gateway & Load Balancer</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8">
                <div className="bg-[#1A1F28] border border-green-500/30 rounded-lg p-4">
                  <p className="font-medium mb-1">NGINX</p>
                  <p className="text-sm text-gray-400">Reverse Proxy</p>
                  <p className="text-xs text-gray-500 mt-2">SSL/TLS termination, Rate limiting</p>
                </div>
                <div className="bg-[#1A1F28] border border-green-500/30 rounded-lg p-4">
                  <p className="font-medium mb-1">API Gateway</p>
                  <p className="text-sm text-gray-400">Request routing</p>
                  <p className="text-xs text-gray-500 mt-2">Authentication, Authorization</p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-1 h-12 bg-gradient-to-b from-green-500 to-yellow-500"></div>
            </div>

            {/* Application Layer */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="text-yellow-400" />
                <h3 className="font-semibold">Application Services</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-8">
                <div className="bg-[#1A1F28] border border-yellow-500/30 rounded-lg p-4">
                  <p className="font-medium mb-1">User Service</p>
                  <p className="text-sm text-gray-400">FastAPI</p>
                  <p className="text-xs text-gray-500 mt-2">Auth, Profile, Settings</p>
                </div>
                <div className="bg-[#1A1F28] border border-yellow-500/30 rounded-lg p-4">
                  <p className="font-medium mb-1">Emergency Service</p>
                  <p className="text-sm text-gray-400">FastAPI</p>
                  <p className="text-xs text-gray-500 mt-2">Request handling, Escalation</p>
                </div>
                <div className="bg-[#1A1F28] border border-yellow-500/30 rounded-lg p-4">
                  <p className="font-medium mb-1">Pharmacy Service</p>
                  <p className="text-sm text-gray-400">FastAPI</p>
                  <p className="text-xs text-gray-500 mt-2">Inventory, Availability</p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-1 h-12 bg-gradient-to-b from-yellow-500 to-red-500"></div>
            </div>

            {/* Real-time Layer */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="text-red-400" />
                <h3 className="font-semibold">Real-time Services</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8">
                <div className="bg-[#1A1F28] border border-red-500/30 rounded-lg p-4">
                  <p className="font-medium mb-1">WebSocket Server</p>
                  <p className="text-sm text-gray-400">Socket.IO / FastAPI WebSocket</p>
                  <p className="text-xs text-gray-500 mt-2">Live updates, Chat</p>
                </div>
                <div className="bg-[#1A1F28] border border-red-500/30 rounded-lg p-4">
                  <p className="font-medium mb-1">WhatsApp Integration</p>
                  <p className="text-sm text-gray-400">Twilio API</p>
                  <p className="text-xs text-gray-500 mt-2">Notifications, Responses</p>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-1 h-12 bg-gradient-to-b from-red-500 to-purple-500"></div>
            </div>

            {/* Data Layer */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Database className="text-purple-400" />
                <h3 className="font-semibold">Data Layer</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-8">
                <div className="bg-[#1A1F28] border border-purple-500/30 rounded-lg p-4">
                  <p className="font-medium mb-1">MongoDB</p>
                  <p className="text-sm text-gray-400">Primary Database</p>
                  <p className="text-xs text-gray-500 mt-2">User data, Requests, Logs</p>
                </div>
                <div className="bg-[#1A1F28] border border-purple-500/30 rounded-lg p-4">
                  <p className="font-medium mb-1">Redis</p>
                  <p className="text-sm text-gray-400">Cache & Queue</p>
                  <p className="text-xs text-gray-500 mt-2">Session, Real-time data</p>
                </div>
                <div className="bg-[#1A1F28] border border-purple-500/30 rounded-lg p-4">
                  <p className="font-medium mb-1">S3 / Object Storage</p>
                  <p className="text-sm text-gray-400">File Storage</p>
                  <p className="text-xs text-gray-500 mt-2">Images, Documents</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Lock className="text-green-400" size={20} />
              </div>
              <h3 className="font-semibold">Security Features</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• JWT-based authentication with refresh tokens</li>
              <li>• Role-based access control (RBAC)</li>
              <li>• End-to-end encryption for sensitive data</li>
              <li>• Rate limiting and DDoS protection</li>
              <li>• HIPAA-compliant data handling</li>
              <li>• Regular security audits and penetration testing</li>
            </ul>
          </div>

          <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Zap className="text-yellow-400" size={20} />
              </div>
              <h3 className="font-semibold">Performance Optimization</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Redis caching for frequently accessed data</li>
              <li>• Database indexing and query optimization</li>
              <li>• CDN for static assets</li>
              <li>• Lazy loading and code splitting</li>
              <li>• Service worker for offline functionality</li>
              <li>• WebSocket connection pooling</li>
            </ul>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-6">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-400 mb-3">Backend</p>
              <div className="space-y-2">
                <div className="px-3 py-2 bg-[#1A1F28] rounded-lg text-sm">FastAPI</div>
                <div className="px-3 py-2 bg-[#1A1F28] rounded-lg text-sm">Python 3.11</div>
                <div className="px-3 py-2 bg-[#1A1F28] rounded-lg text-sm">Uvicorn</div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-3">Database</p>
              <div className="space-y-2">
                <div className="px-3 py-2 bg-[#1A1F28] rounded-lg text-sm">MongoDB</div>
                <div className="px-3 py-2 bg-[#1A1F28] rounded-lg text-sm">Redis</div>
                <div className="px-3 py-2 bg-[#1A1F28] rounded-lg text-sm">PostgreSQL</div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-3">Infrastructure</p>
              <div className="space-y-2">
                <div className="px-3 py-2 bg-[#1A1F28] rounded-lg text-sm">Docker</div>
                <div className="px-3 py-2 bg-[#1A1F28] rounded-lg text-sm">Kubernetes</div>
                <div className="px-3 py-2 bg-[#1A1F28] rounded-lg text-sm">AWS/GCP</div>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-3">Monitoring</p>
              <div className="space-y-2">
                <div className="px-3 py-2 bg-[#1A1F28] rounded-lg text-sm">Prometheus</div>
                <div className="px-3 py-2 bg-[#1A1F28] rounded-lg text-sm">Grafana</div>
                <div className="px-3 py-2 bg-[#1A1F28] rounded-lg text-sm">Sentry</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
